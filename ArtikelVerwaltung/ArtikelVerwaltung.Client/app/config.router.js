'use strict';

angular
    .module('artikelverwaltung')
    .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/app');

        $stateProvider
            
            .state('app', {
                abstract: false,
                url: '/app',
                templateUrl: 'views/layout.html'
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
            .state('app.changepw', {
                url: '/changepw',
                templateUrl: 'views/changepw.html',
                resolve: {
                    deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                            return $ocLazyLoad.load({
                                serie: true,
                                files: [
                                    'app/controllers/changepw.js'
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
            })

           

    }]);