app.factory('UserResource', ['urls', '$resource', function (urls, $resource) {
    return $resource(urls.BASE_API + 'user',{}, {
        getAllUsers: {
            url: urls.BASE_API + 'user/all',
            method: 'GET',
            isArray: true
        },
        getUserById: {
            url: urls.BASE_API + 'user/:id/get',
            method: 'GET',
            params: { id: '@id' }
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
        updateUser: {
            url: urls.BASE_API + 'user/update',
            method: 'PUT'
        },
        deleteUser: {
            url: urls.BASE_API + 'user/:id/remove',
            method: 'DELETE',
            params: { id: '@id' }
        }
    });
}]);