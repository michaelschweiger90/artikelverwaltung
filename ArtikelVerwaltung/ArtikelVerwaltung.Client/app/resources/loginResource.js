app.factory('LoginResource', ['urls', '$resource', function(urls ,$resource) {
    return $resource(urls.BASE_API + 'login', {}, {
        login: {
            method: 'POST'
        }
    });
}]);