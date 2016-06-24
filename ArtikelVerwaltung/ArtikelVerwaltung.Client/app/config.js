var app =
    angular.module('artikelverwaltung')
        .constant('urls', {
            BASE: 'http://localhost:52057/',
            BASE_API: 'http://localhost:52240/'
        })
        .config(
            [
                '$controllerProvider', '$compileProvider', '$filterProvider', '$provide', '$translateProvider', '$httpProvider',
                function($controllerProvider, $compileProvider, $filterProvider, $provide, $translateProvider, $httpProvider) {
                    app.controller = $controllerProvider.register;
                    app.directive = $compileProvider.directive;
                    app.filter = $filterProvider.register;
                    app.factory = $provide.factory;
                    app.service = $provide.service;
                    app.constant = $provide.constant;
                    app.value = $provide.value;

                    $translateProvider.translations('de', {
                        'SYS_USERNAME': 'Benutzer',
                        
                    });

                    $translateProvider.preferredLanguage('de');

                    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
                        return {
                            'request': function (config) {
                                config.headers = config.headers || {};
                                if ($localStorage.token) {
                                    config.headers.Authorization = 'Bearer ' + $localStorage.token;
                                }
                                return config;
                            },
                            'responseError': function (response) {
                                if (response.status === 401 || response.status === 403) {
                                    $location.path('/app/login');
                                }
                                return $q.reject(response);
                            }
                        };
                    }]);

                }
            ]);