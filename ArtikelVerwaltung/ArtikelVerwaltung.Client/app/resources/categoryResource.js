app.factory('CategoryResource', ['urls', '$resource', function (urls, $resource) {
    return $resource(urls.BASE_API + 'categories/:id', { id: '@id' }, {
        query: { method: 'GET', isArray: true, params: {} },
        update: {
            method: 'PUT'
        }
    });
}]);