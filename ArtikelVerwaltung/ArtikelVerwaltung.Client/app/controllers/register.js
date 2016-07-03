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
                    var user = {};
                    user.name = data.name;
                    user.mailAddress = data.mailAddress;
                    user.isAdmin = data.isAdmin;
                    user.id = data.id;
                    user.password = $scope.user.password;
                    $localStorage.user = user;

                    var authString = $scope.user.mailAddress + ":" + $scope.user.password;
                    $localStorage.authToken = btoa(authString);

                    $state.go('app.article.list');
                }, function (data)
                {
                    $scope.dataLoading = false;
                }
            );
        };
    }
]);