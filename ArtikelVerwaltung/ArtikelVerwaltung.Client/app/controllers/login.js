app.controller('LoginCtrl', [
    '$localStorage', '$rootScope', '$scope', '$state', 'LoginService',
    function ($localStorage, $rootScope, $scope, $state, LoginService)
    {
        $scope.user = null;
        $scope.dataLoading = false;

        $scope.doLogin = function () {
            $scope.dataLoading = true;

            LoginService.doLogin($scope.user).$promise.then(
                function (data)
                {
                    $state.go('app.article.list');
                }, function (data)
                {
                    $scope.dataLoading = false;
                }
            );
        };
    }
]);