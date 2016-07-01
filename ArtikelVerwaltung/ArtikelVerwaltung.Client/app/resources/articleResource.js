app.factory('ArticleResource', ['urls', '$resource', function (urls, $resource) {
    return $resource(urls.BASE_API + 'categories/:catId/articles/:id', { catId: '@catId', id: '@id' }, {
        query: { method: 'GET', isArray: true, params: {} },
        update: {
            method: 'PUT'
        }
    });
}]);