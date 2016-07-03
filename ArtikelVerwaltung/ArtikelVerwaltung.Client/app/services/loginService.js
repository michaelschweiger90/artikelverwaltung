app.factory('LoginService', [
    'LoginResource', function (LoginResource)
    {
        var doLogin = function(user)
        {
            return LoginResource.login(
                {
                    'mailAddress': user.mailAddress,
                    'password': user.password
                }
            );
        };

        var doLogout = function()
        {
            
        };

        return {
            doLogin: doLogin,
            doLogout: doLogout
        };
    }
]);