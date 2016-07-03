app.controller('RegisterCtrl', [
    '$state', '$localStorage', '$rootScope', '$scope', 'RegisterService',
    function ($state, $localStorage, $rootScope, $scope, RegisterService)
    {
        $scope.user = null;
        $scope.dataLoading = false;

        $scope.registerUser = function ()
        {
            $scope.dataLoading = true;

            RegisterService.registerUser($scope.user).$promise.then(
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