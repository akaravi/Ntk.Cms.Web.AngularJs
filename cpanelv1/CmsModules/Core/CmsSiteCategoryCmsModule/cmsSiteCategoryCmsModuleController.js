﻿app.controller("cmsSiteCategoryCmsModuleCtrl", ["$scope", "$http", "ajax", 'rashaErManage', '$modal', '$modalStack', 'SweetAlert', '$builder', '$rootScope', '$window', '$state', '$stateParams', '$filter', function($scope, $http, ajax, rashaErManage, $modal, $modalStack, sweetAlert, $builder, $rootScope, $window, $state, $stateParams, $filter) {

    var cmsSiteCategoryCmsModule = this;

    //#formBuilder: define array for values
    cmsSiteCategoryCmsModule.defaultValue = [];

    if (itemRecordStatus != undefined) cmsSiteCategoryCmsModule.itemRecordStatus = itemRecordStatus;

    cmsSiteCategoryCmsModule.busyIndicator = {
        isActive: true,
        message: "در حال بار گذاری ..."
    }

    var date = moment().format();

    cmsSiteCategoryCmsModule.init = function() {
        cmsSiteCategoryCmsModule.busyIndicator.isActive = true;
        cmsSiteCategoryCmsModule.gridOptions.advancedSearchData.engine.AccessLoad = true;
        ajax.call(cmsServerConfig.configApiServerPath + "CoreSiteCategoryCmsModule/getall", cmsSiteCategoryCmsModule.gridOptions.advancedSearchData.engine, 'POST').success(function(response) {
            rashaErManage.checkAction(response);
            cmsSiteCategoryCmsModule.ListItems = response.ListItems;
            cmsSiteCategoryCmsModule.TotalRowCount = response.TotalRowCount;
            cmsSiteCategoryCmsModule.gridOptions.fillData(cmsSiteCategoryCmsModule.ListItems, response.Access);
            cmsSiteCategoryCmsModule.busyIndicator.isActive = false;
            cmsSiteCategoryCmsModule.gridOptions.currentPageNumber = response.CurrentPageNumber;
            cmsSiteCategoryCmsModule.gridOptions.totalRowCount = response.TotalRowCount;
            cmsSiteCategoryCmsModule.gridOptions.rowPerPage = response.RowPerPage;
            cmsSiteCategoryCmsModule.gridOptions.maxSize = 5;
        }).error(function(data, errCode, c, d) {
            cmsSiteCategoryCmsModule.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
            cmsSiteCategoryCmsModule.busyIndicator.isActive = false;
        });
        var filterModel = { RowPerPage: 100, SortColumn: "Title", SortType: 1 };
        if (!cmsSiteCategoryCmsModule.categoryListItems || cmsSiteCategoryCmsModule.categoryListItems.length == 0) {
            ajax.call(cmsServerConfig.configApiServerPath + "CoreSiteCategory/getall", filterModel, 'POST').success(function(response) {
                rashaErManage.checkAction(response);
                cmsSiteCategoryCmsModule.categoryListItems = response.ListItems;
            }).error(function(data, errCode, c, d) {
                rashaErManage.checkAction(data, errCode);
            });
        }
        if (!cmsSiteCategoryCmsModule.moduleListItems || cmsSiteCategoryCmsModule.moduleListItems.length == 0) {
            ajax.call(cmsServerConfig.configApiServerPath + "CoreModule/getall", filterModel, 'POST').success(function(response) {
                cmsSiteCategoryCmsModule.moduleListItems = response.ListItems;
            }).error(function(data, errCode, c, d) {
                rashaErManage.checkAction(data, errCode);
            });
        }
    }

    // Open Add New Content Modal
    cmsSiteCategoryCmsModule.addRequested = false;

    cmsSiteCategoryCmsModule.openAddModal = function() {
        cmsSiteCategoryCmsModule.modalTitle = 'اضافه';
        ajax.call(cmsServerConfig.configApiServerPath + 'CoreSiteCategoryCmsModule/ViewModel', "", 'GET').success(function(response) {
            rashaErManage.checkAction(response);
            cmsSiteCategoryCmsModule.selectedItem = response.Item;
            $modal.open({
                templateUrl: 'cpanelv1/CmsModules/Core/CmsSiteCategoryCmsModule/add.html',
                scope: $scope
            });
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }
    // Add New Content
    cmsSiteCategoryCmsModule.addNewRow = function(frm) {
        if (frm.$invalid)
            return;
        cmsSiteCategoryCmsModule.busyIndicator.isActive = true;
        cmsSiteCategoryCmsModule.addRequested = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'CoreSiteCategoryCmsModule/', cmsSiteCategoryCmsModule.selectedItem, 'POST').success(function(response) {
            cmsSiteCategoryCmsModule.addRequested = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                cmsSiteCategoryCmsModule.ListItems.unshift(response.Item);
                cmsSiteCategoryCmsModule.gridOptions.fillData(cmsSiteCategoryCmsModule.ListItems, response.Access);
                cmsSiteCategoryCmsModule.busyIndicator.isActive = false;
                cmsSiteCategoryCmsModule.closeModal();
            }
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            cmsSiteCategoryCmsModule.addRequested = false;
        });
    }

    // Open Edit Content Modal
    cmsSiteCategoryCmsModule.openEditModal = function() {
        cmsSiteCategoryCmsModule.modalTitle = 'ویرایش';
        if (!cmsSiteCategoryCmsModule.gridOptions.selectedRow.item) {
            rashaErManage.showMessage($filter('translatentk')('please_select_a_row_to_edit'));
            return;
        }

        var engine = {
            CurrentPageNumber: 1,
            SortColumn: "Id",
            SortType: 0,
            NeedToRunFakePagination: false,
            TotalRowData: 2000,
            RowPerPage: 20,
            ContentFullSearch: null,
            Filters: [],
            Count: false
        }
        var filter1 = {
            PropertyName: "LinkCmsSiteCategoryId",
            value: cmsSiteCategoryCmsModule.gridOptions.selectedRow.item.LinkCmsSiteCategoryId
        }
        var filter2 = {
            PropertyName: "LinkCmsModuleId",
            value: cmsSiteCategoryCmsModule.gridOptions.selectedRow.item.LinkCmsModuleId
        }

        engine.Filters.push(filter1);
        engine.Filters.push(filter2);
        ajax.call(cmsServerConfig.configApiServerPath + 'CoreSiteCategoryCmsModule/getall', engine, 'POST').success(function(response) {
            rashaErManage.checkAction(response);
            cmsSiteCategoryCmsModule.selectedItem = response.ListItems[0];
            $modal.open({
                templateUrl: 'cpanelv1/CmsModules/Core/CmsSiteCategoryCmsModule/edit.html',
                scope: $scope
            });

        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }

    cmsSiteCategoryCmsModule.editRow = function(frm) {
        if (frm.$invalid)
            return;
        cmsSiteCategoryCmsModule.busyIndicator.isActive = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'CoreSiteCategoryCmsModule/', cmsSiteCategoryCmsModule.selectedItem, "PUT").success(function(response) {
            cmsSiteCategoryCmsModule.addRequested = true;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                cmsSiteCategoryCmsModule.gridOptions.reGetAll();
                cmsSiteCategoryCmsModule.addRequested = false;

                cmsSiteCategoryCmsModule.closeModal();
            }

        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            cmsSiteCategoryCmsModule.addRequested = false;
            cmsSiteCategoryCmsModule.busyIndicator.isActive = false;
        });
    }

    cmsSiteCategoryCmsModule.closeModal = function() {
        $modalStack.dismissAll();
    };

    cmsSiteCategoryCmsModule.replaceItem = function(oldId, newItem) {
        angular.forEach(cmsSiteCategoryCmsModule.ListItems, function(item, key) {
            if (item.Id == oldId) {
                var index = cmsSiteCategoryCmsModule.ListItems.indexOf(item);
                cmsSiteCategoryCmsModule.ListItems.splice(index, 1);
            }
        });
        if (newItem)
            cmsSiteCategoryCmsModule.ListItems.unshift(newItem);
    }

    cmsSiteCategoryCmsModule.deleteRow = function() {
        if (!cmsSiteCategoryCmsModule.gridOptions.selectedRow.item) {
            rashaErManage.showMessage($filter('translatentk')('Please_Select_A_Row_To_Remove'));
            return;
        }
        rashaErManage.showYesNo(($filter('translatentk')('warning')), ($filter('translatentk')('do_you_want_to_delete_this_attribute')), function(isConfirmed) {
            if (isConfirmed) {
                ajax.call(cmsServerConfig.configApiServerPath + 'CoreSiteCategoryCmsModule/', cmsSiteCategoryCmsModule.gridOptions.selectedRow.item.Id, 'GET').success(function(response) {
                    rashaErManage.checkAction(response);
                    cmsSiteCategoryCmsModule.selectedItemForDelete = response.Item;
                    ajax.call(cmsServerConfig.configApiServerPath + 'CoreSiteCategoryCmsModule/', cmsSiteCategoryCmsModule.selectedItemForDelete.Id, 'DELETE').success(function(res) {
                        rashaErManage.checkAction(res);
                        if (res.IsSuccess) {
                            cmsSiteCategoryCmsModule.replaceItem(cmsSiteCategoryCmsModule.selectedItemForDelete.Id);
                            cmsSiteCategoryCmsModule.gridOptions.fillData(cmsSiteCategoryCmsModule.ListItems);
                        }
                    }).error(function(data2, errCode2, c2, d2) {
                        rashaErManage.checkAction(data2);
                    });
                }).error(function(data, errCode, c, d) {
                    rashaErManage.checkAction(data, errCode);
                });
            }
        });
    }

    cmsSiteCategoryCmsModule.searchData = function() {
        cmsSiteCategoryCmsModule.gridOptions.serachData();
    }

    cmsSiteCategoryCmsModule.gridOptions = {
        columns: [
            { name: 'CreatedDate', displayName: 'ساخت', sortable: true, isDate: true, type: 'date', visible: 'true' },
            { name: 'UpdatedDate', displayName: 'ویرایش', sortable: true, isDate: true, type: 'date', visible: 'true' },
            { name: 'LinkCmsModuleId', displayName: 'کد سیستمی ماژول', sortable: true, type: 'integer' },
            {
                name: 'virtual_CmsModule.Title',
                displayName: 'عنوان',
                sortable: true,
                type: 'string',
                displayForce: true
            },
            { name: 'LinkCmsSiteCategoryId', displayName: 'کد سیستمی دسته سایت', sortable: true, type: 'integer' },
            {
                name: 'virtual_CmsSiteCategory.Title',
                displayName: 'آدرس پایه',
                sortable: true,
                type: 'string',
                displayForce: true
            }
        ],
        data: {},
        multiSelect: false,
        advancedSearchData: {
            engine: {
                CurrentPageNumber: 1,
                SortColumn: "Id",
                SortType: 0,
                NeedToRunFakePagination: false,
                TotalRowData: 2000,
                RowPerPage: 200,
                ContentFullSearch: null,
                Filters: [],
                Count: false
            }
        }
    }

    cmsSiteCategoryCmsModule.gridOptions.onRowSelected = function() {}

    cmsSiteCategoryCmsModule.gridOptions.reGetAll = function() {
        cmsSiteCategoryCmsModule.init();
    }

    cmsSiteCategoryCmsModule.filterEnumSiteCategory = function(id) {
        for (var j = 0; j < cmsSiteCategoryCmsModule.CategoryListItems.length; j++) {
            if (id == cmsSiteCategoryCmsModule.CategoryListItems[j].Id) {
                return cmsSiteCategoryCmsModule.CategoryListItems[j];
            }
        }
    }

    cmsSiteCategoryCmsModule.filterEnumOwnerSiteSetStatus = function(ListItemsOrItem) {
        if (!ListItemsOrItem.length) { // It's an Item
            for (var j = 0; j < cmsSiteCategoryCmsModule.OwnerSiteSetStatusListItems.length; j++) {
                if (ListItemsOrItem.OwnerSiteSetStatus == cmsSiteCategoryCmsModule.OwnerSiteSetStatusListItems[j].Id) {
                    ListItemsOrItem.OwnerSiteSetStatusTitle = cmsSiteCategoryCmsModule.OwnerSiteSetStatusListItems[j].Title;
                }
            }
        } else { // It's a Listitems
            for (var i = 0; i < ListItemsOrItem.length; i++) {
                for (var j = 0; j < cmsSiteCategoryCmsModule.OwnerSiteSetStatusListItems.length; j++) {
                    if (ListItemsOrItem[i].OwnerSiteSetStatus == cmsSiteCategoryCmsModule.OwnerSiteSetStatusListItems[j].Id) {
                        ListItemsOrItem[i].OwnerSiteSetStatusTitle = cmsSiteCategoryCmsModule.OwnerSiteSetStatusListItems[j].Title;
                    }
                }
            }
        }
    }

    //#formBuilder
    cmsSiteCategoryCmsModule.openPreviewModal = function(module, formName, configName) {
        cmsSiteCategoryCmsModule.modalTitle = $('#' + configName).attr("title");
        cmsSiteCategoryCmsModule.configName = configName;
        cmsSiteCategoryCmsModule.formName = formName;
        // Get selected Layout to load form using JsonFormFormat in ViewModel
        var model = { Filters: [] };
        model.Filters.push({ PropertyName: "LinkModuleId", SearchType: 0, value: parseInt(module.Id) });
        model.Filters.push({ PropertyName: "LinkSiteId", SearchType: 0, value: parseInt(cmsSiteCategoryCmsModule.gridOptions.selectedRow.item.Id) });
        cmsSiteCategoryCmsModule.busyIndicator.isActive = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'CoreModuleSite/', model, 'POST').success(function(response) {
            cmsSiteCategoryCmsModule.busyIndicator.isActive = false;
            cmsSiteCategoryCmsModule.cmsModuleSite = response.Item;
            cmsSiteCategoryCmsModule.formJson = $builder.forms['default'];
            $builder.removeAllFormObject('default');
            var component = $.parseJSON(module[formName]);
            var values = [];
            if (cmsSiteCategoryCmsModule.cmsModuleSite[configName] != null && cmsSiteCategoryCmsModule.cmsModuleSite[configName] != "") {
                values = $.parseJSON(cmsSiteCategoryCmsModule.cmsModuleSite[configName]);
                if (component != null && component.length != undefined)
                    $.each(component, function(i, item) {
                        try {
                            $builder.addFormObject('default', item);
                            //بارگذاری مقادیر براساس نام فیلد
                            if (values != null && values.length != undefined)
                                $.each(values, function(iValue, itemValue) {
                                    if (item.fieldname == itemValue.fieldname)
                                        cmsSiteCategoryCmsModule.defaultValue[i] = itemValue.value;
                                });
                        } catch (e) {}
                    });
                $modal.open({
                    templateUrl: 'cpanelv1/CmsModules/Core/CmsSiteCategoryCmsModule/preview.html',
                    scope: $scope
                });
            }
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }

    cmsSiteCategoryCmsModule.saveSubmitValues = function() {
        cmsSiteCategoryCmsModule.busyIndicator.isActive = true;
        cmsSiteCategoryCmsModule.addRequested = true;
        cmsSiteCategoryCmsModule.cmsModuleSite[cmsSiteCategoryCmsModule.configName] = $.trim(angular.toJson(cmsSiteCategoryCmsModule.submitValue));
        ajax.call(cmsServerConfig.configApiServerPath + 'CoreModuleSite/', cmsSiteCategoryCmsModule.cmsModuleSite, "PUT").success(function(response) {
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                cmsSiteCategoryCmsModule.closeModal();
            }
            cmsSiteCategoryCmsModule.busyIndicator.isActive = false;
            cmsSiteCategoryCmsModule.addRequested = false;
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            cmsSiteCategoryCmsModule.busyIndicator.isActive = false;
        });

    }
    //End of formBuilder

    //Export Report 
    cmsSiteCategoryCmsModule.exportFile = function() {
        cmsSiteCategoryCmsModule.addRequested = true;
        cmsSiteCategoryCmsModule.gridOptions.advancedSearchData.engine.ExportFile = cmsSiteCategoryCmsModule.ExportFileClass;
        ajax.call(cmsServerConfig.configApiServerPath + 'CoreSiteCategoryCmsModule/exportfile', cmsSiteCategoryCmsModule.gridOptions.advancedSearchData.engine, 'POST').success(function(response) {
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                cmsSiteCategoryCmsModule.exportDownloadLink = window.location.origin + response.LinkFile;
                $window.open(response.LinkFile, '_blank');
                //cmsSiteCategoryCmsModule.closeModal();
            }
            cmsSiteCategoryCmsModule.addRequested = false;
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }
    //Open Export Report Modal
    cmsSiteCategoryCmsModule.toggleExportForm = function() {
        cmsSiteCategoryCmsModule.SortType = [
            { key: 'نزولی', value: 0 },
            { key: 'صعودی', value: 1 },
            { key: 'تصادفی', value: 3 }
        ];
        cmsSiteCategoryCmsModule.EnumExportFileType = [
            { key: 'Excel', value: 1 },
            { key: 'PDF', value: 2 },
            { key: 'Text', value: 3 }
        ];
        cmsSiteCategoryCmsModule.EnumExportReceiveMethod = [
            { key: 'دانلود', value: 0 },
            { key: 'ایمیل', value: 1 },
            { key: 'فایل منیجر', value: 3 }
        ];
        cmsSiteCategoryCmsModule.ExportFileClass = { FileType: 1, RecieveMethod: 0, RowCount: 100 };
        cmsSiteCategoryCmsModule.exportDownloadLink = null;
        $modal.open({
            templateUrl: 'cpanelv1/CmsModules/Core/CmsSiteCategoryCmsModule/report.html',
            scope: $scope
        });
    }
    //Row Count Export Input Change
    cmsSiteCategoryCmsModule.rowCountChanged = function() {
        if (!angular.isDefined(cmsSiteCategoryCmsModule.ExportFileClass.RowCount) || cmsSiteCategoryCmsModule.ExportFileClass.RowCount > 5000)
            cmsSiteCategoryCmsModule.ExportFileClass.RowCount = 5000;
    }
    //Get TotalRowCount
    cmsSiteCategoryCmsModule.getCount = function() {
        ajax.call(cmsServerConfig.configApiServerPath + "CoreSiteCategoryCmsModule/count", cmsSiteCategoryCmsModule.gridOptions.advancedSearchData.engine, 'POST').success(function(response) {
            rashaErManage.checkAction(response);
            cmsSiteCategoryCmsModule.ListItemsTotalRowCount = ': ' + response.TotalRowCount;
        }).error(function(data, errCode, c, d) {
            cmsSiteCategoryCmsModule.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    }
}]);