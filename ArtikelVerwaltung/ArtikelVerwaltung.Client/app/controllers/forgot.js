app.controller('ForgotCtrl', [
    '$localStorage', '$rootScope', '$scope', '$state', 'AuthService',
    function ($localStorage, $rootScope, $scope, $state, AuthService)
    {
        $scope.user = null;
        $scope.dataLoading = false;

        $scope.doForgot = function () {
            $scope.dataLoading = true;

            AuthService.doForgot($scope.user).$promise.then(
                function ()
                {
                    Toast.translateAndShow('SUCCESS_CHANGE_PASSWORD', function () {
                        $state.go('login');
                    });
                }, function (data)
                {
                    $scope.dataLoading = false;
                    if (data.status === 406) {
                        Toast.translateAndShow('ERROR_PARAMETER_NOT_ACCEPTABLE');
                    } else if (data.status === 500) {
                        Toast.translateAndShow('ERROR_PASSWORD_CHANGE');
                    } else {
                        Toast.translateAndShow('ERROR_UNKNOWN_INTERNAL');
                    }
                }
            );
        };
    }
]);