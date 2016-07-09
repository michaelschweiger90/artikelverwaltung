﻿app.factory('UserService', [
    'UserResource', function (UserResource)
    {
        var getAllUsers = function () {
            return UserResource.getAllUsers();
        };

        var makeAdmin = function (id) {
            return UserResource.makeAdmin({ id: id });
        };

        var removeAdminRights = function (id) {
            return UserResource.removeAdminRights({ id: id });
        };

        var deleteUser = function (id) {
            return UserResource.deleteUser({ id: id });
        }

        return {
            getAllUsers: getAllUsers,
            makeAdmin: makeAdmin,
            removeAdminRights: removeAdminRights,
            deleteUser: deleteUser
        };
    }
]);