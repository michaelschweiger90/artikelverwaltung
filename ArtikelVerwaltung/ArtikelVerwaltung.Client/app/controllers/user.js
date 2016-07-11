app.controller('UserCtrl', [
    '$localStorage', '$rootScope', '$scope', '$state', 'UserService', '$translate', 'Toast',
    function ($localStorage, $rootScope, $scope, $state, UserService, $translate, Toast)
    {
        if ($state.current.name === 'app.user.deleteAccount') {
            UserService.deleteAccount().$promise.then(function (data) {
                $localStorage.user = {};
                Toast.translateAndShow('SUCCESS_ACCOUNT_DELETE', function () {
                    $state.go('login');
                });
            }, function (data) {
                if (data.status === 500) {
                    Toast.translateAndShow('ERROR_ACCOUNT_DELETE_FAIL');
                } else {
                    Toast.translateAndShow('ERROR_UNKNOWN_INTERNAL');
                }
            });
        }

        $scope.users = [];
        $scope.userToEdit = {};
        var userIdToEdit = $localStorage.userIdToEdit;
        if (userIdToEdit) {
            delete $localStorage.userIdToEdit;
            UserService.getAccountData().$promise.then(function (data) {
                $scope.userToEdit.id = $localStorage.user.id;
                $scope.userToEdit.name = $localStorage.user.name;
                $scope.userToEdit.mailAddress = $localStorage.user.mailAddress;
                $scope.userToEdit.secretQuestion = data.secretQuestion;
                $scope.userToEdit.secretAnswer = data.secretAnswer;
                Toast.translateAndShow('SUCCESS_ACCOUNT_DETAILS_FETCH');
            }, function (data) {
                if (data.status === 404) {
                    Toast.translateAndShow('ERROR_USER_NOT_EXIST');
                } else {
                    Toast.translateAndShow('ERROR_UNKNOWN_INTERNAL');
                }
            });
        }

        $scope.updateUser = function () {
            UserService.updateUserLoggedin($scope.userToEdit).$promise.then(function () {
                $localStorage.user.name = $scope.userToEdit.name;
                $localStorage.user.mailAddress = $scope.userToEdit.mailAddress;
                Toast.translateAndShow('SUCCESS_UPDATE_ACCOUNT', function () {
                    $rootScope.callbackJob.goBack();
                });
            }, function () {
                if (data.status === 409) {
                    Toast.translateAndShow('ERROR_EMAIL_CONFLICT');
                } else if (data.status === 406) {
                    Toast.translateAndShow('ERROR_PARAMETER_NOT_ACCEPTABLE');
                } else if (data.status === 500) {
                    Toast.translateAndShow('ERROR_UPDATE_ACCOUNT');
                } else {
                    Toast.translateAndShow('ERROR_UNKNOWN_INTERNAL');
                }
            });
        };
    }
]);