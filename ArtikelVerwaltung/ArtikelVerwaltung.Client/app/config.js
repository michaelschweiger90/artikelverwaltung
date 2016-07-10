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
                        'SYS_REGISTER': 'Registrieren',
                        'SYS_PASSWORD': 'Passwort',
                        'SYS_PASSWORD_REPEAT': 'Passwort wiederholen',
                        'SYS_LOGIN': 'Login',
                        'SYS_TITLE': 'Artikel-Verwaltung',
                        'SYS_LOGOUT': 'Logout',
                        'SYS_EMAIL': 'E-Mail-Adresse',
                        'SYS_SECRET_QUESTION': 'Geheimfrage',
                        'SYS_SECRET_ANSWER': 'Geheimantwort',
                        'SYS_BACK': 'Zurück',
                        'SYS_SEARCH_TERM': 'Suchbegriff',
                        'SYS_SAVE': 'Speichern',
                        'SYS_CANCEL': 'Abbrechen',
                        'SYS_FORGOT': 'Passwort vergessen?',
                        'SYS_REGISTER_BUTTON': 'Registrieren',
                        'SYS_NAME': 'Name',
                        'SYS_LOGOUT': 'Ausloggen',
                        'SYS_FORGOT': 'Passwort vergessen',
                        'SYS_ROLE': 'Rolle',
                        'SYS_ADMIN': 'Admin',
                        'SYS_USER': 'Benutzer',
                        'SYS_GREETINGS': 'Hello ',

                        'USER_LIST': 'Benutzerliste',
                        'USER_EDIT': 'Benutzer bearbeiten',
                        'USER_PW_CHANGE': 'Passwort ändern',
                        'USER_EDIT_DATA_FAB': 'Daten ändern',
                        'USER_DELETE_ACCOUNT_FAB': 'Konto löschen',

                        'ERROR_PASSWORD_MATCH': 'Passwort stimmt nicht überein!',
                        'ERROR_TOO_LONG': 'Maximale Länge überschritten',
                        'ERROR_EMAIL_INVALID': 'Mailaddresse ungültig',
                        'ERROR_TOO_SHORT': 'Minimale Länge nicht erfüllt',
                        'ERROR_REQUIRED': 'Pflichtfeld',

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
                        'ARTICLE_PLEASE_CHOOSE': 'Bitte eine Kategorie auswählen.',
                        'ARTICLE_ADD_TO_CART': 'Zu Warenkorb hinzufügen',
                        'ARTICLE_DELETE_FROM_CART': 'Aus Warenkorb entfernen',
                        'ARTICLE_IN_CART': 'In Warenkorb gespeichert',
                        'ARTICLE_NONE_FOUND': 'Keine Artikel gefunden.',
                        'ARTICLE_AVAILABLE': 'Verfügbar mindestens',
                        'ARTICLE_FROM': 'Von',
                        'ARTICLE_UNTIL': 'Bis',
                        'ARTICLE_UNASSIGNED': 'Nicht zugeordnete Artikel',
                        'ARTICLE_PRICE': 'Artikelpreis',

                        'CATEGORY_RENAME': 'Kategorie umbenennen',
                        'CATEGORY_INSERT': 'Neue Kategorie',

                        'CART_DELETE': 'Warenkorb löschen',
                        'CART_RENAME': 'Warenkorb umbenennen',

                        'TOOLTIP_LOGOUT': 'Logout',
                        'TOOLTIP_SEARCH': 'Suche',
                        'TOOLTIP_USER_FAB': 'Benutzer',
                        'TOOLTIP_USER_DELETE': 'Benutzer löschen',
                        'TOOLTIP_OPEN_SIDENAV': 'Menü',
                        'TOOLTIP_MAKE_USER_ADMIN': 'Admin-Rechte geben',
                        'TOOLTIP_REMOVE_USER_ADMIN': 'Admin-Rechte beheben'
                    });

                    $translateProvider.useSanitizeValueStrategy('escape');
                    $translateProvider.preferredLanguage('de');

                    $httpProvider.interceptors.push(['$q', '$location', '$localStorage', function ($q, $location, $localStorage) {
                        return {
                            'request': function (config) {
                                config.headers = config.headers || {};
                                if ($localStorage.user != null && $localStorage.user.authToken) {
                                    config.headers.Authorization = 'Bearer ' + $localStorage.user.authToken;
                                    config.headers['id'] = $localStorage.user.id;
                                }
                                return config;
                            },
                            'responseError': function (response) {
                                if (response.status === 401 || response.status === 403) {
                                    $localStorage.user = {};
                                    $location.path('/login');
                                }
                                return $q.reject(response);
                            }
                        };
                    }]);
                }
            ]);