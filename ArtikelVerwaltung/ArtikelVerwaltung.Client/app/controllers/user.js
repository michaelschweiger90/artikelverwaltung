app.controller('UserCtrl', [
    '$localStorage', '$rootScope', '$scope', '$state', 'UserService', '$translate',
    function ($localStorage, $rootScope, $scope, $state, UserService, $translate)
    {
        $scope.users = [];

        UserService.getAllUsers().$promise.then(function (data) {
            data.forEach(function (value) {
                var translatePromise = value.isAdmin ? $translate('SYS_ADMIN') : $translate('SYS_USER');

                translatePromise.then(function (translate) {
                    value.role = translate;
                });
                $scope.users.push(value);
            });
        }, function (data) {

        });

        $scope.makeAdmin = function (user) {
            UserService.makeAdmin(user.id).$promise.then(function () {
                user.isAdmin = true;
                $translate('SYS_ADMIN').then(function (translate) {
                    user.role = translate;
                });
            }, function () {
                
            });
        };

        $scope.removeAdminRights = function (user) {
            UserService.removeAdminRights(user.id).$promise.then(function () {
                user.isAdmin = false;
                $translate('SYS_USER').then(function (translate) {
                    user.role = translate;
                });
            }, function () {

            });
        };

        $scope.editUser = function (user) {

        };

        $scope.removeUser = function (user) {

        };

        
    }
]);