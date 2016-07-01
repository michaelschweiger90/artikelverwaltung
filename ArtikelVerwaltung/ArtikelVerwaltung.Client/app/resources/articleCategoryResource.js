app.factory('ArticleCategoryResource', ['urls', '$resource', function (urls, $resource) {
    return $resource(urls.BASE_API + 'categories/:catId/articles/:id', { catId: '@catId', id: '@id' }, {
        query: { method: 'GET', isArray: true, params: {} },
        save: { method: 'POST', params: { catId: '@catId' } },
        update: { method: 'PUT', params: { catId: '@catId', id: '@id' } },
        delete: { method: 'DELETE', params: { catId: '@catId', id: '@id' } }
    });
}]);