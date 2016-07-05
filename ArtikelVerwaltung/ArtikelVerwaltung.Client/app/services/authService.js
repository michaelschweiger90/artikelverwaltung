app.factory('AuthService', [
    'AuthResource', function (AuthResource)
    {
        var doRegister = function (user) {
            return AuthResource.register(
                {
                    'name': user.name,
                    'mailAddress': user.mailAddress,
                    'password': user.password,
                    'secretQuestion': user.secretQuestion,
                    'secretAnswer': user.secretAnswer
                }
            );
        };

        var doLogin = function (user) {
            return AuthResource.login(
                {
                    'mailAddress': user.mailAddress,
                    'password': user.password
                }
            );
        };

        var doForgot = function (user) {
            return AuthResource.forgot({
                'mailAddress': user.mailAddress,
                'newPassword': user.newPassword,
                'secretAnswer': user.secretAnswer,
                'secretQuestion': user.secretQuestion
            });
        };

        var doLogout = function() {
           return AuthResource.logout();
        }

        return {
            doLogin: doLogin,
            doLogout: doLogout,
            doForgot: doForgot,
            doRegister: doRegister
        };
    }
]);