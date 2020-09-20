app.controller("estateAccountAgencyController", ["$scope", "$http", "ajax", 'rashaErManage', '$modal', '$modalStack', 'SweetAlert', '$filter', function($scope, $http, ajax, rashaErManage, $modal, $modalStack, sweetAlert, $filter) {
    var estateAccountAgency = this;
    estateAccountAgency.busyIndicator = {
        isActive: true,
        message: "در حال بار گذاری ..."
    }
    var buttonIsPressed = false; // برای جلوگیری از فشرده شدن چندباره دکمه ها
    estateAccountAgency.busyIndicator.isActive = true;
    estateAccountAgency.addRequested = false;

    estateAccountAgency.Access = {};
    estateAccountAgency.ListItems = [];
    estateAccountAgency.selectedItem
    estateAccountAgency.gridOptions={};
    estateAccountAgency.gridOptions.advancedSearchData = {};
    estateAccountAgency.gridOptions.advancedSearchData.engine = {};
    estateAccountAgency.gridOptions.advancedSearchData.engine.CurrentPageNumber = 1;
    estateAccountAgency.gridOptions.advancedSearchData.engine.SortColumn = "Id";
    estateAccountAgency.gridOptions.advancedSearchData.engine.SortType = 1;
    estateAccountAgency.gridOptions.advancedSearchData.engine.TotalRowData = 2000;
    estateAccountAgency.gridOptions.advancedSearchData.engine.RowPerPage = 20;
    estateAccountAgency.gridOptions.advancedSearchData.engine.Filters = [];
    
    if (itemRecordStatus != undefined) estateAccountAgency.itemRecordStatus = itemRecordStatus;



    estateAccountAgency.init = function() {
        estateAccountAgency.busyIndicator.isActive = true;

        estateAccountAgency.gridOptions.advancedSearchData.engine.AccessLoad=true;

        ajax.call(cmsServerConfig.configApiServerPath + "EstateAccountAgency/getall", estateAccountAgency.gridOptions.advancedSearchData.engine, 'POST').success(function(response) {
            estateAccountAgency.busyIndicator.isActive = false;
            rashaErManage.checkAction(response);
            estateAccountAgency.ListItems = response.ListItems;
            estateAccountAgency.Access = response.Access;
            estateAccountAgency.gridOptions.fillData(estateAccountAgency.ListItems, estateAccountAgency.Access);
            estateAccountAgency.gridOptions.advancedSearchData.engine.AccessLoad=true;
            estateAccountAgency.gridOptions.currentPageNumber = response.CurrentPageNumber;
            estateAccountAgency.gridOptions.totalRowCount = response.TotalRowCount;
            estateAccountAgency.gridOptions.rowPerPage = response.RowPerPage;
            estateAccountAgency.allowedSearch = response.AllowedSearchField;
        }).error(function(data, errCode, c, d) {
            estateAccountAgency.busyIndicator.isActive = false;
            rashaErManage.checkAction(data, errCode);
        });


    }

    // Open Add Modal

    estateAccountAgency.openAddModal = function() {
        if (buttonIsPressed) { return };

        estateAccountAgency.modalTitle = 'اضافه';
        buttonIsPressed = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'EstateAccountAgency/ViewModel', "", 'GET').success(function(response) {
            buttonIsPressed = false;
            rashaErManage.checkAction(response);
            estateAccountAgency.busyIndicator.isActive = false;
            estateAccountAgency.selectedItem = response.Item;
            $modal.open({
                templateUrl: 'cpanelv1/ModuleEstate/EstateAccountAgency/add.html',
                scope: $scope
            });
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            estateAccountAgency.busyIndicator.isActive = false;

        });
    }

    // Add New Content
    estateAccountAgency.addNewRow = function(frm) {
        if (frm.$invalid) {
            rashaErManage.showMessage($filter('translatentk')('form_values_full_have_not_been_entered'));
            return;
        }
        estateAccountAgency.busyIndicator.isActive = true;
        estateAccountAgency.addRequested = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'EstateAccountAgency/', estateAccountAgency.selectedItem, 'POST').success(function(response) {
            estateAccountAgency.addRequested = false;
            estateAccountAgency.busyIndicator.isActive = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                estateAccountAgency.ListItems.unshift(response.Item);
                estateAccountAgency.gridOptions.fillData(estateAccountAgency.ListItems);
                estateAccountAgency.closeModal();
            }
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            estateAccountAgency.busyIndicator.isActive = false;
            estateAccountAgency.addRequested = false;
        });
    }

    estateAccountAgency.openEditModal = function() {
        if (buttonIsPressed) { return };

        estateAccountAgency.modalTitle = 'ویرایش';
        if (!estateAccountAgency.gridOptions.selectedRow.item) {
            rashaErManage.showMessage($filter('translatentk')('please_select_a_row_to_edit'));
            return;
        }

        buttonIsPressed = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'EstateAccountAgency/', estateAccountAgency.gridOptions.selectedRow.item.Id, 'GET').success(function(response) {
            buttonIsPressed = false;

            rashaErManage.checkAction(response);
            estateAccountAgency.selectedItem = response.Item;
            $modal.open({
                templateUrl: 'cpanelv1/ModuleEstate/EstateAccountAgency/edit.html',
                scope: $scope
            });

        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }

    // Edit a Content
    estateAccountAgency.editRow = function(frm) {
        if (frm.$invalid) {
            rashaErManage.showMessage($filter('translatentk')('form_values_full_have_not_been_entered'));
            return;
        }
        estateAccountAgency.busyIndicator.isActive = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'EstateAccountAgency/', estateAccountAgency.selectedItem, "PUT").success(function(response) {
            estateAccountAgency.addRequested = true;
            estateAccountAgency.busyIndicator.isActive = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                estateAccountAgency.addRequested = false;
                estateAccountAgency.replaceItem(estateAccountAgency.selectedItem.Id, response.Item);
                estateAccountAgency.gridOptions.fillData(estateAccountAgency.ListItems);
                estateAccountAgency.closeModal();
            }

        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            estateAccountAgency.addRequested = false;
            estateAccountAgency.busyIndicator.isActive = false;
        });
    }
