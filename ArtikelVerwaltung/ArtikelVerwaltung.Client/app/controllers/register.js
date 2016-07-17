app.controller('RegisterCtrl', [
    '$state', '$localStorage', '$rootScope', '$scope', 'AuthService', 'Toast',
    function ($state, $localStorage, $rootScope, $scope, AuthService, Toast)
    {
        $scope.user = null;
        $scope.dataLoading = false;

        $scope.doRegister = function ()
        {
            $scope.dataLoading = true;

            AuthService.doRegister($scope.user).$promise.then(
                function (data)
                {
                    var user = {};
                    user.name = data.name;
                    user.mailAddress = data.mailAddress;
                    user.isAdmin = data.isAdmin;
                    user.id = data.id;
                    user.authToken = data.token,
                    $localStorage.user = user;
                    Toast.translateAndShow('SUCCESS_REGISTER', function () {
                        $state.go('app.article.list');
                    });
                }, function (data)
                {
                    $scope.dataLoading = false;
                    if (data.status === 409) {
                        Toast.translateAndShow('ERROR_EMAIL_CONFLICT');
                    } else if (data.status === 406) {
                        Toast.translateAndShow('ERROR_PARAMETER_NOT_ACCEPTABLE');
                    } else if (data.status === 500) {
                        Toast.translateAndShow('ERROR_CREATE_USER');
                    } else {
                        Toast.translateAndShow('ERROR_UNKNOWN_INTERNAL');
                    }
                }
            );
        };
    }
]);