app.controller("emailOutBoxReciverLockController", ["$scope", "$http", "ajax", 'rashaErManage', '$modal', '$modalStack', 'SweetAlert', '$window', '$builder', '$state', '$filter', function ($scope, $http, ajax, rashaErManage, $modal, $modalStack, sweetAlert, $window, $builder, $state, $filter) {
    var emailOutBoxReciverLock = this;
    emailOutBoxReciverLock.ManageUserAccessControllerTypes = [];

    emailOutBoxReciverLock.busyIndicator = {
        isActive: true,
        message: "در حال بار گذاری ..."
    }
    var buttonIsPressed = false; // برای جلوگیری از فشرده شدن چندباره دکمه ها

    if (itemRecordStatus != undefined) emailOutBoxReciverLock.itemRecordStatus = itemRecordStatus;

    emailOutBoxReciverLock.init = function () {
        emailOutBoxReciverLock.busyIndicator.isActive = true;
        emailOutBoxReciverLock.gridOptions.advancedSearchData.engine.RowPerPage = 20;
        emailOutBoxReciverLock.gridOptions.advancedSearchData.engine.AccessLoad = true;
        ajax.call(cmsServerConfig.configApiServerPath+"emailOutBoxReciverLock/getall", emailOutBoxReciverLock.gridOptions.advancedSearchData.engine, 'POST').success(function (response) {
            rashaErManage.checkAction(response);
            emailOutBoxReciverLock.ListItems = response.ListItems;
            emailOutBoxReciverLock.gridOptions.fillData(emailOutBoxReciverLock.ListItems, response.Access);
            emailOutBoxReciverLock.gridOptions.currentPageNumber = response.CurrentPageNumber;
            emailOutBoxReciverLock.gridOptions.totalRowCount = response.TotalRowCount;
            emailOutBoxReciverLock.gridOptions.rowPerPage = response.RowPerPage;
            emailOutBoxReciverLock.gridOptions.maxSize = 5;
            var model = {};
            model.SortType = 0;
            model.SortColumn = "Id";
            emailOutBoxReciverLock.busyIndicator.isActive = false;
        }).error(function (data, errCode, c, d) {
            emailOutBoxReciverLock.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    }
    emailOutBoxReciverLock.addRequested = false;
   /* emailOutBoxReciverLock.openAddModal = function () {
        if (buttonIsPressed) { return };
        emailOutBoxReciverLock.modalTitle = 'اضافه';
        buttonIsPressed = true;
        ajax.call(cmsServerConfig.configApiServerPath+'emailOutBoxReciverLock/ViewModel', '', 'GET').success(function (response) {
            buttonIsPressed = false;
            rashaErManage.checkAction(response);
            emailOutBoxReciverLock.selectedItem = response.Item;
            $modal.open({
                templateUrl: 'cpanelv1/CmsModules/Email/emailOutBoxReciverLock/add.html',
                scope: $scope
            });

        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }

    emailOutBoxReciverLock.addNewRow = function (frm) {
        if (frm.$invalid)
        {
            rashaErManage.showMessage($filter('translatentk')('form_values_full_have_not_been_entered'));
            return;
        }
        emailOutBoxReciverLock.addRequested = true;
        emailOutBoxReciverLock.busyIndicator.isActive = true;
        ajax.call(cmsServerConfig.configApiServerPath+'emailOutBoxReciverLock/', emailOutBoxReciverLock.selectedItem, 'POST').success(function (response) {
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                emailOutBoxReciverLock.ListItems.unshift(response.Item);
                emailOutBoxReciverLock.gridOptions.fillData(emailOutBoxReciverLock.ListItems);
                emailOutBoxReciverLock.addRequested = false;
                emailOutBoxReciverLock.busyIndicator.isActive = false;
                emailOutBoxReciverLock.closeModal();
            }
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            emailOutBoxReciverLock.addRequested = false;
            emailOutBoxReciverLock.busyIndicator.isActive = false;

        });
    }

    emailOutBoxReciverLock.autoAdd = function () {
        emailOutBoxReciverLock.busyIndicator.isActive = true;
        ajax.call(cmsServerConfig.configApiServerPath+'emailOutBoxReciverLock/autoadd', { LinkSourceId: emailOutBoxReciverLock.selectedSourceId }, 'POST').success(function (response) {
            rashaErManage.checkAction(response);
            emailOutBoxReciverLock.busyIndicator.isActive = false;
            emailOutBoxReciverLock.init();
        }).error(function (data, errCode, c, d) {
            emailOutBoxReciverLock.busyIndicator.isActive = false;
            rashaErManage.checkAction(data, errCode);
        });
    }*/

    emailOutBoxReciverLock.dataForTheTree = [];

    emailOutBoxReciverLock.closeModal = function () {
        $modalStack.dismissAll();
    };

    emailOutBoxReciverLock.replaceItem = function (oldId, newItem) {
        angular.forEach(emailOutBoxReciverLock.ListItems, function (item, key) {
            if (item.Id == oldId) {
                var index = emailOutBoxReciverLock.ListItems.indexOf(item);
                emailOutBoxReciverLock.ListItems.splice(index, 1);
            }
        });
        if (newItem)
            emailOutBoxReciverLock.ListItems.unshift(newItem);
    }


    emailOutBoxReciverLock.searchData = function () {
        emailOutBoxReciverLock.gridOptions.serachData();
    }

    emailOutBoxReciverLock.gridOptions = {
        columns: [
            { name: 'Id', displayName: 'کد سیستمی', sortable: true, type: 'integer' },
            { name: 'LinkSiteId', displayName: 'کد سیستمی سایت', sortable: true, type: 'integer', visible: true },
            { name: 'CreatedDate', displayName: 'ساخت', sortable: true, isDate: true, type: 'date', visible: 'true' },
            { name: 'UpdatedDate', displayName: 'ویرایش', sortable: true, isDate: true, type: 'date', visible: 'true' },
            { name: 'Title', displayName: 'عنوان', sortable: true, type: 'string' },
            { name: 'ClassName', displayName: 'عنوان کلاس', sortable: true, type: 'string' },
            { name: 'PublicConfigJsonValues', displayName: 'تنظیمات', sortable: true, type: 'string', displayForce: true, template: '<button class="btn btn-success" ng-click="emailOutBoxReciverLock.goToPrivateConfig(x.Id)"><i class="fa fa-cog" aria-hidden="false"></i>&nbsp;اختصاصی</button>' }
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
                RowPerPage: 20,
                ContentFullSearch: null,
                Filters: [],
                Count: false

            }
        }
    }

    emailOutBoxReciverLock.gridOptions.reGetAll = function () {
        emailOutBoxReciverLock.init();
    }

    emailOutBoxReciverLock.gridOptions.onRowSelected = function () { }

    //Export Report 
    emailOutBoxReciverLock.exportFile = function () {
        emailOutBoxReciverLock.addRequested = true;
        emailOutBoxReciverLock.gridOptions.advancedSearchData.engine.ExportFile = emailOutBoxReciverLock.ExportFileClass;
        ajax.call(cmsServerConfig.configApiServerPath+'CoreSite/exportfile', emailOutBoxReciverLock.gridOptions.advancedSearchData.engine, 'POST').success(function (response) {
            emailOutBoxReciverLock.addRequested = false;
            rashaErManage.checkAction(response);
            emailOutBoxReciverLock.reportDownloadLink = response.LinkFile;
            if (response.IsSuccess) {
                $window.open(response.LinkFile, '_blank');
                //emailOutBoxReciverLock.closeModal();
            }
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }
    //Open Export Report Modal
    emailOutBoxReciverLock.toggleExportForm = function () {
        emailOutBoxReciverLock.SortType = [
            { key: 'نزولی', value: 0 },
            { key: 'صعودی', value: 1 },
            { key: 'تصادفی', value: 3 }
        ];
        emailOutBoxReciverLock.EnumExportFileType = [
            { key: 'Excel', value: 1 },
            { key: 'PDF', value: 2 },
            { key: 'Text', value: 3 }
        ];
        emailOutBoxReciverLock.EnumExportReceiveMethod = [
            { key: 'دانلود', value: 0 },
            { key: 'ایمیل', value: 1 },
            { key: 'فایل منیجر', value: 3 }
        ];
        emailOutBoxReciverLock.ExportFileClass = { FileType: 1, RecieveMethod: 0, RowCount: 100 };
        $modal.open({
            templateUrl: 'cpanelv1/CmsModules/Email/emailOutBoxReciverLock/report.html',
            scope: $scope
        });
    }
    //Row Count Export Input Change
    emailOutBoxReciverLock.rowCountChanged = function () {
        if (!angular.isDefined(emailOutBoxReciverLock.ExportFileClass.RowCount) || emailOutBoxReciverLock.ExportFileClass.RowCount > 5000)
            emailOutBoxReciverLock.ExportFileClass.RowCount = 5000;
    }
    //Get TotalRowCount
    emailOutBoxReciverLock.getCount = function () {
        emailOutBoxReciverLock.addRequested = true;
        ajax.call(cmsServerConfig.configApiServerPath+"emailOutBoxReciverLock/count", emailOutBoxReciverLock.gridOptions.advancedSearchData.engine, 'POST').success(function (response) {
            emailOutBoxReciverLock.addRequested = false;
            rashaErManage.checkAction(response);
            emailOutBoxReciverLock.ListItemsTotalRowCount = ': ' + response.TotalRowCount;
        }).error(function (data, errCode, c, d) {
            emailOutBoxReciverLock.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    }

    emailOutBoxReciverLock.openBaseConfigModal = function (selectedId) {
        emailOutBoxReciverLock.defaultValue = {};
        $builder.removeAllFormObject('default');
        // var engine = { Filters: [{ PropertyName: "Id", value: selectedId }] };
        emailOutBoxReciverLock.addRequested = true;
        ajax.call(cmsServerConfig.configApiServerPath+"emailOutBoxReciverLock/getonewithjsonformatter", selectedId, 'GET').success(function (response) {
            emailOutBoxReciverLock.addRequested = false;
            if (response.IsSuccess) {
                emailOutBoxReciverLock.selectedItem = response.Item;
                $modal.open({
                    templateUrl: 'cpanelv1/CmsModules/Email/emailOutBoxReciverLock/preview.html',
                    scope: $scope
                });
                $builder.removeAllFormObject('default');
                //var customizeValue = JSON.parse(response.Item.PublicConfigJsonValues);
                var customizeValue = response.Item.PublicConfigJsonFormatter;
                if (customizeValue != null && customizeValue.length > 0) {
                    $.each(customizeValue, function (i, item) {
                        if (item.FieldName != undefined && item.FieldName != null && item.FieldName != "") {
                            var fieldType = "";
                            if (item.FieldType == "System.Boolean") {
                                fieldType = "radio";
                                $builder.addFormObject('default', {
                                    "component": fieldType,
                                    "label": item.FieldTitle,
                                    "description": item.FieldDescription,
                                    "id": i,
                                    "fieldname": item.FieldName,
                                    "options": [
                                          "True",
                                          "False"
                                    ]
                                });
                            }
                            else {
                                fieldType = "text";
                                $builder.addFormObject('default', {
                                    "component": fieldType,
                                    "label": item.FieldTitle,
                                    "description": item.FieldDescription,
                                    "id": i,
                                    "fieldname": item.FieldName,
                                });
                            }
                            //تخصیص مقادیر فرم با تشخیص نام فیلد
                            if (response.Item.PublicConfigJsonValues != null && response.Item.PublicConfigJsonValues != "") {
                                values = $.parseJSON(response.Item.PublicConfigJsonValues);
                                $.each(values, function (iValue, itemValue) {
                                    if (item.FieldName == itemValue.fieldname)
                                        emailOutBoxReciverLock.defaultValue[i] = itemValue.value;
                                });
                            }
                        }
                    });
                }
            }
        }).error(function (data, errCode, c, d) {
            emailOutBoxReciverLock.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    }

    emailOutBoxReciverLock.saveSubmitValues = function () {
        emailOutBoxReciverLock.busyIndicator.isActive = true;
        emailOutBoxReciverLock.addRequested = true;
        emailOutBoxReciverLock.selectedItem.PublicConfigJsonValues = $.trim(angular.toJson(emailOutBoxReciverLock.submitValue));
        ajax.call(cmsServerConfig.configApiServerPath+'emailOutBoxReciverLock/', emailOutBoxReciverLock.selectedItem, "PUT").success(function (response) {
            rashaErManage.checkAction(response);
            emailOutBoxReciverLock.busyIndicator.isActive = false;
            emailOutBoxReciverLock.addRequested = false;
            emailOutBoxReciverLock.closeModal();
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            emailOutBoxReciverLock.busyIndicator.isActive = false;
            emailOutBoxReciverLock.addRequested = false;
        });
    }

    emailOutBoxReciverLock.goToPrivateConfig = function (selectedId) {
        $state.go("index.bankpaymentprivatesiteconfig", { emailOutBoxReciverLockId: selectedId });
    }

    //TreeControl
    emailOutBoxReciverLock.treeOptions = {
        nodeChildren: "Children",
        multiSelection: false,
        isLeaf: function (node) {
            if (node.FileName == undefined || node.Filename == "")
                return false;
            return true;
        },
        dirSelectable: true
    }
    emailOutBoxReciverLock.onNodeToggle = function (node, expanded) {
        if (expanded) {
            node.Children = [];
            var filterModel = { Filters: [] };
            var originalName = node.Title;
            node.messageText = " در حال بارگذاری...";
            filterModel.Filters.push({ PropertyName: "LinkParentId", SearchType: 0, value: node.Id });
            ajax.call(cmsServerConfig.configApiServerPath+"FileCategory/GetAll", filterModel, 'POST').success(function (response1) {
                angular.forEach(response1.ListItems, function (value, key) {
                    node.Children.push(value);
                });
                ajax.call(cmsServerConfig.configApiServerPath+"FileContent//GetFilesInCategoryId/"+node.Id,"", 'GET').success(function (response2) {
                    angular.forEach(response2.ListItems, function (value, key) {
                        node.Children.push(value);
                    });
                    node.messageText = "";
                }).error(function (data, errCode, c, d) {
                    console.log(data);
                });
            }).error(function (data, errCode, c, d) {
                console.log(data);
            });
        }
    }
    emailOutBoxReciverLock.onSelection = function (node, selected) {
        if (!selected) {
            emailOutBoxReciverLock.selectedItem.LinkModuleFileLogoId = null;
            emailOutBoxReciverLock.selectedItem.previewImageSrc = null;
            return;
        }
        emailOutBoxReciverLock.selectedItem.LinkModuleFileLogoId = node.Id;
        emailOutBoxReciverLock.selectedItem.previewImageSrc = cmsServerConfig.configCpanelImages+"loader.gif";
        ajax.call(cmsServerConfig.configApiServerPath+"FileContent/", node.Id, "GET").success(function (response) {
            emailOutBoxReciverLock.selectedItem.previewImageSrc = cmsServerConfig.configPathFileByIdAndName + response.Item.Id + "/" + response.Item.FileName;
        }).error(function (data, errCode, c, d) {
            console.log(data);
        });
    }
    //End of TreeControl
}]);