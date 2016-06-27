app.factory('CartArticleResource', ['urls', '$resource', function (urls, $resource) {
	return $resource(urls.BASE_API + 'users/:userID/carts/:id/articles', { userID: '@userID', id: '@id' }, {
		query: { method: 'GET', isArray: true, params: {} },
		removeArticle: {
			method: 'DELETE',
			url: urls.BASE_API + 'users/:userID/carts/:id/articles/:articleID',
			params: { userID: '@userID', id: '@id', articleID: '@articleID' }
		}
	});
}]);