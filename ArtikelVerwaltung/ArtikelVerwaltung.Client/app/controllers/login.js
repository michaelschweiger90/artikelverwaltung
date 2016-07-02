app.controller('LoginCtrl', [
    '$rootScope', '$scope', 'LoginService',
    function ($rootScope, $scope, Login) {

    $scope.user = {};

    $scope.login = function()
    {
        Login.doLogin($scope.user.email, $scope.user.password);
    };
}]);