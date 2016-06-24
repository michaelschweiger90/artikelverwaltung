app.controller('LoginCtrl', [
    '$rootScope', '$scope', 'Login',
    function ($rootScope, $scope, Login) {

    $scope.user = {};

    $scope.login = function()
    {
        Login.doLogin($scope.user.email, $scope.user.password);
    };
}]);