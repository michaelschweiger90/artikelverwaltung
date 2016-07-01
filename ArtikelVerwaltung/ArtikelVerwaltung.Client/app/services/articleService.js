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

        var getArticleById = function (catId, id, handler, errorHandler) {
            var article = ArticleCategoryResource.get({catId: catId, id: id }, function () {

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

            console.log(catId);

            Dialog.confirm({
                title: 'Aus Kategorie entfernen',
                content: '"' + article.name + '" aus der Kategorie entfernen?',
                ok: 'Entfernen'
            }, function () {
                ArticleCategoryResource.delete({ catId:catId, id:article.id }, function () {
                    articleInCategory.splice(articleInCategory.indexOf(orginal), 1);
                    handler(articleInCategory);
                });
            });
        };

        var updateArticle = function (article, catId, handler) {
            article.catId = catId;
            ArticleCategoryResource.update(article, function () {
                handler(article);
            });
        };

        var getNewResource = function () {
            return new ArticleResource();
        };

        return {
            get: getArticle,
            getArticleById: getArticleById,
            getArticleByCategory: getArticleByCategory,
            insert: insertArticle,
            insertInCategory: insertArticleInCategory,
            delete: deleteArticle,
            deleteArticleFromCategory: deleteArticleFromCategory,
            update: updateArticle,
            getNewResource: getNewResource,
        };
    }]);