app.controller('RegisterCtrl', [
    '$rootScope', '$scope', 'RegisterService',
    function ($rootScope, $scope, RegisterService) {
        var user = null;
        var dataloading = false;

        function registerUser() {
            this.dataLoading = true;
            $scope.user = user;
        }

    }]);