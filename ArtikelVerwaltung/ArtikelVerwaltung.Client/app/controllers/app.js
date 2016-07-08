app.controller('AppCtrl', [
    '$scope', '$mdSidenav', '$rootScope', '$localStorage',
    function ($scope, $mdSidenav, $rootScope, $localStorage) {
        $scope.menus = [
               {
                   link: 'app.article.list',
                   title: 'NAVIGATION_ARTICLE',
                   icon: 'format_list_bulleted'
               },
               {
                   link: 'app.cart',
                   title: 'NAVIGATION_CART',
                   icon: 'shopping_cart'
               }
        ];

        $scope.isAdmin = $localStorage.user.isAdmin;
        $scope.adminMenus = [
            {
                link: 'app.article-management.list',
                title: 'NAVIGATION_ARTICLEMANAGEMENT',
                icon: 'https'
            },
            {
                link: '',
                title: 'NAVIGATION_USERMANAGEMENT',
                icon: 'people_outline'
            }
        ];
    }]);