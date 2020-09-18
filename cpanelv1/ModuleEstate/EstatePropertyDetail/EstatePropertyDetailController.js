﻿app.controller("estatePropertyDetailController", ["$scope", "$http", "ajax", 'rashaErManage', '$modal', '$modalStack', 'SweetAlert', '$timeout', '$location', '$state', '$stateParams', '$window', '$filter', function ($scope, $http, ajax, rashaErManage, $modal, $modalStack, sweetAlert, $timeout, $location, $state, $stateParams, $window, $filter) {
    var estatePropertyDetail = this;
    //For Grid Options
    if (itemRecordStatus != undefined)
        estatePropertyDetail.itemRecordStatus = itemRecordStatus;
    estatePropertyDetail.inputTypeArray = [];
    estatePropertyDetail.gridOptions = {};
    estatePropertyDetail.selectedItem = {};
    estatePropertyDetail.attachedFiles = [];

    estatePropertyDetail.propertyTypeListItems = [];
    estatePropertyDetail.attachedFile = "";

    estatePropertyDetail.count = 0;
    //#help/ سلکتور دسته بندی در ویرایش محتوا
    estatePropertyDetail.LinkCategoryIdSelector = {
        displayMember: 'Title',
        id: 'Id',
        fId: 'LinkPropertyDetailGroupId',
        url: 'EstatePropertyDetailGroup',
        sortColumn: 'Id',
        sortType: 0,
        filterText: 'Title',
        showAddDialog: false,
        rowPerPage: 200,
        scope: estatePropertyDetail,
        columnOptions: {
            columns: [{
                    name: 'Id',
                    displayName: 'کد سیستمی',
                    sortable: true,
                    type: 'integer'
                },
                {
                    name: 'Title',
                    displayName: 'عنوان',
                    sortable: true,
                    type: 'string'
                }
            ]
        }
    }
    //EstatePropertyDetail Grid Options
    estatePropertyDetail.gridOptions = {
        columns: [{
                name: 'Id',
                displayName: 'کد سیستمی',
                sortable: true,
                type: 'integer'
            },
            {
                name: 'Title',
                displayName: 'عنوان',
                displayForce: true,
                sortable: true,
                type: 'string'
            },
            {
                name: 'InputDataType',
                displayForce: true,
                displayName: 'نوع ورودی',
                sortable: true,
                type: 'string'
            },
            {
                name: 'InvisibleForEndUser',
                displayName: 'Invisible For EndUser',
                sortable: true,
                displayForce: true,
                isCheckBox: true,
                type: 'boolean'
            },
            {
                name: 'InvisibleForSubmiter',
                displayName: 'Invisible For Submiter',
                sortable: true,
                displayForce: true,
                isCheckBox: true,
                type: 'boolean'
            },
            {
                name: 'Required',
                displayName: 'الزامی است؟',
                sortable: true,
                isCheckBox: true,
                displayForce: true,
                type: 'boolean'
            },
            {
                name: 'ShowInFormOrder',
                displayName: 'عدد ترتیب نمایش',
                sortable: true,
                displayForce: true,
                type: 'integer'
            },
            {
                name: 'ActionButton',
                displayName: 'ترتیب نمایش',
                sortable: true,
                type: 'string',
                displayForce: true,
                template: "<button class=\"btn btn-primary btn-circle\" type=\"button\" title=\"انتقال به بالا\" ng-click=\"estatePropertyDetail.editStepGoUp(x, $index)\" ng-show=\"x.LinkPropertyDetailGroupId != null\"><i class=\"glyphicon glyphicon-arrow-up\"  aria-hidden=\"true\" style=\"font-weight: bold;\" ></i></button>&nbsp<button class=\"btn btn-danger btn-circle\" title=\"انتقال به پایین\" ng-show=\"x.LinkPropertyDetailGroupId != null\" ng-click=\"estatePropertyDetail.editStepGoDown(x, $index)\"><i class=\"glyphicon glyphicon-arrow-down\"  aria-hidden=\"true\" ></i></button>"
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
                RowPerPage: 100,
                ContentFullSearch: null,
                Filters: []
            }
        }
    }

    //For Show Category Loading Indicator
    estatePropertyDetail.categorybusyIndicator = {
        isActive: true,
        message: "در حال بارگذاری دسته ها ..."
    }
    //For Show EstatePropertyDetail Loading Indicator
    estatePropertyDetail.busyIndicator = {
        isActive: false,
        message: "در حال بارگذاری ..."
    }
    //Tree Config
    estatePropertyDetail.treeConfig = {
        displayMember: 'Title',
        displayId: 'Id',
        displayChild: 'Children',
        Items: null
    };


    estatePropertyDetail.treeConfig.currentNode = {};
    estatePropertyDetail.treebusyIndicator = false;

    estatePropertyDetail.addRequested = false;

    estatePropertyDetail.estatePropertyDetailGroupListItems = [];
    estatePropertyDetail.PropertyType = [];

    estatePropertyDetail.Access = {};
    //init Function
    estatePropertyDetail.init = function () {
        estatePropertyDetail.categorybusyIndicator.isActive = true;
        ajax.call(cmsServerConfig.configApiServerPath + "EstatePropertyType/EnumUiPropertyDesign", "", 'GET').success(function (response) {
            estatePropertyDetail.UiDesignType = response.ListItems;
        }).error(function (data, errCode, c, d) {
            console.log(data);
        });

        ajax.call(cmsServerConfig.configApiServerPath + "EstatePropertyType/EnumInputDataType", "", 'GET').success(function (response) {
            estatePropertyDetail.inputTypeArray = response.ListItems;
        }).error(function (data, errCode, c, d) {
            console.log(data);
        });

        if ($stateParams.propertyParam != undefined && $stateParams.propertyParam != null)
            estatePropertyDetail.propertyTypeId = $stateParams.propertyParam;
        else
            $state.go("index.estatepropertytype");



        ajax.call(cmsServerConfig.configApiServerPath + "EstatePropertyType/ViewModel", "", 'GET').success(function (response) {
            estatePropertyDetail.gridOptions.Access = response.Access;
            estatePropertyDetail.Access = response.Access;
        }).error(function (data, errCode, c, d) {
            console.log(data);
        });
        if (estatePropertyDetail.propertyTypeId) {
            ajax.call(cmsServerConfig.configApiServerPath + "EstatePropertyType/", estatePropertyDetail.propertyTypeId, 'GET').success(function (response) {
                if (response.IsSuccess) {
                    estatePropertyDetail.PropertyType = response.Item;

                    estatePropertyDetail.gridOptions.fillData(estatePropertyDetail.PropertyType.PropertyDetails, estatePropertyDetail.Access);
                }
                estatePropertyDetail.categorybusyIndicator.isActive = false;
            }).error(function (data, errCode, c, d) {
                console.log(data);
            });
        }
        var filterValue = {
            PropertyName: "LinkPropertyTypeId",
            value: estatePropertyDetail.propertyTypeId,
            SearchType: 0
        }
        var engine = {};
        engine.Filters = [];
        engine.Filters.push(filterValue);
        ajax.call(cmsServerConfig.configApiServerPath + "EstatePropertyDetailGroup/Getall", engine, 'POST').success(function (response) {
            if (response.IsSuccess) {
                estatePropertyDetail.treeConfig.Items = response.ListItems;
            }
        }).error(function (data, errCode, c, d) {
            console.log(data);
        });

    };

    // Open Add Category Modal 
    estatePropertyDetail.openAddCategoryModal = function () {
        estatePropertyDetail.addRequested = false;
        estatePropertyDetail.modalTitle = "ایجاد گروه جدید";
        ajax.call(cmsServerConfig.configApiServerPath + 'EstatePropertyDetailGroup/ViewModel', "", 'GET').success(function (response) {
            rashaErManage.checkAction(response);
            estatePropertyDetail.selectedItem = response.Item;
            $modal.open({
                templateUrl: 'cpanelv1/ModuleEstate/EstatePropertyDetailGroup/add.html',
                scope: $scope
            });

        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }

    //Add New Category
    estatePropertyDetail.addNewCategory = function (frm) {
        if (frm.$invalid) {
            rashaErManage.showMessage($filter('translatentk')('form_values_full_have_not_been_entered'));
            return;
        }
        estatePropertyDetail.addRequested = true;
        estatePropertyDetail.selectedItem.LinkPropertyTypeId = estatePropertyDetail.propertyTypeId;
        estatePropertyDetail.selectedItem.IconFont = $("#iconFont").val(); //Save selected icon name in the model
        ajax.call(cmsServerConfig.configApiServerPath + 'EstatePropertyDetailGroup/', estatePropertyDetail.selectedItem, 'POST').success(function (response) {
            estatePropertyDetail.addRequested = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                estatePropertyDetail.treeConfig.Items.push(response.Item);
                estatePropertyDetail.categorybusyIndicator.isActive = false;
                estatePropertyDetail.closeModal();
            }
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            estatePropertyDetail.addRequested = false;
            estatePropertyDetail.categorybusyIndicator.isActive = false;
        });
    };

    // Open Edit Category Modal
    estatePropertyDetail.openEditCategoryModal = function () {
        estatePropertyDetail.addRequested = false;
        estatePropertyDetail.modalTitle = 'ویرایش';
        if (estatePropertyDetail.treeConfig.currentNode.Id == 0 || !estatePropertyDetail.treeConfig.currentNode.Id) {
            rashaErManage.showMessage("لطفاَ یک دسته جهت ویرایش انتخاب کنید");
            return;
        }
        ajax.call(cmsServerConfig.configApiServerPath + 'EstatePropertyDetailGroup/', estatePropertyDetail.treeConfig.currentNode.Id, 'GET').success(function (response1) {
            estatePropertyDetail.showbusy = false;
            rashaErManage.checkAction(response1);
            estatePropertyDetail.selectedItem = response1.Item;
            $modal.open({
                templateUrl: 'cpanelv1/ModuleEstate/EstatePropertyDetailGroup/edit.html',
                scope: $scope
            });
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            estatePropertyDetail.categorybusyIndicator.isActive = false;
        });
    }
    // Edit a Category
    estatePropertyDetail.editCategory = function (frm) {
        if (frm.$invalid) {
            rashaErManage.showMessage($filter('translatentk')('form_values_full_have_not_been_entered'));
            return;
        }
        estatePropertyDetail.categorybusyIndicator.isActive = true;
        estatePropertyDetail.selectedItem.IconFont = $("#iconFont").val(); //Save selected icon name in the model
        ajax.call(cmsServerConfig.configApiServerPath + 'EstatePropertyDetailGroup/', estatePropertyDetail.selectedItem, "PUT").success(function (response) {
            estatePropertyDetail.addRequested = true;
            estatePropertyDetail.treeConfig.showbusy = false;
            estatePropertyDetail.showIsBusy = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                estatePropertyDetail.addRequested = false;
                estatePropertyDetail.treeConfig.currentNode.Title = response.Item.Title;
                estatePropertyDetail.categorybusyIndicator.isActive = false;
                estatePropertyDetail.closeModal();
            }
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            estatePropertyDetail.addRequested = false;
            estatePropertyDetail.categorybusyIndicator.isActive = false;
        });
    }
    //Delete a Category
    estatePropertyDetail.deleteCategory = function () {
        var node = estatePropertyDetail.treeConfig.currentNode;
        if (node.Id == 0 || !node.Id) {
            rashaErManage.showMessage($filter('translatentk')('please_select_a_category_to_remove'));
            return;
        }

        angular.forEach(estatePropertyDetail.PropertyType.PropertyDetails, function (item, key) {
            if (item.LinkPropertyDetailGroupId == estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId) {
                rashaErManage.showMessage("این دسته دارای محتوا است برای حذف دسته ابتدا محتوای آن را حذف نمایید!");
                return;
            }
        });


        rashaErManage.showYesNo(($filter('translatentk')('warning')), ($filter('translatentk')('do_you_want_to_delete_this_attribute')), function (isConfirmed) {
            if (isConfirmed) {
                estatePropertyDetail.categorybusyIndicator.isActive = true;
                // ajax.call(cmsServerConfig.configApiServerPath+'EstatePropertyDetailGroup/', node.Id, 'GET').success(function (response) {
                //     rashaErManage.checkAction(response);
                //     estatePropertyDetail.selectedItemForDelete = response.Item;
                ajax.call(cmsServerConfig.configApiServerPath + 'EstatePropertyDetailGroup/', estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId, 'DELETE').success(function (res) {

                    if (res.IsSuccess) {
                        estatePropertyDetail.gridOptions.advancedSearchData.engine.Filters = null;
                        estatePropertyDetail.gridOptions.advancedSearchData.engine.Filters = [];
                        estatePropertyDetail.gridOptions.fillData();
                        estatePropertyDetail.categorybusyIndicator.isActive = false;
                        estatePropertyDetail.gridOptions.reGetAll();
                        estatePropertyDetail.treeConfig.currentNode = null;
                    }

                }).error(function (data2, errCode2, c2, d2) {
                    rashaErManage.checkAction(data2);
                    estatePropertyDetail.categorybusyIndicator.isActive = false;

                });
                // }).error(function (data, errCode, c, d) {
                //     rashaErManage.checkAction(data, errCode);
                //     estatePropertyDetail.categorybusyIndicator.isActive = false;

                // });

            }
        });

    }

    //Tree On Node Select Options
    estatePropertyDetail.treeConfig.onNodeSelect = function () {
        var node = estatePropertyDetail.treeConfig.currentNode;
        estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId = null;
        if (node != undefined && node != null)
            estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId = node.Id;
        estatePropertyDetail.selectContent(node);

    };

    //Show Content with Category Id
    estatePropertyDetail.selectContent = function (node) {
        estatePropertyDetail.gridOptions.selectedRow.item = null;
        if (node == null || node.Id == undefined)
            estatePropertyDetail.busyIndicator.message = "در حال بارگذاری...";
        else
            estatePropertyDetail.busyIndicator.message = "در حال بارگذاری..." + node.Title;
        estatePropertyDetail.busyIndicator.isActive = true;
        //estatePropertyDetail.gridOptions.advancedSearchData = {};
        var ListItems = [];
        if (estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId) {
            angular.forEach(estatePropertyDetail.PropertyType.PropertyDetails, function (item, key) {
                if (item.LinkPropertyDetailGroupId == estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId) {
                    ListItems.push(item);

                }
            });
        } else {
            ListItems = estatePropertyDetail.PropertyType.PropertyDetails;
        }
        estatePropertyDetail.gridOptions.fillData(ListItems, estatePropertyDetail.Access);
        estatePropertyDetail.busyIndicator.isActive = false;


    };

    // Open add Content Model
    estatePropertyDetail.openAddContentModal = function () {
        var node = estatePropertyDetail.treeConfig.currentNode;
        if (node == undefined || node.Id === 0 || node.Id == undefined || node.Id == null) {
            rashaErManage.showMessage("برای اضافه کردن لطفاً دسته مربوطه را انتخاب کنید.");
            return;
        }
        estatePropertyDetail.attachedFields = [];
        estatePropertyDetail.FieldName = "";
        estatePropertyDetail.addRequested = false;
        estatePropertyDetail.modalTitle = 'اضافه';

        estatePropertyDetail.selectedItem={};
     
        $modal.open({
            templateUrl: 'cpanelv1/ModuleEstate/estatePropertyDetail/add.html',
            scope: $scope
        });

        // }).error(function (data, errCode, c, d) {
        //     rashaErManage.checkAction(data, errCode);
        // });
    };

    //Add New Content
    estatePropertyDetail.addNewContent = function (frm) {
        if (frm.$invalid) {
            rashaErManage.showMessage($filter('translatentk')('form_values_full_have_not_been_entered'));
            return;
        }

        if (estatePropertyDetail.ConfigValueMultipleChoice && estatePropertyDetail.attachedFields < 2) {
            rashaErManage.showMessage("در صورت انتخاب چند گزینه ای باید حداقل دو گزینه اضافه کنید!");
            return;
        }
        estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId =estatePropertyDetail.treeConfig.currentNode.Id;
        if (!estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId|| estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId=="") {
            rashaErManage.showMessage("گروهی استفاده نشده است!");
            return;
        }
        estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId
        estatePropertyDetail.selectedItem.LinkPropertyTypeId = estatePropertyDetail.propertyTypeId;
        estatePropertyDetail.selectedItem.ConfigValueDefaultValue = estatePropertyDetail.attachedFields;
    

        estatePropertyDetail.selectedItem.IconFont = $("#iconFont").val(); //Save selected icon name in the model



        // var Item = Object.assign({}, estatePropertyDetail.PropertyType);

        if (!estatePropertyDetail.PropertyType.PropertyDetails || estatePropertyDetail.PropertyType.PropertyDetails.length == 0) {
            estatePropertyDetail.PropertyType.PropertyDetails = [];
        }
        
        estatePropertyDetail.PropertyType.PropertyDetails.push( Object.assign({}, estatePropertyDetail.selectedItem));

        

        estatePropertyDetail.busyIndicator.isActive = true;
        estatePropertyDetail.addRequested = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'estatepropertytype/', estatePropertyDetail.PropertyType, "PUT").success(function (response) {
            estatePropertyDetail.addRequested = false;
            estatePropertyDetail.busyIndicator.isActive = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                //estatePropertyDetail.selectedItem.Title="";
                var ListItems = [];
                if (estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId) {

                    angular.forEach(estatePropertyDetail.PropertyType.PropertyDetails, function (item, key) {
                        if (item.LinkPropertyDetailGroupId == estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId) {
                            ListItems.push(item);
                        }
                    });
                } else {
                    ListItems = estatePropertyDetail.PropertyType.PropertyDetails;
                }




                // estatePropertyDetail.replaceItem(estatePropertyDetail.selectedItem.Id, response.Item);
                estatePropertyDetail.gridOptions.fillData(ListItems, estatePropertyDetail.Access);
                estatePropertyDetail.closeModal();
            }
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            estatePropertyDetail.addRequested = false;
            estatePropertyDetail.busyIndicator.isActive = false;

        });


    }

    // Open Edit Content Model
    estatePropertyDetail.openEditContentModal = function () {
        estatePropertyDetail.addRequested = false;
        estatePropertyDetail.modalTitle = 'ویرایش';
        if (!estatePropertyDetail.gridOptions.selectedRow.item) {
            rashaErManage.showMessage("لطفاً یک ردیف جهت ویرایش انتخاب کنید");
            return;
        }
        estatePropertyDetail.FieldName = "";

        angular.forEach(estatePropertyDetail.PropertyType.PropertyDetails, function (item, key) {
            if (item.Id == estatePropertyDetail.gridOptions.selectedRow.item.Id) {
                estatePropertyDetail.selectedItem = item;
            }
        });
  
        estatePropertyDetail.attachedFields = estatePropertyDetail.selectedItem.ConfigValueDefaultValue;
        $modal.open({
            templateUrl: 'cpanelv1/ModuleEstate/estatePropertyDetail/edit.html',
            scope: $scope
        });
      
    };

    // Edit a Content
    estatePropertyDetail.editContent = function (frm) {
        if (frm.$invalid) {
            rashaErManage.showMessage($filter('translatentk')('form_values_full_have_not_been_entered'));
            return;
        }
            if (estatePropertyDetail.ConfigValueMultipleChoice && estatePropertyDetail.attachedFields < 2) {
                rashaErManage.showMessage("در صورت انتخاب چند گزینه ای باید حداقل دو گزینه اضافه کنید!");
                return;
            }
        

        estatePropertyDetail.selectedItem.LinkPropertyTypeId = estatePropertyDetail.propertyTypeId;
        estatePropertyDetail.selectedItem.ConfigValueDefaultValue = estatePropertyDetail.attachedFields;
     

        estatePropertyDetail.selectedItem.IconFont = $("#iconFont").val(); //Save selected icon name in the model


        if (!estatePropertyDetail.PropertyType.PropertyDetails || estatePropertyDetail.PropertyType.PropertyDetails.length == 0) {
            estatePropertyDetail.PropertyType.PropertyDetails = [];
        }
        angular.forEach(estatePropertyDetail.PropertyType.PropertyDetails, function (item, key) {
            if (item.Id == estatePropertyDetail.selectedItem.Id) {
                item =Object.assign({}, estatePropertyDetail.selectedItem);
            }
        });



        estatePropertyDetail.busyIndicator.isActive = true;
        estatePropertyDetail.addRequested = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'estatepropertytype/', estatePropertyDetail.PropertyType, "PUT").success(function (response) {
            estatePropertyDetail.addRequested = false;
            estatePropertyDetail.busyIndicator.isActive = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                //estatePropertyDetail.selectedItem.Title="";
                var ListItems = [];
                if (estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId) {

                    angular.forEach(estatePropertyDetail.PropertyType.PropertyDetails, function (item, key) {
                        if (item.LinkPropertyDetailGroupId == estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId) {
                            ListItems.push(item);
                        }
                    });
                } else {
                    ListItems = estatePropertyDetail.PropertyType.PropertyDetails;
                }




                // estatePropertyDetail.replaceItem(estatePropertyDetail.selectedItem.Id, response.Item);
                estatePropertyDetail.gridOptions.fillData(ListItems, estatePropertyDetail.Access);
                estatePropertyDetail.closeModal();
            }
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            estatePropertyDetail.addRequested = false;
            estatePropertyDetail.busyIndicator.isActive = false;

        });
    }

    //Delete a Content 
    estatePropertyDetail.deleteContent = function () {
        if (!estatePropertyDetail.gridOptions.selectedRow.item) {
            rashaErManage.showMessage($filter('translatentk')('Please_Select_A_Row_To_Remove'));
            return;
        }


        var Item = Object.assign({}, estatePropertyDetail.PropertyType);
        if (!Item.PropertyDetails || Item.PropertyDetails.length == 0) {
            Item.PropertyDetails = [];
        }
        var ListItems = [];
        angular.forEach(estatePropertyDetail.PropertyType.PropertyDetails, function (item, key) {
            if (item.Id != estatePropertyDetail.gridOptions.selectedRow.item.Id) {
                ListItems.push(item);
            }
        });
        Item.PropertyDetails = ListItems;

        estatePropertyDetail.busyIndicator.isActive = true;
        estatePropertyDetail.addRequested = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'estatepropertytype/', Item, "PUT").success(function (response) {

            estatePropertyDetail.addRequested = false;
            estatePropertyDetail.busyIndicator.isActive = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                estatePropertyDetail.PropertyType = response.Item;
                estatePropertyDetail.PropertyType.PropertyDetails = response.Item.PropertyDetails;
                var ListItems = [];
                if (estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId) {

                    angular.forEach(estatePropertyDetail.PropertyType.PropertyDetails, function (item, key) {
                        if (item.LinkPropertyDetailGroupId == estatePropertyDetail.selectedItem.LinkPropertyDetailGroupId) {
                            ListItems.push(item);
                        }
                    });
                } else {
                    ListItems = estatePropertyDetail.PropertyType.PropertyDetails;
                }

                estatePropertyDetail.gridOptions.fillData(ListItems, estatePropertyDetail.Access);
                estatePropertyDetail.closeModal();
            }
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            estatePropertyDetail.addRequested = false;
            estatePropertyDetail.busyIndicator.isActive = false;

        });


    }

    //Replace Item OnDelete/OnEdit Grid Options
    estatePropertyDetail.replaceItem = function (oldId, newItem) {
        angular.forEach(estatePropertyDetail.PropertyType.PropertyDetails, function (item, key) {
            if (item.Id == oldId) {
                var index = estatePropertyDetail.PropertyType.PropertyDetails.indexOf(item);
                estatePropertyDetail.PropertyType.PropertyDetails.splice(index, 1);
            }
        });
        if (newItem) {
            estatePropertyDetail.setPropertyTypeTitle(newItem);
            estatePropertyDetail.PropertyType.PropertyDetails.unshift(newItem);
        }

    }

    estatePropertyDetail.toggleCategoryButtons = function () {
        $("#categoryButtons").fadeToggle();
    }

    estatePropertyDetail.setPropertyTypeTitle = function (newItem) {
        angular.forEach(estatePropertyDetail.propertyTypeListItems, function (item, key) {
            if (item.LinkPropertyDetailGroupId == newItem.LinkPropertyDetailGroupId) {
                var index = estatePropertyDetail.propertyTypeListItems.indexOf(item);
                if (index > -1) {
                    newItem.virtual_PropertyType = {};
                    newItem.virtual_PropertyType.Title = estatePropertyDetail.propertyTypeListItems[index].Title;
                }
                return;
            }
        });
    }

    estatePropertyDetail.addRequested = false;

    estatePropertyDetail.closeModal = function () {
        $modalStack.dismissAll();
    };

    estatePropertyDetail.showIsBusy = false;

    //For reInit Categories
    estatePropertyDetail.gridOptions.reGetAll = function (regardFilters) {
        estatePropertyDetail.init();
    };

    estatePropertyDetail.isCurrentNodeEmpty = function () {
        return !angular.equals({}, estatePropertyDetail.treeConfig.currentNodede);
    }

    estatePropertyDetail.loadFileAndFolder = function (item) {
        estatePropertyDetail.treeConfig.currentNode = item;
        estatePropertyDetail.treeConfig.onNodeSelect(item);
    }

    estatePropertyDetail.addRequested = true;

    estatePropertyDetail.columnCheckbox = false;

    

    estatePropertyDetail.deleteAttachedFieldName = function (index) {
        estatePropertyDetail.attachedFields.splice(index, 1);
    }

    estatePropertyDetail.addAttachedFieldName = function (FieldName) {
        if (estatePropertyDetail.updateMode == "edit") {
            estatePropertyDetail.attachedFields[estatePropertyDetail.selectedIndex] = FieldName;
            estatePropertyDetail.selectedItem.ConfigValueDefaultValue = estatePropertyDetail.attachedFields;
            
           
        } else //estatePropertyDetail.updateMode = "add"
            if (FieldName != null && FieldName != undefined && FieldName != "" && !estatePropertyDetail.alreadyExist(FieldName, estatePropertyDetail.attachedFields)) {
                estatePropertyDetail.attachedFields.push(FieldName);
                $("#FieldName").val("");
            }
    }

    estatePropertyDetail.alreadyExist = function (FieldName, array) {
        for (var i = 0; i < array.length; i++) {
            if (FieldName == array[i]) {
                rashaErManage.showMessage($filter('translatentk')('This_Item_Has_Already_Been_Added'));
                return true;
            }
        }
        return false;
    }

    estatePropertyDetail.enableUpdate = function (index) {
        estatePropertyDetail.selectedIndex = index;
        estatePropertyDetail.FieldName = estatePropertyDetail.attachedFields[estatePropertyDetail.selectedIndex];
        estatePropertyDetail.updateMode = "edit";
        $("#addOrEditBtn").css("background-color", "#f3961c");
        $("#addOrEditIcon").removeClass("fa fa-plus").addClass("fa fa-check");
    }

    estatePropertyDetail.disableUpdate = function (index) {
        estatePropertyDetail.FieldName = estatePropertyDetail.attachedFields[index];
        estatePropertyDetail.updateMode = "add";
        $("#addOrEditBtn").css("background-color", "#1ab394");
        $("#addOrEditIcon").removeClass("fa fa-check").addClass("fa fa-plus");
    }

    estatePropertyDetail.filterEnum = function (myListItems, myEnums) {
        var n = myListItems.length;
        var m = myEnums.length;
        for (var i = 0; i < n; i++) {
            myListItems[i].TypeDescription = null;
            for (var j = 0; j < m; j++) {
                if (myListItems[i].InputDataType == myEnums[j].Value) {
                    myListItems[i].TypeDescription = myEnums[j].Description;
                }
            }
        }
    }

    // go down detail 
    estatePropertyDetail.editStepGoDown = function (item, index) {
        if (index == estatePropertyDetail.PropertyType.PropertyDetails.length - 1) {
            rashaErManage.showMessage($filter('translatentk')('The_Menu_Is_At_The_Bottom_Of_The_List'));
            return;
        }
       
    }

    // go up detail
    estatePropertyDetail.editStepGoUp = function (item, index) {
        if (index === 0) {
            rashaErManage.showMessage($filter('translatentk')('The_Menu_Is_At_The_Top_Of_The_List'));
            return;
        }
       
    }

    function compare(a, b) {
        if (a.ShowInFormOrder < b.ShowInFormOrder)
            return -1;
        if (a.ShowInFormOrder > b.ShowInFormOrder)
            return 1;
        return 0;
    }

    estatePropertyDetail.backToState = function (state) {
        $state.go(state);
    }

    estatePropertyDetail.onPropertyTypeChange = function (propertyTypeId) {
        estatePropertyDetail.propertyTypeId = parseInt(propertyTypeId);
        $stateParams.propertyParam = parseInt(propertyTypeId);

        var filterValue = {
            PropertyName: "LinkPropertyTypeId",
            Value: estatePropertyDetail.propertyTypeId,
            SearchType: 0
        }
        var engine = {};
        engine.Filters = [];
        engine.Filters.push(filterValue);

        ajax.call(cmsServerConfig.configApiServerPath + "EstatePropertyDetailGroup/getall", engine, 'POST').success(function (response) {
            estatePropertyDetail.estatePropertyDetailGroupListItems = response.ListItems;
            estatePropertyDetail.treeConfig.Items = response.ListItems;
            estatePropertyDetail.categorybusyIndicator.isActive = false;
        }).error(function (data, errCode, c, d) {
            console.log(data);
        });
    }

    estatePropertyDetail.gridOptions.myfilterText = function (gridListItems, foreignKeyName, childListItems, childItemColumnsName) {
        var ilength = gridListItems.length;
        var jlength = childListItems.length;
        for (var i = 0; i < ilength; i++) {
            gridListItems[i][childItemColumnsName] = ""; // Make a new field for title of the foreighn key
            for (var j = 0; j < jlength; j++) {
                if (gridListItems[i][foreignKeyName] == childListItems[j].Id) {
                    gridListItems[i][childItemColumnsName] = childListItems[j].Title;
                }
            }
        }
    }

    // Input DataType set to Boolean
    estatePropertyDetail.onInputDataTypeChange = function (inputType) {
        if (inputType == 0 || inputType == 1) {
            if (inputType == 1)
                estatePropertyDetail.selectedItem.InputDataType = 4;
            $("#addOptinosPanel").fadeOut();
            $("#setRangePanel").fadeOut();
        } else if (inputType == 2 || inputType == 3 || inputType == 4) {
            $("#setRangePanel").fadeOut(100);
            $("#addOptinosPanel").fadeIn(300);
        } else if (inputType == 5) {
            $("#addOptinosPanel").fadeOut(100);
            $("#setRangePanel").fadeIn(300);
        }
    }

    estatePropertyDetail.toggleIcons = function (fadeIn) {
        if (fadeIn)
            $('#icons').fadeIn();
        else
            $('#icons').fadeOut();
    }
   
    //Row Count Export Input Change
    estatePropertyDetail.rowCountChanged = function () {
        if (!angular.isDefined(estatePropertyDetail.ExportFileClass.RowCount) || estatePropertyDetail.ExportFileClass.RowCount > 5000)
            estatePropertyDetail.ExportFileClass.RowCount = 5000;
    }
    //Get TotalRowCount
    estatePropertyDetail.getCount = function () {
        ajax.call(cmsServerConfig.configApiServerPath + "estatePropertyDetail/count", estatePropertyDetail.gridOptions.advancedSearchData.engine, 'POST').success(function (response) {
            estatePropertyDetail.addRequested = false;
            rashaErManage.checkAction(response);
            estatePropertyDetail.ListItemsTotalRowCount = ': ' + response.TotalRowCount;
        }).error(function (data, errCode, c, d) {
            estatePropertyDetail.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    }
}]);