app.factory('Article', [
    'ArticleResource', 'ArticleCategoryResource', 'CartArticleResource', 'Dialog',
    function (ArticleResource, ArticleCategoryResource, CartArticleResource, Dialog) {

        var articleInCategory = null;
        var articleInCart = null;


        var getArticle = function (handler) {
            var article = ArticleResource.query(function () {
                handler(article);
            });
        };

        var getArticleById = function (id, handler, errorHandler) {
            var article = ArticleResource.get({ id: id }, function () {

                handler(article);
            }, function (error) {
                errorHandler(error);
            });
        };

        var getArticleByCategory = function (id, handler, errorHandler) {
            articleInCategory = ArticleCategoryResource.query({ catId: id }, function () {
                handler(articleInCategory);
            }, function (error) {
                errorHandler(error);
            });
        };

        var getArticleByCart = function (id, handler, errorHandler) {
            articleInCart = CartArticleResource.query({ cartId: id }, function () {
                handler(articleInCart);
            }, function (error) {
                errorHandler(error);
            })
        };

        var insertArticle = function (article, handler) {
            ArticleResource.save(article, function () {
                handler(article);
            });
        };

        var insertArticleInCategory = function (article, id, handler) {
            article.catId = id;
            ArticleCategoryResource.save(article, function () {
                handler(article);
            });
        };

        var insertArticleInCart = function (article, id, handler) {
            article.cartId = id;
            CartArticleResource.save(article, function () {
                handler(article);
            });
        };

        var deleteArticle = function (article, handler) {
            var original = article;

            if ((article instanceof ArticleResource) == false) {
                var article = new ArticleResource();
                article.id = original.id;
                article.name = original.name;
            }

            Dialog.confirm({
                title: 'Artikel löschen',
                content: '"' + article.name + '" wirklich löschen?',
                ok: 'Löschen'
            }, function () {
                article.$delete(function () {
                    articleInCategory.splice(articleInCategory.indexOf(original), 1);
                    articleInCart.splice(articleInCart.indexOf(original), 1);
                    handler(articleInCategory);
                });
            });
        };

        var deleteArticleFromCategory = function (article, catId, handler) {
            var orginal = article;
            article.catId = catId;

            Dialog.confirm({
                title: 'Aus Kategorie entfernen',
                content: '"' + article.name + '" aus der Kategorie entfernen?',
                ok: 'Entfernen'
            }, function () {
                article.$delete(function () {
                    articleInCategory.splice(articleInCategory.indexOf(orginal), 1);
                    handler(articleInCategory);
                });
            });
        };

        var deleteArticleFromCart = function (article, cartId, handler) {
            var orginal = article;
            article.cartId = cartId;

            CartArticleResource.delete(article, function () {
                if (articleInCart != null) {
                    articleInCart.splice(articleInCart.indexOf(orginal), 1);
                    handler(articleInCart);
                } else {
                    handler();
                }
            });
            //});
        };

        var updateArticle = function (article, handler) {

            article.$update(function () {
                handler();
            });
        };

        var getNewResource = function () {
            return new ArticleResource();
        };

        var copyArticle = function (article, category, handler) {
            article.catId = category.id;
            ArticleCategoryResource.copy(article, function () {
                handler(article);
            });
        };

        return {
            get: getArticle,
            getArticleById: getArticleById,
            getArticleByCategory: getArticleByCategory,
            getArticleByCart: getArticleByCart,
            insert: insertArticle,
            insertInCategory: insertArticleInCategory,
            insertInCart: insertArticleInCart,
            delete: deleteArticle,
            deleteArticleFromCategory: deleteArticleFromCategory,
            deleteArticleFromCart: deleteArticleFromCart,
            update: updateArticle,
            getNewResource: getNewResource,
            copyArticle: copyArticle
        };
    }]);