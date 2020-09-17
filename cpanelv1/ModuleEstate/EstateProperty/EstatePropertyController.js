app.controller("estatePropertyController", ["$scope", "$http", "ajax", 'rashaErManage', '$modal', '$modalStack', 'SweetAlert', '$window', '$filter', function ($scope, $http, ajax, rashaErManage, $modal, $modalStack, sweetAlert, $window, $filter) {
    var estateProperty = this;
    estateProperty.RouteUploadFileContent = cmsServerConfig.configRouteUploadFileContent;
    estateProperty.busyIndicator = {
        isActive: true,
        message: "در حال بار گذاری ..."
    }
    var buttonIsPressed = false; // برای جلوگیری از فشرده شدن چندباره دکمه ها

    estateProperty.attachedFiles = [];
    estateProperty.attachedFile = "";
    estateProperty.filePickerMainImage = {
        isActive: true,
        backElement: 'filePickerMainImage',
        filename: null,
        fileId: 0,
        multiSelect: false,
    }

    estateProperty.filePickerFiles = {
        isActive: true,
        backElement: 'filePickerFiles',
        filename: null,
        fileId: 0,
        multiSelect: false,
    }
    estateProperty.locationChanged = function (lat, lang) {
        console.log("ok " + lat + " " + lang);
    }

    estateProperty.GeolocationConfig = {
        latitude: 'Geolocationlatitude',
        longitude: 'Geolocationlongitude',
        onlocationChanged: estateProperty.locationChanged,
        useCurrentLocation: true,
        center: {
            lat: 32.658066,
            lng: 51.6693815
        },
        zoom: 4,
        scope: estateProperty,
        useCurrentLocationZoom: 12,
    }
    estateProperty.filePickerMainImage.clear = function () {
        estateProperty.filePickerMainImage.fileId = 0;
        estateProperty.filePickerMainImage.filename = "";
    }

    estateProperty.filePickerFiles.clear = function () {
        estateProperty.filePickerFiles.fileId = 0;
        estateProperty.filePickerFiles.filename = "";
    }

    if (itemRecordStatus != undefined) estateProperty.itemRecordStatus = itemRecordStatus;

    estateProperty.propertyTypeListItems = [];
    estateProperty.propertyDetailGroupListItems = [];
    estateProperty.propertyDetailsListItems = [];
    estateProperty.cmsUsersListItems = [];
    estateProperty.contractTypeListItems = [];
    estateProperty.inputTypeArray = [];
    estateProperty.Access = [];
    estateProperty.init = function () {
        estateProperty.busyIndicator.isActive = true;
        ajax.call(cmsServerConfig.configApiServerPath + "estateproperty/getAll", estateProperty.gridOptions.advancedSearchData.engine, 'POST').success(function (response) {
            rashaErManage.checkAction(response);
            estateProperty.ListItems = response.ListItems;
            estateProperty.Access = response.Access;
            estateProperty.gridOptions.fillData(estateProperty.ListItems, response.Access);
            estateProperty.gridOptions.currentPageNumber = response.CurrentPageNumber;
            estateProperty.gridOptions.totalRowCount = response.TotalRowCount;
            estateProperty.gridOptions.rowPerPage = response.RowPerPage;
            estateProperty.allowedSearch = response.AllowedSearchField;
            estateProperty.busyIndicator.isActive = false;
        }).error(function (data, errCode, c, d) {
            estateProperty.busyIndicator.isActive = false;
            estateProperty.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
        ajax.call(cmsServerConfig.configApiServerPath + "estatepropertytype/getAll", {}, 'POST').success(function (response) {
            rashaErManage.checkAction(response);
            estateProperty.propertyTypeListItems = response.ListItems;
        }).error(function (data, errCode, c, d) {
            estateProperty.busyIndicator.isActive = false;
            rashaErManage.checkAction(data, errCode);
        });
        ajax.call(cmsServerConfig.configApiServerPath + "estatecontracttype/GetAll", {}, 'POST').success(function (response) {
            if (response.IsSuccess) {
                estateProperty.contractTypeListItems = response.ListItems;

            }
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });

        ajax.call(cmsServerConfig.configApiServerPath + "EstatePropertyType/EnumInputDataType", "", 'GET').success(function (response) {
            estateProperty.inputTypeArray = response.ListItems;
        }).error(function (data, errCode, c, d) {
            console.log(data);
        });
        ajax.call(cmsServerConfig.configApiServerPath + "CoreLocation/GetAllProvinces", {}, 'POST').success(function (response) {
            rashaErManage.checkAction(response);
            estateProperty.provinceCmsLocatinoListItems = response.ListItems;
        }).error(function (data, errCode, c, d) {
            estateProperty.busyIndicator.isActive = false;
            rashaErManage.checkAction(data, errCode);
        });

    }
    estateProperty.inputTypeArrayCheck = function (numberEnum) {
        var retOut = "";
        angular.forEach(estateProperty.inputTypeArray, function (item, key) {
            if (item.Value == numberEnum) {
                retOut = item.Key;
                return;
            }
        });
        return retOut;
    }
    estateProperty.busyIndicator.isActive = true;
    estateProperty.addRequested = false;
    $(".back1").hide();

    estateProperty.attachedFiles = [];
    estateProperty.attachedFile = "";
    estateProperty.filePickerMainImage.filename = "";
    estateProperty.filePickerMainImage.fileId = null;
    estateProperty.filePickerFiles.filename = "";
    estateProperty.filePickerFiles.fileId = null;
    estateProperty.contractsList = [];

    // Open Add Modal
    estateProperty.openAddModal = function () {
        if (buttonIsPressed) return;
        estateProperty.onPropertyTypeChange();
        estateProperty.modalTitle = 'اضافه';
        //Clear file pickers
        estateProperty.attachedFiles = [];
        estateProperty.attachedFile = "";
        estateProperty.filePickerMainImage.filename = "";
        estateProperty.filePickerMainImage.fileId = null;
        estateProperty.filePickerFiles.filename = "";
        estateProperty.filePickerFiles.fileId = null;
        buttonIsPressed = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'estateproperty/ViewModel', "", 'GET').success(function (response) {
            buttonIsPressed = false;
            rashaErManage.checkAction(response);
            estateProperty.busyIndicator.isActive = false;
            estateProperty.selectedItem = response.Item;
            estateProperty.selectedItem.LinkPropertyTypeId = null;
            $modal.open({
                templateUrl: 'cpanelv1/ModuleEstate/EstateProperty/add.html',
                scope: $scope
            });
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            estateProperty.busyIndicator.isActive = false;
        });
    }

    // Add New Content
    estateProperty.addNewRow = function (frm) {
        if (frm.$invalid) {
            rashaErManage.showMessage($filter('translatentk')('form_values_full_have_not_been_entered'));
            return;
        }
        if (estateProperty.requiredPropertyIsEmpty(estateProperty.selectedItem)) {
            rashaErManage("مقادیر الزامی را وارد کنید!");
            return;
        }
        estateProperty.busyIndicator.isActive = true;
        estateProperty.addRequested = true;


        for (var i = 0; i < estateProperty.propertyDetailsListItems.length; i++) {


            let valueItem = "";
            if (estateProperty.propertyDetailsListItems[i].ConfigValueMultipleChoice) {
                var checkboxName = "nameValue" + estateProperty.propertyDetailsListItems[i].Id;
                estateProperty.selectionValueNames = [];
                jQuery("input[name='" + checkboxName + "']").each(function () {
                    if (this.checked) {
                        estateProperty.selectionValueNames.push(this.value);
                    }
                });
                valueItem = estateProperty.selectionValueNames;
                if (valueItem) {
                    valueItem = JSON.stringify(valueItem);
                } else {
                    valueItem = "";
                }
            } else {

                if (estateProperty.propertyDetailsListItems[i].ConfigValueForceUseDefaultValue && estateProperty.propertyDetailsListItems[i].ConfigValueDefaultValue.length > 0) { //ELement is a RadioButton/DropDown
                    //Do not delete the following comments: Get the value if the element is a RadioButton
                    /*var radioButton = "nameValue" + estateProperty.propertyDetailsListItems[i].Id;
                    estateProperty.selectionValueNames = [];
                    if ($("input[name='" + radioButton + "']").is(':checked')) {
                        valueItem = $("input[name='" + radioButton + "']:checked").val(); 
                    }*/
                    valueItem = $('#dropDown' + estateProperty.propertyDetailsListItems[i].Id).find(":selected").val(); //Get the value if the element is a DropDown

                } else
                    valueItem = estateProperty.propertyDetailsListItems[i].value;
            }


            if (!estateProperty.selectedItem.PropertyDetailValues)
                estateProperty.selectedItem.PropertyDetailValues = [];
            estateProperty.selectedItem.PropertyDetailValues.push({
                Value: valueItem,
                LinkPropertyDetailId: estateProperty.propertyDetailsListItems[i].Id
            });
        }


        ajax.call(cmsServerConfig.configApiServerPath + 'estateproperty/', estateProperty.selectedItem, 'POST').success(function (response) {
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {

                if (!estateProperty.ListItems)
                    estateProperty.ListItems = [];
                estateProperty.ListItems.push(response.Item);
                estateProperty.gridOptions.fillData(estateProperty.ListItems);
                estateProperty.closeModal();
            }
            estateProperty.busyIndicator.isActive = false;
            estateProperty.addRequested = false;
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            estateProperty.busyIndicator.isActive = false;
            estateProperty.addRequested = false;
        });
    }

    // Open Edit Content Modal 
    estateProperty.openEditModal = function () {
        if (buttonIsPressed) return;
        estateProperty.onPropertyTypeChange();
        //Clear file pickers
        estateProperty.attachedFiles = [];
        estateProperty.attachedFile = "";
        estateProperty.filePickerMainImage.filename = "";
        estateProperty.filePickerMainImage.fileId = null;
        estateProperty.filePickerFiles.filename = "";
        estateProperty.filePickerFiles.fileId = null;
        estateProperty.modalTitle = 'ویرایش';
        if (!estateProperty.gridOptions.selectedRow.item) {
            rashaErManage.showMessage($filter('translatentk')('please_select_a_row_to_edit'));
            return;
        }







        buttonIsPressed = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'estateproperty/', estateProperty.gridOptions.selectedRow.item.Id, 'GET').success(function (response) {
            buttonIsPressed = false;
            rashaErManage.checkAction(response);
            estateProperty.selectedItem = response.Item;
            estateProperty.oldLinkPropertyTypeId = estateProperty.selectedItem.LinkPropertyTypeId;
            estateProperty.loadDetailValues(estateProperty.selectedItem.LinkPropertyTypeId, estateProperty.selectedItem);
            estateProperty.onPropertyTypeChange(estateProperty.selectedItem.LinkPropertyTypeId);
            //---- Set Province City Location
            //estateProperty.onProvinceChange(estateProperty.selectedItem.LinkProvinceId);
            //estateProperty.onCitiesChange(estateProperty.selectedItem.LinkLocationId);
            //---- Set MainImage and AttachedFiles on edit modal open
            estateProperty.filePickerMainImage.filename = null;
            estateProperty.filePickerMainImage.fileId = null;
            if (response.Item.LinkMainImageId != null && response.Item.LinkMainImageId > 0) {
                ajax.call(cmsServerConfig.configApiServerPath + 'FileContent/', parseInt(response.Item.LinkMainImageId), 'GET').success(function (response2) {
                    if (response2.IsSuccess && response2.Item.Id > 9) {
                        estateProperty.filePickerMainImage.filename = response2.Item.FileName;
                        estateProperty.filePickerMainImage.fileId = response2.Item.Id;
                    }
                }).error(function (data, errCode, c, d) {
                    rashaErManage.checkAction(data, errCode);
                });
            }
            if (response.Item.LinkExtraImageIds != null && response.Item.LinkExtraImageIds != "")
                estateProperty.parseFileIds(response.Item.LinkExtraImageIds);
            //*****************************************************************
            $modal.open({
                templateUrl: 'cpanelv1/ModuleEstate/EstateProperty/edit.html',
                scope: $scope
            });
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }

    // Edit a Content
    estateProperty.editRow = function (frm) {
        if (frm.$invalid) {
            rashaErManage.showMessage($filter('translatentk')('form_values_full_have_not_been_entered'));
            return;
        }




        // ------------------------- Check if Property Type (LinkPropertyTypeId) has changed ---------------------------

        // -------------------------************* Set Values to Edit ************------------------------------
        for (var i = 0; i < estateProperty.propertyDetailsListItems.length; i++) {
            estateProperty.propertyDetailsListItems[i].valueFound = false;
            for (var j = 0; j < estateProperty.PropertyDetailValuesListItems.length; j++) {
                if (estateProperty.propertyDetailsListItems[i].Id == estateProperty.PropertyDetailValuesListItems[j].LinkPropertyDetailId) {
                    estateProperty.propertyDetailsListItems[i].valueFound = true;
                    if (estateProperty.propertyDetailsListItems[i].ConfigValueMultipleChoice == false) { // Detail is not CheckBox
                        if (estateProperty.propertyDetailsListItems[i].ConfigValueForceUseDefaultValue) { // Detail is RadioButton/DropDown
                            /*Do not delete the following comments: Get the value if the element is a RadioButton
                            var radioName = "selection" + estateProperty.propertyDetailsListItems[i].Id;
                            var radioValue = estateProperty[radioName];
                            estateProperty.propertyDetailsListItems[i].value = radioValue; */
                            estateProperty.PropertyDetailValuesListItems[j].Value = $('#dropDown' + estateProperty.propertyDetailsListItems[i].Id).find(":selected").val(); //Get the value if the element is a DropDown
                        } else
                            // Detail is not a CheckBox, nor a RadioButton
                            estateProperty.PropertyDetailValuesListItems[j].Value = String(estateProperty.propertyDetailsListItems[i].value);
                    } else { // Detail is CheckBox
                        var checkboxName = "selection" + estateProperty.propertyDetailsListItems[i].Id;
                        estateProperty.PropertyDetailValuesListItems[j].Value = JSON.stringify(estateProperty[checkboxName]);
                    }

                }
            }
            if (!estateProperty.propertyDetailsListItems[i].valueFound) {
                var proeprtyDetailValue = {
                    LinkPropertyId: 0,
                    LinkPropertyDetailId: 0,
                    Value: 0
                };
                if (estateProperty.propertyDetailsListItems[i].ConfigValueMultipleChoice == false) { // Detail is not CheckBox
                    if (estateProperty.propertyDetailsListItems[i].ConfigValueForceUseDefaultValue) { // Detail is RadioButton/DropDown
                        var newValue = {
                            Id: 0,
                            LinkPropertyId: estateProperty.selectedItem.Id,
                            LinkPropertyDetailId: estateProperty.propertyDetailsListItems[i].Id,
                            Value: $('#dropDown' + estateProperty.propertyDetailsListItems[i].Id).find(":selected").val()
                        }


                        estateProperty.PropertyDetailValuesListItems.push(newValue); //Get the value if the element is a DropDown
                    } else {
                        var newValue = {
                            Id: 0,
                            LinkPropertyId: estateProperty.selectedItem.Id,
                            LinkPropertyDetailId: estateProperty.propertyDetailsListItems[i].Id,
                            Value: String(estateProperty.propertyDetailsListItems[i].value)
                        }


                        // Detail is not a CheckBox, nor a RadioButton
                        estateProperty.PropertyDetailValuesListItems.push(newValue);
                    }
                } else { // Detail is CheckBox
                    var checkboxName = "selection" + estateProperty.propertyDetailsListItems[i].Id;
                    var newValue = {
                        Id: 0,
                        LinkPropertyId: estateProperty.selectedItem.Id,
                        LinkPropertyDetailId: estateProperty.propertyDetailsListItems[i].Id,
                        Value: estateProperty[checkboxName]
                    }
                    if (newValue.Value) {
                        newValue.Value = JSON.stringify(newValue.Value)
                    } else {
                        newValue.Value = ""
                    }
                    estateProperty.PropertyDetailValuesListItems.push(newValue);

                }
            }
        }
        // ---------------------------------- End of Set Values to Edit --------------------------------------

        // Edit Property: Title, Description, LinkPropertyTypeId
        estateProperty.busyIndicator.isActive = true;
        estateProperty.selectedItem.LinkExtraImageIds = stringfyLinkFileIds(estateProperty.attachedFiles);
        estateProperty.selectedItem.PropertyDetailValues = estateProperty.PropertyDetailValuesListItems;


        ajax.call(cmsServerConfig.configApiServerPath + 'estateproperty/', estateProperty.selectedItem, "PUT").success(function (response) {
            estateProperty.addRequested = true;
            rashaErManage.checkAction(response);
            estateProperty.busyIndicator.isActive = false;
            if (response.IsSuccess) {
                estateProperty.addRequested = false;
                estateProperty.replaceItem(estateProperty.selectedItem.Id, response.Item);
                estateProperty.gridOptions.fillData(estateProperty.ListItems);
                estateProperty.gridOptions.myfilterText(estateProperty.ListItems, "LinkCmsUserId", estateProperty.cmsUsersListItems, "Username", "LinkCmsUserUsername");
                estateProperty.gridOptions.myfilterText(estateProperty.ListItems, "LinkPropertyTypeId", estateProperty.propertyTypeListItems, "Title", "LinkPropertyTypeTitle");
                estateProperty.closeModal();
            }
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            estateProperty.addRequested = false;
            estateProperty.busyIndicator.isActive = false;
        });


    }

    estateProperty.closeModal = function () {
        $modalStack.dismissAll();
    };

    estateProperty.replaceItem = function (oldId, newItem) {
        angular.forEach(estateProperty.ListItems, function (item, key) {
            if (item.Id == oldId) {
                var index = estateProperty.ListItems.indexOf(item);
                estateProperty.ListItems.splice(index, 1);
            }
        });
        if (newItem)
            estateProperty.ListItems.unshift(newItem);
    }

    estateProperty.deleteRow = function () {
        if (buttonIsPressed) return;

        if (!estateProperty.gridOptions.selectedRow.item) {
            rashaErManage.showMessage($filter('translatentk')('Please_Select_A_Row_To_Remove'));
            return;
        }
        rashaErManage.showYesNo(($filter('translatentk')('warning')), ($filter('translatentk')('do_you_want_to_delete_this_attribute')), function (isConfirmed) {
            if (isConfirmed) {
                estateProperty.busyIndicator.isActive = true;
                buttonIsPressed = true;

                ajax.call(cmsServerConfig.configApiServerPath + 'estateproperty/', estateProperty.gridOptions.selectedRow.item.Id, 'DELETE').success(function (res) {
                    rashaErManage.checkAction(res);
                    estateProperty.busyIndicator.isActive = false;
                    if (res.IsSuccess) {
                        estateProperty.replaceItem(estateProperty.selectedItemForDelete.Id);
                        estateProperty.gridOptions.fillData(estateProperty.ListItems);
                    }
                }).error(function (data2, errCode2, c2, d2) {
                    rashaErManage.checkAction(data2);
                    estateProperty.busyIndicator.isActive = false;
                });

            }
        });
    }

    estateProperty.searchData = function () {
        estateProperty.gridOptions.searchData();
    }
    estateProperty.LinkLocationIdSelector = {
        displayMember: 'Title',
        id: 'Id',
        fId: 'LinkLocationId',
        url: 'CoreLocation',
        sortColumn: 'Id',
        sortType: 0,
        filterText: 'LinkLocationId',
        rowPerPage: 200,
        action: 'GetAllCities',
        scope: estateProperty,
        columnOptions: {
            columns: [{
                    name: 'Id',
                    displayName: 'کد سیستمی',
                    sortable: true,
                    type: 'string',
                    visible: true
                },
                {
                    name: 'virtual_Parent.Title',
                    displayName: 'Title',
                    sortable: true,
                    type: 'string',
                    visible: true
                },
                {
                    name: 'Title',
                    displayName: 'Title',
                    sortable: true,
                    type: 'string',
                    visible: true
                },
            ]
        }
    }
    estateProperty.gridOptions = {
        columns: [{
                name: 'LinkMainImageId',
                displayName: 'عکس',
                sortable: true,
                visible: true,
                isThumbnailByFild: true,
                imageWidth: '80',
                imageHeight: '80'
            },
            {
                name: 'Id',
                displayName: 'کد سیستمی',
                sortable: true,
                type: 'integer',
                visible: true
            },
            {
                name: 'LinkSiteId',
                displayName: 'کد سیستمی سایت',
                sortable: true,
                type: 'integer',
                visible: true
            },
            {
                name: 'CreatedDate',
                displayName: 'ساخت',
                sortable: true,
                isDate: true,
                type: 'date',
                visible: 'true'
            },
            {
                name: 'UpdatedDate',
                displayName: 'ویرایش',
                sortable: true,
                isDate: true,
                type: 'date',
                visible: 'true'
            },
            {
                name: 'Title',
                displayName: 'نام',
                sortable: true,
                type: 'string',
                visible: true
            },
            {
                name: 'Description',
                displayName: 'توضیح',
                sortable: true,
                type: 'string',
                visible: true,
                excerpt: true,
                excerptLength: 30
            },
            {
                name: 'LinkCmsUserId',
                displayName: 'کد سیستمی کاربر',
                sortable: true,
                type: 'string',
                visible: true,
                displayForce: true
            },
            {
                name: 'PropertyType.Title',
                displayName: 'نوع ملک',
                sortable: true,
                type: 'string',
                visible: true,
                displayForce: true
            },
            {
                name: 'ViewCount',
                displayName: 'تعداد بازدید',
                sortable: true,
                visible: true,
                type: 'integer'
            }
        ],
        data: {},
        multiSelect: false,
        startDate: moment().format(),
        advancedSearchData: {
            engine: {
                CurrentPageNumber: 1,
                SortColumn: "Id",
                SortType: 0,
                NeedToRunFakePagination: false,
                TotalRowData: 2000,
                RowPerPage: 20,
                ContentFullSearch: null,
                Filters: []
            }
        }
    }

    estateProperty.gridOptions.reGetAll = function () {
        estateProperty.init();
    }

    estateProperty.gridOptions.onRowSelected = function () {}

    estateProperty.columnCheckbox = false;

    estateProperty.openGridConfigModal = function () {
        $("#gridView-btn").toggleClass("active");
        if (estateProperty.gridOptions.columnCheckbox) {
            for (var i = 0; i < estateProperty.gridOptions.columns.length; i++) {
                //estateProperty.gridOptions.columns[i].visible = $("#" + estateProperty.gridOptions.columns[i].Id + "Checkbox").is(":checked");
                var element = $("#" + estateProperty.gridOptions.columns[i].name.replace('.', '') + "Checkbox");
                //var temp = element[0].checked;
                estateProperty.gridOptions.columns[i].visible = element[0].checked;
            }
        } else {
            var prechangeColumns = estateProperty.gridOptions.columns;
            for (var i = 0; i < estateProperty.gridOptions.columns.length; i++) {
                estateProperty.gridOptions.columns[i].visible = true;
                var element = $("#" + estateProperty.gridOptions.columns[i].name.replace('.', '') + "Checkbox");
                $("#" + estateProperty.gridOptions.columns[i].name + "Checkbox").checked = prechangeColumns[i].visible;
            }
        }
        for (var i = 0; i < estateProperty.gridOptions.columns.length; i++) {
            console.log(estateProperty.gridOptions.columns[i].name.concat(".visible: "), estateProperty.gridOptions.columns[i].visible);
        }
        estateProperty.gridOptions.columnCheckbox = !estateProperty.gridOptions.columnCheckbox;
    }

    estateProperty.onPropertyTypeChange = function (LinkPropertyTypeId) {


        estateProperty.propertyDetailsListItems = []; //Clear out the array from previous values
        estateProperty.propertyDetailGroupListItems = []; //Clear out the array from previous values
        if (!angular.isDefined(LinkPropertyTypeId)) return;
        var filterValue = {
            PropertyName: "LinkPropertyTypeId",
            value: LinkPropertyTypeId,
            SearchType: 0
        }
        var engine = {};
        engine.Filters = [];
        engine.Filters.push(filterValue);
        ajax.call(cmsServerConfig.configApiServerPath + "EstatePropertyDetailGroup/GetAll", engine, 'POST').success(function (response) {
            if (response.IsSuccess) {
                estateProperty.propertyDetailGroupListItems = response.ListItems;
                angular.forEach(estateProperty.propertyTypeListItems, function (item, key) {
                    if (item.Id == LinkPropertyTypeId) {
                        estateProperty.propertyDetailsListItems = item.PropertyDetails;

                    }
                });
            }
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });





    }

    estateProperty.selectedpropertyDetailsListItems = [];
    // estateProperty.onPropertyDetailGroupChange = function (propertyDetailGroupId) {
    //     estateProperty.selectedpropertyDetailsListItems = [];
    //     if (0 < estateProperty.propertyDetailsListItems.length) {
    //         $.each(estateProperty.propertyDetailsListItems, function (index, propertyDetail) {
    //             if (propertyDetail.LinkPropertyDetailGroupId == propertyDetailGroupId) {
    //                 estateProperty.selectedpropertyDetailsListItems.push(propertyDetail);
    //             }
    //         });
    //     }
    // }

    // Filter Texts for CmsUser
    estateProperty.gridOptions.myfilterText = function (gridListItems, foreignKeyName, childListItems, childDesiredPropertyName, childItemColumnName) {
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

    //-----------------*** Load Values in Edit Modal ***----------------------
    estateProperty.loadDetailValues = function (LinkPropertyTypeId, propertyItem) {
        estateProperty.propertyDetailsListItems = []; //Clear out the array from previous values
        estateProperty.propertyDetailGroupListItems = []; //Clear out the array from previous values
        if (!angular.isDefined(LinkPropertyTypeId)) return;
        var filterValue = {
            PropertyName: "LinkPropertyTypeId",
            value: LinkPropertyTypeId,
            SearchType: 0
        }
        var engine = {};
        engine.Filters = [];
        engine.Filters.push(filterValue);
        ajax.call(cmsServerConfig.configApiServerPath + "EstatePropertyDetailGroup/GetAll", engine, 'POST').success(function (response) {
            if (response.IsSuccess) {
                estateProperty.propertyDetailGroupListItems = response.ListItems;
                angular.forEach(estateProperty.propertyTypeListItems, function (item, key) {
                    if (item.Id == LinkPropertyTypeId) {
                        estateProperty.propertyDetailsListItems = item.PropertyDetails;

                    }
                });


                if (!propertyItem.PropertyDetailValues || propertyItem.PropertyDetailValues.length == 0)
                    return;

                estateProperty.PropertyDetailValuesListItems = propertyItem.PropertyDetailValues;
                for (var i = 0; i < estateProperty.propertyDetailsListItems.length; i++) {
                    for (var j = 0; j < estateProperty.PropertyDetailValuesListItems.length; j++) {
                        if (estateProperty.propertyDetailsListItems[i].Id == estateProperty.PropertyDetailValuesListItems[j].LinkPropertyDetailId) {


                            if (estateProperty.PropertyDetailValuesListItems[j].Value != null) {
                                if (estateProperty.propertyDetailsListItems[i].ConfigValueDefaultValue && estateProperty.propertyDetailsListItems[i].ConfigValueDefaultValue != null && estateProperty.propertyDetailsListItems[i].ConfigValueDefaultValue.length > 0) {
                                    if (estateProperty.propertyDetailsListItems[i].ConfigValueMultipleChoice) { // Detail is CheckBox
                                        try {
                                            var multipleValues = JSON.parse(estateProperty.PropertyDetailValuesListItems[j].Value); //.split(',');
                                            var checkboxName = "selection" + estateProperty.propertyDetailsListItems[i].Id;
                                            estateProperty[checkboxName] = multipleValues;
                                        } catch (err) {
                                            console.log(err);
                                        }


                                    } else if (estateProperty.propertyDetailsListItems[i].ConfigValueForceUseDefaultValue && estateProperty.propertyDetailsListItems[i].ConfigValueDefaultValue.length > 0) { // Detail is RadioButton/DropDown

                                        estateProperty.propertyDetailsListItems[i].value = estateProperty.PropertyDetailValuesListItems[j].Value;
                                    } else { // Detail is InputDataList
                                        estateProperty.propertyDetailsListItems[i].value = estateProperty.PropertyDetailValuesListItems[j].Value;
                                    }
                                } else {
                                    switch (estateProperty.propertyDetailsListItems[i].InputDataType) {
                                        case 0: // Detail is String
                                            estateProperty.propertyDetailsListItems[i].value = estateProperty.PropertyDetailValuesListItems[j].Value;
                                            break;
                                        case 1: // Detail is Number
                                            estateProperty.propertyDetailsListItems[i].value = parseInt(estateProperty.PropertyDetailValuesListItems[j].Value);
                                            break;
                                        case 2: // Detail is Boolean
                                            estateProperty.propertyDetailsListItems[i].value = (estateProperty.PropertyDetailValuesListItems[j].Value === "true");
                                            break;
                                    }
                                }
                            }
                        }
                    }
                }
                //--------------------------------
            }
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }


    // toggle selection for a given fruit by name
    estateProperty.toggleSelection = function (detailId, fruitName) {
        var checkboxName = "selection" + detailId;
        if (estateProperty[checkboxName] == undefined)
            estateProperty[checkboxName] = [];
        var idx = estateProperty[checkboxName].indexOf(fruitName);

        // is currently selected
        if (idx > -1) {
            estateProperty[checkboxName].splice(idx, 1);
        }

        // is newly selected
        else {
            estateProperty[checkboxName].push(fruitName);
        }
    }

    // toggle selection for a given fruit by name
    estateProperty.toggleRadioSelection = function (detailId, fruitName) {
        var radioName = "selection" + detailId;
        var idx = estateProperty[radioName].indexOf(fruitName);

        // is currently selected
        if (idx > -1) {

        }
        // is newly selected
        else {
            estateProperty[radioName] = [];
            estateProperty[radioName].push(fruitName);
        }
    }
    //---------------- End of LoadValues functino ------------------------------

    estateProperty.requiredPropertyIsEmpty = function (selectedItem) {
        $.each(estateProperty.propertyDetailsListItems, function (index, item) {
            if (item.Required)
                if (item.value == null || item.value == "")
                    return true;
        });
    }

    estateProperty.onContractTypeChange = function (contractTypeId) {
        var contractType = {};
        for (var i = 0; i < estateProperty.contractTypeListItems.length; i++) {
            if (contractTypeId == estateProperty.contractTypeListItems[i].Id) {
                estateProperty.contract.HasSalePrice = estateProperty.contractTypeListItems[i].HasSalePrice;
                estateProperty.contract.UnitSalePrice = estateProperty.contractTypeListItems[i].UnitSalePrice;

                estateProperty.contract.HasRentPrice = estateProperty.contractTypeListItems[i].HasRentPrice;
                estateProperty.contract.UnitRentPrice = estateProperty.contractTypeListItems[i].UnitRentPrice;
                estateProperty.contract.HasDepositPrice = estateProperty.contractTypeListItems[i].HasDepositPrice;
                estateProperty.contract.UnitDepositPrice = estateProperty.contractTypeListItems[i].UnitDepositPrice;
            }
        }
    }


    // estateProperty.contractsList = [];
    // estateProperty.openAddContractModal = function (propertyId, propertyTitle) {
    //     ajax.call(cmsServerConfig.configApiServerPath + "estatecontracttype/getall", {}, 'POST').success(function (response) {
    //         rashaErManage.checkAction(response);
    //         estateProperty.busyIndicator.isActive = false;
    //         estateProperty.contractTypeListItems = response.ListItems;
    //         estateProperty.selectedItem.LinkPropertyTypeId = null;
    //     }).error(function (data, errCode, c, d) {
    //         estateProperty.busyIndicator.isActive = false;
    //         rashaErManage.checkAction(data, errCode);
    //     });
    //     ajax.call(cmsServerConfig.configApiServerPath + 'EstateContract/ViewModel', "", 'GET').success(function (response) {
    //         rashaErManage.checkAction(response);
    //         if (response.IsSuccess) {
    //             estateProperty.selectedItem = response.Item;
    //             estateProperty.selectedItem.LinkPropertyId = propertyId; // Set LinkPropertyId for new Contract
    //             estateProperty.selectedItem.LinkPropertyTitle = propertyTitle; // Set LinkPropertyId for new Contract
    //             var model = {};
    //             model.Filters = [];
    //             model.Filters.push({
    //                 PropertyName: "LinkPropertyId",
    //                 IntValue1: propertyId,
    //                 SearchType: 0
    //             });
    //             ajax.call(cmsServerConfig.configApiServerPath + 'EstateContract/getall', model, 'POST').success(function (response) {
    //                 rashaErManage.checkAction(response);
    //                 estateProperty.contractsList = response.ListItems;
    //                 estateProperty.contractsListresultAccess = response.Access;
    //                 $modal.open({
    //                     templateUrl: 'cpanelv1/ModuleEstate/EstateProperty/addContract.html',
    //                     scope: $scope
    //                 });
    //             }).error(function (data, errCode, c, d) {
    //                 rashaErManage.checkAction(data, errCode);
    //             });
    //         }
    //     }).error(function (data, errCode, c, d) {
    //         rashaErManage.checkAction(data, errCode);
    //     });
    // }
    estateProperty.contract = {};
    estateProperty.addContract = function () {

        if (!estateProperty.selectedItem.Contracts)
            estateProperty.selectedItem.Contracts = [];
        estateProperty.selectedItem.Contracts.push(angular.extend({}, estateProperty.contract));
        estateProperty.contract = {};
    }

    estateProperty.showUpload = function () {
        $("#fastUpload").fadeToggle();
    }

    // ----------- FilePicker Codes --------------------------
    estateProperty.addAttachedFile = function (id) {
        var fname = $("#file" + id).text();
        if (fname == "") {
            rashaErManage.showMessage($filter('translatentk')('Please_Select_A_File_To_Add'));
            return;
        }
        if (id != null && id != undefined && !estateProperty.alreadyExist(id, estateProperty.attachedFiles)) {
            var fId = id;
            var file = {
                fileId: fId,
                filename: fname
            };
            estateProperty.attachedFiles.push(file);
            estateProperty.clearfilePickers();

        }
    }

    estateProperty.alreadyExist = function (fieldName, array) {
        for (var i = 0; i < array.length; i++) {
            if (fieldName == array[i]) {
                rashaErManage.showMessage($filter('translatentk')('This_Item_Has_Already_Been_Added'));
                estateProperty.clearfilePickers();
                return true;
            }
        }
        return false;
    }


    estateProperty.deleteContract = function (index) {

        estateProperty.selectedItem.Contracts.splice(index, 1);

    }

    estateProperty.parseFileIds = function (stringOfIds) {
        if (stringOfIds == null || !stringOfIds.trim()) return;
        var fileIds = stringOfIds.split(",");
        if (fileIds.length != undefined) {
            $.each(fileIds, function (index, item) {
                if (item == parseInt(item, 10)) { // Check if item is an integer
                    ajax.call(cmsServerConfig.configApiServerPath + 'FileContent/', parseInt(item), 'GET').success(function (response) {
                        if (response.IsSuccess) {
                            estateProperty.attachedFiles.push({
                                fileId: response.Item.Id,
                                filename: response.Item.FileName
                            });
                        }
                    }).error(function (data, errCode, c, d) {
                        rashaErManage.checkAction(data, errCode);
                    });
                }
            });
        }
    }

    estateProperty.clearfilePickers = function () {
        estateProperty.filePickerFiles.filename = null;
        estateProperty.filePickerFiles.fileId = null;
    }

    function stringfyLinkFileIds(arrayOfFiles) {
        var ret = "";
        $.each(arrayOfFiles, function (index, item) {
            if (ret == "")
                ret = item.fileId;
            else
                ret = ret + ',' + item.fileId;
        });
        return ret;
    }
    //--------- End FilePickers Codes ------------------------

    //---------------Upload Modal-----------------------------
    estateProperty.openUploadModal = function () {
        $modal.open({
            templateUrl: 'cpanelv1/ModuleEstate/EstateProperty/upload_modal.html',
            size: 'lg',
            scope: $scope
        });

        estateProperty.FileList = [];
        //get list of file from category id
        ajax.call(cmsServerConfig.configApiServerPath + "FileContent/GetFilesFromCategory/", "", 'GET').success(function (response) {
            estateProperty.FileList = response.ListItems;
        }).error(function (data) {
            console.log(data);
        });

    }

    estateProperty.calcuteProgress = function (progress) {
        wdth = Math.floor(progress * 100);
        return wdth;
    }

    estateProperty.whatcolor = function (progress) {
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

    estateProperty.canShow = function (pr) {
        if (pr == 1) {
            return true;
        }
        return false;
    }
    // File Manager actions
    estateProperty.replaceFile = function (name) {
        estateProperty.itemClicked(null, estateProperty.fileIdToDelete, "file");
        estateProperty.fileTypes = 1;
        estateProperty.fileIdToDelete = estateProperty.selectedIndex;

        // Delete the file

        ajax.call(cmsServerConfig.configApiServerPath + 'FileContent/', estateProperty.fileIdToDelete, 'DELETE').success(function (response2) {
            estateProperty.remove(estateProperty.FileList, estateProperty.fileIdToDelete);
            if (response2.IsSuccess == true) {
                // Save New file
                ajax.call(cmsServerConfig.configApiServerPath + "FileContent/ViewModel", "", 'GET').success(function (response3) {
                    if (response3.IsSuccess == true) {
                        estateProperty.FileItem = response3.Item;
                        estateProperty.FileItem.FileName = name;
                        estateProperty.FileItem.Extension = name.split('.').pop();
                        estateProperty.FileItem.FileSrc = name;
                        estateProperty.FileItem.LinkCategoryId = estateProperty.thisCategory;
                        estateProperty.saveNewFile();
                    } else {
                        console.log("getting the model was not successfully returned!");
                    }
                }).error(function (data) {
                    console.log(data);
                });
            } else {
                console.log("Request to api/CmsFileContent/delete was not successfully returned!");
            }
        }).error(function (data, errCode, c, d) {
            console.log(data);
        });

    }
    //save new file
    estateProperty.saveNewFile = function () {
        ajax.call(cmsServerConfig.configApiServerPath + "FileContent/", estateProperty.FileItem, 'POST').success(function (response) {
            if (response.IsSuccess) {
                estateProperty.FileItem = response.Item;
                estateProperty.showSuccessIcon();
                return 1;
            } else {
                return 0;

            }
        }).error(function (data) {
            estateProperty.showErrorIcon();
            return -1;
        });
    }

    estateProperty.showSuccessIcon = function () {}

    estateProperty.showErrorIcon = function () {

    }
    //file is exist
    estateProperty.fileIsExist = function (fileName) {
        for (var i = 0; i < estateProperty.FileList.length; i++) {
            if (estateProperty.FileList[i].FileName == fileName) {
                estateProperty.fileIdToDelete = estateProperty.FileList[i].Id;
                return true;

            }
        }
        return false;
    }

    estateProperty.getFileItem = function (id) {
        for (var i = 0; i < estateProperty.FileList.length; i++) {
            if (estateProperty.FileList[i].Id == id) {
                return estateProperty.FileList[i];
            }
        }
    }

    //select file or folder
    estateProperty.itemClicked = function ($event, index, type) {
        if (type == 'file' || type == 1) {
            estateProperty.fileTypes = 1;
            estateProperty.selectedFileId = estateProperty.getFileItem(index).Id;
            estateProperty.selectedFileName = estateProperty.getFileItem(index).FileName;
        } else {
            estateProperty.fileTypes = 2;
            estateProperty.selectedCategoryId = estateProperty.getCategoryName(index).Id;
            estateProperty.selectedCategoryTitle = estateProperty.getCategoryName(index).Title;
        }

        estateProperty.selectedIndex = index;

    }

    estateProperty.showContractDetails = function (contract) {
        estateProperty.selectedContract = contract;
    }
    //upload file
    estateProperty.uploadFile = function (index, uploadFile) {
        if ($("#save-icon" + index).hasClass("fa-save")) {
            if (estateProperty.fileIsExist(uploadFile.name)) { // File already exists
                if (confirm('File "' + uploadFile.name + '" already exists! Do you want to replace the new file?')) {
                    //------------ estateProperty.replaceFile(uploadFile.name);
                    estateProperty.itemClicked(null, estateProperty.fileIdToDelete, "file");
                    estateProperty.fileTypes = 1;
                    estateProperty.fileIdToDelete = estateProperty.selectedIndex;
                    // replace the file
                    ajax
                        .call(
                            cmsServerConfig.configApiServerPath + "FileContent/",
                            estateProperty.fileIdToDelete,
                            "GET"
                        )
                        .success(function (response1) {
                            if (response1.IsSuccess == true) {
                                ajax.call(cmsServerConfig.configApiServerPath + "FileContent/replace", response1.Item, "POST")
                                    .success(function (response2) {
                                        if (response2.IsSuccess == true) {
                                            estateProperty.FileItem = response2.Item;
                                            estateProperty.showSuccessIcon();
                                            $("#save-icon" + index).removeClass("fa-save");
                                            $("#save-button" + index).removeClass(
                                                "flashing-button"
                                            );
                                            $("#save-icon" + index).addClass("fa-check");
                                            estateProperty.filePickerMainImage.filename =
                                                estateProperty.FileItem.FileName;
                                            estateProperty.filePickerMainImage.fileId =
                                                response2.Item.Id;
                                            estateProperty.selectedItem.LinkMainImageId =
                                                estateProperty.filePickerMainImage.fileId;
                                        } else {
                                            $("#save-icon" + index).removeClass("fa-save");
                                            $("#save-button" + index).removeClass(
                                                "flashing-button"
                                            );
                                            $("#save-icon" + index).addClass("fa-remove");
                                        }
                                    })
                                    .error(function (data) {
                                        estateProperty.showErrorIcon();
                                        $("#save-icon" + index).removeClass("fa-save");
                                        $("#save-button" + index).removeClass("flashing-button");
                                        $("#save-icon" + index).addClass("fa-remove");
                                    });
                                //-----------------------------------
                            }
                        })
                        .error(function (data) {
                            console.log(data);
                        });
                    //--------------------------------
                } else {
                    return;
                }
            } else { // File does not exists
                // Save New file
                // ajax.call(cmsServerConfig.configApiServerPath+"FileContent/ViewModel", "", 'GET').success(function (response) {
                //     estateProperty.FileItem = response.Item;
                estateProperty.FileItem = {};
                estateProperty.FileItem.FileName = uploadFile.name;
                estateProperty.FileItem.uploadName = uploadFile.uploadName;
                estateProperty.FileItem.ModuleName = "Estate";
                estateProperty.FileItem.ModuleEntityName = "";
                estateProperty.FileItem.ModuleEntityId = estateProperty.selectedItem.Id;
                estateProperty.FileItem.Extension = uploadFile.name.split('.').pop();
                estateProperty.FileItem.FileSrc = uploadFile.name;
                estateProperty.FileItem.LinkCategoryId = null; //Save the new file in the root
                // ------- estateProperty.saveNewFile()  ----------------------
                var result = 0;
                ajax.call(cmsServerConfig.configApiServerPath + "FileContent/", estateProperty.FileItem, 'POST').success(function (response) {
                    if (response.IsSuccess) {
                        estateProperty.FileItem = response.Item;
                        estateProperty.showSuccessIcon();
                        $("#save-icon" + index).removeClass("fa-save");
                        $("#save-button" + index).removeClass("flashing-button");
                        $("#save-icon" + index).addClass("fa-check");
                        estateProperty.filePickerMainImage.filename = estateProperty.FileItem.FileName;
                        estateProperty.filePickerMainImage.fileId = response.Item.Id;
                        estateProperty.selectedItem.LinkMainImageId = response.Item.Id;
                        estateProperty.selectedItem.LinkMainImageId = estateProperty.filePickerMainImage.fileId

                    } else {
                        $("#save-icon" + index).removeClass("fa-save");
                        $("#save-button" + index).removeClass("flashing-button");
                        $("#save-icon" + index).addClass("fa-remove");
                    }
                    // }).error(function (data) {
                    //     estateProperty.showErrorIcon();
                    //     $("#save-icon" + index).removeClass("fa-save");
                    //     $("#save-button" + index).removeClass("flashing-button");
                    //     $("#save-icon" + index).addClass("fa-remove");
                    // });
                    //-----------------------------------
                }).error(function (data) {
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
    estateProperty.exportFile = function () {
        estateProperty.addRequested = true;
        estateProperty.gridOptions.advancedSearchData.engine.ExportFile = estateProperty.ExportFileClass;
        ajax.call(cmsServerConfig.configApiServerPath + 'EstateProperty/exportfile', estateProperty.gridOptions.advancedSearchData.engine, 'POST').success(function (response) {
            estateProperty.addRequested = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                estateProperty.exportDownloadLink = window.location.origin + response.LinkFile;
                $window.open(response.LinkFile, '_blank');
                //estateProperty.closeModal();
            }
        }).error(function (data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }
    //Open Export Report Modal
    estateProperty.toggleExportForm = function () {
        estateProperty.SortType = [{
                key: 'نزولی',
                value: 0
            },
            {
                key: 'صعودی',
                value: 1
            },
            {
                key: 'تصادفی',
                value: 3
            }
        ];
        estateProperty.EnumExportFileType = [{
                key: 'Excel',
                value: 1
            },
            {
                key: 'PDF',
                value: 2
            },
            {
                key: 'Text',
                value: 3
            }
        ];
        estateProperty.EnumExportReceiveMethod = [{
                key: 'دانلود',
                value: 0
            },
            {
                key: 'ایمیل',
                value: 1
            },
            {
                key: 'فایل منیجر',
                value: 3
            }
        ];
        estateProperty.ExportFileClass = {
            FileType: 1,
            RecieveMethod: 0,
            RowCount: 100
        };
        estateProperty.exportDownloadLink = null;
        $modal.open({
            templateUrl: 'cpanelv1/ModuleEstate/EstateProperty/report.html',
            scope: $scope
        });
    }
    //Row Count Export Input Change
    estateProperty.rowCountChanged = function () {
        if (!angular.isDefined(estateProperty.ExportFileClass.RowCount) || estateProperty.ExportFileClass.RowCount > 5000)
            estateProperty.ExportFileClass.RowCount = 5000;
    }
    //Get TotalRowCount
    estateProperty.getCount = function () {
        ajax.call(cmsServerConfig.configApiServerPath + "EstateProperty/count", estateProperty.gridOptions.advancedSearchData.engine, 'POST').success(function (response) {
            estateProperty.addRequested = false;
            rashaErManage.checkAction(response);
            estateProperty.ListItemsTotalRowCount = ': ' + response.TotalRowCount;
        }).error(function (data, errCode, c, d) {
            estateProperty.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
        });
    }

    estateProperty.thousandSeparator = function (field, digit) {
        var value = digit.replace(new RegExp(",", "g"), '');
        var x = (parseInt(value)).toLocaleString();
        estateProperty.selectedItem[field] = x;
    }

    estateProperty.onRecordStatusChange = function (record) {
        //estateProperty.busyIndicator.isActive = true;
        //var filterstatus = { Filters: [{ PropertyName: "RecordStatus", SearchType: 0, IntValue1: record }] };
        //ajax.call(cmsServerConfig.configApiServerPath+"estateproperty/getAllwithalias", filterstatus, 'POST').success(function (response) {
        //    rashaErManage.checkAction(response);
        //    estateProperty.ListItems = response.ListItems;
        //    estateProperty.gridOptions.fillData(estateProperty.ListItems, response.Access);
        //    estateProperty.gridOptions.currentPageNumber = response.CurrentPageNumber;
        //    estateProperty.gridOptions.totalRowCount = response.TotalRowCount;
        //    estateProperty.gridOptions.rowPerPage = response.RowPerPage;
        //    estateProperty.busyIndicator.isActive = false;
        //}).error(function (data, errCode, c, d) {
        //    estateProperty.busyIndicator.isActive = false;
        //    estateProperty.gridOptions.fillData();
        //    rashaErManage.checkAction(data, errCode);
        //});
    }
}]);