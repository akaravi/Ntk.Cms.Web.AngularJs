app.controller("coreTagController", ["$scope", "$http", "ajax", 'rashaErManage', '$modal', '$modalStack', 'SweetAlert', '$timeout', '$window', '$state', '$filter', function($scope, $http, ajax, rashaErManage, $modal, $modalStack, sweetAlert, $timeout, $window, $state, $filter) {
    var coreTag = this;
    var edititem = false;
    //For Grid Options
    coreTag.gridOptions = {};
    coreTag.AccessTagCategory={};
    coreTag.selectedItem = {};
    coreTag.attachedFiles = [];
    coreTag.attachedFile = "";
    var todayDate = moment().format();
    coreTag.DateBirth = {
        defaultDate: todayDate,
        viewTimePicker: true
    }
    coreTag.filePickerMainImage = {
        isActive: true,
        backElement: 'filePickerMainImage',
        filename: null,
        fileId: null,
        multiSelect: false,
    }

    coreTag.filePickerFiles = {
        isActive: true,
        backElement: 'filePickerFiles',
        multiSelect: false,
        fileId: null,
        filename: null
    }
    coreTag.locationChanged = function(lat, lang) {
        console.log("ok " + lat + " " + lang);
    }

    coreTag.GeolocationConfig = {
        latitude: 'Geolocationlatitude',
        longitude: 'Geolocationlongitude',
        onlocationChanged: coreTag.locationChanged,
        useCurrentLocation: true,
        center: { lat: 32.658066, lng: 51.6693815 },
        zoom: 4,
        scope: coreTag,
        useCurrentLocationZoom: 12,
    }
    if (itemRecordStatus != undefined) coreTag.itemRecordStatus = itemRecordStatus;

    var date = moment().format();
    coreTag.selectedItem.ToDate = date;
    coreTag.datePickerConfig = {
        defaultDate: date
    };
    coreTag.startDate = {
        defaultDate: date
    }
    coreTag.endDate = {
        defaultDate: date
    }
    coreTag.count = 0;

    //#help/ سلکتور دسته بندی در ویرایش محتوا
    coreTag.LinkCategoryTagIdSelector = {
        displayMember: 'Title',
        id: 'Id',
        fId: 'LinkParentId',
        url: 'coreModuleTagCategory',
        sortColumn: 'Id',
        sortType: 0,
        filterText: 'Title',
        showAddDialog: false,
        rowPerPage: 200,
        scope: coreTag,
        columnOptions: {
            columns: [
                { name: 'Id', displayName: 'کد سیستمی', sortable: true, type: 'integer' },
                { name: 'Title', displayName: 'عنوان', sortable: true, type: 'string' },
                { name: 'Description', displayName: 'توضیحات', sortable: true, type: 'string' }
            ]
        }
    }

    //coreModule Grid Options
    coreTag.gridOptions = {
        columns: [
            { name: 'LinkMainImageIdSrc', displayName: 'عکس', sortable: true, visible: true, isThumbnailByFild: true, imageWidth: '80', imageHeight: '80' },
            { name: 'Id', displayName: 'کد سیستمی', sortable: true, type: 'integer', visible: 'true' },
            { name: 'LinkSiteId', displayName: 'کد سیستمی سایت', sortable: true, type: 'integer', visible: true },
            { name: 'CreatedDate', displayName: 'ساخت', sortable: true, isDate: true, type: 'date', visible: 'true' },
            { name: 'UpdatedDate', displayName: 'ویرایش', sortable: true, isDate: true, type: 'date', visible: 'true' },
            { name: 'Title', displayName: 'عنوان', sortable: true, type: 'string', visible: 'true' },
        ],
        data: {},
        multiSelect: false,
        advancedSearchData: {
            engine: {}
        }
    }

    //Comment Grid Options
    coreTag.gridContentOptions = {
        columns: [
            { name: 'Id', displayName: 'کد سیستمی', sortable: true, type: 'integer' },
            { name: 'LinkSiteId', displayName: 'کد سیستمی سایت', sortable: true, type: 'integer', visible: true },
            { name: 'Writer', displayName: 'نویسنده', sortable: true, type: 'string' },
            { name: 'Comment', displayName: 'کامنت', sortable: true, type: 'string' },
            { name: 'ActionButtons', displayName: 'کلید عملیاتی', template: '<Button ng-if="!x.IsActivated" ng-click="coreTag.confirmComment(x)" class="btn btn-primary" style="margin-left: 2px;"><i class="fa fa-check-square-o" aria-hidden="true"></i>&nbsp&nbspتأیید</Button><Button ng-if="x.IsActivated" ng-click="coreTag.doNotConfirmComment(x)" class="btn btn-warning" style="margin-left: 2px;"><i class="fa fa-square-o"></i>&nbsp&nbspتأیید</Button><Button ng-click="coreTag.deleteComment(x)" class="btn btn-danger"><i class="fa fa-times" aria-hidden="true"></i>&nbsp&nbspحذف</Button>' },
        ],
        data: {},
        multiSelect: false,
        showUserSearchPanel: false,
        advancedSearchData: {
            engine: {
                CurrentPageNumber: 1,
                SortColumn: "Id",
                SortType: 1,
                NeedToRunFakePagination: false,
                TotalRowData: 2000,
                RowPerPage: 20,
                ContentFullSearch: null,
                Filters: []
            }
        }
    }



    //For Show Category Loading Indicator
    coreTag.categoryBusyIndicator = {
        isActive: true,
        message: "در حال بارگذاری دسته ها ..."
    }
    //For Show coreModule Loading Indicator
    coreTag.contentBusyIndicator = {
        isActive: false,
        message: "در حال بارگذاری ..."
    }
    //Tree Config
    coreTag.treeConfig = {
        displayMember: 'Title',
        displayId: 'Id',
        displayChild: 'Children'
    };


    coreTag.treeConfig.currentNode = {};
    coreTag.treeBusyIndicator = false;
    coreTag.addRequested = false;
    coreTag.showGridComment = false;
    coreTag.coreModuleTitle = "";

    //init Function
    coreTag.init = function() {
        coreTag.categoryBusyIndicator.isActive = true;
        var engine ={ RowPerPage: 1000 };
        engine.AccessLoad = true;
        ajax.call(cmsServerConfig.configApiServerPath + "coreModuleTagCategory/getall", engine, 'POST').success(function(response) {
            coreTag.treeConfig.Items = response.ListItems;
            coreTag.AccessTagCategory=response.Access;
            coreTag.categoryBusyIndicator.isActive = false;
        }).error(function(data, errCode, c, d) {
            console.log(data);
        });
        coreTag.gridOptions.advancedSearchData.engine.AccessLoad = true;
        ajax.call(cmsServerConfig.configApiServerPath + "coreModuleTag/getall", coreTag.gridOptions.advancedSearchData.engine, 'POST').success(function(response) {
            rashaErManage.checkAction(response);
            coreTag.ListItems = response.ListItems;
            coreTag.gridOptions.fillData(coreTag.ListItems, response.Access); // Sending Access as an argument
            coreTag.contentBusyIndicator.isActive = false;
            coreTag.gridOptions.currentPageNumber = response.CurrentPageNumber;
            coreTag.gridOptions.totalRowCount = response.TotalRowCount;
            coreTag.gridOptions.rowPerPage = response.RowPerPage;
        }).error(function(data, errCode, c, d) {
            coreTag.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
            coreTag.contentBusyIndicator.isActive = false;
        });

    };



    coreTag.gridContentOptions.onRowSelected = function() {}

    // Open Add Category Modal 
    coreTag.addNewCategoryModel = function() {
        coreTag.addRequested = false;
        var filterModelParentRootFolders = {
            Filters: [{
                PropertyName: "LinkParentId",
                value: null,
                SearchType: 0,
                IntValueForceNullSearch: true
            }]
        };
        ajax.call(cmsServerConfig.configApiServerPath + "FileCategory/getAll", filterModelParentRootFolders, 'POST').success(function(response1) { //Get root directories
            coreTag.dataForTheTree = response1.ListItems;

            ajax.call(cmsServerConfig.configApiServerPath + "FileContent/GetFilesInCategoryId/", "", 'GET').success(function(response2) { //Get files in root
                Array.prototype.push.apply(coreTag.dataForTheTree, response2.ListItems);
                $modal.open({
                    templateUrl: 'cpanelv1/CmsModules/coreModule/TagCategory/add.html',
                    scope: $scope
                });
                coreTag.addRequested = false;
            }).error(function(data, errCode, c, d) {
                console.log(data);
            });
        }).error(function(data, errCode, c, d) {
            console.log(data);
        });


    }
    buttonIsPressed = false;
    // Open Edit Category Modal
    coreTag.openEditCategoryModel = function() {
        if (buttonIsPressed) return;
        coreTag.addRequested = false;
        coreTag.modalTitle = 'ویرایش';
        if (!coreTag.treeConfig.currentNode) {
            rashaErManage.showMessage($filter('translatentk')('please_select_a_category_to_edit'));
            return;
        }

        coreTag.contentBusyIndicator.isActive = true;
        buttonIsPressed = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'coreModuleTagCategory/', coreTag.treeConfig.currentNode.Id, 'GET').success(function(response) {
            buttonIsPressed = false;
            coreTag.contentBusyIndicator.isActive = false;
            rashaErManage.checkAction(response);
            coreTag.selectedItem = response.Item;
            //Set dataForTheTree
            coreTag.selectedNode = [];
            coreTag.expandedNodes = [];
            coreTag.selectedItem = response.Item;
            var filterModelParentRootFolders = {
                Filters: [{
                    PropertyName: "LinkParentId",
                    value: null,
                    SearchType: 0,
                    IntValueForceNullSearch: true
                }]
            };
            ajax.call(cmsServerConfig.configApiServerPath + "FileCategory/getAll", filterModelParentRootFolders, 'POST').success(function(response1) { //Get root directories
                coreTag.dataForTheTree = response1.ListItems;

                ajax.call(cmsServerConfig.configApiServerPath + "FileContent/GetFilesInCategoryId/", "", 'GET').success(function(response2) { //Get files in root
                    Array.prototype.push.apply(coreTag.dataForTheTree, response2.ListItems);
                    //Set selected files to treeControl
                    if (coreTag.selectedItem.LinkMainImageId > 0)
                        coreTag.onSelection({ Id: coreTag.selectedItem.LinkMainImageId }, true);
                    $modal.open({
                        templateUrl: 'cpanelv1/CmsModules/coreModule/TagCategory/edit.html',
                        scope: $scope
                    });
                }).error(function(data, errCode, c, d) {
                    console.log(data);
                });
            }).error(function(data, errCode, c, d) {
                console.log(data);
            });

        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }

    // Add New Category
    coreTag.addNewCategory = function(frm) {
        if (frm.$invalid || buttonIsPressed) {
            rashaErManage.showMessage($filter('translatentk')('form_values_full_have_not_been_entered'));
            return;
        }
        coreTag.categoryBusyIndicator.isActive = true;
        coreTag.addRequested = true;
        coreTag.selectedItem.LinkParentId = null;
        if (coreTag.treeConfig.currentNode != null)
            coreTag.selectedItem.LinkParentId = coreTag.treeConfig.currentNode.Id;
        buttonIsPressed = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'coreModuleTagCategory/', coreTag.selectedItem, 'POST').success(function(response) {
            buttonIsPressed = false;
            coreTag.addRequested = false;
            rashaErManage.checkAction(response);
            console.log(response);
            if (response.IsSuccess) {
                coreTag.gridOptions.advancedSearchData.engine.Filters = null;
                coreTag.gridOptions.advancedSearchData.engine.Filters = [];
                coreTag.gridOptions.reGetAll();
                coreTag.closeModal();
            }
            coreTag.categoryBusyIndicator.isActive = false;
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            coreTag.addRequested = false;
            coreTag.categoryBusyIndicator.isActive = false;

        });
    }

    //Edit Category
    coreTag.editCategory = function(frm) {
        if (frm.$invalid || buttonIsPressed) {
            rashaErManage.showMessage($filter('translatentk')('form_values_full_have_not_been_entered'));
            return;
        }
        coreTag.categoryBusyIndicator.isActive = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'coreModuleTagCategory/', coreTag.selectedItem, "PUT").success(function(response) {
            coreTag.addRequested = true;
            //coreTag.showbusy = false;
            coreTag.treeConfig.showbusy = false;
            coreTag.showIsBusy = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                coreTag.addRequested = false;
                coreTag.treeConfig.currentNode.Title = response.Item.Title;
                coreTag.closeModal();
            }
            coreTag.categoryBusyIndicator.isActive = false;
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            coreTag.addRequested = false;
            coreTag.categoryBusyIndicator.isActive = false;
        });
    }

    // Delete a Category
    coreTag.deleteCategory = function() {
        if (buttonIsPressed) return;
        var node = coreTag.treeConfig.currentNode;
        if (node.Id == 0 || !node.Id) {
            rashaErManage.showMessage($filter('translatentk')('please_select_a_category_to_remove'));
            return;
        }
        rashaErManage.showYesNo(($filter('translatentk')('warning')), ($filter('translatentk')('do_you_want_to_delete_this_attribute')), function(isConfirmed) {
            if (isConfirmed) {
                coreTag.categoryBusyIndicator.isActive = true;
                // console.log(node.gridOptions.selectedRow.item);

                ajax.call(cmsServerConfig.configApiServerPath + 'coreModuleTagCategory/', node.Id, 'DELETE').success(function(res) {
                    coreTag.categoryBusyIndicator.isActive = false;
                    if (res.IsSuccess) {
                        coreTag.gridOptions.advancedSearchData.engine.Filters = null;
                        coreTag.gridOptions.advancedSearchData.engine.Filters = [];
                        coreTag.gridOptions.fillData();
                        coreTag.gridOptions.reGetAll();
                    } else { //Error occurred
                        if (res.ErrorType == 15)
                            rashaErManage.showMessage($filter('translatentk')('unable_to_delete_the_category_contains_content'));
                    }
                }).error(function(data2, errCode2, c2, d2) {
                    rashaErManage.checkAction(data2);
                    coreTag.categoryBusyIndicator.isActive = false;
                });

            }
        });
    }

    //Tree On Node Select Options
    coreTag.treeConfig.onNodeSelect = function() {
        var node = coreTag.treeConfig.currentNode;
        coreTag.showGridComment = false;
        coreTag.CategoryTagId = node.Id;
        coreTag.selectContent(node);
    };

    //Show Content with Category Id
    coreTag.selectContent = function(node) {
        coreTag.gridOptions.advancedSearchData.engine.Filters = null;
        coreTag.gridOptions.advancedSearchData.engine.Filters = [];
        if (node != null && node != undefined) {
            coreTag.contentBusyIndicator.message = "در حال بارگذاری  " + node.Title;
            coreTag.contentBusyIndicator.isActive = true;

            coreTag.attachedFiles = null;
            coreTag.attachedFiles = [];
            var s = {
                PropertyName: "LinkParentId",
                value: node.Id,
                SearchType: 0
            }
            coreTag.gridOptions.advancedSearchData.engine.Filters.push(s);
        }
        coreTag.gridOptions.advancedSearchData.engine.AccessLoad = true;
        ajax.call(cmsServerConfig.configApiServerPath + "coreModuleTag/getall", coreTag.gridOptions.advancedSearchData.engine, 'POST').success(function(response) {
            rashaErManage.checkAction(response);
            coreTag.contentBusyIndicator.isActive = false;
            coreTag.ListItems = response.ListItems;
            coreTag.gridOptions.fillData(coreTag.ListItems, response.Access); // Sending Access as an argument
            coreTag.gridOptions.currentPageNumber = response.CurrentPageNumber;
            coreTag.gridOptions.totalRowCount = response.TotalRowCount;
            coreTag.gridOptions.rowPerPage = response.RowPerPage;
        }).error(function(data, errCode, c, d) {
            coreTag.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    };

    // Open Add New Content Model
    coreTag.openAddModel = function() {

        coreTag.addRequested = false;
        coreTag.modalTitle = 'اضافه کردن محتوای جدید';
        ajax.call(cmsServerConfig.configApiServerPath + 'coreModuleTag/ViewModel', "", 'GET').success(function(response) {
            rashaErManage.checkAction(response);
            coreTag.selectedItem = response.Item;
            coreTag.selectedItem.LinkCategoryTagId = coreTag.CategoryTagId;
            //coreTag.clearPreviousData();
            $modal.open({
                templateUrl: 'cpanelv1/CmsModules/coreModule/Tag/add.html',
                scope: $scope
            });
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }

    // Open Edit Content Modal
    coreTag.openEditModel = function() {
        if (buttonIsPressed) return;
        coreTag.addRequested = false;
        coreTag.modalTitle = 'ویرایش';
        if (!coreTag.gridOptions.selectedRow.item) {
            rashaErManage.showMessage($filter('translatentk')('please_select_a_row_to_edit'));
            return;
        }
        buttonIsPressed = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'coreModuleTag/', coreTag.gridOptions.selectedRow.item.Id, 'GET').success(function(response1) {
            buttonIsPressed = false;
            rashaErManage.checkAction(response1);
            coreTag.selectedItem = response1.Item;

            $modal.open({
                templateUrl: 'cpanelv1/CmsModules/coreModule/Tag/edit.html',
                scope: $scope
            });
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }

    // Add New Content
    coreTag.addNewRow = function(frm) {
        if (frm.$invalid) {
            rashaErManage.showMessage($filter('translatentk')('form_values_full_have_not_been_entered'));
            return;
        }
        coreTag.categoryBusyIndicator.isActive = true;
        coreTag.addRequested = true;


        ajax.call(cmsServerConfig.configApiServerPath + 'coreModuleTag/', coreTag.selectedItem, 'POST').success(function(response) {
            rashaErManage.checkAction(response);
            coreTag.categoryBusyIndicator.isActive = false;
            if (response.IsSuccess) {
                coreTag.ListItems.unshift(response.Item);
                coreTag.gridOptions.fillData(coreTag.ListItems);
                coreTag.closeModal();

            }
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            coreTag.addRequested = false;
            coreTag.categoryBusyIndicator.isActive = false;
        });
    }

    //Edit Content
    coreTag.editRow = function(frm) {
        if (frm.$invalid) {
            rashaErManage.showMessage($filter('translatentk')('form_values_full_have_not_been_entered'));
            return;
        }
        coreTag.categoryBusyIndicator.isActive = true;
        coreTag.addRequested = true;


        ajax.call(cmsServerConfig.configApiServerPath + 'coreModuleTag/', coreTag.selectedItem, "PUT").success(function(response) {
            coreTag.categoryBusyIndicator.isActive = false;
            coreTag.addRequested = false;
            coreTag.treeConfig.showbusy = false;
            coreTag.showIsBusy = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                coreTag.replaceItem(coreTag.selectedItem.Id, response.Item);
                coreTag.gridOptions.fillData(coreTag.ListItems);
                coreTag.closeModal();
            }
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            coreTag.addRequested = false;
            coreTag.categoryBusyIndicator.isActive = false;
        });
    }
    // Delete a coreModule Content 
    coreTag.deleteContent = function() {
        if (!coreTag.gridOptions.selectedRow.item) {
            rashaErManage.showMessage($filter('translatentk')('Please_Select_A_Row_To_Remove'));
            return;
        }
        coreTag.treeConfig.showbusy = true;
        coreTag.showIsBusy = true;
        rashaErManage.showYesNo(($filter('translatentk')('warning')), ($filter('translatentk')('do_you_want_to_delete_this_attribute')), function(isConfirmed) {
            if (isConfirmed) {
                coreTag.categoryBusyIndicator.isActive = true;
                console.log(coreTag.gridOptions.selectedRow.item);
                coreTag.showbusy = true;
                coreTag.showIsBusy = true;
    
                    ajax.call(cmsServerConfig.configApiServerPath + "coreModuleTag/",coreTag.gridOptions.selectedRow.item.Id, 'DELETE').success(function(res) {
                        coreTag.categoryBusyIndicator.isActive = false;
                        coreTag.treeConfig.showbusy = false;
                        coreTag.showIsBusy = false;
                        rashaErManage.checkAction(res);
                        if (res.IsSuccess) {
                            coreTag.replaceItem(coreTag.selectedItemForDelete.Id);
                            coreTag.gridOptions.fillData(coreTag.ListItems);
                        }
                    }).error(function(data2, errCode2, c2, d2) {
                        rashaErManage.checkAction(data2);
                        coreTag.treeConfig.showbusy = false;
                        coreTag.showIsBusy = false;
                        coreTag.categoryBusyIndicator.isActive = false;
                    });
               
            }
        });
    }


    //Replace Item OnDelete/OnEdit Grid Options
    coreTag.replaceItem = function(oldId, newItem) {
        angular.forEach(coreTag.ListItems, function(item, key) {
            if (item.Id == oldId) {
                var index = coreTag.ListItems.indexOf(item);
                coreTag.ListItems.splice(index, 1);
            }
        });
        if (newItem)
            coreTag.ListItems.unshift(newItem);
    }

    coreTag.searchData = function() {
        coreTag.contentBusyIndicator.isActive = true;
        ajax.call(cmsServerConfig.configApiServerPath + "coreModuleTag/getall", coreTag.gridOptions.advancedSearchData.engine, "POST").success(function(response) {
            rashaErManage.checkAction(response);
            coreTag.contentBusyIndicator.isActive = false;
            coreTag.ListItems = response.ListItems;
            coreTag.gridOptions.fillData(coreTag.ListItems);
            coreTag.gridOptions.currentPageNumber = response.CurrentPageNumber;
            coreTag.gridOptions.totalRowCount = response.TotalRowCount;
            coreTag.gridOptions.rowPerPage = response.RowPerPage;
            coreTag.allowedSearch = response.AllowedSearchField;
        }).error(function(data, errCode, c, d) {
            coreTag.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    }

    //Close Model Stack
    coreTag.addRequested = false;
    coreTag.closeModal = function() {
        $modalStack.dismissAll();
    };

    coreTag.showIsBusy = false;



    //For reInit Categories
    coreTag.gridOptions.reGetAll = function() {
        coreTag.init();
    };

    coreTag.isCurrentNodeEmpty = function() {
        return !angular.equals({}, coreTag.treeConfig.currentNode);
    }

    coreTag.loadFileAndFolder = function(item) {
        coreTag.treeConfig.currentNode = item;
        console.log(item);
        coreTag.treeConfig.onNodeSelect(item);
    }

    coreTag.toggleCategoryButtons = function() {
        $("#categoryButtons").fadeToggle();
    }

    coreTag.columnCheckbox = false;
    coreTag.openGridConfigModal = function() {
        $("#gridView-btn").toggleClass("active");
        var prechangeColumns = coreTag.gridOptions.columns;
        if (coreTag.gridOptions.columnCheckbox) {
            for (var i = 0; i < coreTag.gridOptions.columns.length; i++) {
                var element = $("#" + coreTag.gridOptions.columns[i].name.replace('.', '') + "Checkbox");
                var temp = element[0].checked;
                coreTag.gridOptions.columns[i].visible = temp;
            }
        } else {

            for (var i = 0; i < coreTag.gridOptions.columns.length; i++) {
                var element = $("#" + coreTag.gridOptions.columns[i].name.replace('.', '') + "Checkbox");
                $("#" + coreTag.gridOptions.columns[i].name + "Checkbox").checked = prechangeColumns[i].visible;
            }
        }
        for (var i = 0; i < coreTag.gridOptions.columns.length; i++) {
            console.log(coreTag.gridOptions.columns[i].name.concat(".visible: "), coreTag.gridOptions.columns[i].visible);
        }
        coreTag.gridOptions.columnCheckbox = !coreTag.gridOptions.columnCheckbox;
    }

    coreTag.deleteAttachedFile = function(index) {
        coreTag.attachedFiles.splice(index, 1);
    }

    coreTag.addAttachedFile = function(id) {
        var fname = $("#file" + id).text();
        if (id != null && id != undefined && !coreTag.alreadyExist(id, coreTag.attachedFiles) && fname != null && fname != "") {
            var fId = id;
            var file = {
                id: fId,
                name: fname
            };
            coreTag.attachedFiles.push(file);
            if (document.getElementsByName("file" + id).length > 1)
                document.getElementsByName("file" + id)[1].textContent = "";
            else
                document.getElementsByName("file" + id)[0].textContent = "";
        }
    }

    coreTag.alreadyExist = function(id, array) {
        for (var i = 0; i < array.length; i++) {
            if (id == array[i].fileId) {
                rashaErManage.showMessage($filter('translatentk')('This_File_Has_Already_Been_Attachment'));
                return true;
            }
        }
        return false;
    }

    coreTag.filePickerMainImage.removeSelectedfile = function(config) {
        coreTag.filePickerMainImage.fileId = null;
        coreTag.filePickerMainImage.filename = null;
        coreTag.selectedItem.LinkMainImageId = null;

    }

    coreTag.filePickerFiles.removeSelectedfile = function(config) {
        coreTag.filePickerFiles.fileId = null;
        coreTag.filePickerFiles.filename = null;
        coreTag.selectedItem.LinkFileIds = null;
    }


    coreTag.showUpload = function() {
        $("#fastUpload").fadeToggle();
    }

    // ----------- FilePicker Codes --------------------------------
    coreTag.addAttachedFile = function(id) {
        var fname = $("#file" + id).text();
        if (fname == "") {
            rashaErManage.showMessage($filter('translatentk')('Please_Select_A_File_To_Add'));
            return;
        }
        if (id != null && id != undefined && !coreTag.alreadyExist(id, coreTag.attachedFiles)) {
            var fId = id;
            var file = {
                fileId: fId,
                filename: fname
            };
            coreTag.attachedFiles.push(file);
            coreTag.clearfilePickers();
        }
    }

    coreTag.alreadyExist = function(fieldId, array) {
        for (var i = 0; i < array.length; i++) {
            if (fieldId == array[i].fileId) {
                rashaErManage.showMessage($filter('translatentk')('This_Item_Has_Already_Been_Added'));
                coreTag.clearfilePickers();
                return true;
            }
        }
        return false;
    }

    coreTag.parseFileIds = function(stringOfIds) {
        if (stringOfIds == null || !stringOfIds.trim()) return; //String is empty or whitespace then return
        var fileIds = stringOfIds.split(",");
        if (fileIds.length != undefined) {
            $.each(fileIds, function(index, item) {
                if (item == parseInt(item, 10)) { // Check if item is an integer
                    ajax.call(cmsServerConfig.configApiServerPath + 'FileContent/', parseInt(item), 'GET').success(function(response) {
                        if (response.IsSuccess) {
                            coreTag.attachedFiles.push({ fileId: response.Item.Id, filename: response.Item.FileName });
                        }
                    }).error(function(data, errCode, c, d) {
                        rashaErManage.checkAction(data, errCode);
                    });
                }
            });
        }
    }

    coreTag.clearfilePickers = function() {
        coreTag.filePickerFiles.fileId = null;
        coreTag.filePickerFiles.filename = null;
    }

    coreTag.stringfyLinkFileIds = function() {
        $.each(coreTag.attachedFiles, function(i, item) {
            if (coreTag.selectedItem.LinkFileIds == "")
                coreTag.selectedItem.LinkFileIds = item.fileId;
            else
                coreTag.selectedItem.LinkFileIds += ',' + item.fileId;
        });
    }
    //--------- End FilePickers Codes -------------------------


    //---------------Upload Modal-------------------------------
    coreTag.openUploadModal = function() {
        $modal.open({
            templateUrl: 'cpanelv1/CmsModules/coreModule/tag/upload_modal.html',
            size: 'lg',
            scope: $scope
        });

        coreTag.FileList = [];
        //get list of file from category id
        ajax.call(cmsServerConfig.configApiServerPath + "FileContent/GetFilesInCategoryId/", "", 'GET').success(function(response) {
            coreTag.FileList = response.ListItems;
        }).error(function(data) {
            console.log(data);
        });

    }

    coreTag.calcuteProgress = function(progress) {
        wdth = Math.floor(progress * 100);
        return wdth;
    }

    coreTag.whatcolor = function(progress) {
        wdth = Math.floor(progress * 100);
        if (wdth >= 0 && wdth < 30) {
            return 'danger';
        } else if (wdth >= 30 && wdth < 50) {
            return 'warning';
        } else if (wdth >= 50 && wdth < 85) {
            return 'info';
        } else {
            return 'success';
        }
    }

    coreTag.canShow = function(pr) {
        if (pr == 1) {
            return true;
        }
        return false;
    }
    // File Manager actions
    coreTag.replaceFile = function(name) {
        coreTag.itemClicked(null, coreTag.fileIdToDelete, "file");
        coreTag.fileTypes = 1;
        coreTag.fileIdToDelete = coreTag.selectedIndex;

        // Delete the file
        ajax.call(cmsServerConfig.configApiServerPath + "FileContent/", coreTag.fileIdToDelete, 'GET').success(function(response1) {
            if (response1.IsSuccess == true) {
                console.log(response1.Item);
                ajax.call(cmsServerConfig.configApiServerPath + 'FileContent/', response1.Item.Id, 'DELETE').success(function(response2) {
                    coreTag.remove(coreTag.FileList, coreTag.fileIdToDelete);
                    if (response2.IsSuccess == true) {
                        // Save New file
                        ajax.call(cmsServerConfig.configApiServerPath + "FileContent/ViewModel", "", 'GET').success(function(response3) {
                            if (response3.IsSuccess == true) {
                                coreTag.FileItem = response3.Item;
                                coreTag.FileItem.FileName = name;
                                coreTag.FileItem.Extension = name.split('.').pop();
                                coreTag.FileItem.FileSrc = name;
                                coreTag.FileItem.LinkCategoryId = coreTag.thisCategory;
                                coreTag.saveNewFile();
                            } else {
                                console.log("getting the model was not successfully returned!");
                            }
                        }).error(function(data) {
                            console.log(data);
                        });
                    } else {
                        console.log("Request to api/CmsFileContent/delete was not successfully returned!");
                    }
                }).error(function(data, errCode, c, d) {
                    console.log(data);
                });
            }
        }).error(function(data) {
            console.log(data);
        });
    }
    //save new file
    coreTag.saveNewFile = function() {
        ajax.call(cmsServerConfig.configApiServerPath + "FileContent/", coreTag.FileItem, 'POST').success(function(response) {
            if (response.IsSuccess) {
                coreTag.FileItem = response.Item;
                coreTag.showSuccessIcon();
                return 1;
            } else {
                return 0;

            }
        }).error(function(data) {
            coreTag.showErrorIcon();
            return -1;
        });
    }

    coreTag.showSuccessIcon = function() {}

    coreTag.showErrorIcon = function() {

    }
    //file is exist
    coreTag.fileIsExist = function(fileName) {
        for (var i = 0; i < coreTag.FileList.length; i++) {
            if (coreTag.FileList[i].FileName == fileName) {
                coreTag.fileIdToDelete = coreTag.FileList[i].Id;
                return true;

            }
        }
        return false;
    }

    coreTag.getFileItem = function(id) {
        for (var i = 0; i < coreTag.FileList.length; i++) {
            if (coreTag.FileList[i].Id == id) {
                return coreTag.FileList[i];
            }
        }
    }

    //select file or folder
    coreTag.itemClicked = function($event, index, type) {
        if (type == 'file' || type == 1) {
            coreTag.fileTypes = 1;
            coreTag.selectedFileId = coreTag.getFileItem(index).Id;
            coreTag.selectedFileName = coreTag.getFileItem(index).FileName;
        } else {
            coreTag.fileTypes = 2;
            coreTag.selectedCategoryId = coreTag.getCategoryName(index).Id;
            coreTag.selectedCategoryTitle = coreTag.getCategoryName(index).Title;
        }
        //if (event.ctrlKey) {
        //    alert("ctrl pressed");
        //}

        coreTag.selectedIndex = index;

    };

    //upload file
    coreTag.uploadFile = function(index, uploadFile) {
        if ($("#save-icon" + index).hasClass("fa-save")) {
            if (coreTag.fileIsExist(uploadFile.name)) { // File already exists
                if (confirm('File "' + uploadFile.name + '" already exists! Do you want to replace the new file?')) {
                    //------------ coreTag.replaceFile(uploadFile.name);
                    coreTag.itemClicked(null, coreTag.fileIdToDelete, "file");
                    coreTag.fileTypes = 1;
                    coreTag.fileIdToDelete = coreTag.selectedIndex;
                    // replace the file
                    ajax
                        .call(
                            cmsServerConfig.configApiServerPath + "FileContent/",
                            coreTag.fileIdToDelete,
                            "GET"
                        )
                        .success(function(response1) {
                            if (response1.IsSuccess == true) {
                                console.log(response1.Item);
                                ajax.call(cmsServerConfig.configApiServerPath + "FileContent/replace", response1.Item, "POST")
                                    .success(function(response2) {
                                        if (response2.IsSuccess == true) {
                                            coreTag.FileItem = response2.Item;
                                            coreTag.showSuccessIcon();
                                            $("#save-icon" + index).removeClass("fa-save");
                                            $("#save-button" + index).removeClass(
                                                "flashing-button"
                                            );
                                            $("#save-icon" + index).addClass("fa-check");
                                            coreTag.filePickerMainImage.filename =
                                                coreTag.FileItem.FileName;
                                            coreTag.filePickerMainImage.fileId =
                                                response2.Item.Id;
                                            coreTag.selectedItem.LinkMainImageId =
                                                coreTag.filePickerMainImage.fileId;
                                        } else {
                                            $("#save-icon" + index).removeClass("fa-save");
                                            $("#save-button" + index).removeClass(
                                                "flashing-button"
                                            );
                                            $("#save-icon" + index).addClass("fa-remove");
                                        }
                                    })
                                    .error(function(data) {
                                        coreTag.showErrorIcon();
                                        $("#save-icon" + index).removeClass("fa-save");
                                        $("#save-button" + index).removeClass("flashing-button");
                                        $("#save-icon" + index).addClass("fa-remove");
                                    });
                                //-----------------------------------
                            }
                        })
                        .error(function(data) {
                            console.log(data);
                        });
                    //--------------------------------
                } else {
                    return;
                }
            } else { // File does not exists
                // Save New file
                ajax.call(cmsServerConfig.configApiServerPath + "FileContent/ViewModel", "", 'GET').success(function(response) {
                    coreTag.FileItem = response.Item;
                    coreTag.FileItem.FileName = uploadFile.name;
                    coreTag.FileItem.UploadFileGUID = uploadFile.errorExceptionResult.Item.FileKey;
                    coreTag.FileItem.Extension = uploadFile.name.split('.').pop();
                    coreTag.FileItem.FileSrc = uploadFile.name;
                    coreTag.FileItem.LinkCategoryId = null; //Save the new file in the root
                    // ------- coreTag.saveNewFile()  ----------------------
                    var result = 0;
                    ajax.call(cmsServerConfig.configApiServerPath + "FileContent/", coreTag.FileItem, 'POST').success(function(response) {
                        if (response.IsSuccess) {
                            coreTag.FileItem = response.Item;
                            coreTag.showSuccessIcon();
                            $("#save-icon" + index).removeClass("fa-save");
                            $("#save-button" + index).removeClass("flashing-button");
                            $("#save-icon" + index).addClass("fa-check");
                            coreTag.filePickerMainImage.filename = coreTag.FileItem.FileName;
                            coreTag.filePickerMainImage.fileId = response.Item.Id;
                            coreTag.selectedItem.LinkMainImageId = coreTag.filePickerMainImage.fileId

                        } else {
                            $("#save-icon" + index).removeClass("fa-save");
                            $("#save-button" + index).removeClass("flashing-button");
                            $("#save-icon" + index).addClass("fa-remove");
                        }
                    }).error(function(data) {
                        coreTag.showErrorIcon();
                        $("#save-icon" + index).removeClass("fa-save");
                        $("#save-button" + index).removeClass("flashing-button");
                        $("#save-icon" + index).addClass("fa-remove");
                    });
                    //-----------------------------------
                }).error(function(data) {
                    console.log(data);
                    $("#save-icon" + index).removeClass("fa-save");
                    $("#save-button" + index).removeClass("flashing-button");
                    $("#save-icon" + index).addClass("fa-remove");
                });
            }
        }
    }
    //End of Upload Modal-----------------------------------------

    //Export Report 
    coreTag.exportFile = function() {
        coreTag.gridOptions.advancedSearchData.engine.ExportFile = coreTag.ExportFileClass;
        coreTag.addRequested = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'coreModuleTag/exportfile', coreTag.gridOptions.advancedSearchData.engine, 'POST').success(function(response) {
            coreTag.addRequested = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                coreTag.exportDownloadLink = window.location.origin + response.LinkFile;
                $window.open(response.LinkFile, '_blank');
                //coreTag.closeModal();
            }
            coreTag.addRequested = false;
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }
    //Open Export Report Modal
    coreTag.toggleExportForm = function() {
        coreTag.SortType = [
            { key: 'نزولی', value: 0 },
            { key: 'صعودی', value: 1 },
            { key: 'تصادفی', value: 3 }
        ];
        coreTag.EnumExportFileType = [
            { key: 'Excel', value: 1 },
            { key: 'PDF', value: 2 },
            { key: 'Text', value: 3 }
        ];
        coreTag.EnumExportReceiveMethod = [
            { key: 'دانلود', value: 0 },
            { key: 'ایمیل', value: 1 },
            { key: 'فایل منیجر', value: 3 }
        ];
        coreTag.ExportFileClass = { FileType: 1, RecieveMethod: 0, RowCount: 100 };
        coreTag.exportDownloadLink = null;
        $modal.open({
            templateUrl: 'cpanelv1/CmsModules/coreModule/Tag/report.html',
            scope: $scope
        });
    }
    //Row Count Export Input Change
    coreTag.rowCountChanged = function() {
        if (!angular.isDefined(coreTag.ExportFileClass.RowCount) || coreTag.ExportFileClass.RowCount > 5000)
            coreTag.ExportFileClass.RowCount = 5000;
    }
    //Get TotalRowCount
    coreTag.getCount = function() {
        ajax.call(cmsServerConfig.configApiServerPath + "coreModuleTag/count", coreTag.gridOptions.advancedSearchData.engine, 'POST').success(function(response) {
            coreTag.addRequested = false;
            rashaErManage.checkAction(response);
            coreTag.ListItemsTotalRowCount = ': ' + response.TotalRowCount;
        }).error(function(data, errCode, c, d) {
            coreTag.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    }
    //TreeControl
    coreTag.treeOptions = {
        nodeChildren: "Children",
        multiSelection: false,
        isLeaf: function(node) {
            if (node.FileName == undefined || node.Filename == "")
                return false;
            return true;
        },
        isSelectable: function(node) {
            if (coreTag.treeOptions.dirSelectable)
                if (angular.isDefined(node.FileName))
                    return false;
            return true;
        },
        dirSelectable: false
    }

    coreTag.onNodeToggle = function(node, expanded) {
        if (expanded) {
            node.Children = [];
            var filterModel = { Filters: [] };
            var originalName = node.Title;
            node.messageText = " در حال بارگذاری...";
            filterModel.Filters.push({ PropertyName: "LinkParentId", SearchType: 0, value: node.Id });
            ajax.call(cmsServerConfig.configApiServerPath + "FileCategory/GetAll", filterModel, 'POST').success(function(response1) {
                angular.forEach(response1.ListItems, function(value, key) {
                    node.Children.push(value);
                });
                ajax.call(cmsServerConfig.configApiServerPath + "FileContent/GetFilesInCategoryId/"+node.Id,"", 'GET').success(function(response2) {
                    angular.forEach(response2.ListItems, function(value, key) {
                        node.Children.push(value);
                    });
                    node.messageText = "";
                }).error(function(data, errCode, c, d) {
                    console.log(data);
                });
            }).error(function(data, errCode, c, d) {
                console.log(data);
            });
        }
    }

    coreTag.onSelection = function(node, selected) {
        if (!selected) {
            coreTag.selectedItem.LinkMainImageId = null;
            coreTag.selectedItem.previewImageSrc = null;
            return;
        }
        coreTag.selectedItem.LinkMainImageId = node.Id;
        coreTag.selectedItem.previewImageSrc = cmsServerConfig.configCpanelImages + "loader.gif";
        ajax.call(cmsServerConfig.configApiServerPath + "FileContent/", node.Id, "GET").success(function(response) {
            coreTag.selectedItem.previewImageSrc = cmsServerConfig.configPathFileByIdAndName + response.Item.Id + "/" + response.Item.FileName;
        }).error(function(data, errCode, c, d) {
            console.log(data);
        });
    }
    //End of TreeControl
}]);