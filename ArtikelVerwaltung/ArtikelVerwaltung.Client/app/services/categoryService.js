app.factory('Category', [
    'CategoryResource', 'Dialog',
    function (CategoryResource, Dialog) {

        var getCategories = function (handler) {
            var categories = CategoryResource.query(function () {
                handler(categories);
            });
        };

        var insertCategory = function (handler) {

            var newCategory = getNewResource();

            var CategoryEditController = function ($scope, $mdDialog) {

            	$scope.name = newCategory.name;
                $scope.mode = 'insert';

                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.edit = function () {
                	$mdDialog.hide($scope.name);
                };
            };

            var config = {
                controller: CategoryEditController,
                template: '/views/dlgs/editCategory.dlg.html'
            };

            Dialog.custom(config, function (data) {
            	newCategory.name = data;
                newCategory.$save(function () {
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
                	handler(original);
                });
            });

        };

        var updateCategory = function (category, handler) {

            var CategoryEditController = function ($scope, $mdDialog) {

				$scope.mode = "update"
                $scope.name = category.name;

                $scope.hide = function () {
                    $mdDialog.hide();
                };
                $scope.cancel = function () {
                    $mdDialog.cancel();
                };
                $scope.edit = function () {
                    $mdDialog.hide($scope.name);
                };
            };

            var config = {
                controller: CategoryEditController,
                template: '/views/dlgs/editCategory.dlg.html'
            };

            Dialog.custom(config, function (data) {
            	category.name = data;
            	category.$update(function () {
            		if (handler != undefined)
            		{
            			handler();
            		}
            	});

            }, function () {

            });
        };

        var getNewResource = function () {
            return new CategoryResource();
        };

        var renameCategory = function (category) {

        };

        return {
            get: getCategories,
            insert: insertCategory,
            delete: deleteCategory,
            update: updateCategory,
            getNewResource: getNewResource
        };
    }]);