app.factory('LoginService', [
    '$localStorage', '$state', '$translate', 
    function ($localStorage, $state, $translate) {

    var doLogin = function(username, password)
    {
        LoginResource.login({
            'username': username,
            'password': password
        }, function(data){

            $localStorage.token = data.token;
            Eventbus.userLoggedIn();
            $state.go('app.article.list');

        }, function(data){
            //data.data        

        });
    };

    var doLogout = function()
    {
        $localStorage.token = null;
        $state.go('start.login');
    };

    return {
        doLogin: doLogin,
        doLogout: doLogout
    };
}]);