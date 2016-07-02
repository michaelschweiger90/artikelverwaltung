app.factory('RegisterResource', ['urls', '$resource', function (urls, $resource) {
    return $resource(urls.BASE_API + 'register',{}, {
        register: {
            method: 'POST'
        }
    });
}]);