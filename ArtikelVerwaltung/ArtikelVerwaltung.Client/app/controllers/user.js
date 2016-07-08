app.controller('LoginCtrl', [
    '$localStorage', '$rootScope', '$scope', '$state', 'AuthService',
    function ($localStorage, $rootScope, $scope, $state, AuthService)
    {
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

                    $state.go('app.article.list');
                }, function (data)
                {
                    $scope.dataLoading = false;
                }
            );
        };
    }
]);