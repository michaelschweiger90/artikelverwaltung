app.factory('AuthResource', ['urls', '$resource', function (urls, $resource) {
    return $resource(urls.BASE_API + 'auth',{}, {
        register: {
            url: urls.BASE_API + 'auth/register',
            method: 'POST'
        },
        login: {
            url: urls.BASE_API + 'auth/login',
            method: 'POST'
        },
        forgot: {
            url: urls.BASE_API + 'auth/forgot',
            method: 'POST'
        },
        logout: {
            url: urls.BASE_API + 'auth/logout',
            method: 'DELETE'
        }
    });
}]);