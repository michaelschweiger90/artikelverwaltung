app.controller('ArticleDetailsCtrl', [
    '$rootScope', '$scope', '$stateParams', 'Article', 'Cart', 'Toast', '$state', '$q', 'filterFilter', '$localStorage',
    function ($rootScope, $scope, $stateParams, Article, Cart, Toast, $state, $q, filterFilter, $localStorage) {


        var mode = null;

        $scope.article = {};
        
        $scope.selectedItem;
        $scope.carts = [];

        $scope.catId = $stateParams.catId;

        if (Object.keys($stateParams).length > 0 && $stateParams.id != null) {
            mode = "update";

            // init
            (function () {
                var id = parseInt($stateParams.id);

                if (!isNaN(id)) {
                    Article.getArticleById($scope.catId, id, function (article) {
                    	$scope.article = article;

                    	Cart.getAll($localStorage.user.id, function (carts) {
                    		Cart.prepareCarts(carts, $scope.article, function (carts, isWanted) {
                    			$scope.carts = (isWanted) ? carts : [];
                    		});
                    	});

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

        $scope.addArticle = function () {
        	var article = $scope.article;

        	Cart.addArticle(article, function (carts, article) {
        		$scope.carts = carts;
        		$scope.article = article;
        	});
        };
       
    }]);