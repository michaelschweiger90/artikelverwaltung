app.factory('CartResource', ['urls', '$resource', function (urls, $resource) {
	return $resource(urls.BASE_API + 'users/:userID/carts/:id', { userID: '@userID', id: '@id' }, {
		query: { method: 'GET', isArray: true, params: {} },
		update: {
			method: 'PUT'
		}
	});
}]);