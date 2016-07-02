app.factory('LoginService', [
    '$localStorage', '$state', '$translate', 'LoginResource', 
function ($localStorage, $state, $translate, LoginResource) {

    var doLogin = function(user)
    {
        LoginResource.login({
            'mailAddress': user.mailAddress,
            'password': user.password
        }, function(data){

            $localStorage.token = data.token;
            // Eventbus.userLoggedIn();
            $state.go('app.article.list');

        }, function(data){
            //data.data        

        });
    };

    var doLogout = function()
    {
        $localStorage.token = null;
        $state.go('login');
    };

    return {
        doLogin: doLogin,
        doLogout: doLogout
    };
}]);