﻿app.controller("emailOutBoxContentCtrl", ["$scope", "$http", "ajax", 'rashaErManage', '$modal', '$modalStack', 'SweetAlert', '$window', '$builder', '$state', '$filter', function ($scope, $http, ajax, rashaErManage, $modal, $modalStack, sweetAlert, $window, $builder, $state, $filter) {
    var emailOutBoxContent = this;
    emailOutBoxContent.ManageUserAccessControllerTypes = [];

    emailOutBoxContent.busyIndicator = {
        isActive: true,
        message: "در حال بار گذاری ..."
    }
    var buttonIsPressed = false; // برای جلوگیری از فشرده شدن چندباره دکمه ها
    var todayDate = moment().format();
    emailOutBoxContent.RegisterDate = {
        defaultDate: todayDate
    }

    emailOutBoxContent.SendDate = {
        defaultDate: todayDate
    }

    if (itemRecordStatus != undefined) emailOutBoxContent.itemRecordStatus = itemRecordStatus;
//#Help سلکتور برای انتخاب کاربر
    emailOutBoxContent.LinkCmsUserIdSelector = {
        displayMember: 'Username',
        id: 'Id',
        fId: 'LinkCmsUserId',
        url: 'coreuser',
        sortColumn: 'Id',
        //onSelectionChanged: emailOutBoxContent.selectionChangedUser,
        sortType: 0,
        filterText: 'LinkCmsUserId',
        rowPerPage: 200,
        scope: emailOutBoxContent,
        columnOptions: {
            columns: [
                { name: 'Id', displayName: 'کد سیستمی', sortable: true, type: 'integer', visible: true },
                { name: 'Username', displayName: 'Username', sortable: true, type: 'string', visible: true },
            ]
        }
    }
    emailOutBoxContent.init = function () {
        emailOutBoxContent.busyIndicator.isActive = true;
        emailOutBoxContent.gridOptions.advancedSearchData.engine.RowPerPage = 20;
        emailOutBoxContent.gridOptions.advancedSearchData.engine.AccessLoad = true;
        ajax.call(cmsServerConfig.configApiServerPath+"emailOutBoxContent/getall", emailOutBoxContent.gridOptions.advancedSearchData.engine, 'POST').success(function (response) {
            rashaErManage.checkAction(response);
            emailOutBoxContent.ListItems = response.ListItems;
            emailOutBoxContent.gridOptions.fillData(emailOutBoxContent.ListItems, response.Access);
            emailOutBoxContent.gridOptions.currentPageNumber = response.CurrentPageNumber;
            emailOutBoxContent.gridOptions.totalRowCount = response.TotalRowCount;
            emailOutBoxContent.gridOptions.rowPerPage = response.RowPerPage;
            emailOutBoxContent.gridOptions.maxSize = 5;
            var model = {};
            model.SortType = 0;
            model.SortColumn = "Id";
            emailOutBoxContent.busyIndicator.isActive = false;
        }).error(function (data, errCode, c, d) {
            emailOutBoxContent.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    }
  
    emailOutBoxContent.dataForTheTree = [];


    emailOutBoxContent.closeModal = function () {
        $modalStack.dismissAll();
    };

    emailOutBoxContent.replaceItem = function (oldId, newItem) {
        angular.forEach(emailOutBoxContent.ListItems, function (item, key) {
            if (item.Id == oldId) {
                var index = emailOutBoxContent.ListItems.indexOf(item);
                emailOutBoxContent.ListItems.splice(index, 1);
            }
        });
        if (newItem)
            emailOutBoxContent.ListItems.unshift(newItem);
    }

   /* emailOutBoxContent.deleteRow = function () {
        if (buttonIsPressed) { return };
        if (!emailOutBoxContent.gridOptions.selectedRow.item) {
            rashaErManage.showMessage($filter('translatentk')('Please_Select_A_Row_To_Remove'));
            return;
        }
        rashaErManage.showYesNo(($filter('translatentk')('warning')), ($filter('translatentk')('do_you_want_to_delete_this_attribute')), function (isConfirmed) {
            if (isConfirmed) {
                buttonIsPressed = true;
                ajax.call(cmsServerConfig.configApiServerPath+'emailOutBoxContent/', emailOutBoxContent.gridOptions.selectedRow.item.Id, 'GET').success(function (response) {
                    buttonIsPressed = false;
                    rashaErManage.checkAction(response);
                    emailOutBoxContent.selectedItemForDelete = response.Item;
                    ajax.call(cmsServerConfig.configApiServerPath+'emailOutBoxContent/', emailOutBoxContent.selectedItemForDelete.Id, 'DELETE').success(function (res) {
                        rashaErManage.checkAction(res);
                        if (res.IsSuccess) {
                            emailOutBoxContent.replaceItem(emailOutBoxContent.selectedItemForDelete.Id);
                            emailOutBoxContent.gridOptions.fillData(emailOutBoxContent.ListItems);
                        }
                    }).error(function (data2, errCode2, c2, d2) {
                        rashaErManage.checkAction(data2);
                    });
                }).error(function (data, errCode, c, d) {
                    rashaErManage.checkAction(data, errCode);
                });
            }
        });
    }*/

    emailOutBoxContent.searchData = function () {
        emailOutBoxContent.gridOptions.serachData();
    }

    emailOutBoxContent.gridOptions = {
        columns: [
            { name: 'Id', displayName: 'کد سیستمی', sortable: true, type: 'integer' },
            { name: 'LinkSiteId', displayName: 'کد سیستمی سایت', sortable: true, type: 'integer', visible: true },
            { name: 'CreatedDate', displayName: 'ساخت', sortable: true, isDate: true, type: 'date', visible: 'true' },
            { name: 'UpdatedDate', displayName: 'ویرایش', sortable: true, isDate: true, type: 'date', visible: 'true' },
            { name: 'Subject', displayName: 'Subject', sortable: true, type: 'string' },
            { name: 'Sender', displayName: 'Sender', sortable: true, type: 'string' },
            { name: 'ActionKey', displayName: 'تنظیمات', sortable: true, type: 'string', displayForce: true, template: '<button class="btn btn-success" ng-click="emailOutBoxContent.goToOutBoxReciver(x.Id)"><i class="fa fa-cog" aria-hidden="false"></i>&nbsp;گیرنده های ارسال</button>' }
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

    emailOutBoxContent.gridOptions.reGetAll = function () {
        emailOutBoxContent.init();
    }
    emailOutBoxContent.goToOutBoxReciver = function (selectedId) {
        $state.go("index.emailoutboxreciver", { OutBoxContentId: selectedId });
    }
    emailOutBoxContent.gridOptions.onRowSelected = function () { }
    emailOutBoxContent.columnCheckbox = false;
    emailOutBoxContent.openGridConfigModal = function () {
        $("#gridView-btn").toggleClass("active");
        if (emailOutBoxContent.gridOptions.columnCheckbox) {
            for (var i = 0; i < emailOutBoxContent.gridOptions.columns.length; i++) {
                //emailOutBoxContent.gridOptions.columns[i].visible = $("#" + emailOutBoxContent.gridOptions.columns[i].Id + "Checkbox").is(":checked");
                var element = $("#" + emailOutBoxContent.gridOptions.columns[i].name.replace('.', '') + "Checkbox");
                //var temp = element[0].checked;
                emailOutBoxContent.gridOptions.columns[i].visible = element[0].checked;
            }
        }
        else {
            var prechangeColumns = emailOutBoxContent.gridOptions.columns;
            for (var i = 0; i < emailOutBoxContent.gridOptions.columns.length; i++) {
                emailOutBoxContent.gridOptions.columns[i].visible = true;
                var element = $("#" + emailOutBoxContent.gridOptions.columns[i].name.replace('.', '') + "Checkbox");
                $("#" + emailOutBoxContent.gridOptions.columns[i].name + "Checkbox").checked = prechangeColumns[i].visible;
            }
        }
        for (var i = 0; i < emailOutBoxContent.gridOptions.columns.length; i++) {
            console.log(emailOutBoxContent.gridOptions.columns[i].name.concat(".visible: "), emailOutBoxContent.gridOptions.columns[i].visible);
        }
        emailOutBoxContent.gridOptions.columnCheckbox = !emailOutBoxContent.gridOptions.columnCheckbox;
    }
    //Export Report 
    emailOutBoxContent.exportFile = function () {
        emailOutBoxContent.addRequested = true;
        emailOutBoxContent.gridOptions.advancedSearchData.engine.ExportFile = emailOutBoxContent.ExportFileClass;
        ajax.call(cmsServerConfig.configApiServerPath+'CoreSite/exportfile', emailOutBoxContent.gridOptions.advancedSearchData.engine, 'POST').success(function (response) {
            emailOutBoxContent.addRequested = false;
            rashaErManage.checkAction(response);
            emailOutBoxContent.reportDownloadLink = response.LinkFile;
            if (response.IsSuccess) {
                $window.open(response.LinkFile, '_blank');
                //emailOutBoxContent.closeModal();
            }
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }
    //Open Export Report Modal
    emailOutBoxContent.toggleExportForm = function () {
        emailOutBoxContent.SortType = [
            { key: 'نزولی', value: 0 },
            { key: 'صعودی', value: 1 },
            { key: 'تصادفی', value: 3 }
        ];
        emailOutBoxContent.EnumExportFileType = [
            { key: 'Excel', value: 1 },
            { key: 'PDF', value: 2 },
            { key: 'Text', value: 3 }
        ];
        emailOutBoxContent.EnumExportReceiveMethod = [
            { key: 'دانلود', value: 0 },
            { key: 'ایمیل', value: 1 },
            { key: 'فایل منیجر', value: 3 }
        ];
        emailOutBoxContent.ExportFileClass = { FileType: 1, RecieveMethod: 0, RowCount: 100 };
        $modal.open({
            templateUrl: 'cpanelv1/CmsModules/Email/emailOutBoxContent/report.html',
            scope: $scope
        });
    }
    //Row Count Export Input Change
    emailOutBoxContent.rowCountChanged = function () {
        if (!angular.isDefined(emailOutBoxContent.ExportFileClass.RowCount) || emailOutBoxContent.ExportFileClass.RowCount > 5000)
            emailOutBoxContent.ExportFileClass.RowCount = 5000;
    }
    //Get TotalRowCount
    emailOutBoxContent.getCount = function () {
        emailOutBoxContent.addRequested = true;
        ajax.call(cmsServerConfig.configApiServerPath+"emailOutBoxContent/count", emailOutBoxContent.gridOptions.advancedSearchData.engine, 'POST').success(function (response) {
            emailOutBoxContent.addRequested = false;
            rashaErManage.checkAction(response);
            emailOutBoxContent.ListItemsTotalRowCount = ': ' + response.TotalRowCount;
        }).error(function (data, errCode, c, d) {
            emailOutBoxContent.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    }

    emailOutBoxContent.openBaseConfigModal = function (selectedId) {
        emailOutBoxContent.defaultValue = {};
        $builder.removeAllFormObject('default');
        // var engine = { Filters: [{ PropertyName: "Id", value: selectedId }] };
        emailOutBoxContent.addRequested = true;
        ajax.call(cmsServerConfig.configApiServerPath+"emailOutBoxContent/getonewithjsonformatter", selectedId, 'GET').success(function (response) {
            emailOutBoxContent.addRequested = false;
            if (response.IsSuccess) {
                emailOutBoxContent.selectedItem = response.Item;
                $modal.open({
                    templateUrl: 'cpanelv1/CmsModules/Email/emailOutBoxContent/preview.html',
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
                                        emailOutBoxContent.defaultValue[i] = itemValue.value;
                                });
                            }
                        }
                    });
                }
            }
        }).error(function (data, errCode, c, d) {
            emailOutBoxContent.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    }

    emailOutBoxContent.saveSubmitValues = function () {
        emailOutBoxContent.busyIndicator.isActive = true;
        emailOutBoxContent.addRequested = true;
        //todo: karavi
        // emailOutBoxContent.selectedItem.PublicConfigJsonValues = $.trim(angular.toJson(emailOutBoxContent.submitValue));
        ajax.call(cmsServerConfig.configApiServerPath+'emailOutBoxContent/', emailOutBoxContent.selectedItem, "PUT").success(function (response) {
            rashaErManage.checkAction(response);
            emailOutBoxContent.busyIndicator.isActive = false;
            emailOutBoxContent.addRequested = false;
            emailOutBoxContent.closeModal();
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            emailOutBoxContent.busyIndicator.isActive = false;
            emailOutBoxContent.addRequested = false;
        });
    }

    emailOutBoxContent.goToPrivateConfig = function (selectedId) {
        $state.go("index.emailOutBoxContentdetail", { emailOutBoxContentId: selectedId });
    }

    //TreeControl
    emailOutBoxContent.treeOptions = {
        nodeChildren: "Children",
        multiSelection: false,
        isLeaf: function (node) {
            if (node.FileName == undefined || node.Filename == "")
                return false;
            return true;
        },
        dirSelectable: true
    }
    emailOutBoxContent.onNodeToggle = function (node, expanded) {
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
    emailOutBoxContent.onSelection = function (node, selected) {
        if (!selected) {
            emailOutBoxContent.selectedItem.LinkModuleFileLogoId = null;
            emailOutBoxContent.selectedItem.previewImageSrc = null;
            return;
        }
        emailOutBoxContent.selectedItem.LinkModuleFileLogoId = node.Id;
        emailOutBoxContent.selectedItem.previewImageSrc = cmsServerConfig.configCpanelImages+"loader.gif";
        ajax.call(cmsServerConfig.configApiServerPath+"FileContent/", node.Id, "GET").success(function (response) {
            emailOutBoxContent.selectedItem.previewImageSrc = cmsServerConfig.configPathFileByIdAndName + response.Item.Id + "/" + response.Item.FileName;
        }).error(function (data, errCode, c, d) {
            console.log(data);
        });
    }
    //End of TreeControl
}]);