'use strict';

angular
    .module('artikelverwaltung')
    .run(['$rootScope', '$state', '$stateParams', function($rootScope, $state, $stateParams) {
        $rootScope.$state = $state;
        $rootScope.$stateParams = $stateParams;
    }])
    .config(['$stateProvider', '$urlRouterProvider', function($stateProvider, $urlRouterProvider) {

        $urlRouterProvider
            .otherwise('/login');

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
    	});
           

    }]);