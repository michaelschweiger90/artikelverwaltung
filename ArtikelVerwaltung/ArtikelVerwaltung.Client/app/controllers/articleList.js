﻿app.controller('ArticleListCtrl', [
    '$rootScope', '$scope', '$stateParams', 'Article', 'Toast', '$filter', '$state',
    function ($rootScope, $scope, $stateParams,  Article, Toast, $filter, $state) {

        $scope.isInit = false;

        $scope.displayedCollection = [];

        $scope.menuOptions = [
            ['Artikel löschen', function ($itemScope) {
                var article = $itemScope.a;

                Article.deleteArticleFromCategory(article, $stateParams.id, function (article) {
                    $scope.article = article;
                });
            }]
        ];

        // init
        (function () {
            if ($stateParams.id != 'none') {
                var id = parseInt($stateParams.id);

                if (!isNaN(id)) {
                    Article.getArticleByCategory(id, function (article) {
                        $scope.isInit = true;
                        $scope.article = article;
                        $scope.category = id;
                    }, function (error) {
                        Toast.translateAndShow("ARTICLE_ERROR_DOES_NOT_EXIST", function () {
                            $state.go('app.article.list');
                        });
                    });
                }
                else {
                    if ($scope.isInit) {
                        Toast.translateAndShow("ARTICLE_ERROR_DOES_NOT_EXIST", function () {
                            $state.go('app.article.list');
                        });
                    }
                }
            }
            else {
                Article.getArticleWithoutCategory(function (article) {
                    $scope.isInit = true;
                    $scope.article = article;
                    // todo $scope.category = null ?
                }, function () {

                });
            }

        })();
    }]);