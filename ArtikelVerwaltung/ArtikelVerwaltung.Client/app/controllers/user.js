app.controller('UserCtrl', [
    '$localStorage', '$rootScope', '$scope', '$state', 'UserService', '$translate',
    function ($localStorage, $rootScope, $scope, $state, UserService, $translate)
    {
        if ($state.current.name === 'app.user.deleteAccount') {
            UserService.deleteAccount().$promise.then(function (data) {
                $localStorage.user = {};
                $state.go('login');
            }, function (data) {

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
            }, function (data) {

            });
        }

        $scope.updateUser = function () {
            UserService.updateUserLoggedin($scope.userToEdit).$promise.then(function () {
                $localStorage.user.name = $scope.userToEdit.name;
                $localStorage.user.mailAddress = $scope.userToEdit.mailAddress;
                $rootScope.callbackJob.goBack();
            }, function () {

            });
        };
    }
]);