﻿app.controller('UserCtrl', [
    '$localStorage', '$rootScope', '$scope', '$state', 'UserService', '$translate',
    function ($localStorage, $rootScope, $scope, $state, UserService, $translate)
    {
        $scope.users = [];
        $scope.userToEdit = {};
        var userIdToEdit = $localStorage.userIdToEdit;
        if (userIdToEdit) {
            delete $localStorage.userIdToEdit;
            UserService.getUserById(userIdToEdit).$promise.then(function (data) {
                if (userIdToEdit === $localStorage.user.id) {
                    $localStorage.user = {};
                    $state.go('login');
                    return;
                }
                $scope.userToEdit.id = data.id;
                $scope.userToEdit.name = data.name;
                $scope.userToEdit.mailAddress = data.mailAddress;
                $scope.userToEdit.secretQuestion = data.secretQuestion;
                $scope.userToEdit.secretAnswer = data.secretAnswer;
            }, function (data) {

            });
        }

        UserService.getAllUsers().$promise.then(function (data) {
            data.forEach(function (value) {
                var translatePromise = value.isAdmin ? $translate('SYS_ADMIN') : $translate('SYS_USER');

                translatePromise.then(function (translate) {
                    value.role = translate;
                });
                $scope.users.push(value);
            });
        }, function (data) {

        });

        $scope.makeAdmin = function (user) {
            UserService.makeAdmin(user.id).$promise.then(function () {
                if (user.id === $localStorage.user.id) {
                    $localStorage.user = {};
                    $state.go('login');
                    return;
                }

                user.isAdmin = true;
                $translate('SYS_ADMIN').then(function (translate) {
                    user.role = translate;
                });
            }, function () {
                
            });
        };

        $scope.removeAdminRights = function (user) {
            UserService.removeAdminRights(user.id).$promise.then(function () {
                if (user.id === $localStorage.user.id) {
                    $localStorage.user = {};
                    $state.go('login');
                    return;
                }

                user.isAdmin = false;
                $translate('SYS_USER').then(function (translate) {
                    user.role = translate;
                });
            }, function () {

            });
        };

        $scope.editUser = function (user) {
            $localStorage.userIdToEdit = user.id;
            $state.go('app.user.edit');
        };

        $scope.updateUser = function () {
            UserService.updateUser($scope.userToEdit).$promise.then(function () {
                $state.go('app.user.list');
            }, function () {

            });
        };

        $scope.deleteUser = function (user) {
            UserService.deleteUser(user.id).$promise.then(function () {
                if (user.id === $localStorage.user.id) {
                    $localStorage.user = {};
                    $state.go('login');
                    return;
                }

                var index = $scope.users.indexOf(user);
                if (index !== -1) {
                    $scope.users.splice(index, 1);
                }
            }, function () {

            });
        };
    }
]);