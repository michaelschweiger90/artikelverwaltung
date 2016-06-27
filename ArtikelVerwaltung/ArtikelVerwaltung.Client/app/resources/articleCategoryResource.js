app.factory('ArticleCategoryResource', ['urls', '$resource', function (urls, $resource) {
    return $resource(urls.BASE_API_PROTECTED + 'category/:catId/article/:id', { catId: '@catId', id: '@id' }, {
        query: { method: 'GET', isArray: true, params: {} },
        save: { method: 'POST', params: { catId: '@catId' } },
        update: {
            method: 'PUT'
        },
        copy: { method: 'PUT', params: { catId: '@catId' } }
    });
}]);