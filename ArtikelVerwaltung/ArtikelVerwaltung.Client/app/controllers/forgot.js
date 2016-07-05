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
                    $state.go('login');
                }, function (data)
                {
                    $scope.dataLoading = false;
                }
            );
        };
    }
]);