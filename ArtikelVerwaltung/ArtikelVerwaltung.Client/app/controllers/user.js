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
                if (user.id === $localStorage.user.id) {
                    $localStorage.user = {};
                    $state.go('login');
                    return;
                }

                user.isAdmin = true;
                $translate('SYS_ADMIN').then(function (translate) {
                    user.role = translate;
                });
            }, function () {
                
            });
        };

        $scope.removeAdminRights = function (user) {
            UserService.removeAdminRights(user.id).$promise.then(function () {
                if (user.id === $localStorage.user.id) {
                    $localStorage.user = {};
                    $state.go('login');
                    return;
                }

                user.isAdmin = false;
                $translate('SYS_USER').then(function (translate) {
                    user.role = translate;
                });
            }, function () {

            });
        };

        $scope.editUser = function (user) {

        };

        $scope.deleteUser = function (user) {
            UserService.deleteUser(user.id).$promise.then(function () {
                if (user.id === $localStorage.user.id) {
                    $localStorage.user = {};
                    $state.go('login');
                    return;
                }

                var index = $scope.users.indexOf(user);
                if (index !== -1) {
                    $scope.users.splice(index, 1);
                }
            }, function () {

            });
        };
    }
]);