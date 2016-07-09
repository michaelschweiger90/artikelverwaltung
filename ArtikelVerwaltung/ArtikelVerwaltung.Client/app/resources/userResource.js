app.factory('UserResource', ['urls', '$resource', function (urls, $resource) {
    return $resource(urls.BASE_API + 'user',{}, {
        getAllUsers: {
            url: urls.BASE_API + 'user/all',
            method: 'GET',
            isArray: true,
            params: {}
        },
        makeAdmin: {
            url: urls.BASE_API + 'user/:id/adminRights/grant',
            method: 'PUT',
            params: {id: '@id'}
        },
        removeAdminRights: {
            url: urls.BASE_API + 'user/:id/adminRights/remove',
            method: 'DELETE',
            params: { id: '@id' }
        },
        deleteUser: {
            url: urls.BASE_API + 'user/:id/remove',
            method: 'DELETE',
            params: { id: '@id' }
        }
    });
}]);