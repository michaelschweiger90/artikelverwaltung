app.factory('UserService', [
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

        var deleteAccount = function () {
            return UserResource.deleteAccount();
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

        var updateUserLoggedin = function (user) {
            return UserResource.updateUserLoggedin({
                'id': user.id,
                'mailAddress': user.mailAddress,
                'name': user.name,
                'secretQuestion': user.secretQuestion,
                'secretAnswer': user.secretAnswer,
                'newPassword': user.newPassword
            });
        };

        var getAccountData = function () {
            return UserResource.getAccountData();
        };

        return {
            getAllUsers: getAllUsers,
            makeAdmin: makeAdmin,
            removeAdminRights: removeAdminRights,
            deleteUser: deleteUser,
            getUserById: getUserById,
            updateUser: updateUser,
            deleteAccount: deleteAccount,
            updateUserLoggedin: updateUserLoggedin,
            getAccountData: getAccountData
        };
    }
]);