app.controller("coreModuleRelationshipContentController", ["$scope", "$http", "ajax", 'rashaErManage', '$modal', '$modalStack', 'SweetAlert', '$window', '$filter', function ($scope, $http, ajax, rashaErManage, $modal, $modalStack, sweetAlert, $window, $filter) {
    var coreModuleRelationship = this;
    var listforDel=[];
    coreModuleRelationship.init = function () {
        //coreModuleRelationship.LoadingBusyIndicator.isActive = true;
        var engine = {};
        try {
            engine = coreModuleRelationship.gridOptions.advancedSearchData.engine;
        } catch (error) {
            console.log(error);
        }

        ajax.call(cmsServerConfig.configApiServerPath+"CoreModuleRelationshipContent/getall", engine, 'POST').success(function (response) {
            rashaErManage.checkAction(response);
        angular.forEach( response.ListItems, function (item, key) {
                item.isChecked=false
            });    
        coreModuleRelationship.ListItems = response.ListItems;
    
            coreModuleRelationship.gridOptions.fillData(coreModuleRelationship.ListItems , response.Access);
            coreModuleRelationship.gridOptions.currentPageNumber = response.CurrentPageNumber;
            coreModuleRelationship.gridOptions.totalRowCount = response.TotalRowCount;
            coreModuleRelationship.gridOptions.rowPerPage = response.RowPerPage;
        }).error(function (data, errCode, c, d) {
            coreModuleRelationship.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    }

    coreModuleRelationship.closeModal = function () {
        $modalStack.dismissAll();
    };

    coreModuleRelationship.replaceItem = function (oldId, newItem) {
        angular.forEach(coreModuleRelationship.ListItems, function (item, key) {
            if (item.Id == oldId) {
                var index = coreModuleRelationship.ListItems.indexOf(item);
                coreModuleRelationship.ListItems.splice(index, 1);
            }
        });
        if (newItem)
            coreModuleRelationship.ListItems.unshift(newItem);
    }


    coreModuleRelationship.deleteRow = function () {
        if (!coreModuleRelationship.gridOptions.selectedRow.item) {
            rashaErManage.showMessage($filter('translatentk')('Please_Select_A_Row_To_Remove'));
            return;
        }
        rashaErManage.showYesNo(($filter('translatentk')('warning')), ($filter('translatentk')('do_you_want_to_delete_this_attribute')), function (isConfirmed) {
            if (isConfirmed) {
                console.log(coreModuleRelationship.gridOptions.selectedRow.item);
                ajax.call(cmsServerConfig.configApiServerPath+'CoreModuleRelationshipContent/', coreModuleRelationship.gridOptions.selectedRow.item.Id, 'GET').success(function (response) {
                    rashaErManage.checkAction(response);
                    coreModuleRelationship.selectedItemForDelete = response.Item;
                    console.log(coreModuleRelationship.selectedItemForDelete);
                    ajax.call(cmsServerConfig.configApiServerPath+'CoreModuleRelationshipContent/', coreModuleRelationship.selectedItemForDelete.Id, 'DELETE').success(function (res) {
                        rashaErManage.checkAction(res);
                        if (res.IsSuccess) {
                            coreModuleRelationship.replaceItem(coreModuleRelationship.selectedItemForDelete.Id);
                            coreModuleRelationship.gridOptions.fillData(coreModuleRelationship.ListItems);
                        }

                    }).error(function (data2, errCode2, c2, d2) {
                        rashaErManage.checkAction(data2);
                    });
                }).error(function (data, errCode, c, d) {
                    rashaErManage.checkAction(data, errCode);
                });
            }
        });


    }

    coreModuleRelationship.searchData = function () {
        coreModuleRelationship.gridOptions.serachData();
    }

    coreModuleRelationship.gridOptions = {
        columns: [
            { name: 'Id', displayName: 'کد سیستمی', sortable: true },
            { name: 'CurrentSiteId', displayName: 'کد سیستمی سایت', sortable: true },
            { name: 'Title', displayName: 'عنوان', sortable: true },
            { name: 'LinkModuleContentIdMain', displayName: 'از', sortable: true, isDate: true },
            { name: 'LinkModuleContentIdOther', displayName: 'به', sortable: true },
            //{ name: 'LinkLinkUserTypeId.LinkUserType', displayName: 'نوع کاربر', sortable: true },
        ],
        data: {},
        multiSelect: false,
        advancedSearchData: {
            engine: {}
        }
    }

    coreModuleRelationship.gridOptions.advancedSearchData = {};
    coreModuleRelationship.gridOptions.advancedSearchData.engine = {};
    coreModuleRelationship.gridOptions.advancedSearchData.engine.CurrentPageNumber = 1;
    coreModuleRelationship.gridOptions.advancedSearchData.engine.SortColumn = "Id";
    coreModuleRelationship.gridOptions.advancedSearchData.engine.SortType = 1;
    coreModuleRelationship.gridOptions.advancedSearchData.engine.NeedToRunFakePagination = false;
    coreModuleRelationship.gridOptions.advancedSearchData.engine.TotalRowData = 2000;
    coreModuleRelationship.gridOptions.advancedSearchData.engine.RowPerPage = 20;
    coreModuleRelationship.gridOptions.advancedSearchData.engine.ContentFullSearch = null;
    coreModuleRelationship.gridOptions.advancedSearchData.engine.Filters = [];

    
    coreModuleRelationship.openDateRequestDate = function ($event) {
        $event.preventDefault();
        $event.stopPropagation();

        $timeout(function () {
            coreModuleRelationship.focusRequestDate = true;
        });
    };

    coreModuleRelationship.gridOptions.reGetAll = function () {
        coreModuleRelationship.init();
    }
    //Export Report 
    coreModuleRelationship.exportFile = function () {
        coreModuleRelationship.addRequested = true;
        coreModuleRelationship.gridOptions.advancedSearchData.engine.ExportFile = coreModuleRelationship.ExportFileClass;
        ajax.call(cmsServerConfig.configApiServerPath+'CoreModuleRelationshipContent/exportfile', coreModuleRelationship.gridOptions.advancedSearchData.engine, 'POST').success(function (response) {
            coreModuleRelationship.addRequested = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                coreModuleRelationship.exportDownloadLink = window.location.origin + response.LinkFile;
                $window.open(response.LinkFile, '_blank');
                //coreModuleRelationship.closeModal();
            }
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }
    //Open Export Report Modal
    coreModuleRelationship.toggleExportForm = function () {
        coreModuleRelationship.SortType = [
            { key: 'نزولی', value: 0 },
            { key: 'صعودی', value: 1 },
            { key: 'تصادفی', value: 3 }
        ];
        coreModuleRelationship.EnumExportFileType = [
            { key: 'Excel', value: 1 },
            { key: 'PDF', value: 2 },
            { key: 'Text', value: 3 }
        ];
        coreModuleRelationship.EnumExportReceiveMethod = [
            { key: 'دانلود', value: 0 },
            { key: 'ایمیل', value: 1 },
            { key: 'فایل منیجر', value: 3 }
        ];
        coreModuleRelationship.ExportFileClass = { FileType: 1, RecieveMethod: 0, RowCount: 100 };
        coreModuleRelationship.exportDownloadLink = null;
        $modal.open({
            templateUrl: 'cpanelv1/CmsModules/Core/CoreModuleRelationship/report.html',
            scope: $scope
        });
    }
    //Row Count Export Input Change
    coreModuleRelationship.rowCountChanged = function () {
        if (!angular.isDefined(coreModuleRelationship.ExportFileClass.RowCount) || coreModuleRelationship.ExportFileClass.RowCount > 5000)
            coreModuleRelationship.ExportFileClass.RowCount = 5000;
    }
    //Get TotalRowCount
    coreModuleRelationship.getCount = function () {
        ajax.call(cmsServerConfig.configApiServerPath+"CoreModuleRelationshipContent/count", coreModuleRelationship.gridOptions.advancedSearchData.engine, 'POST').success(function (response) {
            coreModuleRelationship.addRequested = false;
            rashaErManage.checkAction(response);
            coreModuleRelationship.ListItemsTotalRowCount = ': ' + response.TotalRowCount;
        }).error(function (data, errCode, c, d) {
            coreModuleRelationship.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    }
}]);