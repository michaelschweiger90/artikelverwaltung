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

        var getUserById = function (id) {
            return UserResource.getUserById({ id: id });
        }
        
        var updateUser = function (user) {
            return UserResource.updateUser({
                'id': user.id,
                'mailAddress': user.mailAddress,
                'name': user.name,
                'secretQuestion': user.secretQuestion,
                'secretAnswer': user.secretAnswer,
                'newPassword': user.newPassword
            });
        };

        return {
            getAllUsers: getAllUsers,
            makeAdmin: makeAdmin,
            removeAdminRights: removeAdminRights,
            deleteUser: deleteUser,
            getUserById: getUserById,
            updateUser: updateUser
        };
    }
]);