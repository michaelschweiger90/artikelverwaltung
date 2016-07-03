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