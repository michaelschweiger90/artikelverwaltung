app.controller('ArticleCtrl', [
    '$rootScope', '$scope', 'Category',
    function ($rootScope, $scope, Category) {

        $scope.menuOptions = [
            ['Kategorie löschen', function ($itemScope) {
                var categorie = $itemScope.category;
                categorie.$delete();
            }],
            ['Kategorie umbennen', function ($itemScope) {
                var categorie = $itemScope.category;
                /*
                Category.deleteArticleFromCategory(article, $stateParams.id, function (article) {
                    $scope.article = article;
                });
                */
            }],
            ['Kategorie hinzufügen', function ($itemScope) {
                var categorie = $itemScope.category;
                /*
                Category.deleteArticleFromCategory(article, $stateParams.id, function (article) {
                    $scope.article = article;
                });
                */
            }]
        ];

        Category.get(function(categories){
            $scope.categories = categories;
        });

        $scope.isInit = false;

    }]);



