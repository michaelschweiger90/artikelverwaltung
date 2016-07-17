'use strict';

angular
    .module('artikelverwaltung')
    .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
        $rootScope.callbackJob = {
            goBack: function () {
                if ($rootScope.callbackJob.previousState) {
                    $state.go($rootScope.callbackJob.previousState);
                    delete $rootScope.callbackJob.previousState;
                } else {
                    $state.go('app.article.list');
                }
            }
        };
    }])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/login');

    	$stateProvider
			.state('start', {
				abstract: false,
				url: '',
				templateUrl: 'views/start.html'
			})
            .state('start.forgot', {
                url: '/forgot',
                templateUrl: 'views/forgot.html',
                controller: 'ForgotCtrl',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/directives/compareTo.js',
                                    'app/resources/authResource.js',
                                    'app/services/authService.js',
                                    'app/controllers/forgot.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('timeout', {
                url: '/auth/timeout',
                controller: 'LoginCtrl',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/resources/authResource.js',
                                    'app/services/authService.js',
                                    'app/controllers/login.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('logout', {
                url: '/logout',
                controller: function ($state, $localStorage, AuthService, Toast) {
                    AuthService.doLogout().$promise.then(function (data) {
                        $localStorage.user = {};
                        Toast.translateAndShow('SUCCESS_LOGOUT', function () {
                            $state.go('start.login');
                        });
                    }, function () {
                        if (data.status === 400) {
                            Toast.translateAndShow('ERROR_LOGOUT_NOT_SUCCESSFUL');
                        } else {
                            Toast.translateAndShow('ERROR_UNKNOWN_INTERNAL');
                        }
                    });
                },
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/resources/authResource.js',
                                    'app/services/authService.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('start.register', {
                url: '/register',
                templateUrl: 'views/register.html',
                controller: 'RegisterCtrl',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/directives/compareTo.js',
                                    'app/resources/authResource.js',
                                    'app/services/authService.js',
                                    'app/controllers/register.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('start.login', {
                url: '/login',
                templateUrl: 'views/login.html',
                controller: 'LoginCtrl',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/resources/authResource.js',
                                    'app/services/authService.js',
                                    'app/controllers/login.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('app', {
                abstract: false,
                url: '/app',
                templateUrl: 'views/layout.html',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/filters/mailSidenav.js',
                                    'app/controllers/app.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('app.user', {
                url: '',
                templateUrl: '',
                abstract: false
            })
            
            .state('app.user.edit', {
                url: '/user/edit',
                templateUrl: 'views/user/useredit.html',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/directives/compareTo.js',
                                    'app/resources/userResource.js',
                                    'app/services/userService.js',
                                    'app/controllers/user.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('app.user.deleteAccount', {
                url: '/user/deleteAccount',
                controller: 'UserCtrl',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/resources/userResource.js',
                                    'app/services/userService.js',
                                    'app/controllers/user.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('app.admin', {
                url: '',
                templateUrl: '',
                abstract: false
            })
            .state('app.admin.user', {
                url: '',
                templateUrl: '',
                abstract: false
            })
            .state('app.admin.user.list', {
                url: '/admin/user/list',
                templateUrl: 'views/admin/userlist.html',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/resources/userResource.js',
                                    'app/services/userService.js',
                                    'app/controllers/admin.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('app.admin.user.edit', {
                url: '/admin/user/edit',
                templateUrl: 'views/admin/useredit.html',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/directives/compareTo.js',
                                    'app/resources/userResource.js',
                                    'app/services/userService.js',
                                    'app/controllers/admin.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('app.article', {
                url: '',
                templateUrl: 'views/article.html',
                abstract: true
            })
            .state('app.article.list', {
                url: '/category/:id',
                templateUrl: 'views/article/article-list.html',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/resources/categoryResource.js',
                                    'app/resources/articleResource.js',
                                    'app/resources/articleCategoryResource.js',
                                    'app/resources/cartArticleResource.js',
                                    'app/services/categoryService.js',
                                    'app/services/articleService.js',
                                    'app/controllers/article.js',
                                    'app/controllers/articleList.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('app.article.detail', {
                url: '/category/:catId/article/:id',
                templateUrl: 'views/article/article-detail.html',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/resources/categoryResource.js',
                                    'app/resources/articleResource.js',
                                    'app/resources/articleCategoryResource.js',
									'app/resources/cartArticleResource.js',
									'app/resources/cartResource.js',
                                    'app/services/categoryService.js',
                                    'app/services/articleService.js',
									'app/services/cartService.js',
                                    'app/controllers/article.js',
                                    'app/controllers/articleDetail.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('app.cart', {
                url: '/carts',
                templateUrl: 'views/cart.html',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
									'app/resources/cartResource.js',
									'app/resources/categoryResource.js',
									'app/resources/articleResource.js',
									'app/resources/cartArticleResource.js',
									'app/resources/articleCategoryResource.js',
									'app/services/cartService.js',
									'app/services/categoryService.js',
									'app/services/articleService.js',
                                    'app/controllers/cart.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('app.article-management', {
                url: '',
                templateUrl: 'views/admin/article.html',
                abstract: true
            })
            .state('app.article-management.list', {
                url: '/admin/category/:id',
                templateUrl: 'views/admin/article-list.html',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/resources/categoryResource.js',
                                    'app/resources/articleResource.js',
                                    'app/resources/cartResource.js',
                                    'app/resources/articleCategoryResource.js',
                                    'app/resources/cartArticleResource.js',
                                    'app/services/categoryService.js',
                                    'app/services/articleService.js',
                                    'app/services/cartService.js',
                                    'app/controllers/article.js',
                                    'app/controllers/articleList.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('app.article-management.new', {
                url: '/admin/category/:catId/newArticle',
                templateUrl: 'views/admin/article-details.html',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/resources/categoryResource.js',
                                    'app/resources/articleResource.js',
                                    'app/resources/articleCategoryResource.js',
									'app/resources/cartArticleResource.js',
                                    'app/services/categoryService.js',
                                    'app/services/articleService.js',
                                    'app/controllers/article.js',
                                    'app/controllers/articleDetail.js'
                                ]
                            });
                        }
                    ]
                }
            })
            .state('app.article-management.detail', {
                url: '/admin/category/:catId/article/:id',
                templateUrl: 'views/admin/article-details.html',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/resources/categoryResource.js',
                                    'app/resources/articleResource.js',
                                    'app/resources/articleCategoryResource.js',
									'app/resources/cartArticleResource.js',
                                    'app/resources/cartResource.js',
                                    'app/services/categoryService.js',
                                    'app/services/cartService.js',
                                    'app/services/articleService.js',
                                    'app/controllers/article.js',
                                    'app/controllers/articleDetail.js'
                                ]
                            });
                        }
                    ]
                }
            });
    }]);