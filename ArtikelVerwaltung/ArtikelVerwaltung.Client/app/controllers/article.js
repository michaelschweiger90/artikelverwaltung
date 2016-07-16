app.controller('ArticleCtrl', [
    '$rootScope', '$scope', 'Category', 'Toast',
    function ($rootScope, $scope, Category, Toast) {

    	$scope.menuOptions = [
			['Kategorie umbennen', function ($itemScope) {
				var category = $itemScope.category;
				Category.update(category, function () {
					Toast.translateAndShow("CATEGORY_RENAME_SUCCESS", function () { });
				});
			}],
            ['Kategorie löschen', function ($itemScope) {
                var category = $itemScope.category;
                Category.delete(category, function (category) {
                	$scope.categories.splice($scope.categories.indexOf(category), 1);
                	Toast.translateAndShow("CATEGORY_DELETE_SUCCESS", function () { });
                });
            }]
        ];

        Category.get(function(categories){
            $scope.categories = categories;
        });

        $scope.addCategory = function () {
        	Category.insert(function (category) {
        		$scope.categories.push(category);
        		Toast.translateAndShow("CATEGORY_ADD_SUCCESS", function () { });
        	});
        };

        $scope.isInit = false;

    }]);



