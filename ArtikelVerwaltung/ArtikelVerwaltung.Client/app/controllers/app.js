app.controller('AppCtrl', [
    '$scope', '$mdSidenav', '$rootScope', '$localStorage','$state',
    function ($scope, $mdSidenav, $rootScope, $localStorage, $state) {
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
        $scope.user = $localStorage.user;
        $scope.isAdmin = $localStorage.user.isAdmin;
        $scope.adminMenus = [
            {
                link: 'app.article-management.list',
                title: 'NAVIGATION_ARTICLEMANAGEMENT',
                icon: 'https'
            },
            {
                link: 'app.admin.user.list',
                title: 'NAVIGATION_USERMANAGEMENT',
                icon: 'people_outline'
            }
        ];

        $scope.redirectToEdit = function () {
            $localStorage.userIdToEdit = $localStorage.user.id;
            $rootScope.callbackJob.previousState = $state.current.name;
            $state.go('app.user.edit');
        };
    }]);