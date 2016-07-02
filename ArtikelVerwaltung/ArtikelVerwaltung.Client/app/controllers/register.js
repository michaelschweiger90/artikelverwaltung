app.controller('RegisterCtrl', [
    '$rootScope', '$scope', 'RegisterService',
    function ($rootScope, $scope, RegisterService) {
        $scope.user = null;
        $scope.dataloading = false;

        $scope.registerUser = function () {
            this.dataLoading = true;

            RegisterService.registerUser($scope.user);
        };

    }]);