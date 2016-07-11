app.controller('AdminCtrl', [
    '$localStorage', '$rootScope', '$scope', '$state', 'UserService', '$translate', 'Toast',
    function ($localStorage, $rootScope, $scope, $state, UserService, $translate, Toast)
    {
        $scope.users = [];
        $scope.userToEdit = {};
        var userIdToEdit = $localStorage.userIdToEdit;
        if (userIdToEdit) {
            delete $localStorage.userIdToEdit;

            UserService.getUserById(userIdToEdit).$promise.then(function (data) {
                $scope.userToEdit.id = data.id;
                $scope.userToEdit.name = data.name;
                $scope.userToEdit.mailAddress = data.mailAddress;
                $scope.userToEdit.secretQuestion = data.secretQuestion;
                $scope.userToEdit.secretAnswer = data.secretAnswer;
                Toast.translateAndShow('SUCCESS_USER_DATA_FETCH');
            }, function (data) {
                if (data.status === 404) {
                    Toast.translateAndShow('ERROR_USER_NOT_EXIST');
                } else if (data.status === 406) {
                    Toast.translateAndShow('ERROR_PARAMETER_NOT_ACCEPTABLE')
                } else {
                    Toast.translateAndShow('ERROR_UNKNOWN_INTERNAL');
                }
            });
        }

        if ($state.current.name === 'app.admin.user.list') {
            UserService.getAllUsers().$promise.then(function (data) {
                data.forEach(function (value) {
                    var translatePromise = value.isAdmin ? $translate('SYS_ADMIN') : $translate('SYS_USER');

                    translatePromise.then(function (translate) {
                        value.role = translate;
                    });
                    $scope.users.push(value);
                    Toast.translateAndShow('SUCCESS_USER_LIST_FETCH');
                });
            }, function (data) {
                if (data.status === 404) {
                    Toast.translateAndShow('ERROR_NO_USERS');
                } else {
                    Toast.translateAndShow('ERROR_UNKNOWN_INTERNAL');
                }
            });
        }
        
        $scope.makeAdmin = function (user) {
            UserService.makeAdmin(user.id).$promise.then(function () {
                if (user.id === $localStorage.user.id) {
                    $localStorage.user = {};
                    Toast.translateAndShow('SUCCESS_ADMIN_RUGHTS_GRANT_OWN', function () {
                        $state.go('login');
                    });
                    return;
                }

                user.isAdmin = true;
                $translate('SYS_ADMIN').then(function (translate) {
                    user.role = translate;
                });
                Toast.translateAndShow('SUCCESS_ADMIN_RUGHTS_GRANT');
            }, function () {
                if (data.status === 500) {
                    Toast.translateAndShow('ERROR_ADMIN_RIGHTS_GRANT');
                } else {
                    Toast.translateAndShow('ERROR_UNKNOWN_INTERNAL');
                }
            });
        };

        $scope.removeAdminRights = function (user) {
            UserService.removeAdminRights(user.id).$promise.then(function () {
                if (user.id === $localStorage.user.id) {
                    $localStorage.user = {};
                    Toast.translateAndShow('SUCCESS_ADMIN_RUGHTS_REMOVE_OWN', function () {
                        $state.go('login');
                    });
                    return;
                }

                user.isAdmin = false;
                $translate('SYS_USER').then(function (translate) {
                    user.role = translate;
                });
                Toast.translateAndShow('SUCCESS_ADMIN_RUGHTS_REMOVE');
            }, function () {
                if (data.status === 500) {
                    Toast.translateAndShow('ERROR_ADMIN_RIGHTS_REMOVE');
                } else {
                    Toast.translateAndShow('ERROR_UNKNOWN_INTERNAL');
                }
            });
        };

        $scope.editUser = function (user) {
            $localStorage.userIdToEdit = user.id;
            $state.go('app.admin.user.edit');
        };

        $scope.updateUserWithAdminRights = function () {
            UserService.updateUser($scope.userToEdit).$promise.then(function () {
                var messageKey = 'SUCCESS_UPDATE_USER';
                if ($localStorage.user.id === $scope.userToEdit.id) {
                    $localStorage.user.name = $scope.userToEdit.name;
                    $localStorage.user.mailAddress = $scope.userToEdit.mailAddress;
                    messageKey = 'SUCCESS_UPDATE_USER_OWN';
                }
                Toast.translateAndShow(messageKey, function () {
                    $state.go('app.admin.user.list');
                });
            }, function () {
                if (data.status === 409) {
                    Toast.translateAndShow('ERROR_EMAIL_CONFLICT');
                } else if (data.status === 406) {
                    Toast.translateAndShow('ERROR_PARAMETER_NOT_ACCEPTABLE');
                } else if (data.status === 500) {
                    Toast.translateAndShow('ERROR_UPDATE_USER');
                } else {
                    Toast.translateAndShow('ERROR_UNKNOWN_INTERNAL');
                }
            });
        };

        $scope.deleteUser = function (user) {
            UserService.deleteUser(user.id).$promise.then(function () {
                if (user.id === $localStorage.user.id) {
                    $localStorage.user = {};
                    Toast.translateAndShow('SUCCESS_USER_DELETE_OWN', function () {
                        $state.go('login');
                    });
                    return;
                }

                var index = $scope.users.indexOf(user);
                if (index !== -1) {
                    $scope.users.splice(index, 1);
                }
                Toast.translateAndShow('SUCCESS_USER_DELETE');
            }, function () {
                if (data.status === 500) {
                    Toast.translateAndShow('ERROR_USER_DELETE_FAIL');
                } else {
                    Toast.translateAndShow('ERROR_UNKNOWN_INTERNAL');
                }
            });
        };
    }
]);