//tools
    estateAccountAgency.closeModal = function() {
        $modalStack.dismissAll();
    };

    estateAccountAgency.replaceItem = function(oldId, newItem) {
        angular.forEach(estateAccountAgency.ListItems, function(item, key) {
            if (item.Id == oldId) {
                var index = estateAccountAgency.ListItems.indexOf(item);
                estateAccountAgency.ListItems.splice(index, 1);
            }
        });
        if (newItem)
            estateAccountAgency.ListItems.unshift(newItem);
    }
//tools
    estateAccountAgency.deleteRow = function() {
        if (buttonIsPressed) { return };

        if (!estateAccountAgency.gridOptions.selectedRow.item) {
            rashaErManage.showMessage($filter('translatentk')('Please_Select_A_Row_To_Remove'));
            return;
        }

        rashaErManage.showYesNo(($filter('translatentk')('warning')), ($filter('translatentk')('do_you_want_to_delete_this_attribute')), function(isConfirmed) {
            if (isConfirmed) {
                estateAccountAgency.busyIndicator.isActive = true;
                console.log(estateAccountAgency.gridOptions.selectedRow.item);
                buttonIsPressed = true;

                ajax.call(cmsServerConfig.configApiServerPath + 'EstateAccountAgency/', estateAccountAgency.gridOptions.selectedRow.item.Id, 'DELETE').success(function(res) {
                    rashaErManage.checkAction(res);
                    estateAccountAgency.addRequested = true;
                    estateAccountAgency.busyIndicator.isActive = false;
                    if (res.IsSuccess) {
                        estateAccountAgency.replaceItem(estateAccountAgency.selectedItemForDelete.Id);
                        estateAccountAgency.gridOptions.fillData(estateAccountAgency.ListItems);
                    }
                }).error(function(data2, errCode2, c2, d2) {
                    rashaErManage.checkAction(data2);
                    estateAccountAgency.addRequested = true;
                    estateAccountAgency.busyIndicator.isActive = false;
                });

            }
        });
    }

    estateAccountAgency.searchData = function() {
        estateAccountAgency.gridOptions.searchData();

    }

    estateAccountAgency.gridOptions = {
        columns: [
            { name: 'Id', displayName: 'کد سیستمی', sortable: true, type: 'integer', visible: true },
            { name: 'LinkSiteId', displayName: 'کد سیستمی سایت', sortable: true, type: 'integer', visible: true },
            { name: 'Title', displayName: 'عنوان', sortable: true, type: 'string', visible: true },
            { name: 'Description', displayName: 'توضیحات', sortable: true, type: 'string', visible: true },
            { name: 'LinkContractTypeTitle', displayName: 'قرارداد', sortable: true, type: 'string', visible: true, displayForce: true },
            { name: 'LinkPropertyTitle', displayName: 'ملک', sortable: true, type: 'string', visible: true, displayForce: true }
        ],
        data: {},
        multiSelect: false,
        startDate: moment().format(),
        advancedSearchData: {
            engine: {}
        }
    }


    estateAccountAgency.openDateExpireLockAccount = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $timeout(function() {
            estateAccountAgency.focusExpireLockAccount = true;
        });
    };

    estateAccountAgency.openDate = function($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $timeout(function() {
            estateAccountAgency.focus = true;
        });
    };

    estateAccountAgency.gridOptions.reGetAll = function() {
        estateAccountAgency.init();
    }

    estateAccountAgency.gridOptions.onRowSelected = function() {

    }

    estateAccountAgency.columnCheckbox = false;



    //insert properties into input
    estateAccountAgency.autoComplete = function() {
        $("#properties").autocomplete({
            source: estateAccountAgency.properties,
            select: function(event, ui) {
                estateAccountAgency.selectedItem.LinkPropertyId = ui.item.LinkPropertyId;
            }
        });
    }

    // Filter Texts
    estateAccountAgency.gridOptions.myfilterText = function(gridListItems, foreignKeyName, childListItems, childDesiredPropertyName, childItemColumnName) {
        var ilength = gridListItems.length;
        var jlength = childListItems.length;
        for (var i = 0; i < ilength; i++) {
            gridListItems[i][childItemColumnName] = ""; // Make a new field for title of the foreighn key
            for (var j = 0; j < jlength; j++) {
                if (gridListItems[i][foreignKeyName] == childListItems[j].Id) {
                    gridListItems[i][childItemColumnName] = childListItems[j][childDesiredPropertyName];
                }
            }
        }
    }

    estateAccountAgency.newProperty = false;
    estateAccountAgency.selectProperty = false;

    estateAccountAgency.onSelectPropertyPanelShowChange = function(propertyPanel) {
        if (propertyPanel == "select") {
            $("#newPropertyPanel").fadeOut("fast");
            $("#selectPropertyPanel").fadeIn("fast");
        } else {
            $("#selectPropertyPanel").fadeOut("fast");
            $("#newPropertyPanel").fadeIn("fast");
        }
    }

    estateAccountAgency.onPropertyTypeChange = function(propertyTypeId) {
        var filterValue = {
            PropertyName: "LinkPropertyTypeId",
            IntValue1: parseInt(propertyTypeId),
            SearchType: 0
        }
        var engine = {};
        engine.Filters = [];
        engine.Filters.push(filterValue);
        ajax.call(cmsServerConfig.configApiServerPath + "estateContractDetail/GetAll", engine, 'POST').success(function(response) {
            estateAccountAgency.propertyDetailsListItems = response.ListItems;

            $.each(estateAccountAgency.propertyDetailsListItems, function(index, item) {
                item.value = null;
                // Add groups to its list
                var result = $.grep(estateAccountAgency.propertyDetailGroupListItems, function(e) { return e.Id == item.virtual_PropertyDetailGroup.Id; });
                if (result.length <= 0)
                    estateAccountAgency.propertyDetailGroupListItems.push(item.virtual_PropertyDetailGroup);

                // Add DefaultValue to the object
                item.DefaultValue = JSON.parse(item.JsonDefaultValue);
            });

        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }
    //Export Report 
    estateAccountAgency.exportFile = function() {
        estateAccountAgency.addRequested = true;
        estateAccountAgency.gridOptions.advancedSearchData.engine.ExportFile = estateAccountAgency.ExportFileClass;
        ajax.call(cmsServerConfig.configApiServerPath + 'EstateAccountAgency/exportfile', estateAccountAgency.gridOptions.advancedSearchData.engine, 'POST').success(function(response) {
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                estateAccountAgency.exportDownloadLink = window.location.origin + response.LinkFile;
                $window.open(response.LinkFile, '_blank');
                //estateAccountAgency.closeModal();
            }
            estateAccountAgency.addRequested = false;
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }
    //Open Export Report Modal
    estateAccountAgency.toggleExportForm = function() {
        estateAccountAgency.SortType = [
            { key: 'نزولی', value: 0 },
            { key: 'صعودی', value: 1 },
            { key: 'تصادفی', value: 3 }
        ];
        estateAccountAgency.EnumExportFileType = [
            { key: 'Excel', value: 1 },
            { key: 'PDF', value: 2 },
            { key: 'Text', value: 3 }
        ];
        estateAccountAgency.EnumExportReceiveMethod = [
            { key: 'دانلود', value: 0 },
            { key: 'ایمیل', value: 1 },
            { key: 'فایل منیجر', value: 3 }
        ];
        estateAccountAgency.ExportFileClass = { FileType: 1, RecieveMethod: 0, RowCount: 100 };
        estateAccountAgency.exportDownloadLink = null;
        $modal.open({
            templateUrl: 'cpanelv1/ModuleEstate/EstateAccountAgency/report.html',
            scope: $scope
        });
    }
    //Row Count Export Input Change
    estateAccountAgency.rowCountChanged = function() {
        if (!angular.isDefined(estateAccountAgency.ExportFileClass.RowCount) || estateAccountAgency.ExportFileClass.RowCount > 5000)
            estateAccountAgency.ExportFileClass.RowCount = 5000;
    }
    //Get TotalRowCount
    estateAccountAgency.getCount = function() {
        ajax.call(cmsServerConfig.configApiServerPath + "EstateAccountAgency/count", estateAccountAgency.gridOptions.advancedSearchData.engine, 'POST').success(function(response) {
            rashaErManage.checkAction(response);
            estateAccountAgency.ListItemsTotalRowCount = ': ' + response.TotalRowCount;
        }).error(function(data, errCode, c, d) {
            estateAccountAgency.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    }


}]);