app.controller('ArticleDetailsCtrl', [
    '$rootScope', '$scope', '$stateParams', 'Article', 'Cart', 'Toast', '$state', '$q', 'filterFilter',
    function ($rootScope, $scope, $stateParams, Article, Cart, Toast, $state, $q, filterFilter) {


        var mode = null;

        $scope.article = {};
        $scope.article.cart = [];

        $scope.selectedItem;

        $scope.catId = $stateParams.catId;

        if (Object.keys($stateParams).length > 0 && $stateParams.id != null) {
            mode = "update";

            // init
            (function () {
                var id = parseInt($stateParams.id);

                if (!isNaN(id)) {
                    Article.getArticleById($scope.catId, id, function (article) {
                        $scope.article = article;
                    }, function (error) {
                        Toast.translateAndShow("ARTICLE_ERROR_DOES_NOT_EXIST", function () {
                            $state.go('app.article.list');
                        });
                    });

                }
            })();
        }
        else {
            mode = "insert";
            $scope.article = Article.getNewResource();
        }


        $scope.save = function () {
            if (mode == "update") {
                Article.update($scope.article, $scope.catId, function () {
                    Toast.translateAndShow("ARTICLE_SUCCESS_UPDATE", function () {
                        $state.go("app.article-management.list", { id: $scope.catId });
                    });
                });
            }
            else {
                Article.insertInCategory($scope.article, $scope.catId, function () {
                    Toast.translateAndShow("ARTICLE_SUCCESS_INSERT", function () {
                        $state.go("app.article-management.list", { id: $scope.catId });
                    });
                });
            }
        };
       
    }]);