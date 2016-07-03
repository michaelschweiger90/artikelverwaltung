app.factory('RegisterService', [
    'RegisterResource', function (RegisterResource)
    {
        var registerUser = function (user) {
            return RegisterResource.register(
                {
                    'name': user.name,
                    'mailAddress': user.mailAddress,
                    'password': user.password
                }
            );
        };

        return {
            registerUser: registerUser
        };
    }
]);