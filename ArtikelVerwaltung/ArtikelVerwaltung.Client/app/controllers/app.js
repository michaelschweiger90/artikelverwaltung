app.controller('AppCtrl', [
    '$scope', '$mdSidenav' , '$rootScope',
    function ($scope, $mdSidenav, $rootScope) {
        $scope.menus = [
               {
                   link: 'app.article.list',
                   title: 'NAVIGATION_ARTICLE',
                   icon: 'format_list_bulleted'
               },
               {
                   link: 'app.cart',
                   title: 'NAVIGATION_CART',
                   icon: 'star_border'
               }
        ];
        $scope.isAdmin = true;
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