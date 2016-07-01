app.controller('ArticleCtrl', [
    '$rootScope', '$scope', 'Category',
    function ($rootScope, $scope, Category) {

        Category.get(function(categories){
            $scope.categories = categories;
        });

        $scope.isInit = false;

    }]);



