app.controller("coreCpMainMenuGridCtrl", ["$scope", "$http", "ajax", 'rashaErManage', '$modal', '$modalStack', 'SweetAlert', '$filter', function($scope, $http, ajax, rashaErManage, $modal, $modalStack, sweetAlert, $filter) {

    var coreCpMainMenugrd = this;

    coreCpMainMenugrd.busyIndicator = {
        isActive: false,
        message: "در حال بار گذاری ..."
    }

    coreCpMainMenugrd.contentbusyIndicator = {
        isActive: false,
        message: "در حال بار گذاری ..."
    }

    coreCpMainMenugrd.gridBusyIndicator = {
        isActive: false,
        message: "در حال بار گذاری ..."
    }
    var buttonIsPressed = false; // برای جلوگیری از فشرده شدن چندباره دکمه ها

    coreCpMainMenugrd.selectedItem = {};
    coreCpMainMenugrd.selectUniversalMenuOnUndetectableKey = false;

    //Many To Many
    //MenuItemProcesses  جدول واسط
    //ProcessesId   فیلد جدول دیگر در جدول واسط
    //MenuId  فیلد ما در جدول واسط
    coreCpMainMenugrd.menueGroups = []; //لیست جدول دیگر
    var otherTabaleFieldKey = 'Id';
    var many2ManythisOtherTabaleFieldKey = 'CmsUserGroup_Id';
    var thisTableFieldICollection = 'CmsCpMainMenuCmsUserGroup';


    coreCpMainMenugrd.hasInMany2Many = function(OtherTable) {
        if (coreCpMainMenugrd.selectedItem[thisTableFieldICollection] == undefined) return false;
        return objectFindByKey(coreCpMainMenugrd.selectedItem[thisTableFieldICollection], many2ManythisOtherTabaleFieldKey, OtherTable[otherTabaleFieldKey]);

    };
    coreCpMainMenugrd.toggleMany2Many = function(role, OtherTable) {
        var obj = {};
        obj[many2ManythisOtherTabaleFieldKey] = OtherTable[otherTabaleFieldKey];
        if (coreCpMainMenugrd.hasInMany2Many(OtherTable)) {
            //var index = coreCpMainMenugrd.selectedItem[thisTableFieldICollection].indexOf(obj);
            var index = arrayObjectIndexOf(coreCpMainMenugrd.selectedItem[thisTableFieldICollection], OtherTable[otherTabaleFieldKey], many2ManythisOtherTabaleFieldKey);
            // get the index of this permission role
            coreCpMainMenugrd.selectedItem[thisTableFieldICollection].splice(index, 1);
        } else {
            coreCpMainMenugrd.selectedItem[thisTableFieldICollection].push(obj);
        }
    }
    // array = [{key:value},{key:value}]
    function objectFindByKey(array, key, value) {
        for (var i = 0; i < array.length; i++) {
            if (array[i][key] === value) {
                var obj = {};
                obj[key] = value;
                array[i] = obj;
                return true;
            }
        }
        return false;
    }

    // Find an object in an array of objects and return its index if object is found, -1 if not 
    function arrayObjectIndexOf(myArray, searchTerm, property) {
        for (var i = 0, len = myArray.length; i < len; i++) {
            if (myArray[i][property] === searchTerm) return i;
        }
        return -1;
    }
    //Many To Many


    //Tree Config
    coreCpMainMenugrd.treeConfig = {
        displayMember: 'Title',
        displayId: 'Id',
        displayChild: 'Children'
    };

    coreCpMainMenugrd.treeConfig.currentNode = {};
    coreCpMainMenugrd.treeBusyIndicator = false;


    coreCpMainMenugrd.moduleList = {};
    ajax.call(cmsServerConfig.configApiServerPath + 'CoreModule/getall', {}, 'POST').success(function(response) {
        coreCpMainMenugrd.moduleList = response.ListItems;
    });

    coreCpMainMenugrd.gridOptions = {
        columns: [
            { name: 'Id', displayName: 'کد سیستمی', sortable: true, width: '85px', type: 'integer' },
            { name: 'CreatedDate', displayName: 'ساخت', sortable: true, isDate: true, type: 'date', visible: 'true' },
            { name: 'UpdatedDate', displayName: 'ویرایش', sortable: true, isDate: true, type: 'date', visible: 'true' },
            { name: 'Title', displayName: 'عنوان', sortable: true, type: 'string' },
            { name: 'TitleML', displayName: 'عنوان', sortable: true, type: 'string' },
            { name: 'virtual_Parent.Title', displayName: 'صفحه والد', sortable: true, type: 'link', displayForce: true },
            { name: 'ShowInMenuOrder', displayName: 'ترتیب نمایش', sortable: true, type: 'integer' },
            { name: 'ActionButton', displayName: 'تغییر ترتیب', sortable: true, type: 'string', displayForce: true, width: '85px', template: '<i class=\"fa fa-arrow-circle-up\" aria-hidden=\"true\" style=\"font-size:25px;color:#1ab394;text-align: center;\" title=\"انتقال به بالا\" ng-click=\"coreCpMainMenugrd.editStepGoUp(x, $index)\" ng-show="coreCpMainMenugrd.gridOptions.Access.AccessEditRow"></i>&nbsp<i class=\"fa fa-arrow-circle-down\"  aria-hidden=\"true\" title=\"انتقال به پایین\" style=\"font-size:25px;color:#ec4758;text-align: center;\" ng-click=\"coreCpMainMenugrd.editStepGoDown(x, $index)\" ng-show="coreCpMainMenugrd.gridOptions.Access.AccessEditRow"></i>' }
        ],
        data: {},
        multiSelect: false,
        advancedSearchData: {
            engine: {
                CurrentPageNumber: 1,
                SortColumn: "ShowInMenuOrder",
                SortType: 0,
                NeedToRunFakePagination: false,
                TotalRowData: 200,
                RowPerPage: 300,
                ContentFullSearch: null,
                Filters: []
            }
        }
    }

    coreCpMainMenugrd.init = function() {
        coreCpMainMenugrd.addRequested = true;
        coreCpMainMenugrd.busyIndicator.isActive = true;
        ajax.call(cmsServerConfig.configApiServerPath + "CoreEnum/EnumMenuPlaceType", "", 'GET').success(function(response) {
            coreCpMainMenugrd.MenuPlaceType = response.ListItems;
        }).error(function(data, errCode, c, d) {
            console.log(data);
        });
        var engine = {
            CurrentPageNumber: 1,
            SortColumn: "ShowInMenuOrder",
            SortType: 0,
            NeedToRunFakePagination: false,
            RowPerPage: 300,
            ContentFullSearch: null,
            Filters: []
        };
        engine.AccessLoad = true;
        ajax.call(cmsServerConfig.configApiServerPath + "CoreCpMainMenu/getAllMenu", engine, 'POST').success(function(response) {
            coreCpMainMenugrd.treeConfig.Items = response.ListItems;
            rashaErManage.checkAction(response);
            coreCpMainMenugrd.ListItems = response.ListItems;
            coreCpMainMenugrd.ListParentItems = coreCpMainMenugrd.selectParents();
            coreCpMainMenugrd.gridOptions.fillData(coreCpMainMenugrd.ListParentItems, response.Access);
            coreCpMainMenugrd.gridOptions.Access = response.Access; //دسترسی ها نمایش
            coreCpMainMenugrd.gridOptions.currentPageNumber = response.CurrentPageNumber;
            coreCpMainMenugrd.gridOptions.totalRowCount = response.TotalRowCount;
            coreCpMainMenugrd.gridOptions.rowPerPage = response.RowPerPage;
            coreCpMainMenugrd.gridOptions.maxSize = 5;
            coreCpMainMenugrd.addRequested = false;
            coreCpMainMenugrd.busyIndicator.isActive = false;
        }).error(function(data, errCode, c, d) {
            coreCpMainMenugrd.gridOptions.fillData();
            console.log(data);
            rashaErManage.checkAction(data, errCode);
        });
        ajax.call(cmsServerConfig.configApiServerPath + "CoreUserGroup/getall", {}, 'POST').success(function(response) {
            coreCpMainMenugrd.menueGroups = response.ListItems;
        }).error(function(data, errCode, c, d) {
            console.log(data);
        });
    }

    //Tree On Node Select Options
    coreCpMainMenugrd.treeConfig.onNodeSelect = function() {
        var node = coreCpMainMenugrd.treeConfig.currentNode;
        coreCpMainMenugrd.gridOptions.selectedRow.item = coreCpMainMenugrd.treeConfig.currentNode;
        // coreCpMainMenugrd.LinkParentIdMemo remembers the real LinkParentId of the selectedRow in order it later when loading open or edit modal
        coreCpMainMenugrd.LinkParentIdMemo = coreCpMainMenugrd.selectedItem.LinkParentId;
        if (node != null) { // Root is selected
            coreCpMainMenugrd.selectedItem.LinkParentId = node.Id;
            coreCpMainMenugrd.selectContent(node);
        } else {
            coreCpMainMenugrd.selectRoots();
        }
    }

    //Show Content with Category Id
    coreCpMainMenugrd.selectContent = function(node) {
        coreCpMainMenugrd.busyIndicator.message = "در حال بارگذاری... " + node.Title;
        coreCpMainMenugrd.busyIndicator.isActive = true;
        coreCpMainMenugrd.gridOptions.advancedSearchData.engine.Filters = null;
        coreCpMainMenugrd.gridOptions.advancedSearchData.engine.Filters = [];
        if (node.Id && node.Id > 0)
            var s = {
                PropertyName: "LinkParentId",
                IntValue1: node.Id,
                SearchType: 0
            }
        coreCpMainMenugrd.gridOptions.advancedSearchData.engine.Filters.push(s);
        coreCpMainMenugrd.gridOptions.advancedSearchData.engine.AccessLoad = true;
        ajax.call(cmsServerConfig.configApiServerPath + "CoreCpMainMenu/GetAll", coreCpMainMenugrd.gridOptions.advancedSearchData.engine, 'POST').success(function(response) {
            rashaErManage.checkAction(response);
            coreCpMainMenugrd.busyIndicator.isActive = false;
            coreCpMainMenugrd.ListItems = response.ListItems;
            coreCpMainMenugrd.gridOptions.fillData(coreCpMainMenugrd.ListItems, response.Access);
            coreCpMainMenugrd.gridOptions.currentPageNumber = response.CurrentPageNumber;
            coreCpMainMenugrd.gridOptions.totalRowCount = response.TotalRowCount;
            coreCpMainMenugrd.gridOptions.rowPerPage = response.RowPerPage;
            coreCpMainMenugrd.gridOptions.maxSize = 5;

        }).error(function(data, errCode, c, d) {
            coreCpMainMenugrd.gridOptions.fillData();
            rashaErManage.checkAction(data, errCode);
            coreCpMainMenugrd.busyIndicator.isActive = false;
        });
    }

    // Open Add New Content Modal
    coreCpMainMenugrd.addRequested = false;
    coreCpMainMenugrd.openAddContentModal = function() {
        coreCpMainMenugrd.modalTitle = 'اضافه';
        var node = coreCpMainMenugrd.treeConfig.currentNode;


        ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/getall', {}, 'POST').success(function(response) {
            // To define an array otherwise coreCpMainMenugrd.selectedItem[thisTableFieldICollection] will be detected as an object
            coreCpMainMenugrd.selectedItem[thisTableFieldICollection] = [];
            coreCpMainMenugrd.ListParentItems = response.ListItems;
            coreCpMainMenugrd.busyIndicator.isActive = false;
        });
        ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/ViewModel', '', 'GET').success(function(response) {
            rashaErManage.checkAction(response);
            coreCpMainMenugrd.selectedItem = response.Item;
            if (node != null) {
                if (node.Id != 0 || node.Id) {
                    coreCpMainMenugrd.selectedItem.LinkParentId = node.Id;
                }
            }
            coreCpMainMenugrd.selectedItem.isDependencyModule = false;
            $modal.open({
                templateUrl: 'cpanelv1/CmsModules/Core/coreCpMainMenu/add.html',
                scope: $scope
            });
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    };

    // Add a Content
    coreCpMainMenugrd.addNewRow = function(frm) {
        if (frm.$invalid)
            return;
        coreCpMainMenugrd.busyIndicator.isActive = true;
        coreCpMainMenugrd.addRequested = true;
        if (coreCpMainMenugrd.selectedItem.isDependencyModule == false || coreCpMainMenugrd.selectedItem.isDependencyModule == undefined)
            coreCpMainMenugrd.selectedItem.LinkModuleId = null;
        ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/', coreCpMainMenugrd.selectedItem, 'POST').success(function(response) {
            coreCpMainMenugrd.busyIndicator.isActive = false;
            coreCpMainMenugrd.addRequested = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                coreCpMainMenugrd.ListItems.push(response.Item);
                if (response.Item.LinkParentId == null) {
                    // Do nothing یک روت اضافه شده است
                } else
                    for (var i = 0; i < coreCpMainMenugrd.treeConfig.Items.length; i++) {
                        searchAndAddToTree(response.Item, coreCpMainMenugrd.treeConfig.Items[i]);
                    }
                coreCpMainMenugrd.closeModal();
            }
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            coreCpMainMenugrd.addRequested = false;
            coreCpMainMenugrd.busyIndicator.isActive = false;

        });
    }

    function searchTree(element, matchingId) {
        if (element.Id == matchingId) {
            return element;
        } else if (element.Children != undefined || element.Children != null) {
            var i;
            var result = null;
            for (i = 0; result == null && i < element.Children.length; i++) {
                result = searchTree(element.Children[i].Id, matchingId);
            }
            return result;
        }
        return null;
    }

    // Open Edit Content Modal
    coreCpMainMenugrd.openEditContentModal = function() {
        if (buttonIsPressed) { return };
        coreCpMainMenugrd.modalTitle = 'ویرایش';
        if (!coreCpMainMenugrd.gridOptions.selectedRow.item) {
            rashaErManage.showMessage($filter('translatentk')('please_select_a_row_to_edit'));
            return;
        }
        coreCpMainMenugrd.CmsUserGroup_Id = [];
        buttonIsPressed = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/', coreCpMainMenugrd.gridOptions.selectedRow.item.Id, 'GET').success(function(response) {
            buttonIsPressed = false;
            rashaErManage.checkAction(response);
            coreCpMainMenugrd.selectedItem = response.Item;
            $modal.open({
                templateUrl: 'cpanelv1/CmsModules/Core/coreCpMainMenu/edit.html',
                scope: $scope
            });
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }

    //Edit a Content
    coreCpMainMenugrd.editRow = function(frm) {
        if (frm.$invalid)
            return;
        coreCpMainMenugrd.addRequested = true;
        if (coreCpMainMenugrd.selectedItem.isDependencyModule == false || coreCpMainMenugrd.selectedItem.isDependencyModule == undefined)
            coreCpMainMenugrd.selectedItem.LinkModuleId = null;
        ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/', coreCpMainMenugrd.selectedItem, "PUT").success(function(response) {
            coreCpMainMenugrd.addRequested = false;
            coreCpMainMenugrd.busyIndicator.isActive = false;
            rashaErManage.checkAction(response);
            if (response.IsSuccess) {
                $.each(coreCpMainMenugrd.ListItems, function(index, item) {
                    if (item.Id == response.Item.Id) {
                        var index = coreCpMainMenugrd.ListItems.indexOf(item);
                        coreCpMainMenugrd.ListItems[index] = response.Item;
                    }
                });
                for (var i = 0; i < coreCpMainMenugrd.treeConfig.Items.length; i++) {
                    searchAndEditTreeItem(coreCpMainMenugrd.selectedItem, coreCpMainMenugrd.treeConfig.Items[i]);
                }
                coreCpMainMenugrd.closeModal();
            }
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
            coreCpMainMenugrd.addRequested = false;
        });
    }

    coreCpMainMenugrd.closeModal = function() {
        $modalStack.dismissAll();
    };

    coreCpMainMenugrd.replaceItem = function(oldId, newItem) {
        angular.forEach(coreCpMainMenugrd.ListItems, function(item, key) {
            if (item.Id == oldId) {
                var index = coreCpMainMenugrd.ListItems.indexOf(item);
                coreCpMainMenugrd.ListItems.splice(index, 1);
            }
        });
        if (newItem)
            coreCpMainMenugrd.ListItems.unshift(newItem);
    }

    // Delete a Content
    coreCpMainMenugrd.deleteContent = function() {
        if (buttonIsPressed) { return };
        if (!coreCpMainMenugrd.gridOptions.selectedRow.item) {
            rashaErManage.showMessage($filter('translatentk')('Please_Select_A_Row_To_Remove'));
            return;
        }
        rashaErManage.showYesNo(($filter('translatentk')('warning')), ($filter('translatentk')('do_you_want_to_delete_this_attribute')), function(isConfirmed) {
            if (isConfirmed) {
                //console.log(coreCpMainMenugrd.gridOptions.selectedRow.item);
                coreCpMainMenugrd.busyIndicator.isActive = true;
                buttonIsPressed = true;
                ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/', coreCpMainMenugrd.gridOptions.selectedRow.item.Id, 'GET').success(function(response) {
                    buttonIsPressed = false;
                    rashaErManage.checkAction(response);
                    coreCpMainMenugrd.selectedItemForDelete = response.Item;
                    // console.log(coreCpMainMenugrd.selectedItemForDelete);
                    ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/', coreCpMainMenugrd.selectedItemForDelete.Id, 'DELETE').success(function(res) {
                        rashaErManage.checkAction(res);
                        if (res.IsSuccess) {
                            coreCpMainMenugrd.replaceItem(coreCpMainMenugrd.selectedItemForDelete.Id);
                            coreCpMainMenugrd.gridOptions.fillData(coreCpMainMenugrd.ListItems);
                            if (coreCpMainMenugrd.selectedItemForDelete.LinkParentId == null) {
                                var elementPos = coreCpMainMenugrd.treeConfig.Items.map(function(x) { return x.Id; }).indexOf(coreCpMainMenugrd.selectedItemForDelete.Id); // find the index of an item in an array
                                coreCpMainMenugrd.treeConfig.Items.splice(elementPos, 1);
                            } else
                                for (var i = 0; i < coreCpMainMenugrd.treeConfig.Items.length; i++) {
                                    searchAndDeleteFromTree(coreCpMainMenugrd.selectedItemForDelete, coreCpMainMenugrd.treeConfig.Items[i]);
                                }
                        }
                    }).error(function(data2, errCode2, c2, d2) {
                        rashaErManage.checkAction(data2);
                    });
                }).error(function(data, errCode, c, d) {
                    rashaErManage.checkAction(data, errCode);
                });
                coreCpMainMenugrd.busyIndicator.isActive = false;
            }
        });
    }

    coreCpMainMenugrd.searchData = function() {
        coreCpMainMenugrd.addRequested = true;
        coreCpMainMenugrd.busyIndicator.isActive = true;
        ajax.call(cmsServerConfig.configApiServerPath + "CoreCpMainMenu/getAll", coreCpMainMenugrd.gridOptions.advancedSearchData.engine, 'POST').success(function(response) {
            rashaErManage.checkAction(response);
            coreCpMainMenugrd.responseListItems = response.ListItems;
            coreCpMainMenugrd.gridOptions.fillData(coreCpMainMenugrd.responseListItems);
            coreCpMainMenugrd.gridOptions.currentPageNumber = response.CurrentPageNumber;
            coreCpMainMenugrd.gridOptions.totalRowCount = response.TotalRowCount;
            coreCpMainMenugrd.gridOptions.rowPerPage = response.RowPerPage;
            coreCpMainMenugrd.gridOptions.maxSize = 5;
            coreCpMainMenugrd.addRequested = false;
            coreCpMainMenugrd.busyIndicator.isActive = false;
        }).error(function(data, errCode, c, d) {
            coreCpMainMenugrd.gridOptions.fillData();
            //console.log(data);
            rashaErManage.checkAction(data, errCode);
        });
    }
    //Selector directive config
    coreCpMainMenugrd.LinkParentIdSelector = {
        displayMember: 'Title',
        id: 'Id',
        fId: 'LinkParentId',
        url: 'CoreCpMainMenu',
        sortColumn: 'Id',
        sortType: 0,
        filterText: 'CoreCpMainMenu',
        rowPerPage: 200,
        scope: coreCpMainMenugrd,
        columnOptions: {
            columns: [
                { name: 'Id', displayName: 'کد سیستمی', sortable: true, type: 'integer' },
                { name: 'Title', displayName: 'عنوان', sortable: true, type: 'string' }
            ]
        }
    }

    coreCpMainMenugrd.gridOptions.reGetAll = function() {
        if (coreCpMainMenugrd.gridOptions.advancedSearchData.engine.Filters.length == 0)
            coreCpMainMenugrd.init();
        else
            coreCpMainMenugrd.searchData();
    }

    coreCpMainMenugrd.gridOptions.onRowSelected = function() {}

    coreCpMainMenugrd.columnCheckbox = false;

    coreCpMainMenugrd.openGridConfigModal = function() {
        $("#gridView-btn").toggleClass("active");
        if (coreCpMainMenugrd.gridOptions.columnCheckbox) {
            for (var i = 0; i < coreCpMainMenugrd.gridOptions.columns.length; i++) {
                var element = $("#" + coreCpMainMenugrd.gridOptions.columns[i].name.replace('.', '') + "Checkbox");
                coreCpMainMenugrd.gridOptions.columns[i].visible = element[0].checked;
            }
        } else {
            var prechangeColumns = coreCpMainMenugrd.gridOptions.columns;
            for (var i = 0; i < coreCpMainMenugrd.gridOptions.columns.length; i++) {
                coreCpMainMenugrd.gridOptions.columns[i].visible = true;
                var element = $("#" + coreCpMainMenugrd.gridOptions.columns[i].name.replace('.', '') + "Checkbox");
                $("#" + coreCpMainMenugrd.gridOptions.columns[i].name + "Checkbox").checked = prechangeColumns[i].visible;
            }
        }
        for (var i = 0; i < coreCpMainMenugrd.gridOptions.columns.length; i++) {
            //console.log(coreCpMainMenugrd.gridOptions.columns[i].name.concat(".visible: "), coreCpMainMenugrd.gridOptions.columns[i].visible);
        }
        coreCpMainMenugrd.gridOptions.columnCheckbox = !coreCpMainMenugrd.gridOptions.columnCheckbox;
    }

    coreCpMainMenugrd.selectParents = function() {
        var length = coreCpMainMenugrd.ListItems.length;
        var prenetListItems = [];
        for (var i = 0; i < length; i++) {
            if (coreCpMainMenugrd.ListItems[i].LinkParentId == null || coreCpMainMenugrd.ListItems[i].LinkParentId == undefined)
                prenetListItems.push(coreCpMainMenugrd.ListItems[i]);
        }
        return prenetListItems;
    }

    coreCpMainMenugrd.editStepGoUp = function(item, index) {
        if (index == 0) {
            rashaErManage.showMessage($filter('translatentk')('The_Menu_Is_At_The_Top_Of_The_List'));
            return;
        }
        coreCpMainMenugrd.gridBusyIndicator.isActive = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/', item.Id, 'GET').success(function(response1) {
            rashaErManage.checkAction(response1);
            coreCpMainMenugrd.selectedItem = response1.Item;
            var temp = response1.Item.ShowInMenuOrder;
            coreCpMainMenugrd.selectedItem.ShowInMenuOrder = coreCpMainMenugrd.gridOptions.data[index - 1].ShowInMenuOrder;
            ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/', coreCpMainMenugrd.selectedItem, "PUT").success(function(response2) {
                rashaErManage.checkAction(response2);
                if (response2.IsSuccess) {
                    ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/', coreCpMainMenugrd.gridOptions.data[index - 1].Id, 'GET').success(function(response3) {
                        rashaErManage.checkAction(response3);
                        coreCpMainMenugrd.selectedItem = response3.Item;
                        coreCpMainMenugrd.selectedItem.ShowInMenuOrder = temp;
                        ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/', coreCpMainMenugrd.selectedItem, "PUT").success(function(response4) {
                            coreCpMainMenugrd.gridBusyIndicator.isActive = false;
                            rashaErManage.checkAction(response4);
                            if (response4.IsSuccess) {
                                var engine = {};
                                engine.Filters = null;
                                engine.Filters = [];
                                var filterDataModel = {
                                    PropertyName: "LinkParentId",
                                    IntValue1: item.LinkParentId,
                                    SearchType: 0
                                };
                                coreCpMainMenugrd.gridOptions.data[index - 1].ShowInMenuOrder = response4.Item.ShowInMenuOrder;
                                // Swap two items in the grid ListItems
                                coreCpMainMenugrd.gridOptions.data[index] = coreCpMainMenugrd.gridOptions.data.splice(index - 1, 1, coreCpMainMenugrd.gridOptions.data[index])[0];
                                //coreCpMainMenugrd.gridOptions.fillData(coreCpMainMenugrd.gridOptions.data);

                                // Swap two items in the grid ListItems
                                if (item.LinkParentId == null) {
                                    var elementPos = coreCpMainMenugrd.treeConfig.Items.map(function(x) { return x.Id; }).indexOf(item.Id); // find the index of an item in an array
                                    coreCpMainMenugrd.treeConfig.Items[elementPos] = coreCpMainMenugrd.treeConfig.Items.splice(elementPos - 1, 1, coreCpMainMenugrd.treeConfig.Items[elementPos])[0];
                                } else
                                    var elementPos = coreCpMainMenugrd.treeConfig.Items.map(function(x) { return x.Id; }).indexOf(item.Id); // find the index of an item in an array
                            }
                        }).error(function(data, errCode, c, d) {
                            rashaErManage.checkAction(data, errCode);
                        });
                    }).error(function(data, errCode, c, d) {
                        rashaErManage.checkAction(data, errCode);
                    });
                }
            }).error(function(data, errCode, c, d) {
                rashaErManage.checkAction(data, errCode);
            });
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }

    coreCpMainMenugrd.editStepGoDown = function(item, index) {
        if (index == coreCpMainMenugrd.gridOptions.data.length - 1) {
            rashaErManage.showMessage($filter('translatentk')('The_Menu_Is_At_The_Bottom_Of_The_List'));
            return;
        }
        coreCpMainMenugrd.gridBusyIndicator.isActive = true;
        ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/', item.Id, 'GET').success(function(response1) {
            rashaErManage.checkAction(response1);
            coreCpMainMenugrd.selectedItem = response1.Item;
            var temp = response1.Item.ShowInMenuOrder;
            coreCpMainMenugrd.selectedItem.ShowInMenuOrder = coreCpMainMenugrd.gridOptions.data[index + 1].ShowInMenuOrder;
            ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/', coreCpMainMenugrd.selectedItem, "PUT").success(function(response2) {
                rashaErManage.checkAction(response2);
                if (response2.IsSuccess) {
                    ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/', coreCpMainMenugrd.gridOptions.data[index + 1].Id, 'GET').success(function(response3) {
                        rashaErManage.checkAction(response3);
                        coreCpMainMenugrd.selectedItem = response3.Item;
                        coreCpMainMenugrd.selectedItem.ShowInMenuOrder = temp;
                        ajax.call(cmsServerConfig.configApiServerPath + 'CoreCpMainMenu/', coreCpMainMenugrd.selectedItem, "PUT").success(function(response4) {
                            rashaErManage.checkAction(response4);
                            coreCpMainMenugrd.gridBusyIndicator.isActive = false;
                            if (response4.IsSuccess) {
                                var engine = {};
                                engine.Filters = null;
                                engine.Filters = [];
                                var filterDataModel = {
                                    PropertyName: "LinkParentId",
                                    IntValue1: item.LinkParentId,
                                    SearchType: 0
                                };
                                coreCpMainMenugrd.gridOptions.data[index + 1] = response4.Item;
                                // Swap two items in the grid ListItems
                                coreCpMainMenugrd.gridOptions.data[index] = coreCpMainMenugrd.gridOptions.data.splice(index + 1, 1, coreCpMainMenugrd.gridOptions.data[index])[0];
                                coreCpMainMenugrd.gridOptions.fillData(coreCpMainMenugrd.gridOptions.data);
                                var elementPos = coreCpMainMenugrd.treeConfig.Items.map(function(x) { return x.Id; }).indexOf(item.Id); // find the index of an item in an array
                                // Swap two items in the grid ListItems
                                coreCpMainMenugrd.treeConfig.Items[elementPos] = coreCpMainMenugrd.treeConfig.Items.splice(elementPos + 1, 1, coreCpMainMenugrd.treeConfig.Items[elementPos])[0];
                            }
                        }).error(function(data, errCode, c, d) {
                            rashaErManage.checkAction(data, errCode);
                        });
                    }).error(function(data, errCode, c, d) {
                        rashaErManage.checkAction(data, errCode);
                    });
                }
            }).error(function(data, errCode, c, d) {
                rashaErManage.checkAction(data, errCode);
            });
        }).error(function(data, errCode, c, d) {
            rashaErManage.checkAction(data, errCode);
        });
    }

    coreCpMainMenugrd.selectRoots = function() {
        coreCpMainMenugrd.gridOptions.fillData(coreCpMainMenugrd.ListParentItems, null);
    }

    //------------------------ Add, edit and delete an Item to and from Tree Menu -------------------------------
    function compare(a, b) {
        if (a.ShowInMenuOrder < b.ShowInMenuOrder)
            return -1;
        if (a.ShowInMenuOrder > b.ShowInMenuOrder)
            return 1;
        return 0;
    }

    function sortChildren(menuListItems) {
        for (var i = 0; i < menuListItems.length; i++) {
            menuListItems[i].Children.sort(compare);
        }
    }

    function searchAndDeleteFromTree(deletedItem, currentNode) {
        var i,
            currentChild,
            result;

        if (deletedItem.LinkParentId == currentNode.Id) {
            var elementPos = currentNode.Children.map(function(x) { return x.Id; }).indexOf(deletedItem.Id); // find the index of an item in an array
            if (elementPos > -1)
                currentNode.Children.splice(elementPos, 1);
            return true;
        } else {
            // Use a for loop instead of forEach to avoid nested functions
            // Otherwise "return" will not work properly
            if (currentNode.Children != undefined)
                for (i = 0; i < currentNode.Children.length; i += 1) {
                    currentChild = currentNode.Children[i];

                    // Search in the current child
                    result = searchAndDeleteFromTree(deletedItem, currentChild);

                    // Return the result if the node has been found
                    if (result !== false) {
                        return result;
                    }
                }
            // The node has not been found and we have no more options
            return false;
        }
    }

    function searchAndEditTreeItem(editedItem, currentNode) {
        var i,
            currentChild,
            result;

        if (editedItem.Id == currentNode.Id) {
            currentNode.Title = editedItem.Title;
            return true;
        } else {
            // Use a for loop instead of forEach to avoid nested functions
            // Otherwise "return" will not work properly
            if (currentNode.Children != undefined)
                for (i = 0; i < currentNode.Children.length; i += 1) {
                    currentChild = currentNode.Children[i];

                    // Search in the current child
                    result = searchAndEditTreeItem(editedItem, currentChild);

                    // Return the result if the node has been found
                    if (result !== false) {
                        return result;
                    }
                }
            // The node has not been found and we have no more options
            return false;
        }
    }

    function searchAndSwapTreeItem(selectedItem, currentNode, dir) {
        var i,
            currentChild,
            result;

        if (selectedItem.LinkParentId == currentNode.Id) {
            //currentNode.Title = selectedItem.Title;
            var elementPos = menuItemCtrl.treeConfig.currentNode.Children.map(function(x) { return x.Id; }).indexOf(item.Id); // find the index of an item in an array
            // Swap two items in the grid ListItems
            if (dir = "down")
                currentNode.Children[elementPos] = currentNode.Children.splice(elementPos + 1, 1, currentNode.Children[elementPos])[0];
            else
                menuItemCtrl.treeConfig.currentNode.Children[elementPos] = menuItemCtrl.treeConfig.currentNode.Children.splice(elementPos + 1, 1, menuItemCtrl.treeConfig.currentNode.Children[elementPos])[0];
            return true;
        } else {
            // Use a for loop instead of forEach to avoid nested functions
            // Otherwise "return" will not work properly
            if (currentNode.Children != undefined)
                for (i = 0; i < currentNode.Children.length; i += 1) {
                    currentChild = currentNode.Children[i];

                    // Search in the current child
                    result = searchAndSwapTreeItem(selectedItem, currentChild);

                    // Return the result if the node has been found
                    if (result !== false) {
                        return result;
                    }
                }
            // The node has not been found and we have no more options
            return false;
        }
    }

    function searchAndAddToTree(newItem, currentNode) {
        var i,
            currentChild,
            result;
        if (newItem.LinkParentId == currentNode.Id) {
            currentNode.Children.push(newItem);
            return true;
        } else {
            //Use a for loop instead of forEach to avoid nested functions
            //Otherwise "return" will not work properly
            if (currentNode.Children != undefined)
                for (i = 0; i < currentNode.Children.length; i += 1) {
                    currentChild = currentNode.Children[i];
                    //Search in the current child
                    result = searchAndAddToTree(newItem, currentChild);
                    //Return the result if the node has been found
                    if (result !== false) {
                        return result;
                    }
                }
            //The node has not been found and we have no more options
            return false;
        }
    }
    //--------

}]);