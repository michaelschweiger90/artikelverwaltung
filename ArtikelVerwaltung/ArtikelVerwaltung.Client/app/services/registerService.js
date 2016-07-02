app.factory('RegisterService', [
    'RegisterResource',
    function (RegisterResource) {

        var registerUser = function (user, name, password) {
            user.name = name;
            user.password = password;
            
        };

        return {
            registerUser: registerUser
        };
    }]);