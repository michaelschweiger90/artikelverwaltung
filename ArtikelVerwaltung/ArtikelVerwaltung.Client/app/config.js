var app =
    angular.module('artikelverwaltung')
        .constant('urls', {
            BASE: 'http://localhost:52057/',
            BASE_API: 'http://localhost:52240/api/v1/'
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
                        'SYS_PASSWORD': 'Passwort',
                        'SYS_LOGIN': 'Login',
                        'SYS_LOGIN_TITLE': 'Artikel-Verwaltung',
                        'SYS_LOGOUT': 'Logout',
                        'SYS_EMAIL': 'E-Mail-Adresse',
                        'SYS_ERROR_REQUIRED': 'Pflichtfeld',
                        'SYS_BACK': 'Zur�ck',
                        'SYS_SEARCH_TERM': 'Suchbegriff',
                        'SYS_SAVE': 'Speichern',
                        'SYS_CANCEL': 'Abbrechen',

                        'NAVIGATION_HEADLINE_ARTICLE': 'Artikel-Verwaltung',
                        'NAVIGATION_HEADLINE_MANAGEMENT': 'Administration',
                        'NAVIGATION_ARTICLE': 'Artikel',
                        'NAVIGATION_CART': 'Warenkorb',
                        'NAVIGATION_USERMANAGEMENT': 'Benutzer-Verwaltung',
                        'NAVIGATION_ARTICLEMANAGEMENT': 'Artikel-Verwaltung',
                        'NAVIGATION_TAGMANAGEMENT': 'Tag-Verwaltung',
                       

                        'ARTICLE_ERROR_DOES_NOT_EXIST': 'Der Artikel existiert nicht!',
                        'ARTICLE_NEW': 'Neuer Artikel',
                        'ARTICLE_SUCCESS_INSERT': 'Artikel erfolgreich angelegt',
                        'ARTICLE_SUCCESS_UPDATE': 'Artikel erfolgreich bearbeitet',
                        'ARTICLE_NAME': 'Name',
                        'ARTICLE_DESCRIPTION': 'Beschreibung',
                        'ARTICLE_LINK': 'Link',
                        'ARTICLE_NONE_IN_LIST': 'Keine Artikel in der Kategorie.',
                        'ARTICLE_PLEASE_CHOOSE': 'Bitte eine Kategorie ausw�hlen.',
                        'ARTICLE_ADD_TO_CART': 'Zu Warenkorb hinzuf�gen',
                        'ARTICLE_DELETE_FROM_CART': 'Aus Warenkorb entfernen',
                        'ARTICLE_IN_CART': 'In Warenkorb gespeichert',
                        'ARTICLE_NONE_FOUND': 'Keine Artikel gefunden.',
                        'ARTICLE_AVAILABLE': 'Verf�gbar mindestens',
                        'ARTICLE_FROM': 'Von',
                        'ARTICLE_UNTIL': 'Bis',
                        'ARTICLE_UNASSIGNED': 'Nicht zugeordnete Artikel',
                        'ARTICLE_PRICE': 'Artikelpreis',

                        'CATEGORY_RENAME': 'Kategorie umbenennen',
                        'CATEGORY_INSERT': 'Neue Kategorie',

                        'CART_DELETE': 'Warenkorb l�schen',
                        'CART_RENAME': 'Warenkorb umbenennen',

                        'TOOLTIP_LOGOUT': 'Logout',
                        'TOOLTIP_SEARCH': 'Suche',
                        'TOOLTIP_USER_FAB': 'Benutzer',
                        'TOOLTIP_USER_DELETE': 'Benutzer l�schen',
                        'TOOLTIP_USER_PW_CHANGE': 'Passwort �ndern',
                        'TOOLTIP_OPEN_SIDENAV': 'Men�',

                        
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