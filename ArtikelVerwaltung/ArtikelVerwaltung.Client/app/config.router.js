'use strict';

angular
    .module('artikelverwaltung')
    .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/category/1');

        $stateProvider
            .state('start', {
            	abstract: true,
            	url: '',
            	templateUrl: 'views/start.html'
            })
            .state('start.login', {
            	url: '/login',
            	templateUrl: 'views/login.html',
            	resolve: {
            		deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                        	return $ocLazyLoad.load({
                        		serie: true,
                        		files: [
                                    'app/controllers/login.js'
                        		]
                        	});
                        }
            		]
            	}
            })
    	.state('carts', {
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
								'app/resources/cartArticleResource.js',
								'app/services/cartService.js',
								'app/controllers/cart.js'
							]
						});
					}
    			]
    		}
    	})
    	.state('article', {
    		url: '',
    		templateUrl: 'views/Article.html',
    		abstract: true
    	})
            .state('article.list', {
            	url: '/category/:id',
            	templateUrl: 'views/article/list.html',
            	resolve: {
            		deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                        	return $ocLazyLoad.load({
                        		serie: true,
                        		files: [
                                    'app/resources/articleResource.js',
                                    'app/resources/articleCategoryResource.js',
                                    'app/resources/cartArticleResource.js',
                                    'app/services/article.js',
                                    'app/controllers/article.js',
                                    'app/controllers/articleList.js'
                        		]
                        	});
                        }
            		]
            	}
            })
            .state('article.detail', {
            	url: '/category/:catId/article/:id',
            	templateUrl: 'views/article/detail.html',
            	resolve: {
            		deps: [
                        '$ocLazyLoad',
                        function ($ocLazyLoad) {
                        	return $ocLazyLoad.load({
                        		serie: true,
                        		files: [
                                    'app/resources/articleResource.js',
                                    'app/resources/articleCategoryResource.js',
									'app/resources/cartArticleResource.js',
									'app/resources/cartResource.js',
                                    'app/services/article.js',
									'app/services/cart.js',
                                    'app/controllers/article.js',
                                    'app/controllers/articleDetail.js'
                        		]
                        	});
                        }
            		]
            	}
            });

           

    }]);