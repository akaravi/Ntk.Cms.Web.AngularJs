angular.module('inspinia')
    .run(function ($rootScope, $state) {
        $rootScope.$state = $state;
    })
    .config([
        '$stateProvider', '$urlRouterProvider', '$ocLazyLoadProvider',
        function ($stateProvider, $urlRouterProvider, $ocLazyLoadProvider) {
            $urlRouterProvider.otherwise("/login");
            $ocLazyLoadProvider.config({
                // Set to true if you want to see what and when is dynamically loaded
                debug: false,
                reconfig: true
            });
            $stateProvider
                .state('login', {
                    url: "/login",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsUser/login.html",
                    data: {
                        pageTitle: 'Login',
                        specialClass: 'gray-bg'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsUser/loginController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("siteSelector", {
                    url: "/siteSelector",
                    templateUrl: "cpanelv1/CmsModules/Core/main/siteSelector.html",
                    data: {
                        pageTitle: "انتخاب سایت"
                    },
                    resolve: {
                        deps: [
                            "$ocLazyLoad",
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        "cpanelv1/CmsModules/Core/main/navigationController.js"
                                    ]
                                });
                            }
                        ]
                    }
                })

                .state('index.main', {
                    url: "/main",
                    templateUrl: "cpanelv1/CmsModules/Core/main/dashboard.html",
                    controller: "dashbCtrl",
                    controllerAs: "dashb",
                    data: {
                        pageTitle: 'داشبورد سیستمی'
                    },
                    ncyBreadcrumb: {
                        label: 'داشبورد'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'summernote', {
                                        //serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Core/Main/dashboard.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("user_wizard", {
                    url: "/user_wizard",
                    controller: "registerUserCtrl",
                    controllerAs: "register",
                    templateUrl: "cpanelv1/CmsModules/Core/user-wizard/form_wizard.html",
                    data: {
                        pagetTitle: "New User",
                        specialClass: "gray-bg"
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/js/registerUserController.js',
                                        'cpanelv1/CmsModules/Core/user-wizard/jquery.steps.css'
                                    ]
                                });
                            }
                        ]
                    }

                })
                .state("user_wizard.step_one", {
                    url: "/step_one",
                    templateUrl: "cpanelv1/CmsModules/Core/user-wizard/step_one.html",
                    data: {
                        pagetTitle: "New User",
                        specialClass: "gray-bg"
                    }
                })
                .state("user_wizard.step_two", {
                    url: "/step_two",
                    templateUrl: "cpanelv1/CmsModules/Core/user-wizard/step_two.html",
                    data: {
                        pagetTitle: "New User",
                        specialClass: "gray-bg"
                    }
                })
                .state("user_wizard.step_three", {
                    url: "/step_three",
                    templateUrl: "cpanelv1/CmsModules/Core/user-wizard/step_three.html",
                    data: {
                        pagetTitle: "New User",
                        specialClass: "gray-bg"
                    }
                })
                .state("user_wizard.step_four", {
                    url: "/step_four",
                    templateUrl: "cpanelv1/CmsModules/Core/user-wizard/step_four.html",
                    data: {
                        pagetTitle: "New User",
                        specialClass: "gray-bg"
                    }
                })
                //-----Core Module-----
                .state("index.coremoduletag", {
                    url: "/coremoduletag",
                    templateUrl: "cpanelv1/CmsModules/CoreModule/Tag/grid.html",
                    controller: "coreTagController",
                    controllerAs: "coreTag",
                    data: {
                        pageTitle: "تگ سیستم"
                    },
                    ncyBreadcrumb: {
                        label: 'تگ سیستم'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/CoreModule/Tag/TagController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                
                //-----Core Module-----
                //-----Core-----
                .state("index.cmsuser", {
                    url: "/cmsuser",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsUser/grid.html",
                    controller: "cmsUserController",
                    controllerAs: "cmsUser",
                    data: {
                        pageTitle: "کاربران سیستم"
                    },
                    ncyBreadcrumb: {
                        label: 'کاربران سیستم'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsUser/cmsUserController.js'
                                    ]
                                });
                            }
                        ]
                    }

                })
                .state("index.corecpmainmenu", {
                    url: "/orecpmainmenu",
                    templateUrl: "cpanelv1/CmsModules/Core/coreCpMainMenu/grid.html",
                    controller: "coreCpMainMenuGridCtrl",
                    controllerAs: "coreCpMainMenugrd",
                    data: {
                        pageTitle: "منو"
                    },
                    ncyBreadcrumb: {
                        label: 'منو'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load(['minicolors', {
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CoreCpMainMenu/coreCpMainMenuController.js'
                                    ]
                                }]);
                            }
                        ]
                    }

                })
                .state("index.cmslocation", {
                    url: "/cmslocation",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsLocation/grid.html",
                    controller: "cmsLocationController",
                    controllerAs: "cmsLocation",
                    data: {
                        pageTitle: "مکان"
                    },
                    ncyBreadcrumb: {
                        label: 'مکان'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsLocation/cmsLocationController.js'
                                    ]
                                });
                            }
                        ]
                    }

                })
                .state("index.cmsuserbadlogingrd", {
                    url: "/cmsuserbadlogingrd",
                    templateUrl: "cpanelv1/CmsModules/Core/cmsUserBadLogin/grid.html",
                    controller: "cmsUserBadLoginGridCtrl",
                    controllerAs: "cmsUserBadLogingrd",
                    data: {
                        pageTitle: "لاگین های نادرست"
                    },
                    ncyBreadcrumb: {
                        label: 'لاگین های نادرست'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsUserBadLogin/cmsUserBadLoginController.js'
                                    ]
                                });
                            }
                        ]
                    }

                })
                .state("index.cmsusergroup", {
                    url: "/cmsusergroup",
                    templateUrl: "cpanelv1/CmsModules/Core/cmsUserGroup/grid.html",
                    controller: "cmsUserGroupGridCtrl",
                    controllerAs: "cmsUserGroupgrd",
                    data: {
                        pageTitle: "گروه بندی کاربران"
                    },
                    ncyBreadcrumb: {
                        label: 'گروه بندی کاربران'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsUserGroup/cmsUserGroupController.js'
                                    ]
                                });
                            }
                        ]
                    }

                })
                .state("index.cmssiteuser", {
                    url: "/cmssiteuser",

                    templateUrl: "cpanelv1/CmsModules/Core/cmsSiteUser/grid.html",
                    controller: "cmsSiteUserGridCtrl",
                    controllerAs: "cmsSiteUser",
                    data: {
                        pageTitle: "کاربران سایت"
                    },
                    ncyBreadcrumb: {
                        label: 'کاربران سایت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Core/CmsSiteUser/CmsSiteUserController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }

                })
                .state("index.cmspagetemplate", {
                    url: "/cmspagetemplate",
                    templateUrl: "cpanelv1/CmsModules/WebDesigner/CmsPageTemplate/grid.html",
                    controller: "cmsPageTemplateGridCtrl",
                    controllerAs: "cmsPageTemplategrd",
                    data: {
                        pageTitle: "قالب ها"
                    },
                    ncyBreadcrumb: {
                        label: 'قالب ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/WebDesigner/CmsPageTemplate/CmsPageTemplateController.js'
                                    ]
                                });
                            }
                        ]
                    }

                })
                .state("index.cmssite", {
                    url: "/cmssite",
                    templateUrl: "cpanelv1/CmsModules/Core/cmsSite/grid.html",
                    params: {
                        selectedId: null
                    },
                    controller: "cmsSiteGridCtrl",
                    controllerAs: "cmsSitegrd",
                    data: {
                        pageTitle: "سایت ها"
                    },
                    ncyBreadcrumb: {
                        label: 'سایت ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", 'ADM-dateTimePicker', {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Core/CmsSite/cmsSiteController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.domainaliases", {
                    url: "/domainaliases",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsDomainAlias/grid.html",
                    controller: "domainAliasController",
                    controllerAs: "domainAlias",
                    data: {
                        pageTitle: "های دامنه Alias"
                    },
                    ncyBreadcrumb: {
                        label: "های دامنه Alias"
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    //serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsDomainAlias/domainAliasController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state("index.cmssitecategories", {
                    url: "/cmssitecategories",
                    templateUrl: "cpanelv1/CmsModules/Core/cmsSiteCategory/grid.html",
                    controller: "cmsSiteCategoryGridCtrl",
                    controllerAs: "cmsSiteCategorygrd",
                    data: {
                        pageTitle: "دسته بندی سایت ها"
                    },
                    ncyBreadcrumb: {
                        label: 'دسته بندی سایت ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsSiteCategory/cmsSiteCategoryController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.cmssitecategorycmsmodule", {
                    url: "/cmssitecategorycmsmodule",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsSiteCategoryCmsModule/grid.html",
                    controller: "cmsSiteCategoryCmsModuleCtrl",
                    controllerAs: "cmsSiteCategoryCmsModule",
                    data: {
                        pageTitle: "ماژول های دسته"
                    },
                    ncyBreadcrumb: {
                        label: "ماژول های دسته"
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsSiteCategoryCmsModule/cmsSiteCategoryCmsModuleController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.cmspages", {
                    url: "/cmspages",
                    templateUrl: "cpanelv1/CmsModules/WebDesigner/CmsPage/grid.html",
                    controller: "cmsPageGridCtrl",
                    controllerAs: "cmsPagegrd",
                    data: {
                        pageTitle: "صفحات سایت"
                    },
                    ncyBreadcrumb: {
                        label: 'صفحات سایت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/WebDesigner/CmsPage/cmsPageController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.cmspagesdesign", {
                    url: "/cmspagesdesign",
                    templateUrl: "cpanelv1/CmsModules/WebDesigner/CmsPage/boxes.html",
                    params: {
                        dependencyId: null,
                        dependencyTitle: null,
                        classActioName: null,
                        moduleId: null,
                        moduleTitle: null
                    },
                    controller: "cmsPageGridDesignCtrl",
                    controllerAs: "cmsPageDesign",
                    data: {
                        pageTitle: "صفحات سایت"
                    },
                    ncyBreadcrumb: {
                        label: 'صفحات سایت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/WebDesigner/CmsPage/cmsPageDesignController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
           
                .state("index.modulesaleprice", {
                    url: "/modulesaleprice",
                    templateUrl: "cpanelv1/CmsModules/Core/cmsModuleSalePrice/grid.html",
                    controller: "cmsModuleSalePriceGridCtrl",
                    controllerAs: "cmsModulePricegrd",
                    data: {
                        pageTitle: "قیمت فروش ماژول"
                    },
                    ncyBreadcrumb: {
                        label: 'قیمت فروش ماژول'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsModuleSalePrice/cmsModuleSalePriceController.js'
                                    ]
                                });
                            }
                        ]
                    }

                })
                .state("index.cmsmoduleprocess", {
                    url: "/cmsmoduleprocess",
                    templateUrl: "cpanelv1/CmsModules/Core/cmsModuleProcess/grid.html",
                    controller: "cmsModuleProcessGridCtrl",
                    controllerAs: "cmsModulePrc",
                    data: {
                        pageTitle: "قیمت فروش ماژول"
                    },
                    ncyBreadcrumb: {
                        label: 'قیمت فروش ماژول'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsModuleProcess/cmsModuleProcessController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.cmsmoduleprocesscustomize", {
                    url: "/cmsmoduleprocesscustomize",
                    templateUrl: "cpanelv1/CmsModules/Core/cmsModuleProcessCustomize/grid.html",
                    params: {
                        cmsModulePrcId: null
                    },
                    controller: "cmsModuleProcessCustomizeGridCtrl",
                    controllerAs: "cmsMdlPrcCustm",
                    data: {
                        pageTitle: "بکار گیری ماژول"
                    },
                    ncyBreadcrumb: {
                        label: 'بکار گیری ماژول'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'treeControl', {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Core/CmsModuleProcessCustomize/cmsModuleProcessCustomizeController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.cmsmodulesite", {
                    url: "/cmsmodulesite",
                    templateUrl: "cpanelv1/CmsModules/Core/cmsModuleSite/grid.html",
                    controller: "cmsModuleSiteGridCtrl",
                    controllerAs: "cmsModuleSitegrd",
                    data: {
                        pageTitle: "ماژول های سایت"
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول های سایت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsModuleSite/CmsModuleSiteController.js'
                                    ]
                                });
                            }
                        ]
                    }

                })
                .state("index.cmsmodules", {
                    url: "/cmsmodules",
                    templateUrl: "cpanelv1/CmsModules/Core/cmsModule/grid.html",
                    controller: "cmsModuleGridCtrl",
                    controllerAs: "cmsModulegrd",
                    data: {
                        pageTitle: "ماژول ها"
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsModule/cmsModuleController.js'
                                    ]
                                });
                            }
                        ]
                    }

                })
                //.state("index.cmsmoduleoptimizer",
                //    {
                //        url: "/cmsmoduleoptimizer",
                //        templateUrl: "cpanelv1/CmsModules/Core/CmsModuleOptimizer/grid.html",
                //        controller: "cmsModuleOptimizerGridController",
                //        controllerAs: "cmsModuleOptimizer",
                //        data: { pageTitle: "ماژول ها" },
                //        ncyBreadcrumb: {
                //            label: 'ماژول ها'
                //        },
                //        resolve: {
                //            deps: [
                //                '$ocLazyLoad',
                //                function($ocLazyLoad) {
                //                    return $ocLazyLoad.load({
                //                        serie: true,
                //                        files: [
                //                            'cpanelv1/CmsModules/Core/CmsModuleOptimizer/cmsModuleOptimizerController.js'
                //                        ]
                //                    });
                //                }
                //            ]
                //        }

                //    })
                .state("index.cmsmodulepagedependency", {
                    url: "/cmsModulepagedependency",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsModulePageDependency/grid.html",
                    controller: "cmsModulePageDependencyGridCtrl",
                    controllerAs: "cmsModulePageDependencygrd",
                    data: {
                        pageTitle: "وابستگی ها"
                    },
                    ncyBreadcrumb: {
                        label: 'وابستگی ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsModulePageDependency/CmsModulePageDependencyController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                //-----cmsmodulescheduleprocess-----
                .state("index.cmsmodulescheduleprocess", {
                    url: "/cmsmodulescheduleprocess",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsModuleScheduleProcess/grid.html",
                    controller: "cmsModuleScheduleProcessCtrl",
                    controllerAs: "cmsMdlPayPrc",
                    data: {
                        pageTitle: "فعالیت پرداخت"
                    },
                    ncyBreadcrumb: {
                        label: 'فعالیت پرداخت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsModuleScheduleProcess/cmsModuleScheduleProcessController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.cmsmodulescheduleprocesscustomize", {
                    url: "/cmsmodulescheduleprocesscustomize",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsModuleScheduleProcessCustomize/grid.html",
                    controller: "cmsModuleScheduleProcessCustomizeCtrl",
                    controllerAs: "cmsMdlPayPrcCust",
                    data: {
                        pageTitle: "بکارگیری فعالیت پرداخت"
                    },
                    ncyBreadcrumb: {
                        label: 'بکارگیری فعالیت پرداخت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsModuleScheduleProcessCustomize/cmsModuleScheduleProcessCustomizeController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                //-----cmsmodulepaymentprocess-----
                .state("index.cmsmodulepaymentprocess", {
                    url: "/cmsmodulepaymentprocess",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsModulePaymentProcess/grid.html",
                    controller: "cmsModulePaymentProcessCtrl",
                    controllerAs: "cmsMdlPayPrc",
                    data: {
                        pageTitle: "فعالیت پرداخت"
                    },
                    ncyBreadcrumb: {
                        label: 'فعالیت پرداخت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsModulePaymentProcess/cmsModulePaymentProcessController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.cmsmodulepaymentprocesscustomize", {
                    url: "/cmsmodulepaymentprocesscustomize",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsModulePaymentProcessCustomize/grid.html",
                    params: {
                        cmsMdlPayPrcId: null
                    },
                    controller: "cmsModulePaymentProcessCustomizeCtrl",
                    controllerAs: "cmsMdlPayPrcCust",
                    data: {
                        pageTitle: "بکارگیری فعالیت پرداخت"
                    },
                    ncyBreadcrumb: {
                        label: 'بکارگیری فعالیت پرداخت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsModulePaymentProcessCustomize/cmsModulePaymentProcessCustomizeController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                //-----Monitoring-----
                .state("index.usertickets", {
                    url: "/usertickets",
                    templateUrl: "cpanelv1/CmsModules/Core/cmsUserTicket/grid.html",
                    controller: "cmsUserTicketGridCtrl",
                    controllerAs: "cmsUserTicketgrd",
                    data: {
                        pageTitle: "توکن ها"
                    },
                    ncyBreadcrumb: {
                        label: 'توکن ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsUserTicket/cmsUserTicketController.js'
                                    ]
                                });
                            }
                        ]
                    }

                })
                //-----Module File-----
                .state("index.filemanager", {
                    url: "/filemanager",
                    templateUrl: "cpanelv1/CmsModules/File/main.html",
                    controller: "FileManager",
                    controllerAs: "fdm",
                    data: {
                        pageTitle: "مدیریت فایل"
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت فایل'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/File/FileManagerController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.filemanagernew", {
                    url: "/filemanagernew",
                    templateUrl: "cpanelv1/CmsModules/File/FileManager/grid.html",
                    controller: "FileManager",
                    controllerAs: "fdm",
                    data: {
                        pageTitle: "مدیریت فایل"
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت فایل'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/File/FileManager/FileManagerController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.fileslist", {
                    url: "/fileslist",
                    templateUrl: "cpanelv1/CmsModules/File/grid.html",
                    controller: "filesListCtrl",
                    controllerAs: "filesList",
                    data: {
                        pageTitle: "مدیریت فایل"
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت فایل'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/File/fileListController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.filespropertytype", {
                    url: "/filespropertytype",
                    templateUrl: "cpanelv1/CmsModules/File/grid.html",
                    controller: "filesListCtrl",
                    controllerAs: "filesList",
                    data: {
                        pageTitle: "مدیریت فایل"
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت فایل'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/File/fileListController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                //---------------------
                .state('index', {
                    //abstract: true,
                    url: "/index",
                    ncyBreadcrumb: {
                        skip: true,
                        label: ' '
                    },
                    //data: { pageTitle: 'صفحه اصلی' },
                    views: {
                        '': {
                            templateUrl: "cpanelv1/CmsModules/Core/main/content.html",
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function ($ocLazyLoad) {
                                        return $ocLazyLoad.load({
                                            serie: true,
                                            files: [
                                                'cpanelv1/CmsModules/Core/main/controllers.js'
                                            ]
                                        });
                                    }
                                ]
                            }
                        },
                        'navigation@index': {
                            url: "",
                            controller: 'navigationCtrl',
                            templateUrl: 'cpanelv1/CmsModules/Core/main/navigation.html',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function ($ocLazyLoad) {
                                        return $ocLazyLoad.load({
                                            serie: true,
                                            files: [
                                                'cpanelv1/CmsModules/Core/main/navigationController.js'
                                            ]
                                        });
                                    }
                                ]
                            }
                        },
                        'navigationup@index': {
                            url: "",
                            controller: 'navigationCtrl',
                            templateUrl: 'cpanelv1/CmsModules/Core/main/navigationup.html',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function ($ocLazyLoad) {
                                        return $ocLazyLoad.load({
                                            serie: true,
                                            files: [
                                                'cpanelv1/CmsModules/Core/main/navigationController.js'
                                            ]
                                        });
                                    }
                                ]
                            }
                        },
                        'navigationdown@index': {
                            url: "",
                            controller: 'navigationCtrl',
                            templateUrl: 'cpanelv1/CmsModules/Core/main/navigationdown.html',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function ($ocLazyLoad) {
                                        return $ocLazyLoad.load({
                                            serie: true,
                                            files: [
                                                'cpanelv1/CmsModules/Core/main/navigationController.js'
                                            ]
                                        });
                                    }
                                ]
                            }
                        },

                        'topnavbar@index': {
                            url: '',
                            controller: 'topNavBarCtrl',
                            controllerAs: 'topNavBar',
                            templateUrl: 'cpanelv1/CmsModules/Core/main/topnavbar.html',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function ($ocLazyLoad) {
                                        return $ocLazyLoad.load([
                                            'angucomplete-alt', {
                                                serie: true,
                                                files: [
                                                    'cpanelv1/CmsModules/Core/main/topnavbarController.js',
                                                    'cpanelv1/css/guide/introjs.css',
                                                    'cpanelv1/css/guide/introjs-rtl.css',
                                                    'cpanelv1/js/guide/intro.js',
                                                    'cpanelv1/js/guide/angular-intro.min.js'
                                                ]
                                            }
                                        ]);
                                    }
                                ]
                            }
                        },
                        'footer@index': {
                            url: '',
                            controller: 'footerCtrl',
                            templateUrl: 'cpanelv1/CmsModules/Core/main/footer.html',
                            resolve: {
                                deps: [
                                    '$ocLazyLoad',
                                    function ($ocLazyLoad) {
                                        return $ocLazyLoad.load({
                                            serie: true,
                                            files: [
                                                'cpanelv1/CmsModules/Core/main/footerController.js'
                                            ]
                                        });
                                    }
                                ]
                            }
                        }
                    }
                })

                .state('index.buy_module', {
                    url: "/buy_module",
                    templateUrl: "cpanelv1/CmsModules/Core/common/buy_module.html",
                    controller: "buyModuleCtrl",
                    controllerAs: "buyModule",
                    data: {
                        pageTitle: 'خرید ماژول'
                    },
                    ncyBreadcrumb: {
                        label: 'خرید ماژول'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {

                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/Core/common/buyModuleController.js',
                                        'cpanelv1/CmsModules/Core/user-wizard/jquery.steps.css'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state("index.buy_module.step_one", {
                    url: "/step_one",
                    templateUrl: "cpanelv1/CmsModules/Core/common/buy_module_step_one.html",
                    data: {
                        pagetTitle: "New User",
                        specialClass: "gray-bg"
                    },
                    ncyBreadcrumb: {
                        label: 'مرحله اول'
                    }
                })
                .state("index.buy_module.step_two", {
                    url: "/step_two",
                    templateUrl: "cpanelv1/CmsModules/Core/common/buy_module_step_two.html",
                    data: {
                        pagetTitle: "New User",
                        specialClass: "gray-bg"
                    },
                    ncyBreadcrumb: {
                        label: 'مرحله دوم'
                    }
                })
                .state("index.buy_module.step_three", {
                    url: "/step_three",
                    templateUrl: "cpanelv1/CmsModules/Core/common/buy_module_step_three.html",
                    data: {
                        pagetTitle: "New User",
                        specialClass: "gray-bg"
                    },
                    ncyBreadcrumb: {
                        label: 'مرحله سوم'
                    }
                })
                .state('index.minor', {
                    url: "/minor",
                    templateUrl: "cpanelv1/CmsModules/Core/minor.html",
                    controller: "formCtrl",
                    controllerAs: "frm",
                    data: {
                        pageTitle: 'صفحه مینور'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'nouislider', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/js/formController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.NewsManage', {
                    url: "/NewsManage",
                    templateUrl: "cpanelv1/CmsModules/News/NewsManage.html",
                    controller: "newsManageCtrl",
                    controllerAs: "newsManageCtrl",
                    data: {
                        pageTitle: 'صفحه مینور'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/News/NewManage.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.grid', {
                    url: "/grid",
                    templateUrl: "cpanelv1/CmsModules/Core/grid.html",
                    controller: "gridCtrl",
                    controllerAs: "grd",
                    data: {
                        pageTitle: 'صفحه گرید'
                    },
                    ncyBreadcrumb: {
                        label: 'گرید'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/js/plugins/angular-floatthead/jquery.floatThead.js',
                                        'cpanelv1/js/gridController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.designer', {
                    url: "/designer",
                    templateUrl: "cpanelv1/CmsModules/Core/common/designer.html",
                    controller: "designerCtrl",
                    controllerAs: "designerct",
                    data: {
                        pageTitle: 'صفحه طراحی'
                    },
                    ncyBreadcrumb: {
                        label: 'طراحی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/js/designerCtrl.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.cmsapipath', {
                    url: "/cmsapipath",
                    templateUrl: "cpanelv1/CmsModules/Sms/ApiPath/main.html",
                    controller: "apiPathCtrl",
                    controllerAs: "api",
                    data: {
                        pageTitle: 'مسیر های ارسال پیام کوتاه'
                    },
                    ncyBreadcrumb: {
                        label: 'مسیر های ارسال پیام کوتاه'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    //serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Sms/ApiPathController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.cmspathconfig', {
                    url: "/cmspathconfig",
                    templateUrl: "cpanelv1/CmsModules/Sms/ApiPathSettingsTabs/main.html",
                    controller: "apiPathSettingsCtrl",
                    controllerAs: "apiSetting",
                    data: {
                        pageTitle: 'مسیر های ارسال پیام کوتاه'
                    },
                    ncyBreadcrumb: {
                        label: 'مسیر های ارسال پیام کوتاه'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    //serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Sms/ApiPathSettingsController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.cmscustomernumber', {
                    url: "/cmscustomernumber",
                    templateUrl: "cpanelv1/CmsModules/Sms/CustomerNumber/main.html",
                    controller: "customerNumberCtrl",
                    controllerAs: "customerNumber",
                    data: {
                        pageTitle: 'شماره مشتری'
                    },
                    ncyBreadcrumb: {
                        label: 'شماره مشتری'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    //serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Sms/CustomerNumberController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.smsinbox', {
                    url: "/smsinbox",
                    templateUrl: "cpanelv1/CmsModules/Sms/Inbox/main.html",
                    controller: "inboxCtrl",
                    controllerAs: "inbox",
                    data: {
                        pageTitle: 'صندوق ورودی'
                    },
                    ncyBreadcrumb: {
                        label: 'صندوق ورودی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    //serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Sms/InboxController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.smsoutbox', {
                    url: "/smsoutbox",
                    templateUrl: "cpanelv1/CmsModules/Sms/OutBox/main.html",
                    controller: "outBoxCtrl",
                    controllerAs: "outBox",
                    data: {
                        pageTitle: 'صندوق خروجی'
                    },
                    ncyBreadcrumb: {
                        label: 'صندوق خروجی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    //serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Sms/OutBoxController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.smsinboxlock', {
                    url: "/smsinboxlock",
                    templateUrl: "cpanelv1/CmsModules/Sms/InboxLock/main.html",
                    controller: "inboxLockCtrl",
                    controllerAs: "inboxLock",
                    data: {
                        pageTitle: 'پیام ها'
                    },
                    ncyBreadcrumb: {
                        label: 'پیام های قفل شده'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    //serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Sms/InboxLockController.js'
                                        //  
                                        //  
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.cmsapicompany', {
                    url: "/cmsapicompany",
                    templateUrl: "cpanelv1/CmsModules/Sms/ApiPathCompany/main.html",
                    controller: "apiPathCompanyCtrl",
                    controllerAs: "apiCompany",
                    data: {
                        pageTitle: 'شرکت های پیام کوتاه'
                    },
                    ncyBreadcrumb: {
                        label: 'شرکت های پیام کوتاه'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    //serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Sms/ApiPathCompanyController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.apipathcustomer', {
                    url: "/apipathcustomer",
                    templateUrl: "cpanelv1/CmsModules/Sms/ApiPathAndCustomerNumber/main.html",
                    controller: "apiPathCustomerCtrl",
                    controllerAs: "apiPathCustomer",
                    data: {
                        pageTitle: 'مسیر و مشتریان'
                    },
                    ncyBreadcrumb: {
                        label: 'مسیر و مشتریان'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    //serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Sms/ApiPathAndCustomerNumberController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.smsoutboxdetail', {
                    url: "/smsoutboxdetail",
                    templateUrl: "cpanelv1/CmsModules/Sms/OutBoxDetail/main.html",
                    controller: "outBoxDetailCtrl",
                    controllerAs: "outBoxDetail",
                    data: {
                        pageTitle: 'پیام ها'
                    },
                    ncyBreadcrumb: {
                        label: 'جزئیات خروجی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    //serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Sms/OutBoxDetailController.js'
                                        //   
                                        //   
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.inbox', {
                    url: "/inbox",
                    templateUrl: "cpanelv1/CmsModules/Sms/Inbox/main.html",
                    controller: "inboxCtrl",
                    controllerAs: "inbox",
                    data: {
                        pageTitle: 'صندوق ورودی'
                    },
                    ncyBreadcrumb: {
                        label: 'صندوق ورودی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    //serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Sms/InboxController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                //-----CoreIdentity Module-----
                .state('index.coreidentityuser', {
                    url: "/coreidentityuser",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/CoreIdentity/CoreIdentityUser/grid.html",
                    controller: "coreIdentityUserController",
                    controllerAs: "coreIdentityUser",
                    data: {
                        pageTitle: 'کاربران'
                    },
                    ncyBreadcrumb: {
                        label: 'کاربران'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/CoreIdentity/CoreIdentityUser/Controller.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.coreidentityuserlogin', {
                    url: "/coreidentityuserlogin",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/CoreIdentity/CoreIdentityUserLogin/grid.html",
                    controller: "coreIdentityUserLoginController",
                    controllerAs: "coreIdentityUserLogin",
                    data: {
                        pageTitle: 'لاگ کاربران'
                    },
                    ncyBreadcrumb: {
                        label: 'لاگ کاربران'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/CoreIdentity/CoreIdentityUserLogin/Controller.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.coreidentityusertoken', {
                    url: "/coreidentityusertoken",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/CoreIdentity/CoreIdentityUserToken/grid.html",
                    controller: "coreIdentityUserTokenController",
                    controllerAs: "coreIdentityUserToken",
                    data: {
                        pageTitle: 'توکن کاربران'
                    },
                    ncyBreadcrumb: {
                        label: 'توکن کاربران'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/CoreIdentity/CoreIdentityUserToken/Controller.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.coreidentityrole', {
                    url: "/coreidentityrole",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/CoreIdentity/CoreIdentityRole/grid.html",
                    controller: "coreIdentityRoleController",
                    controllerAs: "coreIdentityRole",
                    data: {
                        pageTitle: 'کاربران'
                    },
                    ncyBreadcrumb: {
                        label: 'کاربران'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/CoreIdentity/CoreIdentityRole/Controller.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----CoreIdentity Module-----
                //-----News Module-----
                .state('index.newscontent', {
                    url: "/newscontent",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/News/NewsContent/grid.html",
                    controller: "newsContentController",
                    controllerAs: "newsContent",
                    data: {
                        pageTitle: 'محتوای اخبار'
                    },
                    ncyBreadcrumb: {
                        label: 'محتوای اخبار'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/News/NewsContent/Controller.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.newscomment', {
                    url: "/newscomment",
                    templateUrl: "cpanelv1/CmsModules/News/NewsComment/grid.html",
                    controller: "newsCommentCtrl",
                    controllerAs: "newsComment",
                    data: {
                        pageTitle: 'اخبار-کامنت'
                    },
                    ncyBreadcrumb: {
                        label: 'کامنت اخبار'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/News/NewsComment/NewsComment.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.newstag', {
                    url: "/newstag",
                    templateUrl: "cpanelv1/CmsModules/News/NewsTag/grid.html",
                    controller: "newsTagCtrl",
                    controllerAs: "newsTag",
                    data: {
                        pageTitle: 'تگهای اخبار'
                    },
                    ncyBreadcrumb: {
                        label: 'تگ اخبار'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/News/NewsTag/NewsTag.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.mscgallerytag', {
                    url: "/mscgallerytag",
                    templateUrl: "cpanelv1/CmsModules/MusicGallery/MusicGalleryTag/grid.html",
                    controller: "mscGalleryTagCtrl",
                    controllerAs: "mscGalleryTag",
                    data: {
                        pageTitle: 'تگهای موسیقی'
                    },
                    ncyBreadcrumb: {
                        label: 'تگ موسیقی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/MusicGallery/MusicGalleryTag/MusicGalleryTag.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.imggallerytag', {
                    url: "/imggallerytag",
                    templateUrl: "cpanelv1/CmsModules/ImageGallery/ImageGalleryTag/grid.html",
                    controller: "imgGalleryTagCtrl",
                    controllerAs: "imgGalleryTag",
                    data: {
                        pageTitle: 'تگهای تصاویر'
                    },
                    ncyBreadcrumb: {
                        label: 'تگ تصاویر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/ImageGallery/ImageGalleryTag/ImageGalleryTag.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.mvgallerytag', {
                    url: "/mvgallerytag",
                    templateUrl: "cpanelv1/CmsModules/MovieGallery/MovieGalleryTag/grid.html",
                    controller: "mvGalleryTagCtrl",
                    controllerAs: "mvGalleryTag",
                    data: {
                        pageTitle: 'تگهای فیلم'
                    },
                    ncyBreadcrumb: {
                        label: 'تگ فیلم'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/MovieGallery/MovieGalleryTag/MovieGalleryTag.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.charttag', {
                    url: "/charttag",
                    templateUrl: "cpanelv1/CmsModules/Chart/ChartTag/grid.html",
                    controller: "chartTagCtrl",
                    controllerAs: "chartTag",
                    data: {
                        pageTitle: 'تگهای چارت'
                    },
                    ncyBreadcrumb: {
                        label: 'تگ چارت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    "treeControl", {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Chart/ChartTag/ChartTag.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Article Module-----
                .state('index.articletag', {
                    url: "/articletag",
                    templateUrl: "cpanelv1/CmsModules/Article/ArticleTag/grid.html",
                    controller: "articleTagCtrl",
                    controllerAs: "articleTag",
                    data: {
                        pageTitle: 'مقالات - تگ ها'
                    },
                    ncyBreadcrumb: {
                        label: 'تگ ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Article/ArticleTag/ArticleTag.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.articlecomment', {
                    url: "/articlecomment",
                    templateUrl: "cpanelv1/CmsModules/Article/ArticleComment/grid.html",
                    controller: "articleCommentCtrl",
                    controllerAs: "articleComment",
                    data: {
                        pageTitle: 'مقالات-کامنت'
                    },
                    ncyBreadcrumb: {
                        label: 'کامنت مقالات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/Article/ArticleComment/ArticleComment.js'
                                        //  
                                        // 
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.articlecontent', {
                    url: "/articlecontent",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Article/ArticleContent/grid.html",
                    controller: "articleContentController",
                    controllerAs: "articleContent",
                    data: {
                        pageTitle: 'مقالات - محتوا'
                    },
                    ncyBreadcrumb: {
                        label: 'محتوای مقالات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Article/ArticleContent/Controller.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }

                })
                //-----Delivery Module-----
                .state('index.deliveryinvoice', {
                    url: "/deliveryinvoice",
                    templateUrl: "cpanelv1/CmsModules/Delivery/DeliveryInvoice/grid.html",
                    controller: "deliveryInvoiceController",
                    controllerAs: "deliveryInvoice",
                    data: {
                        pageTitle: 'deliveryInvoice'
                    },
                    ncyBreadcrumb: {
                        label: 'deliveryInvoice'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Delivery/DeliveryInvoice/DeliveryInvoiceController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.deliverymember', {
                    url: "/deliverymember",
                    templateUrl: "cpanelv1/CmsModules/Delivery/DeliveryMember/grid.html",
                    controller: "deliveryMemberController",
                    controllerAs: "deliveryMember",
                    data: {
                        pageTitle: 'DeliveryMember'
                    },
                    ncyBreadcrumb: {
                        label: 'DeliveryMember'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Delivery/DeliveryMember/DeliveryMemberController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.deliverymemberabsent', {
                    url: "/deliverymemberabsent",
                    templateUrl: "cpanelv1/CmsModules/Delivery/DeliveryMemberAbsent/grid.html",
                    controller: "deliveryMemberAbsentController",
                    controllerAs: "deliveryMemberAbsent",
                    data: {
                        pageTitle: 'DeliveryMemberAbsent'
                    },
                    ncyBreadcrumb: {
                        label: 'DeliveryMemberAbsent'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Delivery/DeliveryMemberAbsent/DeliveryMemberAbsentController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.deliverymembersetting', {
                    url: "/deliverymembersetting",
                    templateUrl: "cpanelv1/CmsModules/Delivery/DeliveryMemberSetting/grid.html",
                    controller: "deliveryMemberSettingController",
                    controllerAs: "deliveryMemberSetting",
                    data: {
                        pageTitle: 'deliveryMemberSetting'
                    },
                    ncyBreadcrumb: {
                        label: 'deliveryMemberSetting'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Delivery/DeliveryMemberSetting/DeliveryMemberSettingController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.deliverymethod', {
                    url: "/deliverymethod",
                    templateUrl: "cpanelv1/CmsModules/Delivery/DeliveryMethod/grid.html",
                    controller: "deliveryMethodController",
                    controllerAs: "deliveryMethod",
                    data: {
                        pageTitle: 'deliveryMethod'
                    },
                    ncyBreadcrumb: {
                        label: 'deliveryMethod'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Delivery/DeliveryMethod/DeliveryMethodController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.deliverymethoddetail', {
                    url: "/deliverymethoddetail",
                    templateUrl: "cpanelv1/CmsModules/Delivery/DeliveryMethodDetail/grid.html",
                    controller: "deliveryMethodDetailController",
                    controllerAs: "deliveryMethodDetail",
                    data: {
                        pageTitle: 'deliveryMethodDetail'
                    },
                    ncyBreadcrumb: {
                        label: 'deliveryMethodDetail'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Delivery/DeliveryMethodDetail/DeliveryMethodDetailController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Biography Module-----
                .state('index.biographytag', {
                    url: "/biographytag",
                    templateUrl: "cpanelv1/CmsModules/Biography/BiographyTag/grid.html",
                    controller: "biographyTagCtrl",
                    controllerAs: "biographyTag",
                    data: {
                        pageTitle: 'زندگی نامه - تگ ها'
                    },
                    ncyBreadcrumb: {
                        label: 'تگ ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Biography/BiographyTag/BiographyTag.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.biographycomment', {
                    url: "/biographycomment",
                    templateUrl: "cpanelv1/CmsModules/Biography/BiographyComment/grid.html",
                    controller: "biographyCommentCtrl",
                    controllerAs: "biographyComment",
                    data: {
                        pageTitle: 'زندگی نامه | کامنت'
                    },
                    ncyBreadcrumb: {
                        label: 'کامنت زندگی نامه'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Biography/BiographyComment/BiographyComment.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.servicecomment', {
                    url: "/servicecomment",
                    templateUrl: "cpanelv1/CmsModules/Service/ServiceComment/grid.html",
                    controller: "ServiceCommentCtrl",
                    controllerAs: "ServiceComment",
                    data: {
                        pageTitle: 'خدمات | کامنت'
                    },
                    ncyBreadcrumb: {
                        label: 'کامنت خدمات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Service/ServiceComment/serviceComment.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.productcomment', {
                    url: "/productcomment",
                    templateUrl: "cpanelv1/CmsModules/product/productComment/grid.html",
                    controller: "productContentController",
                    controllerAs: "productContent",
                    data: {
                        pageTitle: 'محصولات | کامنت'
                    },
                    ncyBreadcrumb: {
                        label: 'کامنت محصولات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/product/productComment/productComment.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.chartcomment', {
                    url: "/chartcomment",
                    templateUrl: "cpanelv1/CmsModules/Chart/ChartComment/grid.html",
                    controller: "chartCommentCtrl",
                    controllerAs: "chartComment",
                    data: {
                        pageTitle: 'چارت | کامنت'
                    },
                    ncyBreadcrumb: {
                        label: 'کامنت چارت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Chart/ChartComment/chartComment.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.imagegallerycomment', {
                    url: "/imagegallerycomment",
                    templateUrl: "cpanelv1/CmsModules/ImageGallery/ImageGalleryComment/grid.html",
                    controller: "imgGalleryCommentCtrl",
                    controllerAs: "imgGalleryComment",
                    data: {
                        pageTitle: 'گالری تصاویر | کامنت'
                    },
                    ncyBreadcrumb: {
                        label: 'کامنت گالری تصاویر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/ImageGallery/ImageGalleryComment/ImageGalleryComment.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.musicgallerycomment', {
                    url: "/musicgallerycomment",
                    templateUrl: "cpanelv1/CmsModules/MusicGallery/MusicGalleryComment/grid.html",
                    controller: "mscGalleryCommentCtrl",
                    controllerAs: "mscGalleryComment",
                    data: {
                        pageTitle: 'گالری موسیقی | کامنت'
                    },
                    ncyBreadcrumb: {
                        label: 'کامنت گالری موسیقی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/MusicGallery/MusicGalleryComment/MusicGalleryComment.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.moviegallerycomment', {
                    url: "/moviegallerycomment",
                    templateUrl: "cpanelv1/CmsModules/MovieGallery/MovieGalleryComment/grid.html",
                    controller: "mvGalleryCommentCtrl",
                    controllerAs: "mvGalleryComment",
                    data: {
                        pageTitle: 'گالری فیلم | کامنت'
                    },
                    ncyBreadcrumb: {
                        label: 'کامنت گالری فیلم'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/MovieGallery/MovieGalleryComment/MovieGalleryComment.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.biographycontent', {
                    url: "/biographycontent",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Biography/BiographyContent/grid.html",
                    controller: "biographyContentController",
                    controllerAs: "biographyContent",
                    data: {
                        pageTitle: 'زندگی نامه | محتوا'
                    },
                    ncyBreadcrumb: {
                        label: 'محتوای زندگی نامه'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Biography/BiographyContent/Controller.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----CmsSiteMenu-----
                .state('index.cmssitemenu', {
                    url: "/CmsSiteMenu",
                    templateUrl: "cpanelv1/CmsModules/WebDesigner/CmsSiteMenu/grid.html",
                    controller: "cmsSiteMenuCtrl",
                    controllerAs: "cmsSiteMenu",
                    data: {
                        pageTitle: 'مدیریت منو'
                    },
                    ncyBreadcrumb: {
                        label: 'منوها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/WebDesigner/CmsSiteMenu/CmsSiteMenuController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Polling Module-----
                .state('index.pollingoption', {
                    url: "/pollingoption",
                    templateUrl: "cpanelv1/CmsModules/Polling/PollingOption/grid.html",
                    controller: "pollingOptionCtrl",
                    controllerAs: "pollingOption",
                    data: {
                        pageTitle: 'نظرسنجی | گزینه ها'
                    },
                    ncyBreadcrumb: {
                        label: 'گزینه ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Polling/PollingOption/PollingOption.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.pollingcontent', {
                    url: "/PollingContent",
                    templateUrl: "cpanelv1/CmsModules/Polling/PollingContent/grid.html",
                    controller: "pollingContentCtrl",
                    controllerAs: "pollingContent",
                    data: {
                        pageTitle: 'نظرسنجی | مدیریت نظرسنجی'
                    },
                    ncyBreadcrumb: {
                        label: 'نظرسنجی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Polling/PollingContent/PollingContents.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                    //resolve: {
                    //    deps: [
                    //        '$ocLazyLoad',
                    //        function ($ocLazyLoad) {
                    //            return $ocLazyLoad.load(["ngTagsInput", "summernote", {
                    //                //serie: true,
                    //                files: [
                    //                    'cpanelv1/CmsModules/Polling/PollingContent/PollingContents.js'

                    //                ]
                    //            }
                    //            ]);
                    //        }
                    //    ]
                    //}
                })
                .state('index.pollinglog', {
                    url: "/pollinglog",
                    templateUrl: "cpanelv1/CmsModules/Polling/PollingLog/grid.html",
                    controller: "pollingLogCtrl",
                    controllerAs: "pollingLog",
                    data: {
                        pageTitle: 'نظرسنجی | گزارش آرا'
                    },
                    ncyBreadcrumb: {
                        label: 'گزارش آرا'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "summernote", {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Polling/PollingLog/pollingLog.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----ImageGallery Module-----
                .state('index.imagegallery', {
                    url: "/imagegallery",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/ImageGallery/ImageGalleryContent/browser.html",
                    controller: "imageGalleryCtrl",
                    controllerAs: "imgGallery",
                    data: {
                        pageTitle: 'صفحه مدیریت تصاویر'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت تصاویر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/ImageGallery/ImageGalleryContent/ImageGalleryContentController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                    //resolve: {
                    //    deps: [
                    //        '$ocLazyLoad',
                    //        function ($ocLazyLoad) {
                    //            return $ocLazyLoad.load(["ngTagsInput", "treeControl", {
                    //                serie: false,
                    //                files: [
                    //                    'cpanelv1/CmsModules/ImageGallery/ImageGalleryContent/ImageGalleryContentController.js'
                    //                ]
                    //            }
                    //            ]);
                    //        }
                    //    ]
                    //}
                })
                //-----MovieGallery Module-----
                .state('index.moviegallery', {
                    url: "/moviegallery",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/MovieGallery/MovieGalleryContent/browser.html",
                    controller: "movieGalleryCtrl",
                    controllerAs: "mvGallery",
                    data: {
                        pageTitle: 'صفحه مدیریت فیلم ها'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت فیلم ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", "ADM-dateTimePicker", {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/MovieGallery/MovieGalleryContent/MovieGalleryContentController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                    //resolve: {
                    //    deps: [
                    //        '$ocLazyLoad',
                    //        function ($ocLazyLoad) {
                    //            return $ocLazyLoad.load(["ngTagsInput", "treeControl", {
                    //                serie: false,
                    //                files: [
                    //                    'cpanelv1/CmsModules/MovieGallery/MovieGalleryContent/MovieGalleryContentController.js'
                    //                ]
                    //            }
                    //            ]);
                    //        }
                    //    ]
                    //}
                })
                ///-----MusicGallery Module-----
                .state('index.musicgallery', {
                    url: "/musicgallery",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/MusicGallery/MusicGalleryContent/browser.html",
                    controller: "musicGalleryCtrl",
                    controllerAs: "mscGallery",
                    data: {
                        pageTitle: 'صفحه مدیریت موسیقی ها'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت موسیقی ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", "ADM-dateTimePicker", {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/MusicGallery/MusicGalleryContent/MusicGalleryContentController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                    //resolve: {
                    //    deps: [
                    //        '$ocLazyLoad',
                    //        function ($ocLazyLoad) {
                    //            return $ocLazyLoad.load(["ngTagsInput", "treeControl", {
                    //                serie: false,
                    //                files: [
                    //                    'cpanelv1/CmsModules/MusicGallery/MusicGalleryContent/MusicGalleryContentController.js'
                    //                ]
                    //            }
                    //            ]);
                    //        }
                    //    ]
                    //}

                })
                //-----FormBuilder Module-----
                .state('index.formbuilderform', {
                    url: "/formbuilderform",
                    templateUrl: "cpanelv1/CmsModules/FormBuilder/FormBuilderForm/grid.html",
                    controller: "formController",
                    controllerAs: "form",
                    data: {
                        pageTitle: 'مدیریت فرم ها'
                    },
                    ncyBreadcrumb: {
                        label: 'فرم های من'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'treeControl', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/FormBuilder/FormBuilderForm/formBuilderFormController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.formbuilderformsubmit', {
                    url: "/formbuilderformsubmit",
                    params: {
                        FormBuilderId: null
                    },
                    templateUrl: "cpanelv1/CmsModules/FormBuilder/FormBuilderFormSubmit/grid.html",
                    controller: "formBuilderFormSubmitController",
                    controllerAs: "value",
                    data: {
                        pageTitle: 'بارگذاری فرم'
                    },
                    ncyBreadcrumb: {
                        label: 'بارگذاری فرم'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/FormBuilder/FormBuilderFormSubmit/formBuilderFormSubmitController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })

                //-----End of Module FormBuilder-----
                //-----Module LinkManagement-----
                .state('index.linkmanagementdashboard', {
                    url: "/linkmanagementdashboard",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementdashboard/dashboard.html",
                    controller: "linkManagementdashboardController",
                    controllerAs: "linkManagementdashboard",
                    data: {
                        pageTitle: 'داشبورد تبادل لینک'
                    },
                    ncyBreadcrumb: {
                        label: 'تبادل لینک'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementdashboard/LinkManagementdashboardController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.linkmanagementcreatecampaign', {
                    url: "/linkmanagementcreatecampaign",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementCerateCampaign/CreateCampaign1.html",
                    controller: "linkManagementCreateCampaignController",
                    controllerAs: "linkManagementCreateCampaign",
                    data: {
                        pageTitle: 'کمپین های جاری'
                    },
                    ncyBreadcrumb: {
                        label: 'کمپین های جاری'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementCerateCampaign/LinkManagementCreateCampaignController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                /* .state('index.sharinglink', {
                     url: "/sharinglink",
                     templateUrl: "cpanelv1/CmsModules/LinkManagement/SharingLink/grid.html",
                     controller: "sharingLinkController",
                     controllerAs: "sharingLink",
                     data: { pageTitle: 'مدیریت تبادل لینک' },
                     ncyBreadcrumb: {
                         label: 'تبادل لینک'
                     },
                     resolve: {
                         deps: [
                             '$ocLazyLoad',
                             function ($ocLazyLoad) {
                                 return $ocLazyLoad.load([
                                     'ngJsTree', 'summernote', {
                                         serie: false,
                                         files: [
                                             'cpanelv1/CmsModules/LinkManagement/SharingLink/sharingLink.js'
                                         ]
                                     }
                                 ]);
                             }
                         ]
                     }
                 })
                 .state('index.sharinglinkusing', {
                     url: "/sharinglinkusing",
                     templateUrl: "cpanelv1/CmsModules/LinkManagement/SharingUsing/grid.html",
                     controller: "sharingUsingController",
                     controllerAs: "sharingUsing",
                     data: { pageTitle: 'مدیریت تبادل لینک' },
                     ncyBreadcrumb: {
                         label: 'تبادل لینک'
                     },
                     resolve: {
                         deps: [
                             '$ocLazyLoad',
                             function ($ocLazyLoad) {
                                 return $ocLazyLoad.load({
                                     serie: false,
                                     files: [
                                         'cpanelv1/CmsModules/LinkManagement/SharingUsing/sharingUsing.js'
                                     ]
                                 });
                             }
                         ]
                     }
                 })
                 .state('index.sharinglinklog', {
                     url: "/sharinglinklog",
                     templateUrl: "cpanelv1/CmsModules/LinkManagement/SharingLog/grid.html",
                     controller: "sharingLogController",
                     controllerAs: "sharingLog",
                     data: { pageTitle: 'مدیریت تبادل لینک' },
                     ncyBreadcrumb: {
                         label: 'تبادل لینک'
                     },
                     resolve: {
                         deps: [
                             '$ocLazyLoad',
                             function ($ocLazyLoad) {
                                 return $ocLazyLoad.load([
                                     'ngJsTree', 'summernote', {
                                         serie: false,
                                         files: [
                                             'cpanelv1/CmsModules/LinkManagement/SharingLog/sharingLog.js'
                                         ]
                                     }
                                 ]);
                             }
                         ]
                     }
                 })*/
                //-----Ticketing Module-----
                .state('index.ticketingtask', {
                    url: "/ticketingtask",
                    params: {
                        Unreadticket: false
                    },
                    templateUrl: "cpanelv1/CmsModules/Ticketing/TicketingTask/grid.html",
                    controller: "ticketingTaskController",
                    controllerAs: "ticketingTask",
                    data: {
                        pageTitle: 'مدیریت تیکت ها'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت تیکت ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Ticketing/TicketingTask/TicketingTask.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.ticketinganswer', {
                    url: "/ticketinganswer",
                    templateUrl: "cpanelv1/CmsModules/Ticketing/TicketingAnswer/grid.html",
                    controller: "ticketingAnswerController",
                    controllerAs: "ticketingAnswer",
                    data: {
                        pageTitle: 'پاسخ ها'
                    },
                    ncyBreadcrumb: {
                        label: 'پاسخ ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Ticketing/TicketingAnswer.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.ticketingdepartemen', {
                    url: "/ticketingdepartemen",
                    templateUrl: "cpanelv1/CmsModules/Ticketing/TicketingDepartemen/grid.html",
                    controller: "ticketingDepartemenController",
                    controllerAs: "ticketingDepartemen",
                    data: {
                        pageTitle: 'مدیریت بخش ها'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت بخش ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'summernote', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Ticketing/TicketingDepartemen/TicketingDepartemen.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.ticketingfaq', {
                    url: "/ticketingfaq",
                    templateUrl: "cpanelv1/CmsModules/Ticketing/TicketingFaq/grid.html",
                    controller: "ticketingFaqController",
                    controllerAs: "ticketingFaq",
                    data: {
                        pageTitle: 'سوالات متداول'
                    },
                    ncyBreadcrumb: {
                        label: 'سوالات متداول'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Ticketing/TicketingFaq/TicketingFaq.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----UniversalMenu Module-----
                .state('index.universalmenuplatform', {
                    url: "/universalmenuplatform",
                    templateUrl: "cpanelv1/CmsModules/UniversalMenu/UniversalMenuPlatform/grid.html",
                    controller: "platformGridController",
                    controllerAs: "platformCtrl",
                    data: {
                        pageTitle: 'پلتفرم ها'
                    },
                    ncyBreadcrumb: {
                        label: 'پلتفرم ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/UniversalMenu/UniversalMenuPlatform/UniversalMenuPlatformController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.universalmenuprocesses', {
                    url: "/universalmenuprocesses",
                    templateUrl: "cpanelv1/CmsModules/UniversalMenu/UniversalMenuProcesses/grid.html",
                    controller: "processGridController",
                    controllerAs: "processCtrl",
                    data: {
                        pageTitle: 'عملیات ها'
                    },
                    ncyBreadcrumb: {
                        label: 'عملیات ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'treeControl', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/UniversalMenu/UniversalMenuProcesses/UniversalMenuProcessesController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.universalmenumenuitem', {
                    url: "/universalmenumenuitem",
                    templateUrl: "cpanelv1/CmsModules/UniversalMenu/UniversalMenuMenuItem/grid.html",
                    controller: "menuItemGridController",
                    controllerAs: "menuItemCtrl",
                    data: {
                        pageTitle: 'موارد منو'
                    },
                    ncyBreadcrumb: {
                        label: 'موارد منو'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'treeControl', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/UniversalMenu/UniversalMenuMenuItem/UniversalMenuMenuItemController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.universalmenusession', {
                    url: "/universalmenusession",
                    templateUrl: "cpanelv1/CmsModules/UniversalMenu/UniversalMenuSession/grid.html",
                    controller: "sessionGridController",
                    controllerAs: "sessionCtrl",
                    data: {
                        pageTitle: 'نشست ها'
                    },
                    ncyBreadcrumb: {
                        label: 'نشست ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/UniversalMenu/UniversalMenuSession/UniversalMenuSessionController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.universalmenuinputlog', {
                    url: "/universalmenuinputlog",
                    templateUrl: "cpanelv1/CmsModules/UniversalMenu/UniversalMenuInputLog/grid.html",
                    controller: "inputLogGridController",
                    controllerAs: "inputLogCtrl",
                    data: {
                        pageTitle: 'نشست ها'
                    },
                    ncyBreadcrumb: {
                        label: 'نشست ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/UniversalMenu/UniversalMenuInputLog/UniversalMenuInputLogController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.universalmenuoutputlog', {
                    url: "/universalmenuoutputlog",
                    templateUrl: "cpanelv1/CmsModules/UniversalMenu/UniversalMenuOutpluLog/grid.html",
                    controller: "outputLogGridController",
                    controllerAs: "outputLogCtrl",
                    data: {
                        pageTitle: 'نشست ها'
                    },
                    ncyBreadcrumb: {
                        label: 'نشست ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/UniversalMenu/UniversalMenuOutpluLog/UniversalMenuOutpluLogController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----ApiTelegram Module-----
                .state('index.apitelegrambotconfig', {
                    url: "/apitelegrambotconfig",
                    templateUrl: "cpanelv1/CmsModules/ApiTelegram/ApiTelegramBotConfig/grid.html",
                    controller: "botConfigGridController",
                    controllerAs: "botConfigCtrl",
                    data: {
                        pageTitle: 'بات ها'
                    },
                    ncyBreadcrumb: {
                        label: 'بات ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'treeControl', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/ApiTelegram/ApiTelegramBotConfig/ApiTelegramBotConfigController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.apitelegramloginput', {
                    url: "/loginput",
                    templateUrl: "cpanelv1/CmsModules/ApiTelegram/ApiTelegramLogInput/grid.html",
                    controller: "logInputGridController",
                    controllerAs: "logInputCtrl",
                    data: {
                        pageTitle: 'گزارش پیام های ورودی'
                    },
                    ncyBreadcrumb: {
                        label: 'گزارش پیام های ورودی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    'treeControl', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/ApiTelegram/ApiTelegramLogInput/ApiTelegramLogInputController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.apitelegramlogoutput', {
                    url: "/logoutput",
                    templateUrl: "cpanelv1/CmsModules/ApiTelegram/ApiTelegramLogOutput/grid.html",
                    controller: "logOutputGridController",
                    controllerAs: "logOutputCtrl",
                    data: {
                        pageTitle: 'گزارش پیام های خروجی'
                    },
                    ncyBreadcrumb: {
                        label: 'گزارش پیام های خروجی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/ApiTelegram/ApiTelegramLogOutput/ApiTelegramLogOutputController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.apitelegramuploadedfiles', {
                    url: "/apitelegramuploadedfiles",
                    templateUrl: "cpanelv1/CmsModules/ApiTelegram/ApiTelegramUploadedFiles/grid.html",
                    controller: "UploadedFilesController",
                    controllerAs: "uploadedFiles",
                    data: {
                        pageTitle: 'فایل های آپلود شده'
                    },
                    ncyBreadcrumb: {
                        label: 'فایل های آپلود شده'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/ApiTelegram/ApiTelegramUploadedFiles/ApiTelegramUploadedFilesController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.apitelegramreceivedfiles', {
                    url: "/apitelegramuploadedfiles",
                    templateUrl: "cpanelv1/CmsModules/ApiTelegram/ApiTelegramReceivedFiles/grid.html",
                    controller: "ReceivedFilesController",
                    controllerAs: "ReceivedFiles",
                    data: {
                        pageTitle: 'فایل های دریافتی'
                    },
                    ncyBreadcrumb: {
                        label: 'فایل های دریافتی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/ApiTelegram/ApiTelegramReceivedFiles/ApiTelegramReceivedFilesController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.apitelegrambotusertype', {
                    url: "/apitelegrambotusertype",
                    templateUrl: "cpanelv1/CmsModules/ApiTelegram/ApiTelegramBotUserType/grid.html",
                    controller: "botUserTypeController",
                    controllerAs: "botUserType",
                    data: {
                        pageTitle: 'انواع کاربران'
                    },
                    ncyBreadcrumb: {
                        label: 'فایل های آپلود شده'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'nouislider', 'minicolors', 'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/ApiTelegram/ApiTelegramBotUserType/ApiTelegramBotUserTypeController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.apitelegrambotuser', {
                    url: "/apitelegrambotuser",
                    templateUrl: "cpanelv1/CmsModules/ApiTelegram/ApiTelegramBotUser/grid.html",
                    controller: "botUserController",
                    controllerAs: "botUser",
                    data: {
                        pageTitle: 'کاربران'
                    },
                    ncyBreadcrumb: {
                        label: 'کاربران ربات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'nouislider', 'minicolors', 'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/ApiTelegram/ApiTelegramBotUser/ApiTelegramBotUserController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.apitelegrammemberinfo', {
                    url: "/apitelegrammemberinfo",
                    templateUrl: "cpanelv1/CmsModules/ApiTelegram/ApiTelegramMemberInfo/grid.html",
                    controller: "memberInfoController",
                    controllerAs: "memberInfo",
                    data: {
                        pageTitle: 'کاربران'
                    },
                    ncyBreadcrumb: {
                        label: 'کاربران ربات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'nouislider', 'minicolors', 'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/ApiTelegram/ApiTelegramMemberInfo/ApiTelegramMemberInfoController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
            
                //-----Reservation Module-----
                .state('index.reservationcontent', {
                    url: "/reservationcontent",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/reservation/reservationContent/grid.html",
                    controller: "reservationContentController",
                    controllerAs: "reservationContent",
                    data: {
                        pageTitle: 'محتوای رزرواسیون'
                    },
                    ncyBreadcrumb: {
                        label: 'محتوای رزرواسیون'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/reservation/reservationContent/reservationContent.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.reservationcomment', {
                    url: "/reservationcomment",
                    templateUrl: "cpanelv1/CmsModules/reservation/reservationComment/grid.html",
                    controller: "reservationCommentCtrl",
                    controllerAs: "reservationComment",
                    data: {
                        pageTitle: 'رزرواسیون-کامنت'
                    },
                    ncyBreadcrumb: {
                        label: 'کامنت رزرواسیون'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/reservation/reservationComment/reservationComment.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.reservationappointmentdate', {
                    url: "/reservationappointmentdate",
                    params: {
                        ContentId: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Reservation/ReservationAppointmentDate/grid.html",
                    controller: "reservationAppDateController",
                    controllerAs: "appDate",
                    data: {
                        pageTitle: 'اعلام رزرواسیون'
                    },
                    ncyBreadcrumb: {
                        label: 'اعلام رزرواسیون'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Reservation/ReservationAppointmentDate/ReservationAppointmentDateController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.reservationappointmentdatedetail', {
                    url: "/reservationappointmentdatedetail",
                    templateUrl: "cpanelv1/CmsModules/Reservation/ReservationAppointmentDateDetail/grid.html",
                    controller: "reservationAppointmentDateDetailController",
                    controllerAs: "appDateDetail",
                    data: {
                        pageTitle: 'اعلام روز'
                    },
                    ncyBreadcrumb: {
                        label: 'جزییات اعلام روز'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'nouislider', 'minicolors', 'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Reservation/ReservationAppointmentDateDetail/ReservationAppointmentDateDetailController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.reservationorder', {
                    url: "/reservationorder",
                    params: {
                        AppointmentDateDetailId: null,
                        AppointmentDateId: null,
                        ServiceId: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Reservation/ReservationOrder/grid.html",
                    controller: "reservationOrderController",
                    controllerAs: "order",
                    data: {
                        pageTitle: 'سفارش'
                    },
                    ncyBreadcrumb: {
                        label: 'سفارش'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'nouislider', 'minicolors', 'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Reservation/ReservationOrder/ReservationOrderController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.reservationplace', {
                    url: "/reservationplace",
                    params: {
                        AppointmentDateDetailId: null,
                        AppointmentDateId: null,
                        ServiceId: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Reservation/Reservationplace/grid.html",
                    controller: "reservationplaceController",
                    controllerAs: "place",
                    data: {
                        pageTitle: 'مکان'
                    },
                    ncyBreadcrumb: {
                        label: 'مکان'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'nouislider', 'minicolors', 'angucomplete-alt', 'angular.drag.resize', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Reservation/Reservationplace/ReservationplaceController.js',
                                            //'cpanelv1/CmsModules/Reservation/Reservationplace/ReservationplaceNtkDragg.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.reservationorderadd', {
                    url: "/reservationorderadd",
                    params: {
                        AppointmentDateDetailId: null,
                        AppointmentDateId: null,
                        ServiceId: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Reservation/ReservationOrderAdd/grid.html",
                    controller: "orderAddCtrl",
                    controllerAs: "orderAdd",
                    data: {
                        pageTitle: 'سفارش'
                    },
                    ncyBreadcrumb: {
                        label: 'سفارش'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'nouislider', 'minicolors', 'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Reservation/ReservationOrderAdd/ReservationOrderAdd.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.reservationservice', {
                    url: "/reservationservice",
                    templateUrl: "cpanelv1/CmsModules/Reservation/ReservationService/grid.html",
                    controller: "reservationServiceController",
                    controllerAs: "reservationService",
                    data: {
                        pageTitle: 'خدمات'
                    },
                    ncyBreadcrumb: {
                        label: 'خدمات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'nouislider', 'minicolors', 'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Reservation/ReservationService/ReservationServiceController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.reservationtag', {
                    url: "/reservationtag",
                    templateUrl: "cpanelv1/CmsModules/Reservation/ReservationTag/grid.html",
                    controller: "reservationTagCtrl",
                    controllerAs: "reservationTag",
                    data: {
                        pageTitle: 'تگهای رزرواسیون'
                    },
                    ncyBreadcrumb: {
                        label: 'تگ رزرواسیون'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Reservation/ReservationTag/ReservationTag.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Application Module-----
                .state('index.applicationapp', {
                    url: "/applicationapp",
                    templateUrl: "cpanelv1/CmsModules/Application/ApplicationApp/grid.html",
                    controller: "applicationAppController",
                    controllerAs: "themeConfig",
                    data: {
                        pageTitle: 'اپلیکشین ها'
                    },
                    ncyBreadcrumb: {
                        label: 'اپلیکشین ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'monospaced.qrcode', 'treeControl', 'minicolors', {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Application/ApplicationApp/ApplicationAppController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.applicationsource', {
                    url: "/applicationsource",
                    templateUrl: "cpanelv1/CmsModules/Application/ApplicationSource/grid.html",
                    controller: "applicationSourceController",
                    controllerAs: "appSource",
                    data: {
                        pageTitle: 'منابع'
                    },
                    ncyBreadcrumb: {
                        label: 'منابع'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', 'minicolors', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Application/ApplicationSource/ApplicationSourceController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.applicationlayout', {
                    url: "/applicationlayout",
                    templateUrl: "cpanelv1/CmsModules/Application/ApplicationLayout/grid.html",
                    params: {
                        sourceid: null
                    },
                    controller: "applicationLayoutController",
                    controllerAs: "appLayout",
                    data: {
                        pageTitle: 'نیازمندی صفحات'
                    },
                    ncyBreadcrumb: {
                        label: 'نیازمندی صفحات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'treeControl', 'minicolors', {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Application/ApplicationLayout/ApplicationLayoutController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.applicationlayoutvalue', {
                    url: "/applicationlayoutvalue",
                    templateUrl: "cpanelv1/CmsModules/Application/ApplicationLayoutValue/grid.html",
                    params: {
                        sourceid: null,
                        appid: null,
                        apptitle: null
                    },
                    controller: "applicationLayoutValueController",
                    controllerAs: "appLayoutValue",
                    data: {
                        pageTitle: 'مقداردهی به صفحات'
                    },
                    ncyBreadcrumb: {
                        label: 'مقداردهی به صفحات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', 'minicolors', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Application/ApplicationLayoutValue/ApplicationLayoutValueController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.applicationthemeconfig', {
                    url: "/applicationthemeconfig",
                    templateUrl: "cpanelv1/CmsModules/Application/ApplicationThemeConfig/grid.html",
                    controller: "themeConfigController",
                    controllerAs: "themeConfig",
                    data: {
                        pageTitle: 'رنگ بندی'
                    },
                    ncyBreadcrumb: {
                        label: 'رنگ بندی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'nouislider', 'minicolors', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Application/ApplicationThemeConfig/ApplicationThemeConfigController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.applicationmemberinfo', {
                    url: "/applicationmemberinfo",
                    templateUrl: "cpanelv1/CmsModules/Application/ApplicationMemberInfo/grid.html",
                    controller: "memberInfoController",
                    controllerAs: "memberInfo",
                    data: {
                        pageTitle: 'کاربران'
                    },
                    ncyBreadcrumb: {
                        label: 'کاربران'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/Application/ApplicationMemberInfo/ApplicationMemberInfoController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.applicationintro', {
                    url: "/applicationintro",
                    templateUrl: "cpanelv1/CmsModules/Application/ApplicationIntro/grid.html",
                    controller: "applicationIntroController",
                    controllerAs: "applicationIntro",
                    data: {
                        pageTitle: 'راهنما'
                    },
                    ncyBreadcrumb: {
                        label: 'راهنما'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/Application/ApplicationIntro/ApplicationIntroController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.applicationlognotification', {
                    url: "/applicationlogNotification",
                    templateUrl: "cpanelv1/CmsModules/Application/ApplicationlogNotification/grid.html",
                    controller: "logNotificationController",
                    controllerAs: "logNotification",
                    data: {
                        pageTitle: 'نوتیفیکیشن'
                    },
                    ncyBreadcrumb: {
                        label: 'نوتیفیکیشن'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/Application/ApplicationlogNotification/applicationlogNotificationController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                //-----Blog Module-----
                .state('index.blogcontent', {
                    url: "/blogcontent",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Blog/BlogContent/grid.html",
                    controller: "blogContentController",
                    controllerAs: "blogContent",
                    data: {
                        pageTitle: 'بلاگ ها'
                    },
                    ncyBreadcrumb: {
                        label: 'بلاگ ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Blog/BlogContent/Controller.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }

                })
                .state('index.blogtag', {
                    url: "/blogtag",
                    templateUrl: "cpanelv1/CmsModules/Blog/BlogTag/grid.html",
                    controller: "blogTagCtrl",
                    controllerAs: "blogTag",
                    data: {
                        pageTitle: 'مقالات - تگ ها'
                    },
                    ncyBreadcrumb: {
                        label: 'تگ ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Blog/BlogTag/BlogTag.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.blogcomment', {
                    url: "/blogcomment",
                    templateUrl: "cpanelv1/CmsModules/Blog/BlogComment/grid.html",
                    controller: "blogCommentCtrl",
                    controllerAs: "blogComment",
                    data: {
                        pageTitle: 'مقالات-کامنت'
                    },
                    ncyBreadcrumb: {
                        label: 'کامنت مقالات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Blog/BlogComment/BlogComment.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Advertisement Module-----
                .state('index.advertisementcontract', {
                    url: "/advertisementcontract",
                    templateUrl: "cpanelv1/CmsModules/Advertisement/AdvertisementContract/grid.html",
                    controller: "advertisementContractController",
                    controllerAs: "advertisementContract",
                    data: {
                        pageTitle: 'ماژول نیازمندی ها | قراردادها'
                    },
                    ncyBreadcrumb: {
                        label: 'قرارداد ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'nouislider', 'minicolors', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Advertisement/AdvertisementContract/AdvertisementContractController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.advertisementcontracttype', {
                    url: "/advertisementcontracttype",
                    templateUrl: "cpanelv1/CmsModules/Advertisement/AdvertisementContractType/grid.html",
                    controller: "advertisementContractTypeController",
                    controllerAs: "advertisementContractType",
                    data: {
                        pageTitle: 'ماژول نیازمندی ها | نوع آگهی'
                    },
                    ncyBreadcrumb: {
                        label: 'نوع آگهی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Advertisement/AdvertisementContractType/AdvertisementContractTypeController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.advertisementproperty', {
                    url: "/advertisementproperty",
                    templateUrl: "cpanelv1/CmsModules/Advertisement/AdvertisementProperty/grid.html",
                    controller: "advertisementPropertyController",
                    controllerAs: "advertisementProperty",
                    data: {
                        pageTitle: 'ماژول نیازمندی ها | مدیریت آگهی ها'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت آگهی ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Advertisement/AdvertisementProperty/AdvertisementPropertyController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.advertisementpropertydetail', {
                    url: "/advertisementpropertydetail",
                    params: {
                        propertyParam: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Advertisement/AdvertisementPropertyDetail/grid.html",
                    controller: "advertisementPropertyDetailController",
                    controllerAs: "advertisementPropertyDetail",
                    data: {
                        pageTitle: 'ماژول نیازمندی ها | خصوصیات آگهی '
                    },
                    ncyBreadcrumb: {
                        label: 'خصوصیات آگهی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        //serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Advertisement/AdvertisementPropertyDetail/AdvertisementPropertyDetailController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.advertisementpropertydetailgroup', {
                    url: "/advertisementpropertydetailgroup",
                    templateUrl: "cpanelv1/CmsModules/Advertisement/advertisementPropertyDetailGroup/grid.html",
                    controller: "advertisementPropertyDetailGroupController",
                    controllerAs: "advertisementPropertyDetailGroup",
                    data: {
                        pageTitle: 'ماژول نیازمندی ها | گروه بندی خصوصیات'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول نیازمندی ها | گروه بندی خصوصیات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Advertisement/advertisementPropertyDetailGroup/advertisementPropertyDetailGroupController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.advertisementpropertytype', {
                    url: "/advertisementpropertytype",
                    templateUrl: "cpanelv1/CmsModules/Advertisement/AdvertisementPropertyType/grid.html",
                    controller: "advertisementPropertyTypeController",
                    controllerAs: "advertisementPropertyType",
                    data: {
                        pageTitle: 'ماژول نیازمندی ها | نوع آگهی'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول نیازمندی ها | نوع آگهی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Advertisement/AdvertisementPropertyType/AdvertisementPropertyTypeController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                    //resolve: {
                    //    deps: [
                    //        '$ocLazyLoad',
                    //        function ($ocLazyLoad) {
                    //            return $ocLazyLoad.load([
                    //                'angucomplete-alt',  {
                    //                    serie: false,
                    //                    files: [
                    //                        'cpanelv1/CmsModules/Advertisement/AdvertisementPropertyType/AdvertisementPropertyTypeController.js'
                    //                      //  
                    //                       // 
                    //                    ]
                    //                }
                    //            ]);
                    //        }
                    //    ]
                    //}
                })
                .state('index.advertisementpropertyfavorite', {
                    url: "/advertisementpropertyfavorite",
                    templateUrl: "cpanelv1/CmsModules/Advertisement/AdvertisementPropertyFavorite/grid.html",
                    controller: "advertisementPropertyFavoriteController",
                    controllerAs: "advertisementPropertyFavorite",
                    data: {
                        pageTitle: 'ماژول نیازمندی ها | آگهی های موردپسند'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول نیازمندی ها | آگهی های موردپسند'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Advertisement/AdvertisementPropertyFavorite/AdvertisementPropertyFavoriteController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Chart Module-----
                .state('index.chartcontent', {
                    url: "/chartcontent",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Chart/ChartContent/grid.html",
                    controller: "chartContentCtrl",
                    controllerAs: "chartContent",
                    data: {
                        pageTitle: 'چارت سازمانی'
                    },
                    ncyBreadcrumb: {
                        label: 'چارت سازمانی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Chart/ChartContent/chartContent.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.chartcontentevent', {
                    url: "/chartcontentevent",
                    templateUrl: "cpanelv1/CmsModules/Chart/ChartContentEvent/grid.html",
                    controller: "chartContentEventController",
                    controllerAs: "chartContentEvent",
                    data: {
                        pageTitle: 'رویداد چارت'
                    },
                    ncyBreadcrumb: {
                        label: 'رویداد چارت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngTagsInput', 'summernote', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Chart/ChartContentEvent/ChartContentEvent.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Estate Module-----
                .state('index.estateaccountagency', {
                    url: "/estateaccountagency",
                    templateUrl: "cpanelv1/CmsModules/Estate/EstateAccountAgency/grid.html",
                    controller: "estateAccountAgencyController",
                    controllerAs: "estateAccountAgency",
                    data: {
                        pageTitle: 'ماژول املاک | آزانس ها'
                    },
                    ncyBreadcrumb: {
                        label: 'آزانس های املاک'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'nouislider', 'minicolors', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Estate/EstateAccountAgency/EstateAccountAgencyController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.estatecontract', {
                                    url: "/estatecontract",
                                    templateUrl: "cpanelv1/CmsModules/Estate/EstateContract/grid.html",
                                    controller: "estateContractController",
                                    controllerAs: "estateContract",
                                    data: {
                                        pageTitle: 'ماژول املاک | آگهی ها'
                                    },
                                    ncyBreadcrumb: {
                                        label: 'آگهی ها'
                                    },
                                    resolve: {
                                        deps: [
                                            '$ocLazyLoad',
                                            function ($ocLazyLoad) {
                                                return $ocLazyLoad.load([
                                                    'nouislider', 'minicolors', {
                                                        serie: false,
                                                        files: [
                                                            'cpanelv1/CmsModules/Estate/EstateContract/EstateContractController.js'
                                                        ]
                                                    }
                                                ]);
                                            }
                                        ]
                                    }
                                })
                .state('index.estatecontracttype', {
                    url: "/estatecontracttype",
                    templateUrl: "cpanelv1/CmsModules/Estate/EstateContractType/grid.html",
                    controller: "estateContractTypeController",
                    controllerAs: "estateContractType",
                    data: {
                        pageTitle: 'ماژول املاک | نوع آگهی'
                    },
                    ncyBreadcrumb: {
                        label: 'نوع آگهی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Estate/EstateContractType/EstateContractTypeController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.estateproperty', {
                    url: "/estateproperty",
                    templateUrl: "cpanelv1/CmsModules/Estate/EstateProperty/grid.html",
                    controller: "estatePropertyController",
                    controllerAs: "estateProperty",
                    data: {
                        pageTitle: 'ماژول املاک | مدیریت املاک'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت املاک'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Estate/EstateProperty/EstatePropertyController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.estatepropertydetail', {
                    url: "/estatepropertydetail",
                    params: {
                        propertyParam: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Estate/EstatePropertyDetail/grid.html",
                    controller: "estatePropertyDetailController",
                    controllerAs: "estatePropertyDetail",
                    data: {
                        pageTitle: 'ماژول املاک | خصوصیات '
                    },
                    ncyBreadcrumb: {
                        label: 'خصوصیات ملک'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        //serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Estate/EstatePropertyDetail/EstatePropertyDetailController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.estatepropertydetailgroup', {
                    url: "/estatepropertydetailgroup",
                    templateUrl: "cpanelv1/CmsModules/Estate/estatePropertyDetailGroup/grid.html",
                    controller: "estatePropertyDetailGroupController",
                    controllerAs: "estatePropertyDetailGroup",
                    data: {
                        pageTitle: 'ماژول املاک | گروه بندی خصوصیات'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول املاک | گروه بندی خصوصیات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Estate/estatePropertyDetailGroup/estatePropertyDetailGroupController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.estatepropertytype', {
                    url: "/estatepropertytype",
                    templateUrl: "cpanelv1/CmsModules/Estate/EstatePropertyType/grid.html",
                    controller: "estatePropertyTypeController",
                    controllerAs: "estatePropertyType",
                    data: {
                        pageTitle: 'ماژول املاک | نوع ملک'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول املاک | نوع ملک'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Estate/EstatePropertyType/EstatePropertyTypeController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.estatepropertyfavorite', {
                    url: "/estatepropertyfavorite",
                    templateUrl: "cpanelv1/CmsModules/Estate/EstatePropertyFavorite/grid.html",
                    controller: "estatePropertyFavoriteController",
                    controllerAs: "estatePropertyFavorite",
                    data: {
                        pageTitle: 'ماژول املاک | نوع ملک'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول املاک | ملک های موردپسند'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Estate/EstatePropertyFavorite/EstatePropertyFavoriteController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Vehicle Module-----
                .state('index.vehiclecontract', {
                    url: "/vehiclecontract",
                    templateUrl: "cpanelv1/CmsModules/Vehicle/VehicleContract/grid.html",
                    controller: "vehicleContractController",
                    controllerAs: "vehicleContract",
                    data: {
                        pageTitle: 'ماژول آگهی خودرو | آگهی ها'
                    },
                    ncyBreadcrumb: {
                        label: 'آگهی ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'nouislider', 'minicolors', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Vehicle/VehicleContract/VehicleContractController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.vehiclecontracttype', {
                    url: "/vehiclecontracttype",
                    templateUrl: "cpanelv1/CmsModules/Vehicle/VehicleContractType/grid.html",
                    controller: "vehicleContractTypeController",
                    controllerAs: "vehicleContractType",
                    data: {
                        pageTitle: 'ماژول آگهی خودرو | نوع آگهی'
                    },
                    ncyBreadcrumb: {
                        label: 'نوع آگهی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Vehicle/VehicleContractType/VehicleContractTypeController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.vehicleproperty', {
                    url: "/vehicleproperty",
                    templateUrl: "cpanelv1/CmsModules/Vehicle/VehicleProperty/grid.html",
                    controller: "vehiclePropertyController",
                    controllerAs: "vehicleProperty",
                    data: {
                        pageTitle: 'ماژول آگهی خودرو | مدیریت آگهی ها'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت آگهی ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Vehicle/VehicleProperty/VehiclePropertyController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.vehiclepropertydetail', {
                    url: "/vehiclepropertydetail",
                    params: {
                        propertyParam: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Vehicle/VehiclePropertyDetail/grid.html",
                    controller: "vehiclePropertyDetailController",
                    controllerAs: "vehiclePropertyDetail",
                    data: {
                        pageTitle: 'ماژول آگهی خودرو | خصوصیات '
                    },
                    ncyBreadcrumb: {
                        label: 'خصوصیات خودرو'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        //serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Vehicle/VehiclePropertyDetail/VehiclePropertyDetailController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.vehiclepropertydetailgroup', {
                    url: "/vehiclepropertydetailgroup",
                    templateUrl: "cpanelv1/CmsModules/Vehicle/vehiclePropertyDetailGroup/grid.html",
                    controller: "vehiclePropertyDetailGroupController",
                    controllerAs: "vehiclePropertyDetailGroup",
                    data: {
                        pageTitle: 'ماژول آگهی خودرو | گروه بندی خصوصیات'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول آگهی خودرو | گروه بندی خصوصیات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Vehicle/vehiclePropertyDetailGroup/vehiclePropertyDetailGroupController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.vehiclepropertytype', {
                    url: "/vehiclepropertytype",
                    templateUrl: "cpanelv1/CmsModules/Vehicle/VehiclePropertyType/grid.html",
                    controller: "vehiclePropertyTypeController",
                    controllerAs: "vehiclePropertyType",
                    data: {
                        pageTitle: 'ماژول آگهی خودرو | نوع خودرو'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول املاک | نوع خودرو'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Vehicle/VehiclePropertyType/VehiclePropertyTypeController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.vehiclepropertyfavorite', {
                    url: "/vehiclepropertyfavorite",
                    templateUrl: "cpanelv1/CmsModules/Vehicle/VehiclePropertyFavorite/grid.html",
                    controller: "vehiclePropertyFavoriteController",
                    controllerAs: "vehiclePropertyFavorite",
                    data: {
                        pageTitle: 'ماژول آگهی خودرو | نوع خودرو'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول املاک | خودرو های موردپسند'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Vehicle/VehiclePropertyFavorite/VehiclePropertyFavoriteController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Job Module-----
                .state('index.jobcontract', {
                    url: "/jobcontract",
                    templateUrl: "cpanelv1/CmsModules/Job/JobContract/grid.html",
                    controller: "jobContractController",
                    controllerAs: "jobContract",
                    data: {
                        pageTitle: 'ماژول مشاغل | قراردادها'
                    },
                    ncyBreadcrumb: {
                        label: 'قراردادها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'nouislider', 'minicolors', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Job/JobContract/JobContractController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.jobcontracttype', {
                    url: "/jobcontracttype",
                    templateUrl: "cpanelv1/CmsModules/Job/JobContractType/grid.html",
                    controller: "jobContractTypeController",
                    controllerAs: "jobContractType",
                    data: {
                        pageTitle: 'ماژول مشاغل | نوع قرارداد'
                    },
                    ncyBreadcrumb: {
                        label: 'نوع قرارداد'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Job/JobContractType/JobContractTypeController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.jobproperty', {
                    url: "/jobproperty",
                    templateUrl: "cpanelv1/CmsModules/Job/JobProperty/grid.html",
                    controller: "jobPropertyController",
                    controllerAs: "jobProperty",
                    data: {
                        pageTitle: 'ماژول مشاغل | مدیریت متقاضیان'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت متقاضیان'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Job/JobProperty/JobPropertyController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.jobpropertydetail', {
                    url: "/jobpropertydetail",
                    params: {
                        propertyParam: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Job/JobPropertyDetail/grid.html",
                    controller: "jobPropertyDetailController",
                    controllerAs: "jobPropertyDetail",
                    data: {
                        pageTitle: 'ماژول مشاغل | خصوصیات '
                    },
                    ncyBreadcrumb: {
                        label: 'خصوصیات متقاضی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        //serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Job/JobPropertyDetail/JobPropertyDetailController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.jobpropertydetailgroup', {
                    url: "/jobpropertydetailgroup",
                    templateUrl: "cpanelv1/CmsModules/Job/jobPropertyDetailGroup/grid.html",
                    controller: "jobPropertyDetailGroupController",
                    controllerAs: "jobPropertyDetailGroup",
                    data: {
                        pageTitle: 'ماژول مشاغل | گروه بندی خصوصیات'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول مشاغل | گروه بندی خصوصیات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Job/jobPropertyDetailGroup/jobPropertyDetailGroupController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.jobpropertytype', {
                    url: "/jobpropertytype",
                    templateUrl: "cpanelv1/CmsModules/Job/JobPropertyType/grid.html",
                    controller: "jobPropertyTypeController",
                    controllerAs: "jobPropertyType",
                    data: {
                        pageTitle: 'ماژول مشاغل | نوع متقاضی'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول مشاغل | نوع متقاضی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Job/JobPropertyType/JobPropertyTypeController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.jobposition', {
                    url: "/jobposition",
                    templateUrl: "cpanelv1/CmsModules/Job/JobPosition/grid.html",
                    controller: "jobPositionController",
                    controllerAs: "jobPosition",
                    data: {
                        pageTitle: 'ماژول مشاغل | نوع متقاضی'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول مشاغل | نوع متقاضی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/Job/JobPosition/JobPositionController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.jobcertificate', {
                    url: "/jobcertificate",
                    templateUrl: "cpanelv1/CmsModules/Job/JobCertificate/grid.html",
                    controller: "jobCertificateController",
                    controllerAs: "jobCertificate",
                    data: {
                        pageTitle: 'ماژول مشاغل | نوع متقاضی'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول مشاغل | نوع متقاضی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/Job/JobCertificate/JobCertificateController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                //-----Database Module-----
                .state('index.dbcontent', {
                    url: "/dbcontent",
                    templateUrl: "cpanelv1/CmsModules/Database/DatabaseContent/grid.html",
                    controller: "dbContentCtrl",
                    controllerAs: "dbContent",
                    data: {
                        pageTitle: 'بلاگ ها'
                    },
                    ncyBreadcrumb: {
                        label: 'بلاگ ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Database/DatabaseContent/DatabaseContents.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Module Product-----
                .state('index.productcontent', {
                    url: "/productcontent",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Product/ProductContent/grid.html",
                    controller: "productContentController",
                    controllerAs: "productContent",
                    data: {
                        pageTitle: 'محصولات- محتوا'
                    },
                    ncyBreadcrumb: {
                        label: 'محتوای محصولات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Product/ProductContent/Controller.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                    //resolve: {
                    //    deps: [
                    //        '$ocLazyLoad',
                    //        function ($ocLazyLoad) {
                    //            return $ocLazyLoad.load(["ngTagsInput", "summernote", {
                    //                //serie: true,
                    //                files: [
                    //                    'cpanelv1/CmsModules/Product/ProductContent/ProductContents.js'

                    //                ]
                    //            }
                    //            ]);
                    //        }
                    //    ]
                    //}
                })
                .state('index.productcontentother', {
                    url: "/productcontentother",
                    templateUrl: "cpanelv1/CmsModules/Product/ProductContentOther/grid.html",
                    controller: "ProductContentOtherCtrl",
                    controllerAs: "ProductContentOther",
                    data: {
                        pageTitle: 'محصولات-دسته بندی'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Product/ProductContentOther/ProductContentOther.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.productcontenttag', {
                    url: "/productcontenttag",
                    templateUrl: "cpanelv1/CmsModules/Product/ProductContentTag/grid.html",
                    controller: "ProductContentTagCtrl",
                    controllerAs: "ProductContentTag",
                    data: {
                        pageTitle: 'محصولات-دسته بندی'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Product/ProductContentTag/ProductContentTag.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.productsharesettingcat', {
                    url: "/productsharesettingcat",
                    templateUrl: "cpanelv1/CmsModules/Product/ProductShareSettingCat/grid.html",
                    controller: "ProducthareSettingcatCtrl",
                    controllerAs: "ProducthareSettingcat",
                    data: {
                        pageTitle: 'محصولات-دسته بندی'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Product/ProductShareSettingCat/ProducthareSettingCat.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.productssharesetting', {
                    url: "/productssharesetting",
                    templateUrl: "cpanelv1/CmsModules/Product/ProductShareSetting/grid.html",
                    controller: "productshareSettingCtrl",
                    controllerAs: "productshareSetting",
                    data: {
                        pageTitle: 'محصولات-تنظیمات اشتراک گذاری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Product/ProductShareSetting/ProducthareSetting.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.productsharing', {
                    url: "/productsharing",
                    templateUrl: "cpanelv1/CmsModules/Product/ProductSharing/grid.html",
                    controller: "productSharingCtrl",
                    controllerAs: "productSharing",
                    data: {
                        pageTitle: 'محصولات-دسته بندی'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Product/ProductSharing/ProductSharing.js'
                                            //  
                                            //  
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.producttag', {
                    url: "/producttag",
                    templateUrl: "cpanelv1/CmsModules/Product/ProductTag/grid.html",
                    controller: "productContentController",
                    controllerAs: "productContent",
                    data: {
                        pageTitle: 'محصولات-دسته بندی'
                    },
                    ncyBreadcrumb: {
                        label: 'تگ ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Product/ProductTag/ProductTag.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Quote Module-----
                .state('index.quotecontent', {
                    url: "/quotecontent",
                    templateUrl: "cpanelv1/CmsModules/Quote/QuoteContent/grid.html",
                    controller: "quoteContentCtrl",
                    controllerAs: "quoteContent",
                    data: {
                        pageTitle: 'کلام روز'
                    },
                    ncyBreadcrumb: {
                        label: 'کلام روز'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Quote/QuoteContent/quoteContents.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Service Module-----
                .state('index.servicetag', {
                    url: "/servicetag",
                    templateUrl: "cpanelv1/CmsModules/Service/ServiceTag/grid.html",
                    controller: "serviceContentController",
                    controllerAs: "serviceContent",
                    data: {
                        pageTitle: 'خدمات - تگ ها'
                    },
                    ncyBreadcrumb: {
                        label: 'تگ ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'angucomplete-alt', {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Service/ServiceTag/serviceTag.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.servicecontent', {
                    url: "/servicecontent",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Service/ServiceContent/grid.html",
                    controller: "serviceContentController",
                    controllerAs: "serviceContent",
                    data: {
                        pageTitle: 'خدمات | محتوا'
                    },
                    ncyBreadcrumb: {
                        label: 'محتوای خدمات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Service/ServiceContent/Controller.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                    //resolve: {
                    //    deps: [
                    //        '$ocLazyLoad',
                    //        function ($ocLazyLoad) {
                    //            return $ocLazyLoad.load(["ngTagsInput", "summernote", {
                    //                //serie: true,
                    //                files: [
                    //                    'cpanelv1/CmsModules/Service/ServiceContent/serviceContents.js'
                    //                ]
                    //            }
                    //            ]);
                    //        }
                    //    ]
                    //}
                })
                //-----Module Member-----
                .state('index.memberuser', {
                    url: "/memberuser",
                    templateUrl: "cpanelv1/CmsModules/Member/MemberUser/grid.html",
                    controller: "memberUserController",
                    controllerAs: "memberUser",
                    data: {
                        pageTitle: 'مدیریت اعضا'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت اعضا'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Member/MemberUser/memberUserController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })

                .state('index.membergroup', {
                    url: "/membergroup",
                    templateUrl: "cpanelv1/CmsModules/Member/MemberGroup/grid.html",
                    controller: "memberGroupController",
                    controllerAs: "memberGroup",
                    data: {
                        pageTitle: 'گروه اعضا'
                    },
                    ncyBreadcrumb: {
                        label: 'گروه اعضا'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Member/MemberGroup/memberGroupController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                /*.state('index.memberuser',
                    {
                        url: "/memberuser",
                        templateUrl: "cpanelv1/CmsModules/Member/MemberUser/grid.html",
                        controller: "memberUserController",
                        controllerAs: "memberUser",
                        data: { pageTitle: 'اعضا' },
                        ncyBreadcrumb: {
                            label: 'اعضا'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                         {
                                            serie: false,
                                            files: [
                                                'cpanelv1/CmsModules/Member/MemberUser/memberUserController.js'
                                            ]
                                        }
                                    ]);
                                }
                            ]
                        }
                    })
                .state('index.memberusergroup',
                    {
                        url: "/memberusergroup",
                        templateUrl: "cpanelv1/CmsModules/Member/MemberUserGroup/grid.html",
                        controller: "memberUserGroupController",
                        controllerAs: "memberUserGroup",
                        data: { pageTitle: 'اعضا در گروه' },
                        ncyBreadcrumb: {
                            label: 'اعضا در گروه'
                        },
                        resolve: {
                            deps: [
                                '$ocLazyLoad',
                                function($ocLazyLoad) {
                                    return $ocLazyLoad.load([
                                        {
                                            serie: false,
                                            files: [
                                                'cpanelv1/CmsModules/Member/MemberUserGroup/memberUserGroupController.js'
                                            ]
                                        }
                                    ]);
                                }
                            ]
                        }
                    })*/
                .state('index.memberproperty', {
                    url: "/memberproperty",
                    templateUrl: "cpanelv1/CmsModules/Member/MemberProperty/grid.html",
                    params: {
                        memberuserId: null
                    },
                    controller: "memberPropertyController",
                    controllerAs: "memberProperty",
                    data: {
                        pageTitle: 'ماژول اشخاص | مدیریت پرونده'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت پرونده'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Member/MemberProperty/MemberPropertyController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.memberpropertydetail', {
                    url: "/memberpropertydetail",
                    params: {
                        propertyParam: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Member/MemberPropertyDetail/grid.html",
                    controller: "memberPropertyDetailController",
                    controllerAs: "memberPropertyDetail",
                    data: {
                        pageTitle: 'ماژول اشخاص | خصوصیات '
                    },
                    ncyBreadcrumb: {
                        label: 'خصوصیات پرونده'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        //serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Member/MemberPropertyDetail/MemberPropertyDetailController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.memberpropertydetailgroup', {
                    url: "/memberpropertydetailgroup",
                    templateUrl: "cpanelv1/CmsModules/Member/memberPropertyDetailGroup/grid.html",
                    controller: "memberPropertyDetailGroupController",
                    controllerAs: "memberPropertyDetailGroup",
                    data: {
                        pageTitle: 'ماژول اشخاص | گروه بندی خصوصیات'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول اشخاص | گروه بندی خصوصیات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Member/memberPropertyDetailGroup/memberPropertyDetailGroupController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.memberpropertytype', {
                    url: "/memberpropertytype",
                    templateUrl: "cpanelv1/CmsModules/Member/MemberPropertyType/grid.html",
                    controller: "memberPropertyTypeController",
                    controllerAs: "memberPropertyType",
                    data: {
                        pageTitle: 'ماژول املاک | نوع ملک'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول املاک | نوع ملک'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Member/MemberPropertyType/MemberPropertyTypeController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.memberpropertytypesite', {
                    url: "/memberpropertytypesite",
                    templateUrl: "cpanelv1/CmsModules/Member/MemberPropertyTypeSite/grid.html",
                    controller: "memberPropertyTypeSiteController",
                    controllerAs: "memberPropertyTypeSite",
                    data: {
                        pageTitle: 'ماژول اشخاص | دسترسی '
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول اشخاص | دسترسی'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Member/MemberPropertyTypeSite/MemberPropertyTypeSiteController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Module object-----
                .state('index.objectuser', {
                    url: "/objectuser",
                    templateUrl: "cpanelv1/CmsModules/object/objectUser/grid.html",
                    controller: "objectUserController",
                    controllerAs: "objectUser",
                    data: {
                        pageTitle: 'مدیریت اشیا'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت اشیا'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/object/objectUser/objectUserController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.objectgroup', {
                    url: "/objectgroup",
                    templateUrl: "cpanelv1/CmsModules/object/objectGroup/grid.html",
                    controller: "objectGroupController",
                    controllerAs: "objectGroup",
                    data: {
                        pageTitle: 'گروه اشیا'
                    },
                    ncyBreadcrumb: {
                        label: 'گروه اشیا'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/object/objectGroup/objectGroupController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.objectproperty', {
                    url: "/objectproperty",
                    templateUrl: "cpanelv1/CmsModules/object/objectProperty/grid.html",
                    params: {
                        objectuserId: null
                    },
                    controller: "objectPropertyController",
                    controllerAs: "objectProperty",
                    data: {
                        pageTitle: 'مدیریت پرونده'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت پرونده'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/object/objectProperty/objectPropertyController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.objectpropertydetail', {
                    url: "/objectpropertydetail",
                    params: {
                        propertyParam: null
                    },
                    templateUrl: "cpanelv1/CmsModules/object/objectPropertyDetail/grid.html",
                    controller: "objectPropertyDetailController",
                    controllerAs: "objectPropertyDetail",
                    data: {
                        pageTitle: 'خصوصیات اشیا '
                    },
                    ncyBreadcrumb: {
                        label: 'خصوصیات اشیا'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        //serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/object/objectPropertyDetail/objectPropertyDetailController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.objectpropertydetailgroup', {
                    url: "/objectpropertydetailgroup",
                    templateUrl: "cpanelv1/CmsModules/object/objectPropertyDetailGroup/grid.html",
                    controller: "objectPropertyDetailGroupController",
                    controllerAs: "objectPropertyDetailGroup",
                    data: {
                        pageTitle: 'ماژول اشیا | گروه بندی خصوصیات'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول اشیا | گروه بندی خصوصیات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/object/objectPropertyDetailGroup/objectPropertyDetailGroupController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.objectpropertytype', {
                    url: "/objectpropertytype",
                    templateUrl: "cpanelv1/CmsModules/object/objectPropertyType/grid.html",
                    controller: "objectPropertyTypeController",
                    controllerAs: "objectPropertyType",
                    data: {
                        pageTitle: 'ماژول اشیا | نوع اشیا'
                    },
                    ncyBreadcrumb: {
                        label: 'ماژول اشیا | نوع اشیا'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/object/objectPropertyType/objectPropertyTypeController.js'
                                            //  
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Shop Module-----
                .state('index.shoptag', {
                    url: "/shoptag",
                    templateUrl: "cpanelv1/CmsModules/Shop/ShopTag/grid.html",
                    controller: "shopTagCtrl",
                    controllerAs: "shopTag",
                    data: {
                        pageTitle: 'تگهای فروشگاه'
                    },
                    ncyBreadcrumb: {
                        label: 'تگ فروشگاه'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Shop/ShopTag/ShopTag.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.shopcontent", {
                    url: "/shopcontent",
                    params: {
                        ContentId: null,
                        TitleTag: null
                    },
                    templateUrl: "cpanelv1/CmsModules/Shop/ShopContent/grid.html",
                    controller: "shopContentController",
                    controllerAs: "shopContent",
                    data: {
                        pageTitle: "دسته بندی کالا ها"
                    },
                    ncyBreadcrumb: {
                        label: 'دسته بندی کالا ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Shop/ShopContent/shopContentController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.shopinvoicesale", {
                    url: "/shopinvoicesale",
                    params: {
                        PaymentInvoseSale: true
                    },
                    templateUrl: "cpanelv1/CmsModules/Shop/ShopInvoiceSale/grid.html",
                    controller: "shopInvoiceSaleController",
                    controllerAs: "shopInvoiceSale",
                    data: {
                        pageTitle: "فاکتور فروش"
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت فاکتورها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Shop/ShopInvoiceSale/shopInvoiceSaleController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.shopcart", {
                    url: "/shopcart",
                    params: {
                        PaymentInvoseSale: true
                    },
                    templateUrl: "cpanelv1/CmsModules/Shop/shopCart/grid.html",
                    controller: "shopCartController",
                    controllerAs: "shopCart",
                    data: {
                        pageTitle: "سبد فروش"
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت سبدها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Shop/shopCart/shopCartController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.shopnewinvoicesaledetail", {
                    url: "/shopnewinvoicesaledetail",
                    params: {
                        invoiceId: 0
                    },
                    templateUrl: "cpanelv1/CmsModules/Shop/ShopInvoiceSaleDetail/grid.html",
                    controller: "shopInvoiceSaleDetailController",
                    controllerAs: "shopInvoiceSaleDetail",
                    data: {
                        pageTitle: "فاکتور جدید"
                    },
                    ncyBreadcrumb: {
                        label: 'فاکتور جدید'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Shop/ShopInvoiceSaleDetail/shopInvoiceSaleDetailController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.shopinvoicesaledetail", {
                    url: "/shopinvoicesaledetail",
                    params: {
                        invoiceId: 0
                    },
                    templateUrl: "cpanelv1/CmsModules/Shop/ShopInvoiceSaleDetail/grid.html",
                    controller: "shopInvoiceSaleDetailController",
                    controllerAs: "shopInvoiceSaleDetail",
                    data: {
                        pageTitle: "فاکتور جدید"
                    },
                    ncyBreadcrumb: {
                        label: 'فاکتور جدید'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Shop/ShopInvoiceSaleDetail/shopInvoiceSaleDetailController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.shopproductcombine", {
                    url: "/shopproductcombine",
                    templateUrl: "cpanelv1/CmsModules/Shop/ShopProductCombine/grid.html",
                    controller: "shopProductCombineController",
                    controllerAs: "shopCombine",
                    data: {
                        pageTitle: "کالای ترکیبی"
                    },
                    ncyBreadcrumb: {
                        label: 'دسته بندی کالا ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Shop/ShopProductCombine/shopProductCombineController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.shopproductitem", {
                    url: "/shopproductitem",
                    templateUrl: "cpanelv1/CmsModules/Shop/ShopProductItem/grid.html",
                    controller: "shopProductItemController",
                    controllerAs: "shopItem",
                    data: {
                        pageTitle: "اجناس"
                    },
                    ncyBreadcrumb: {
                        label: 'دسته بندی کالا ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Shop/ShopProductItem/shopProductItemController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.shopproductprocess", {
                    url: "/shopproductprocess",
                    templateUrl: "cpanelv1/CmsModules/Shop/ShopProductProcess/grid.html",
                    controller: "shopProductProcessController",
                    controllerAs: "shopProcess",
                    data: {
                        pageTitle: "فعّالیت"
                    },
                    ncyBreadcrumb: {
                        label: 'دسته بندی کالا ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Shop/ShopProductProcess/shopProductProcessController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.shopproductservice", {
                    url: "/shopproductservice",
                    templateUrl: "cpanelv1/CmsModules/Shop/ShopProductService/grid.html",
                    controller: "shopProductServiceController",
                    controllerAs: "shopService",
                    data: {
                        pageTitle: "خدمات"
                    },
                    ncyBreadcrumb: {
                        label: 'دسته بندی کالا ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Shop/ShopProductService/shopProductServiceController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.shopproductsaleprice", {
                    url: "/shopproductsaleprice",
                    templateUrl: "cpanelv1/CmsModules/Shop/ShopProductSalePrice/grid.html",
                    controller: "productSalePriceController",
                    controllerAs: "shopSalePrice",
                    data: {
                        pageTitle: "قیمت اجناس"
                    },
                    ncyBreadcrumb: {
                        label: 'دسته بندی کالا ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Shop/ShopProductSalePrice/shopProductSalePriceController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.shopinvoicesaleworkflow", {
                    url: "/shopinvoicesaleworkflow",
                    templateUrl: "cpanelv1/CmsModules/Shop/shopInvoiceSaleWorkFlow/grid.html",
                    controller: "shopInvoiceSaleWorkFlowController",
                    controllerAs: "shopInvoiceSaleWorkFlow",
                    data: {
                        pageTitle: "shopInvoiceSaleWorkFlow"
                    },
                    ncyBreadcrumb: {
                        label: 'shopInvoiceSaleWorkFlow'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Shop/shopInvoiceSaleWorkFlow/shopInvoiceSaleWorkFlowController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.shopproductfileserial", {
                    url: "/shopproductfileserial",
                    templateUrl: "cpanelv1/CmsModules/Shop/shopProductFileSerial/grid.html",
                    controller: "shopProductFileSerialController",
                    controllerAs: "shopProductFileSerial",
                    data: {
                        pageTitle: "shopProductFileSerial"
                    },
                    ncyBreadcrumb: {
                        label: 'shopProductFileSerial'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Shop/shopProductFileSerial/shopProductFileSerialController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.shopprocesscategory", {
                    url: "/shopprocesscategory",
                    templateUrl: "cpanelv1/CmsModules/Shop/shopProcessCategory/grid.html",
                    controller: "shopProcessCategoryController",
                    controllerAs: "shopProcessCategory",
                    data: {
                        pageTitle: "shopProcessCategory"
                    },
                    ncyBreadcrumb: {
                        label: 'shopProcessCategory'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Shop/shopProcessCategory/shopProcessCategoryController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state('index.shopprocess', {
                    url: "/shopprocess",
                    templateUrl: "cpanelv1/CmsModules/Shop/shopProcess/grid.html",
                    params: {
                        sourceid: null
                    },
                    controller: "shopProcessController",
                    controllerAs: "shopProcess",
                    data: {
                        pageTitle: 'نیازمندی صفحات'
                    },
                    ncyBreadcrumb: {
                        label: 'نیازمندی صفحات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'treeControl', {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Shop/ShopProcess/shopProcessController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.shopprocessvalue', {
                    url: "/shopprocessvalue",
                    templateUrl: "cpanelv1/CmsModules/Shop/ShopProcessValue/grid.html",
                    params: {
                        sourceid: null,
                        appid: null,
                        apptitle: null
                    },
                    controller: "shopProcessValueController",
                    controllerAs: "shopProcessValue",
                    data: {
                        pageTitle: 'مقداردهی به صفحات'
                    },
                    ncyBreadcrumb: {
                        label: 'مقداردهی به صفحات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Shop/ShopProcessValue/ShopProcessValueController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //---------Parameter--------
                .state("index.articlecontentparametertype", {
                    url: "/articlecontentparametertype",
                    templateUrl: "cpanelv1/CmsModules/article/articleContentParameterType/grid.html",
                    controller: "articleContentParameterTypeController",
                    controllerAs: "articleContentParameterType",
                    data: {
                        pageTitle: "نوع پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'نوع پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/article/articleContentParameterType/articleContentParameterTypeController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.articlecontentparameter", {
                    url: "/articlecontentparameter",
                    templateUrl: "cpanelv1/CmsModules/article/articleContentParameter/grid.html",
                    controller: "articleContentParameterController",
                    controllerAs: "articleContentParameter",
                    data: {
                        pageTitle: "پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/article/articleContentParameter/articleContentParameterController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.articlecontentandparametervalue", {
                    url: "/articlecontentandparametervalue",
                    templateUrl: "cpanelv1/CmsModules/article/articleContentAndParameterValue/grid.html",
                    controller: "articleContentAndParameterValueController",
                    controllerAs: "articleContentAndParameterValue",
                    data: {
                        pageTitle: "مقدار پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'مقدار پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/article/articleContentAndParameterValue/articleContentAndParameterValueController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.blogcontentparametertype", {
                    url: "/blogcontentparametertype",
                    templateUrl: "cpanelv1/CmsModules/blog/blogContentParameterType/grid.html",
                    controller: "blogContentParameterTypeController",
                    controllerAs: "blogContentParameterType",
                    data: {
                        pageTitle: "نوع پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'نوع پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/blog/blogContentParameterType/blogContentParameterTypeController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.blogcontentparameter", {
                    url: "/blogcontentparameter",
                    templateUrl: "cpanelv1/CmsModules/blog/blogContentParameter/grid.html",
                    controller: "blogContentParameterController",
                    controllerAs: "blogContentParameter",
                    data: {
                        pageTitle: "پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/blog/blogContentParameter/blogContentParameterController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.blogcontentandparametervalue", {
                    url: "/blogcontentandparametervalue",
                    templateUrl: "cpanelv1/CmsModules/blog/blogContentAndParameterValue/grid.html",
                    controller: "blogContentAndParameterValueController",
                    controllerAs: "blogContentAndParameterValue",
                    data: {
                        pageTitle: "مقدار پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'مقدار پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/blog/blogContentAndParameterValue/blogContentAndParameterValueController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.biographycontentparametertype", {
                    url: "/biographycontentparametertype",
                    templateUrl: "cpanelv1/CmsModules/biography/biographyContentParameterType/grid.html",
                    controller: "biographyContentParameterTypeController",
                    controllerAs: "biographyContentParameterType",
                    data: {
                        pageTitle: "نوع پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'نوع پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/biography/biographyContentParameterType/biographyContentParameterTypeController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.biographycontentparameter", {
                    url: "/biographycontentparameter",
                    templateUrl: "cpanelv1/CmsModules/biography/biographyContentParameter/grid.html",
                    controller: "biographyContentParameterController",
                    controllerAs: "biographyContentParameter",
                    data: {
                        pageTitle: "پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/biography/biographyContentParameter/biographyContentParameterController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.biographycontentandparametervalue", {
                    url: "/biographycontentandparametervalue",
                    templateUrl: "cpanelv1/CmsModules/biography/biographyContentAndParameterValue/grid.html",
                    controller: "biographyContentAndParameterValueController",
                    controllerAs: "biographyContentAndParameterValue",
                    data: {
                        pageTitle: "مقدار پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'مقدار پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/biography/biographyContentAndParameterValue/biographyContentAndParameterValueController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.chartcontentparametertype", {
                    url: "/chartcontentparametertype",
                    templateUrl: "cpanelv1/CmsModules/chart/chartContentParameterType/grid.html",
                    controller: "chartContentParameterTypeController",
                    controllerAs: "chartContentParameterType",
                    data: {
                        pageTitle: "نوع پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'نوع پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/chart/chartContentParameterType/chartContentParameterTypeController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.chartcontentparameter", {
                    url: "/chartcontentparameter",
                    templateUrl: "cpanelv1/CmsModules/chart/chartContentParameter/grid.html",
                    controller: "chartContentParameterController",
                    controllerAs: "chartContentParameter",
                    data: {
                        pageTitle: "پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/chart/chartContentParameter/chartContentParameterController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.chartcontentandparametervalue", {
                    url: "/chartcontentandparametervalue",
                    templateUrl: "cpanelv1/CmsModules/chart/chartContentAndParameterValue/grid.html",
                    controller: "chartContentAndParameterValueController",
                    controllerAs: "chartContentAndParameterValue",
                    data: {
                        pageTitle: "مقدار پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'مقدار پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/chart/chartContentAndParameterValue/chartContentAndParameterValueController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.campaigncontentparametertype", {
                    url: "/campaigncontentparametertype",
                    templateUrl: "cpanelv1/CmsModules/campaign/campaignContentParameterType/grid.html",
                    controller: "campaignContentParameterTypeController",
                    controllerAs: "campaignContentParameterType",
                    data: {
                        pageTitle: "نوع پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'نوع پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/campaign/campaignContentParameterType/campaignContentParameterTypeController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.campaigncontentparameter", {
                    url: "/campaigncontentparameter",
                    templateUrl: "cpanelv1/CmsModules/campaign/campaignContentParameter/grid.html",
                    controller: "campaignContentParameterController",
                    controllerAs: "campaignContentParameter",
                    data: {
                        pageTitle: "پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/campaign/campaignContentParameter/campaignContentParameterController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.campaigncontentandparametervalue", {
                    url: "/campaigncontentandparametervalue",
                    templateUrl: "cpanelv1/CmsModules/campaign/campaignContentAndParameterValue/grid.html",
                    controller: "campaignContentAndParameterValueController",
                    controllerAs: "campaignContentAndParameterValue",
                    data: {
                        pageTitle: "مقدار پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'مقدار پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/campaign/campaignContentAndParameterValue/campaignContentAndParameterValueController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.newscontentparametertype", {
                    url: "/newscontentparametertype",
                    templateUrl: "cpanelv1/CmsModules/news/newsContentParameterType/grid.html",
                    controller: "newsContentParameterTypeController",
                    controllerAs: "newsContentParameterType",
                    data: {
                        pageTitle: "نوع پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'نوع پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/news/newsContentParameterType/newsContentParameterTypeController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.newscontentparameter", {
                    url: "/newscontentparameter",
                    templateUrl: "cpanelv1/CmsModules/news/newsContentParameter/grid.html",
                    controller: "newsContentParameterController",
                    controllerAs: "newsContentParameter",
                    data: {
                        pageTitle: "پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/news/newsContentParameter/newsContentParameterController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.newscontentandparametervalue", {
                    url: "/newscontentandparametervalue",
                    templateUrl: "cpanelv1/CmsModules/news/newsContentAndParameterValue/grid.html",
                    controller: "newsContentAndParameterValueController",
                    controllerAs: "newsContentAndParameterValue",
                    data: {
                        pageTitle: "مقدار پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'مقدار پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/news/newsContentAndParameterValue/newsContentAndParameterValueController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.pollingcontentparametertype", {
                    url: "/pollingcontentparametertype",
                    templateUrl: "cpanelv1/CmsModules/polling/pollingContentParameterType/grid.html",
                    controller: "pollingContentParameterTypeController",
                    controllerAs: "pollingContentParameterType",
                    data: {
                        pageTitle: "نوع پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'نوع پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/polling/pollingContentParameterType/pollingContentParameterTypeController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.pollingcontentparameter", {
                    url: "/pollingcontentparameter",
                    templateUrl: "cpanelv1/CmsModules/polling/pollingContentParameter/grid.html",
                    controller: "pollingContentParameterController",
                    controllerAs: "pollingContentParameter",
                    data: {
                        pageTitle: "پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/polling/pollingContentParameter/pollingContentParameterController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.pollingcontentandparametervalue", {
                    url: "/pollingcontentandparametervalue",
                    templateUrl: "cpanelv1/CmsModules/polling/pollingContentAndParameterValue/grid.html",
                    controller: "pollingContentAndParameterValueController",
                    controllerAs: "pollingContentAndParameterValue",
                    data: {
                        pageTitle: "مقدار پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'مقدار پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/polling/pollingContentAndParameterValue/pollingContentAndParameterValueController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.productcontentparametertype", {
                    url: "/productcontentparametertype",
                    templateUrl: "cpanelv1/CmsModules/product/productContentParameterType/grid.html",
                    controller: "productContentParameterTypeController",
                    controllerAs: "productContentParameterType",
                    data: {
                        pageTitle: "نوع پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'نوع پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/product/productContentParameterType/productContentParameterTypeController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.productcontentparameter", {
                    url: "/productcontentparameter",
                    templateUrl: "cpanelv1/CmsModules/product/productContentParameter/grid.html",
                    controller: "productContentParameterController",
                    controllerAs: "productContentParameter",
                    data: {
                        pageTitle: "پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/product/productContentParameter/productContentParameterController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.productcontentandparametervalue", {
                    url: "/productcontentandparametervalue",
                    templateUrl: "cpanelv1/CmsModules/product/productContentAndParameterValue/grid.html",
                    controller: "productContentAndParameterValueController",
                    controllerAs: "productContentAndParameterValue",
                    data: {
                        pageTitle: "مقدار پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'مقدار پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/product/productContentAndParameterValue/productContentAndParameterValueController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.quotecontentparametertype", {
                    url: "/quotecontentparametertype",
                    templateUrl: "cpanelv1/CmsModules/quote/quoteContentParameterType/grid.html",
                    controller: "quoteContentParameterTypeController",
                    controllerAs: "quoteContentParameterType",
                    data: {
                        pageTitle: "نوع پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'نوع پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/quote/quoteContentParameterType/quoteContentParameterTypeController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.quotecontentparameter", {
                    url: "/quotecontentparameter",
                    templateUrl: "cpanelv1/CmsModules/quote/quoteContentParameter/grid.html",
                    controller: "quoteContentParameterController",
                    controllerAs: "quoteContentParameter",
                    data: {
                        pageTitle: "پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/quote/quoteContentParameter/quoteContentParameterController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.quotecontentandparametervalue", {
                    url: "/quotecontentandparametervalue",
                    templateUrl: "cpanelv1/CmsModules/quote/quoteContentAndParameterValue/grid.html",
                    controller: "quoteContentAndParameterValueController",
                    controllerAs: "quoteContentAndParameterValue",
                    data: {
                        pageTitle: "مقدار پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'مقدار پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/quote/quoteContentAndParameterValue/quoteContentAndParameterValueController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.servicecontentparametertype", {
                    url: "/servicecontentparametertype",
                    templateUrl: "cpanelv1/CmsModules/service/serviceContentParameterType/grid.html",
                    controller: "serviceContentParameterTypeController",
                    controllerAs: "serviceContentParameterType",
                    data: {
                        pageTitle: "نوع پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'نوع پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/service/serviceContentParameterType/serviceContentParameterTypeController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.servicecontentparameter", {
                    url: "/servicecontentparameter",
                    templateUrl: "cpanelv1/CmsModules/service/serviceContentParameter/grid.html",
                    controller: "serviceContentParameterController",
                    controllerAs: "serviceContentParameter",
                    data: {
                        pageTitle: "پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/service/serviceContentParameter/serviceContentParameterController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index. ", {
                    url: "/servicecontentandparametervalue",
                    templateUrl: "cpanelv1/CmsModules/service/serviceContentAndParameterValue/grid.html",
                    controller: "serviceContentAndParameterValueController",
                    controllerAs: "serviceContentAndParameterValue",
                    data: {
                        pageTitle: "مقدار پارامتر"
                    },
                    ncyBreadcrumb: {
                        label: 'مقدار پارامتر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/service/serviceContentAndParameterValue/serviceContentAndParameterValueController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                //-----SiteAccounting Module-----
                .state("index.siteaccountingdocument", {
                    url: "/siteaccountingdocument",
                    templateUrl: "cpanelv1/CmsModules/SiteAccounting/SiteAccountingDocument/grid.html",
                    controller: "siteSccountingDocumentController",
                    controllerAs: "siteAccDocument",
                    data: {
                        pageTitle: "دسته بندی کالا ها"
                    },
                    ncyBreadcrumb: {
                        label: 'دسته بندی کالا ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/SiteAccounting/SiteAccountingDocument/siteAccountingDocumentController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.siteaccountingdocumentdetail", {
                    url: "/siteaccountingdocumentdetail",
                    templateUrl: "cpanelv1/CmsModules/SiteAccounting/SiteAccountingDocumentDetail/grid.html",
                    controller: "siteAccountingDocumentDetailController",
                    controllerAs: "siteAccDocumentDetail",
                    data: {
                        pageTitle: "فاکتور فروش"
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت فاکتورها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/SiteAccounting/SiteAccountingDocumentDetail/siteAccountingDocumentDetailController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state("index.siteaccountingdocumentdetailtype", {
                    url: "/siteaccountingdocumentdetailtype",
                    params: {
                        invoiceId: 0
                    },
                    templateUrl: "cpanelv1/CmsModules/SiteAccounting/SiteAccountingDocumentDetailType/grid.html",
                    controller: "siteAccountingDocumentDetailTypeController",
                    controllerAs: "siteAccDocumentDetailType",
                    data: {
                        pageTitle: "فاکتور جدید"
                    },
                    ncyBreadcrumb: {
                        label: 'فاکتور جدید'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/SiteAccounting/SiteAccountingDocumentDetailType/siteAccountingDocumentDetailTypeController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                //-----BankPayment Module-----
                .state("index.bankpaymentprivatesiteconfig", {
                    url: "/bankpaymentprivatesiteconfig",
                    templateUrl: "cpanelv1/CmsModules/BankPayment/BankPaymentPrivateSiteConfig/grid.html",
                    params: {
                        publicConfigId: null
                    },
                    controller: "bankPaymentPrivateSiteConfigController",
                    controllerAs: "privateSiteConfig",
                    data: {
                        pageTitle: "تنظیمات سایت"
                    },
                    ncyBreadcrumb: {
                        label: 'تنظیمات سایت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    //'ngSanitize',
                                    {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/BankPayment/BankPaymentPrivateSiteConfig/bankPaymentPrivateSiteConfig.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.bankpaymentpublicconfig", {
                    url: "/bankpaymentpublicconfig",
                    templateUrl: "cpanelv1/CmsModules/BankPayment/BankPaymentPublicConfig/grid.html",
                    controller: "bankPaymentPublicConfigController",
                    controllerAs: "publicConfig",
                    data: {
                        pageTitle: "تنظیمات"
                    },
                    ncyBreadcrumb: {
                        label: 'تنظیمات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'treeControl', {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/BankPayment/BankPaymentPublicConfig/bankPaymentPublicConfig.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.bankpaymenttransc", {
                    url: "/bankpaymenttransc",
                    templateUrl: "cpanelv1/CmsModules/BankPayment/BankPaymentTransaction/grid.html",
                    controller: "bankPaymentTranscController",
                    controllerAs: "transc",
                    params: {
                        privateSiteConfigId: null,
                        transactionId: 0
                    },
                    data: {
                        pageTitle: "تراکنش ها"
                    },
                    ncyBreadcrumb: {
                        label: 'تراکنش ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/BankPayment/BankPaymentTransaction/bankPaymentTransaction.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.bankpaymenttransclog", {
                    url: "/bankpaymenttransclog",
                    templateUrl: "cpanelv1/CmsModules/BankPayment/BankPaymentTransactionLog/grid.html",
                    controller: "bankPaymentTranscLogController",
                    controllerAs: "trancsLog",
                    data: {
                        pageTitle: "جزییات تراکنش ها"
                    },
                    ncyBreadcrumb: {
                        label: 'جزییات تراکنش ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/BankPayment/BankPaymentTransactionLog/bankPaymentTransactionLog.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Email Module-----
                .state("index.emailoutboxcontent", {
                    url: "/emailoutboxcontent",
                    templateUrl: "cpanelv1/CmsModules/Email/EmailOutBoxContent/grid.html",
                    controller: "emailOutBoxContentCtrl",
                    controllerAs: "emailOutBoxContent",
                    data: {
                        pageTitle: "تنظیمات سایت"
                    },
                    ncyBreadcrumb: {
                        label: 'تنظیمات سایت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    //'ngSanitize',
                                    {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Email/EmailOutBoxContent/emailOutBoxContent.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.emailapipathcompany", {
                    url: "/emailapipathcompany",
                    templateUrl: "cpanelv1/CmsModules/Email/EmailApiPathCompany/grid.html",
                    controller: "emailapipathcompanyCtrl",
                    controllerAs: "emailapipathcompany",
                    data: {
                        pageTitle: "تنظیمات شرکت"
                    },
                    ncyBreadcrumb: {
                        label: 'تنظیمات شرکت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    //'ngSanitize',
                                    {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Email/EmailApiPathCompany/EmailApiPathCompany.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.emailapipathpriceservice", {
                    url: "/emailapipathpriceservice",
                    templateUrl: "cpanelv1/CmsModules/Email/EmailApiPathPriceService/grid.html",
                    params: {
                        PrivateSiteConfigId: null
                    },
                    controller: "emailapipathpriceserviceCtrl",
                    controllerAs: "emailapipathpriceservice",
                    data: {
                        pageTitle: "قیمت شرکت"
                    },
                    ncyBreadcrumb: {
                        label: 'قیمت شرکت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    //'ngSanitize',
                                    {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Email/EmailApiPathPriceService/EmailApiPathPriceService.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.emailoutboxreciver", {
                    url: "/emailoutboxreciver",
                    templateUrl: "cpanelv1/CmsModules/Email/EmailOutBoxReciver/grid.html",
                    params: {
                        OutBoxContentId: null
                    },
                    controller: "emailOutBoxReciverController",
                    controllerAs: "emailOutBoxReciver",
                    data: {
                        pageTitle: "تنظیمات سایت"
                    },
                    ncyBreadcrumb: {
                        label: 'تنظیمات سایت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    //'ngSanitize',
                                    {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Email/EmailOutBoxReciver/emailOutBoxReciver.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.emailoutboxreciverlock", {
                    url: "/emailoutboxreciverlock",
                    templateUrl: "cpanelv1/CmsModules/Email/EmailOutBoxReciverLock/grid.html",
                    controller: "emailOutBoxReciverLockController",
                    controllerAs: "emailOutBoxReciverLock",
                    data: {
                        pageTitle: "تنظیمات سایت"
                    },
                    ncyBreadcrumb: {
                        label: 'تنظیمات سایت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    //'ngSanitize',
                                    {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Email/EmailOutBoxReciverLock/EmailOutBoxReciverLock.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.emailprivatesiteconfig", {
                    url: "/emailprivatesiteconfig",
                    templateUrl: "cpanelv1/CmsModules/Email/EmailPrivateSiteConfig/grid.html",
                    params: {
                        publicConfigId: null
                    },
                    controller: "emailPrivateSiteConfigCtrl",
                    controllerAs: "emailPrivateSiteConfig",
                    data: {
                        pageTitle: "تنظیمات سایت"
                    },
                    ncyBreadcrumb: {
                        label: 'تنظیمات سایت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "summernote",
                                    //'ngSanitize',
                                    {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Email/EmailPrivateSiteConfig/emailPrivateSiteConfig.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.emailpublicconfig", {
                    url: "/emailpublicconfig",
                    templateUrl: "cpanelv1/CmsModules/Email/EmailPublicConfig/grid.html",
                    controller: "emailPublicConfigCtrl",
                    controllerAs: "emailPublicConfig",
                    data: {
                        pageTitle: "تنظیمات"
                    },
                    ncyBreadcrumb: {
                        label: 'تنظیمات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'treeControl', {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Email/EmailPublicConfig/emailPublicConfig.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.emailprocesstask", {
                    url: "/emailprocesstask",
                    templateUrl: "cpanelv1/CmsModules/Email/EmailProcessTask/grid.html",
                    controller: "emailProcessTaskCtrl",
                    controllerAs: "emailProcessTask",
                    params: {
                        privateSiteConfigId: null
                    },
                    data: {
                        pageTitle: "تراکنش ها"
                    },
                    ncyBreadcrumb: {
                        label: 'تراکنش ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Email/EmailProcessTask/emailProcessTask.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.emailprocesstasklog", {
                    url: "/emailprocesstasklog",
                    templateUrl: "cpanelv1/CmsModules/Email/EmailProcessTaskLog/grid.html",
                    controller: "emailProcessTaskLogCtrl",
                    controllerAs: "emailProcessTaskLog",
                    data: {
                        pageTitle: "جزییات تراکنش ها"
                    },
                    ncyBreadcrumb: {
                        label: 'جزییات تراکنش ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Email/EmailProcessTaskLog/emailProcessTaskLog.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Module TaskScheduler-----
                .state('index.taskschedulerprocesscategory', {
                    url: "/taskschedulerprocesscategory",
                    templateUrl: "cpanelv1/CmsModules/TaskScheduler/TaskSchedulerProcessCategory/grid.html",
                    controller: "taskSchedulerProcessCategoryController",
                    controllerAs: "taskSchedulerProcessCategory",
                    data: {
                        pageTitle: 'منابع'
                    },
                    ncyBreadcrumb: {
                        label: 'منابع'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/TaskScheduler/TaskSchedulerProcessCategory/TaskSchedulerProcessCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.taskschedulerprocess', {
                    url: "/taskschedulerprocess",
                    templateUrl: "cpanelv1/CmsModules/TaskScheduler/TaskSchedulerProcess/grid.html",
                    params: {
                        sourceid: null
                    },
                    controller: "taskSchedulerProcessController",
                    controllerAs: "taskSchedulerProcess",
                    data: {
                        pageTitle: 'نیازمندی صفحات'
                    },
                    ncyBreadcrumb: {
                        label: 'نیازمندی صفحات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'treeControl', {
                                        serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/TaskScheduler/TaskSchedulerProcess/TaskSchedulerProcessController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.taskschedulerprocessvalue', {
                    url: "/taskschedulerprocessvalue",
                    templateUrl: "cpanelv1/CmsModules/TaskScheduler/TaskSchedulerProcessValue/grid.html",
                    params: {
                        sourceid: null,
                        appid: null,
                        apptitle: null
                    },
                    controller: "taskSchedulerProcessValueController",
                    controllerAs: "taskSchedulerProcessValue",
                    data: {
                        pageTitle: 'مقداردهی به صفحات'
                    },
                    ncyBreadcrumb: {
                        label: 'مقداردهی به صفحات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'angucomplete-alt', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/TaskScheduler/TaskSchedulerProcessValue/TaskSchedulerProcessValueController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.taskscheduleschedule", {
                    url: "/taskscheduleschedule",
                    templateUrl: "cpanelv1/CmsModules/TaskScheduler/TaskSchedulerSchedule/grid.html",
                    controller: "scheduleController",
                    controllerAs: "schedule",
                    data: {
                        pageTitle: "دسته بندی کالا ها"
                    },
                    ncyBreadcrumb: {
                        label: 'دسته بندی کالا ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/TaskScheduler/TaskSchedulerSchedule/taskSchedulerScheduleController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                .state("index.taskscheduletask", {
                    url: "/taskscheduletask",
                    templateUrl: "cpanelv1/CmsModules/TaskScheduler/TaskSchedulerTask/grid.html",
                    controller: "taskscheduleTaskController",
                    controllerAs: "task",
                    data: {
                        pageTitle: "task"
                    },
                    ncyBreadcrumb: {
                        label: 'task'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/TaskScheduler/TaskSchedulerTask/taskSchedulerTaskController.js'
                                    ]
                                });
                            }
                        ]
                    }
                })
                //-----Module Phonebook-----
                .state('index.phonebookcountry', {
                    url: "/phonebookcountry",
                    templateUrl: "cpanelv1/CmsModules/PhoneBook/phoneBookCountry/grid.html",
                    controller: "phoneBookCountryCtrl",
                    controllerAs: "phoneBookCountry",
                    data: {
                        pageTitle: 'مدیریت کشورها'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت کشورها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/PhoneBook/phoneBookCountry/phoneBookCountryController.js'
                                            // 
                                            //
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.phonebookstate', {
                    url: "/phonebookstate",
                    templateUrl: "cpanelv1/CmsModules/PhoneBook/phoneBookState/grid.html",
                    controller: "phoneBookStateCtrl",
                    controllerAs: "phoneBookState",
                    data: {
                        pageTitle: 'مدیریت استانها'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت استانها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/PhoneBook/phoneBookState/phoneBookStateController.js'
                                            //  
                                            //  
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.phonebookcity', {
                    url: "/phonebookcity",
                    templateUrl: "cpanelv1/CmsModules/PhoneBook/phoneBookCity/grid.html",
                    controller: "phoneBookCityCtrl",
                    controllerAs: "phoneBookCity",
                    data: {
                        pageTitle: 'مدیریت شهرها'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت شهرها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/PhoneBook/phoneBookCity/phoneBookCityController.js'
                                            // 
                                            // 
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.phonebookzone', {
                    url: "/phonebookzone",
                    templateUrl: "cpanelv1/CmsModules/PhoneBook/phoneBookZone/grid.html",
                    controller: "phoneBookZoneCtrl",
                    controllerAs: "phoneBookZone",
                    data: {
                        pageTitle: 'مدیریت مناطق'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیریت مناطق'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/PhoneBook/phoneBookZone/phoneBookZoneController.js'
                                            //  
                                            //  
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.phonebooktype', {
                    url: "/phonebooktype",
                    templateUrl: "cpanelv1/CmsModules/PhoneBook/phoneBookType/grid.html",
                    controller: "phoneBookTypeCtrl",
                    controllerAs: "phoneBookType",
                    data: {
                        pageTitle: 'نوع دفترچه تلفن'
                    },
                    ncyBreadcrumb: {
                        label: 'نوع دفترچه تلفن'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/PhoneBook/phoneBookType/phoneBookTypeController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.phonebook', {
                    url: "/phonebook",
                    templateUrl: "cpanelv1/CmsModules/PhoneBook/phoneBook/grid.html",
                    controller: "phoneBookCtrl",
                    controllerAs: "phoneBook",
                    data: {
                        pageTitle: 'دفترچه تلفن'
                    },
                    ncyBreadcrumb: {
                        label: 'دفترچه تلفن'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/PhoneBook/phoneBook/phoneBookController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.tellnumbertype', {
                    url: "/tellnumbertype",
                    templateUrl: "cpanelv1/CmsModules/PhoneBook/tellNumberType/grid.html",
                    controller: "tellNumberTypeCtrl",
                    controllerAs: "tellNumberType",
                    data: {
                        pageTitle: 'نوع شماره تلفن'
                    },
                    ncyBreadcrumb: {
                        label: 'نوع شماره تلفن'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/PhoneBook/tellNumberType/tellNumberTypeController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.tellnumber', {
                    url: "/tellnumber",
                    templateUrl: "cpanelv1/CmsModules/PhoneBook/tellNumber/grid.html",
                    controller: "tellNumberCtrl",
                    controllerAs: "tellNumber",
                    data: {
                        pageTitle: 'شماره تلفن'
                    },
                    ncyBreadcrumb: {
                        label: 'شماره تلفن ها'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/PhoneBook/tellNumber/tellNumberController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.discountgroup', {
                    url: "/discountgroup",
                    templateUrl: "cpanelv1/CmsModules/Discount/DiscountGroup/grid.html",
                    controller: "discountGroupController",
                    controllerAs: "discountGroup",
                    data: {
                        pageTitle: 'گروه تخفیفات'
                    },
                    ncyBreadcrumb: {
                        label: 'گروه تخفیفات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Discount/DiscountGroup/DiscountGroupController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.discountserialcardflowgroup', {
                    url: "/discountserialcardflowgroup",
                    templateUrl: "cpanelv1/CmsModules/Discount/DiscountSerialCardFlowGroup/grid.html",
                    controller: "discountSerialCardFlowGroupController",
                    controllerAs: "discountSerialCardFlowGroup",
                    data: {
                        pageTitle: 'گروه تخفیفات'
                    },
                    ncyBreadcrumb: {
                        label: 'گروه تخفیفات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Discount/DiscountSerialCardFlowGroup/discountSerialCardFlowGroupController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.discountsellerpricesetting', {
                    url: "/discountSellerPriceSetting",
                    templateUrl: "cpanelv1/CmsModules/Discount/discountSellerPriceSetting/grid.html",
                    controller: "discountSellerPriceSettingController",
                    controllerAs: "discountSellerPriceSetting",
                    data: {
                        pageTitle: 'گروه تخفیفات'
                    },
                    ncyBreadcrumb: {
                        label: 'گروه تخفیفات'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Discount/discountSellerPriceSetting/discountSellerPriceSettingController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.discountseller', {
                    url: "/discountseller",
                    templateUrl: "cpanelv1/CmsModules/Discount/DiscountSeller/grid.html",
                    controller: "discountSellerController",
                    controllerAs: "discountSeller",
                    data: {
                        pageTitle: 'نمایندگان فروش'
                    },
                    ncyBreadcrumb: {
                        label: 'نمایندگان فروش'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Discount/DiscountSeller/DiscountSellerController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.discountserialcard', {
                    url: "/discountserialcard",
                    templateUrl: "cpanelv1/CmsModules/Discount/DiscountSerialCard/grid.html",
                    controller: "discountSerialCardController",
                    controllerAs: "discountSerialCard",
                    data: {
                        pageTitle: 'فروش کارت'
                    },
                    ncyBreadcrumb: {
                        label: 'فروش کارت'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Discount/DiscountSerialCard/DiscountSerialCardController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.discountoffer', {
                    url: "/discountoffer",
                    templateUrl: "cpanelv1/CmsModules/Discount/DiscountOffer/grid.html",
                    controller: "discountOfferController",
                    controllerAs: "discountOffer",
                    data: {
                        pageTitle: 'پیشنهادات تخفیف'
                    },
                    ncyBreadcrumb: {
                        label: 'پیشنهادات تخفیف'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Discount/DiscountOffer/DiscountOfferController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.discountofferdetail', {
                    url: "/discountofferdetail",
                    templateUrl: "cpanelv1/CmsModules/Discount/DiscountOfferDetail/grid.html",
                    controller: "discountOfferDetailController",
                    controllerAs: "discountOfferDetail",
                    data: {
                        pageTitle: 'جزییات پیشنهاد'
                    },
                    ncyBreadcrumb: {
                        label: 'جزییات پیشنهاد'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Discount/DiscountOfferDetail/DiscountOfferDetailController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.campaigndetaillog', {
                    url: "/campaigndetaillog",
                    templateUrl: "cpanelv1/CmsModules/Campaign/CampaignDetailLog/grid.html",
                    controller: "campaignDetailLogController",
                    controllerAs: "campaignDetailLog",
                    data: {
                        pageTitle: 'اطلاعات کمپ'
                    },
                    ncyBreadcrumb: {
                        label: 'اطلاعات کمپ'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Campaign/CampaignDetailLog/CampaignDetailLogController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.campaignadmin', {
                    url: "/campaignadmin",
                    templateUrl: "cpanelv1/CmsModules/Campaign/CampaignAdmin/grid.html",
                    controller: "campaignAdminController",
                    controllerAs: "campaignAdmin",
                    data: {
                        pageTitle: 'مدیر کمپ'
                    },
                    ncyBreadcrumb: {
                        label: 'مدیر کمپ'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Campaign/CampaignAdmin/CampaignAdminController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.campaigndetail', {
                    url: "/campaigndetail",
                    templateUrl: "cpanelv1/CmsModules/Campaign/CampaignDetail/grid.html",
                    controller: "campaignDetailController",
                    controllerAs: "campaignDetail",
                    data: {
                        pageTitle: 'اطلاعات کمپ'
                    },
                    ncyBreadcrumb: {
                        label: 'اطلاعات کمپ'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Campaign/CampaignDetail/CampaignDetailController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.campaigndetailitem', {
                    url: "/campaigndetailitem",
                    templateUrl: "cpanelv1/CmsModules/Campaign/CampaignDetailItem/grid.html",
                    controller: "campaignDetailItemController",
                    controllerAs: "campaignDetailItem",
                    data: {
                        pageTitle: 'موارد موردنیاز برای کمپ'
                    },
                    ncyBreadcrumb: {
                        label: 'موارد موردنیاز برای کمپ'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Campaign/CampaignDetailItem/CampaignDetailItemController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.campaigndetailprogram', {
                    url: "/campaigndetailprogram",
                    templateUrl: "cpanelv1/CmsModules/Campaign/CampaignDetailProgram/grid.html",
                    controller: "campaignDetailProgramController",
                    controllerAs: "campaignDetailProgram",
                    data: {
                        pageTitle: 'برنامه کمپ'
                    },
                    ncyBreadcrumb: {
                        label: 'برنامه کمپ'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Campaign/CampaignDetailProgram/CampaignDetailProgramController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.campaigndetailproduct', {
                    url: "/campaigndetailproduct",
                    templateUrl: "cpanelv1/CmsModules/Campaign/CampaignDetailProduct/grid.html",
                    controller: "campaignDetailProductController",
                    controllerAs: "CampaignDetailProduct",
                    data: {
                        pageTitle: 'کالاهای کمپ'
                    },
                    ncyBreadcrumb: {
                        label: 'کالاهای کمپ'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Campaign/CampaignDetailProduct/CampaignDetailProductController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.campaigndetailmember', {
                    url: "/campaigndetailmember",
                    templateUrl: "cpanelv1/CmsModules/Campaign/CampaignDetailMember/grid.html",
                    controller: "campaignDetailMemberController",
                    controllerAs: "campaignDetailMember",
                    data: {
                        pageTitle: 'کالاهای کمپ'
                    },
                    ncyBreadcrumb: {
                        label: 'کالاهای کمپ'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Campaign/CampaignDetailMember/CampaignDetailMemberController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.campaigncontent', {
                    url: "/campaigncontent",
                    templateUrl: "cpanelv1/CmsModules/Campaign/CampaignContent/grid.html",
                    controller: "campaignContentController",
                    controllerAs: "CampaignContent",
                    data: {
                        pageTitle: 'محتوای کمپ'
                    },
                    ncyBreadcrumb: {
                        label: 'محتوای کمپ'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", 'ADM-dateTimePicker', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Campaign/CampaignContent/CampaignContent.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.campaignitem', {
                    url: "/campaignitem",
                    templateUrl: "cpanelv1/CmsModules/Campaign/CampaignItem/grid.html",
                    controller: "campaignItemController",
                    controllerAs: "campaignItem",
                    data: {
                        pageTitle: 'محتوای اخبار'
                    },
                    ncyBreadcrumb: {
                        label: 'محتوای اخبار'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    "ngTagsInput", "summernote", "treeControl", {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Campaign/CampaignItem/CampaignItem.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                //-----Module LinkManagement-----
                .state('index.linkmanagementmember', {
                    url: "/linkmanagementmember",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementMember/grid.html",
                    controller: "linkManagementMemberController",
                    controllerAs: "linkManagementMember",
                    data: {
                        pageTitle: 'عضو'
                    },
                    ncyBreadcrumb: {
                        label: 'عضو'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementMember/linkManagementMemberController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.linkmanagementmembercontent', {
                    url: "/linkmanagementmembercontent",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementMemberContent/grid.html",
                    controller: "linkManagementMemberContentController",
                    controllerAs: "linkManagementMemberContent",
                    data: {
                        pageTitle: 'اطلاعات عضو'
                    },
                    ncyBreadcrumb: {
                        label: 'اطلاعات عضو'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt', "treeControl", 'ADM-dateTimePicker',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementMemberContent/LinkManagementMemberContentController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.linkmanagementbillboardpattern', {
                    url: "/linkmanagementbillboardpattern",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementBillboardPattern/grid.html",
                    controller: "linkManagementBillboardPatternController",
                    controllerAs: "linkManagementBillboardPattern",
                    data: {
                        pageTitle: 'تنظیمات محتوا'
                    },
                    ncyBreadcrumb: {
                        label: 'تنظیمات محتوا'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementBillboardPattern/LinkManagementBillboardPatternController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.linkmanagementtargetbillboardlog', {
                    url: "/linkmanagementtargetbillboardlog",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementTargetBillboardLog/grid.html",
                    params: {
                        TargetId: null,
                        BillboardId: null,
                        BillBoardPatternId: null
                    },
                    controller: "linkManagementTargetBillboardLogController",
                    controllerAs: "linkManagementTargetBillboardLog",
                    data: {
                        pageTitle: 'لاگ عضو'
                    },
                    ncyBreadcrumb: {
                        label: 'لاگ عضو'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementTargetBillboardLog/LinkManagementTargetBillboardLogController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.linkmanagementtarget', {
                    url: "/linkmanagementtarget",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementTarget/grid.html",
                    params: {
                        MemberId: null,
                        BillBoardPatternId: null
                    },
                    controller: "linkManagementTargetController",
                    controllerAs: "linkManagementTarget",
                    data: {
                        pageTitle: 'محتوا تبادل لینک'
                    },
                    ncyBreadcrumb: {
                        label: 'محتوا تبادل لینک'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementTarget/LinkManagementTargetController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.linkmanagementbillboard', {
                    url: "/linkmanagementbillboard",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementBillboard/grid.html",
                    params: {
                        MemberId: null,
                        BillBoardPatternId: null
                    },
                    controller: "linkManagementBillboardController",
                    controllerAs: "linkManagementBillboard",
                    data: {
                        pageTitle: 'بیلبورد'
                    },
                    ncyBreadcrumb: {
                        label: 'بیلبورد'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', "ADM-dateTimePicker",
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementBillboard/LinkManagementBillboardController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.linkmanagementcomment', {
                    url: "/linkmanagementcomment",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementComment/grid.html",
                    controller: "linkManagementCommentController",
                    controllerAs: "linkManagementComment",
                    data: {
                        pageTitle: 'کامنت تبادل لینک'
                    },
                    ncyBreadcrumb: {
                        label: 'کامنت تبادل لینک'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementComment/LinkManagementCommentController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.linkmanagementaccounting', {
                    url: "/linkmanagementaccounting",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementAccounting/grid.html",
                    params: {
                        MemberId: null
                    },
                    controller: "linkManagementAccountingController",
                    controllerAs: "linkManagementAccounting",
                    data: {
                        pageTitle: 'محاسبه تبادل لینک'
                    },
                    ncyBreadcrumb: {
                        label: 'محاسبه تبادل لینک'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementAccounting/LinkManagementAccountingController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.linkmanagementaccountingdetail', {
                    url: "/linkmanagementaccountingdetail",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementAccountingDetail/grid.html",
                    controller: "linkManagementAccountingDetailController",
                    controllerAs: "linkManagementAccountingDetail",
                    data: {
                        pageTitle: 'جزییات محاسبه تبادل لینک'
                    },
                    ncyBreadcrumb: {
                        label: 'جزییات محاسبه تبادل لینک'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementAccountingDetail/LinkManagementAccountingDetailController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.linkmanagementcontentcategoryfavorite', {
                    url: "/linkmanagementcontentcategoryfavorite",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementContentCategoryFavorite/grid.html",
                    controller: "linkManagementContentCategoryFavoriteController",
                    controllerAs: "linkManagementContentCategoryFavorite",
                    data: {
                        pageTitle: 'علاقه مندیها تبادل لینک'
                    },
                    ncyBreadcrumb: {
                        label: 'علاقه مندیها تبادل لینک'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementContentCategoryFavorite/LinkManagementContentCategoryFavoriteController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.linkmanagementcontentcategoryotherinfo', {
                    url: "/linkmanagementcontentcategoryotherinfo",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementContentCategoryOtherInfo/grid.html",
                    controller: "linkManagementContentCategoryOtherInfoController",
                    controllerAs: "linkManagementContentCategoryOtherInfo",
                    data: {
                        pageTitle: 'توضیحات تبادل لینک'
                    },
                    ncyBreadcrumb: {
                        label: 'توضیحات تبادل لینک'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementContentCategoryOtherInfo/LinkManagementContentCategoryOtherInfoController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.linkmanagementcategorysimilar', {
                    url: "/linkmanagementcategorysimilar",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementCategorySimilar/grid.html",
                    controller: "linkManagementCategorySimilarController",
                    controllerAs: "linkManagementCategorySimilar",
                    data: {
                        pageTitle: 'دسته بندی مرتبط تبادل لینک'
                    },
                    ncyBreadcrumb: {
                        label: 'دسته بندی مرتبط تبادل لینک'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementCategorySimilar/LinkManagementCategorySimilarController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.linkmanagementcontentsimilar', {
                    url: "/linkmanagementcontentsimilar",
                    templateUrl: "cpanelv1/CmsModules/LinkManagement/LinkManagementContentSimilar/grid.html",
                    controller: "linkManagementContentSimilarController",
                    controllerAs: "linkManagementContentSimilar",
                    data: {
                        pageTitle: 'لیست مرتبط تبادل لینک'
                    },
                    ncyBreadcrumb: {
                        label: 'لیست مرتبط تبادل لینک'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/LinkManagement/LinkManagementContentSimilar/LinkManagementContentSimilarController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                /////////////////
                .state('index.cmsuserbadlogin', {
                    url: "/cmsuserbadlogin",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsUserBadLogin/grid.html",
                    controller: "cmsUserBadLoginController",
                    controllerAs: "cmsUserBadLogin",
                    data: {
                        pageTitle: 'خطاهای ورود'
                    },
                    ncyBreadcrumb: {
                        label: 'خطاهای ورود'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Core/CmsUserBadLogin/cmsUserBadLoginController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state("index.cmsuserticketlog", {
                    url: "/cmsuserticketlog",
                    templateUrl: "cpanelv1/CmsModules/Core/cmsUserTicketLog/grid.html",
                    controller: "cmsUserTicketLogController",
                    controllerAs: "cmsUserTicketLog",
                    data: {
                        pageTitle: "لاگ های ورود"
                    },
                    ncyBreadcrumb: {
                        label: 'لاگ های ورود'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load({
                                    serie: true,
                                    files: [
                                        'cpanelv1/CmsModules/Core/cmsUserTicketLog/cmsUserTicketLogController.js'
                                    ]
                                });
                            }
                        ]
                    }

                })
                .state('index.newsshareservercategory', {
                    url: "/newsshareservercategory",
                    templateUrl: "cpanelv1/CmsModules/News/NewsShareServerCategory/grid.html",
                    controller: "newsShareServerCategoryController",
                    controllerAs: "newsShareServerCategory",
                    data: {
                        pageTitle: 'اخبار - اشتراک گذاری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/News/NewsShareServerCategory/NewsShareServerCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.newssharerecivercategory', {
                    url: "/newssharerecivercategory",
                    templateUrl: "cpanelv1/CmsModules/News/NewsShareReciverCategory/grid.html",
                    controller: "newsShareReciverCategoryController",
                    controllerAs: "newsShareReciverCategory",
                    data: {
                        pageTitle: 'اخبار - اشتراک گیری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/News/NewsShareReciverCategory/NewsShareReciverCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.fileshareservercategory', {
                    url: "/fileshareservercategory",
                    templateUrl: "cpanelv1/CmsModules/File/FileShareServerCategory/grid.html",
                    controller: "fileShareServerCategoryController",
                    controllerAs: "fileShareServerCategory",
                    data: {
                        pageTitle: 'اخبار - اشتراک گذاری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/File/FileShareServerCategory/FileShareServerCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.filesharerecivercategory', {
                    url: "/filesharerecivercategory",
                    templateUrl: "cpanelv1/CmsModules/File/FileShareReciverCategory/grid.html",
                    controller: "fileShareReciverCategoryController",
                    controllerAs: "fileShareReciverCategory",
                    data: {
                        pageTitle: 'اخبار - اشتراک گیری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/File/FileShareReciverCategory/FileShareReciverCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.quoteshareservercategory', {
                    url: "/quoteshareservercategory",
                    templateUrl: "cpanelv1/CmsModules/Quote/QuoteShareServerCategory/grid.html",
                    controller: "quoteShareServerCategoryController",
                    controllerAs: "quoteShareServerCategory",
                    data: {
                        pageTitle: 'سخن روز - اشتراک گذاری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Quote/QuoteShareServerCategory/QuoteShareServerCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.quotesharerecivercategory', {
                    url: "/quotesharerecivercategory",
                    templateUrl: "cpanelv1/CmsModules/Quote/QuoteShareReciverCategory/grid.html",
                    controller: "quoteShareReciverCategoryController",
                    controllerAs: "quoteShareReciverCategory",
                    data: {
                        pageTitle: 'سخن روز - اشتراک گیری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Quote/QuoteShareReciverCategory/QuoteShareReciverCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.shopshareservercategory', {
                    url: "/shopshareservercategory",
                    templateUrl: "cpanelv1/CmsModules/Shop/ShopShareServerCategory/grid.html",
                    controller: "shopShareServerCategoryController",
                    controllerAs: "shopShareServerCategory",
                    data: {
                        pageTitle: 'فروشگاه - اشتراک گذاری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Shop/ShopShareServerCategory/ShopShareServerCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.shopsharerecivercategory', {
                    url: "/shopsharerecivercategory",
                    templateUrl: "cpanelv1/CmsModules/Shop/ShopShareReciverCategory/grid.html",
                    controller: "shopShareReciverCategoryController",
                    controllerAs: "shopShareReciverCategory",
                    data: {
                        pageTitle: 'فروشگاه - اشتراک گیری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Shop/ShopShareReciverCategory/ShopShareReciverCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.chartshareservercategory', {
                    url: "/chartshareservercategory",
                    templateUrl: "cpanelv1/CmsModules/Chart/ChartShareServerCategory/grid.html",
                    controller: "chartShareServerCategoryController",
                    controllerAs: "chartShareServerCategory",
                    data: {
                        pageTitle: 'چارت - اشتراک گذاری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Chart/ChartShareServerCategory/ChartShareServerCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.chartsharerecivercategory', {
                    url: "/chartsharerecivercategory",
                    templateUrl: "cpanelv1/CmsModules/Chart/ChartShareReciverCategory/grid.html",
                    controller: "chartShareReciverCategoryController",
                    controllerAs: "chartShareReciverCategory",
                    data: {
                        pageTitle: 'چارت - اشتراک گیری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Chart/ChartShareReciverCategory/ChartShareReciverCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.imagegalleryshareservercategory', {
                    url: "/imageGalleryshareservercategory",
                    templateUrl: "cpanelv1/CmsModules/ImageGallery/ImageGalleryShareServerCategory/grid.html",
                    controller: "imageGalleryShareServerCategoryController",
                    controllerAs: "imageGalleryShareServerCategory",
                    data: {
                        pageTitle: 'تصویر - اشتراک گذاری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/ImageGallery/ImageGalleryShareServerCategory/ImageGalleryShareServerCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.imagegallerysharerecivercategory', {
                    url: "/imageGallerysharerecivercategory",
                    templateUrl: "cpanelv1/CmsModules/ImageGallery/ImageGalleryShareReciverCategory/grid.html",
                    controller: "imageGalleryShareReciverCategoryController",
                    controllerAs: "imageGalleryShareReciverCategory",
                    data: {
                        pageTitle: 'تصویر - اشتراک گیری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/ImageGallery/ImageGalleryShareReciverCategory/ImageGalleryShareReciverCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.moviegalleryshareservercategory', {
                    url: "/moviegalleryshareservercategory",
                    templateUrl: "cpanelv1/CmsModules/MovieGallery/MovieGalleryShareServerCategory/grid.html",
                    controller: "movieGalleryShareServerCategoryController",
                    controllerAs: "movieGalleryShareServerCategory",
                    data: {
                        pageTitle: 'فیلم - اشتراک گذاری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/MovieGallery/MovieGalleryShareServerCategory/MovieGalleryShareServerCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.moviegallerysharerecivercategory', {
                    url: "/moviegallerysharerecivercategory",
                    templateUrl: "cpanelv1/CmsModules/MovieGallery/MovieGalleryShareReciverCategory/grid.html",
                    controller: "movieGalleryShareReciverCategoryController",
                    controllerAs: "movieGalleryShareReciverCategory",
                    data: {
                        pageTitle: 'فیلم - اشتراک گیری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/MovieGallery/MovieGalleryShareReciverCategory/MovieGalleryShareReciverCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.musicgalleryshareservercategory', {
                    url: "/musicgalleryshareservercategory",
                    templateUrl: "cpanelv1/CmsModules/MusicGallery/MusicGalleryShareServerCategory/grid.html",
                    controller: "musicGalleryShareServerCategoryController",
                    controllerAs: "musicGalleryShareServerCategory",
                    data: {
                        pageTitle: 'موسیقی - اشتراک گذاری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/MusicGallery/MusicGalleryShareServerCategory/MusicGalleryShareServerCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.musicgallerysharerecivercategory', {
                    url: "/musicgallerysharerecivercategory",
                    templateUrl: "cpanelv1/CmsModules/MusicGallery/MusicGalleryShareReciverCategory/grid.html",
                    controller: "musicGalleryShareReciverCategoryController",
                    controllerAs: "musicGalleryShareReciverCategory",
                    data: {
                        pageTitle: 'موسیقی - اشتراک گیری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/MusicGallery/MusicGalleryShareReciverCategory/MusicGalleryShareReciverCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.serviceshareservercategory', {
                    url: "/serviceshareservercategory",
                    templateUrl: "cpanelv1/CmsModules/Service/ServiceShareServerCategory/grid.html",
                    controller: "serviceShareServerCategoryController",
                    controllerAs: "serviceShareServerCategory",
                    data: {
                        pageTitle: 'خدمات - اشتراک گذاری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Service/ServiceShareServerCategory/ServiceShareServerCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.servicesharerecivercategory', {
                    url: "/servicesharerecivercategory",
                    templateUrl: "cpanelv1/CmsModules/Service/ServiceShareReciverCategory/grid.html",
                    controller: "serviceShareReciverCategoryController",
                    controllerAs: "serviceShareReciverCategory",
                    data: {
                        pageTitle: 'خدمات - اشتراک گیری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Service/ServiceShareReciverCategory/ServiceShareReciverCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.productshareservercategory', {
                    url: "/productshareservercategory",
                    templateUrl: "cpanelv1/CmsModules/Product/ProductShareServerCategory/grid.html",
                    controller: "productShareServerCategoryController",
                    controllerAs: "productShareServerCategory",
                    data: {
                        pageTitle: 'محصولات - اشتراک گذاری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Product/ProductShareServerCategory/ProductShareServerCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.productsharerecivercategory', {
                    url: "/productsharerecivercategory",
                    templateUrl: "cpanelv1/CmsModules/Product/ProductShareReciverCategory/grid.html",
                    controller: "productShareReciverCategoryController",
                    controllerAs: "productShareReciverCategory",
                    data: {
                        pageTitle: 'محصولات - اشتراک گیری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Product/ProductShareReciverCategory/ProductShareReciverCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.blogshareservercategory', {
                    url: "/blogshareservercategory",
                    templateUrl: "cpanelv1/CmsModules/Blog/BlogShareServerCategory/grid.html",
                    controller: "blogShareServerCategoryController",
                    controllerAs: "blogShareServerCategory",
                    data: {
                        pageTitle: 'دست نوشته ها - اشتراک گذاری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Blog/BlogShareServerCategory/BlogShareServerCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.blogsharerecivercategory', {
                    url: "/blogsharerecivercategory",
                    templateUrl: "cpanelv1/CmsModules/Blog/BlogShareReciverCategory/grid.html",
                    controller: "blogShareReciverCategoryController",
                    controllerAs: "blogShareReciverCategory",
                    data: {
                        pageTitle: 'دست نوشته ها - اشتراک گیری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Blog/BlogShareReciverCategory/BlogShareReciverCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.articleshareservercategory', {
                    url: "/articleshareservercategory",
                    templateUrl: "cpanelv1/CmsModules/Article/ArticleShareServerCategory/grid.html",
                    controller: "articleShareServerCategoryController",
                    controllerAs: "articleShareServerCategory",
                    data: {
                        pageTitle: 'مقالات - اشتراک گذاری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Article/ArticleShareServerCategory/ArticleShareServerCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.articlesharerecivercategory', {
                    url: "/articlesharerecivercategory",
                    templateUrl: "cpanelv1/CmsModules/Article/ArticleShareReciverCategory/grid.html",
                    controller: "articleShareReciverCategoryController",
                    controllerAs: "articleShareReciverCategory",
                    data: {
                        pageTitle: 'مقالات - اشتراک گیری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Article/ArticleShareReciverCategory/articleShareReciverCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.biographyshareservercategory', {
                    url: "/biographyshareservercategory",
                    templateUrl: "cpanelv1/CmsModules/Biography/BiographyShareServerCategory/grid.html",
                    controller: "biographyShareServerCategoryController",
                    controllerAs: "biographyShareServerCategory",
                    data: {
                        pageTitle: 'زندگینامه - اشتراک گذاری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Biography/BiographyShareServerCategory/BiographyShareServerCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.biographysharerecivercategory', {
                    url: "/biographysharerecivercategory",
                    templateUrl: "cpanelv1/CmsModules/Biography/BiographyShareReciverCategory/grid.html",
                    controller: "biographyShareReciverCategoryController",
                    controllerAs: "biographyShareReciverCategory",
                    data: {
                        pageTitle: 'زندگینامه - اشتراک گیری'
                    },
                    ncyBreadcrumb: {
                        label: 'مینور'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Biography/BiographyShareReciverCategory/BiographyShareReciverCategoryController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.discountoffertransaction', {
                    url: "/discountoffertransaction",
                    templateUrl: "cpanelv1/CmsModules/Discount/DiscountOfferTransaction/grid.html",
                    controller: "discountOfferTransactionController",
                    controllerAs: "discountOfferTransaction",
                    data: {
                        pageTitle: 'تراکنش پیشنهاد'
                    },
                    ncyBreadcrumb: {
                        label: 'تراکنش پیشنهاد'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Discount/DiscountOfferTransaction/DiscountOfferTransactionController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                /**********/
                .state('index.cmsmoduleheadergroup', {
                    url: "/cmsmoduleheadergroup",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsModuleSaleHeaderGroup/grid.html",
                    controller: "CmsModuleSaleHeaderGroupController",
                    controllerAs: "CmsModuleHeaderG",
                    data: {
                        pageTitle: 'گروه هدر'
                    },
                    ncyBreadcrumb: {
                        label: 'گروه هدر'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsModuleSaleHeaderGroup/CmsModuleSaleHeaderGroupController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.cmsmodulesaleitem', {
                    url: "/cmsmodulesaleitem",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsModuleSaleItem/grid.html",
                    controller: "cmsModuleSaleItemController",
                    controllerAs: "cmsModuleSaleItem",
                    data: {
                        pageTitle: 'cmsModuleSaleItem'
                    },
                    ncyBreadcrumb: {
                        label: 'cmsModuleSaleItem'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsModuleSaleItem/CmsModuleSaleItemController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.cmsmodulesaleserial', {
                    url: "/cmsmodulesaleserial",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsModuleSaleSerial/grid.html",
                    controller: "cmsModuleSaleSerialController",
                    controllerAs: "cmsModuleSaleSerial",
                    data: {
                        pageTitle: 'CmsModuleSaleSerial'
                    },
                    ncyBreadcrumb: {
                        label: 'CmsModuleSaleSerial'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsModuleSaleSerial/CmsModuleSaleSerialController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.cmsmodulesaleinvoice', {
                    url: "/cmsmodulesaleinvoice",
                    templateUrl: "cpanelv1/CmsModules/Core/CmsModuleSaleInvoice/grid.html",
                    controller: "cmsModuleSaleInvoiceController",
                    controllerAs: "cmsModuleSaleInvoice",
                    data: {
                        pageTitle: 'CmsModuleSaleInvoice'
                    },
                    ncyBreadcrumb: {
                        label: 'CmsModuleSaleInvoice'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/Core/CmsModuleSaleInvoice/CmsModuleSaleInvoiceController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                .state('index.cmsguide', {
                    url: "/cmsguide",
                    templateUrl: "cpanelv1/CmsModules/Core/cmsguide/grid.html",
                    controller: "cmsGuideController",
                    controllerAs: "cmsGuide",
                    data: {
                        pageTitle: 'cmsguide'
                    },
                    ncyBreadcrumb: {
                        label: 'cmsguide'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'summernote', {
                                        serie: false,
                                        files: [
                                            'cpanelv1/CmsModules/Core/cmsguide/cmsguideController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })
                .state('index.cmslog', {
                    url: "/cmslog",
                    templateUrl: "cpanelv1/CmsModules/Core/cmsLog/grid.html",
                    controller: "cmsLogController",
                    controllerAs: "cmsLog",
                    data: {
                        pageTitle: 'cmsLog'
                    },
                    ncyBreadcrumb: {
                        label: 'cmsLog'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/Core/cmsLog/cmsLogController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                /***********************/
                .state('index.coremodulesrelationship', {
                    url: "/coremodulesrelationship",
                    templateUrl: "cpanelv1/CmsModules/coremoduleRelationship/grid.html",
                    controller: "coreModuleRelationshipContentController",
                    controllerAs: "coreModuleRelationship",
                    data: {
                        pageTitle: 'CoreModuleRelationship'
                    },
                    ncyBreadcrumb: {
                        label: 'CoreModuleRelationship'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([{
                                    serie: false,
                                    files: [
                                        'cpanelv1/CmsModules/ModuleRelationship/CoreModuleRelationshipController.js'
                                    ]
                                }]);
                            }
                        ]
                    }
                })
                /**********/
                .state('index.marketingdashboard', {
                    url: "/marketingdashboard",
                    templateUrl: "cpanelv1/CmsModules/Marketing/MarketingDashboard/grid.html",
                    controller: "marketingDashboardController",
                    controllerAs: "dashboard",
                    data: {
                        pageTitle: 'داشبورد'
                    },
                    ncyBreadcrumb: {
                        label: 'داشبورد'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Marketing/MarketingDashboard/marketingDashboardController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                })

                .state('index.marketingcustomersettingposition', {
                    url: "/marketingcustomersettingposition",
                    params: {
                        id: -3
                    },
                    templateUrl: "cpanelv1/CmsModules/Marketing/MarketingCustomerSettingPosition/grid.html",
                    controller: "marketingCustomerSettingPositionController",
                    controllerAs: "marketingPosition",
                    data: {
                        pageTitle: 'موقعیت فروش'
                    },
                    ncyBreadcrumb: {
                        label: 'موقعیت فروش'
                    },
                    resolve: {
                        deps: [
                            '$ocLazyLoad',
                            function ($ocLazyLoad) {
                                return $ocLazyLoad.load([
                                    'ngJsTree', 'summernote', 'nouislider', 'minicolors', 'angucomplete-alt',
                                    {
                                        //serie: true,
                                        files: [
                                            'cpanelv1/CmsModules/Marketing/MarketingCustomerSettingPosition/marketingCustomerSettingPositionController.js'
                                        ]
                                    }
                                ]);
                            }
                        ]
                    }
                });
        }
    ]);