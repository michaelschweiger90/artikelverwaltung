app.factory('ArticleResource', ['urls', '$resource', function (urls, $resource) {
    return $resource(urls.BASE_API_PROTECTED + 'article/:id', { id: '@id' }, {
        query: { method: 'GET', isArray: true, params: {} },
        update: {
            method: 'PUT'
        }
    });
}]);