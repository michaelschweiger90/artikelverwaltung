app.controller('LoginCtrl', [
    '$rootScope', '$scope', 'LoginService',
    function ($rootScope, $scope, LoginService) {

        $scope.user = null;
        $scope.dataloading = false;

    $scope.doLogin = function ()
    {
        LoginService.doLogin($scope.user);
    }
}]);