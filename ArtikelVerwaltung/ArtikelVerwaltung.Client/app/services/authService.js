app.factory('AuthService', [
    'AuthResource', function (AuthResource)
    {
        var registerUser = function (user) {
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

        var forgotPassword = function () {

        };

        var doLogout = function() {
           return AuthResource.logout();
        }

        return {
            doLogin: doLogin,
            doLogout: doLogout,
            forgotPassword: forgotPassword,
            registerUser: registerUser
        };
    }
]);