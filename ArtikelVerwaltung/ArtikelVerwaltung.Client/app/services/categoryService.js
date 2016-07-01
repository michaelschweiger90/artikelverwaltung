app.factory('Category', [
    'CategoryResource', 'Dialog',
    function (CategoryResource, Dialog) {

        var getCategories = function (handler) {
            var categories = CategoryResource.query(function () {
                handler(categories);
            });
        };

        var insertCategory = function (category, handler) {

            var newCategory = getNewResource();
            newCategory.parentId = category.id;

            var CategoryEditController = function ($scope, $mdDialog) {

                $scope.category = newCategory.name;
                $scope.mode = 'insert';

                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.edit = function () {
                    $mdDialog.hide($scope.category);
                };
            };

            var config = {
                controller: CategoryEditController,
                template: '/views/admin/editCategory.dlg.html'
            };

            Dialog.custom(config, function (data) {
                newCategory.name = data;
                CategoryResource.save(newCategory, function () {
                    if (category.children) {
                        category.children.push(newCategory);
                    }
                    handler(newCategory);

                });

            }, function () {

            });
        };

        var deleteCategory = function (category, handler) {
            var original = category;
            if (!(category instanceof CategoryResource)) {
                var tmp = category;
                category = new CategoryResource();
                category.id = tmp.id;
                category.name = tmp.name;
                category.parentId = tmp.parentId;
            }
            Dialog.confirm({
                title: 'Kategorie löschen?',
                content: '"' + category.name + '" entfernen?',
                ok: 'Entfernen'
            }, function () {
                category.$delete(function () {
                    handler(category);
                    Eventbus.deleteCategory(original);
                });
            });

        };

        var updateCategory = function (category, handler) {

            var CategoryEditController = function ($scope, $mdDialog) {

                $scope.category = category.name;

                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.edit = function () {
                    $mdDialog.hide($scope.category);
                };
            };

            var config = {
                controller: CategoryEditController,
                template: '/views/admin/editCategory.dlg.html'
            };

            Dialog.custom(config, function (data) {
                category.name = data;
                category.$update(function () {
                    handler();
                });

            }, function () {

            });
        };

        var getNewResource = function () {
            return new CategoryResource();
        };

        return {
            get: getCategories,
            insert: insertCategory,
            delete: deleteCategory,
            update: updateCategory,
            getNewResource: getNewResource
        };
    }]);