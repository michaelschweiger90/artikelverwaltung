app.controller('LoginCtrl', [
    '$localStorage', '$rootScope', '$scope', '$state', 'AuthService', 'Toast',
    function ($localStorage, $rootScope, $scope, $state, AuthService, Toast)
    {
        if ($state.current.name === 'timeout') {
            $localStorage.user = {};
            Toast.translateAndShow('ERROR_TIMEOUT', function () {
                $state.go('login');
            });
        }

        $scope.user = null;
        $scope.dataLoading = false;

        $scope.doLogin = function () {
            $scope.dataLoading = true;

            AuthService.doLogin($scope.user).$promise.then(
                function (data)
                {
                    var user = {};
                    user.name = data.name;
                    user.mailAddress = data.mailAddress;
                    user.isAdmin = data.isAdmin;
                    user.id = data.id;
                    user.authToken = data.token,
                    $localStorage.user = user;
                    Toast.translateAndShow('SUCCESS_LOGIN', function () {
                        $state.go('app.article.list');
                    });
                }, function (data)
                {
                    $scope.dataLoading = false;
                    if (data.status === 404) {
                        Toast.translateAndShow('ERROR_LOGIN_WRONG_DATA');
                    } else if (data.status === 406) {
                        Toast.translateAndShow('ERROR_PARAMETER_NOT_ACCEPTABLE');
                    } else {
                        Toast.translateAndShow('ERROR_UNKNOWN_INTERNAL');
                    }
                }
            );
        };
    }
]);