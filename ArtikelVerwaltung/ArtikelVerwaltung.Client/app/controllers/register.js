app.controller('RegisterCtrl', [
    '$state', '$localStorage', '$rootScope', '$scope', 'AuthService',
    function ($state, $localStorage, $rootScope, $scope, AuthService)
    {
        $scope.user = null;
        $scope.dataLoading = false;

        $scope.registerUser = function ()
        {
            $scope.dataLoading = true;

            AuthService.registerUser($scope.user).$promise.then(
                function (data)
                {
                    var user = {};
                    user.name = data.name;
                    user.mailAddress = data.mailAddress;
                    user.isAdmin = data.isAdmin;
                    user.id = data.id;
                    user.authToken = data.token,
                    $localStorage.user = user;

                    $state.go('app.article.list');
                }, function (data)
                {
                    $scope.dataLoading = false;
                }
            );
        };
    }
]);