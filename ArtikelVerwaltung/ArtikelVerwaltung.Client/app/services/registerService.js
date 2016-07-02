app.factory('RegisterService', [
    '$localStorage', '$state', 'RegisterResource',
    function ($localStorage, $state, RegisterResource) {

        var registerUser = function (user) {
            RegisterResource.register({
                'name': user.name,
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

        return {
            registerUser: registerUser
        };
    }]);