app.factory('Cart', [
    'CartResource', 'CartArticleResource', 'Dialog', '$localStorage',
function (CartResource, CartArticleResource, Dialog, $localStorage) {

    	var carts = null;
    	var articles = null;

    	var getCarts = function (userId, handler) {
    		carts = CartResource.query({ userID: userId }, function () {
    			handler(carts);
    		});
    	};

    	var getCart = function (userId, cartId, handler) {
    		var cart = CartResource.get({ userID: userId, id: cartId }, function () {
    			handler(cart);
    		});
    	};

    	var add = function (userId, handler) {

    		var newCart = getNewResource();
    		newCart.userId = userId;

    		var CartController = function ($scope, $mdDialog) {

    			$scope.name = newCart.name;
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
    			controller: CartController,
    			template: '/views/dlgs/cart.dlg.html'
    		};

    		Dialog.custom(config, function (data) {
    			newCart.name = data;
    			newCart.$save({userID: userId}, function () {
    				handler(newCart);
    			});
    		}, function () {
    		});
    	};

    	var deleteCart = function (cart, handler) {
    		var original = cart;
    		if (!(cart instanceof CartResource)) {
    			var tmp = cart;
    			cart = new CartResource();
    			cart.id = tmp.id;
    			cart.name = tmp.name;
    			cart.userId = tmp.userId;
    		}
    		Dialog.confirm({
    			title: 'Warenkorb löschen?',
    			content: '"' + cart.name + '" entfernen?',
    			ok: 'Entfernen'
    		}, function () {
    			cart.$delete(function () {
    				carts.splice(carts.indexOf(original), 1);
    				handler(carts);
    			});
    		});
    	};

    	var update = function (cart, handler) {

    		var CartController = function ($scope, $mdDialog) {

    			$scope.name = cart.name;

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
    			controller: CartController,
    			template: '/views/dlgs/cart.dlg.html'
    		};

    		Dialog.custom(config, function (data) {
    			cart.name = data;
    			cart.$update({},function () {
    				handler();
    			});
    		}, function () {
    		});
    	};

    	var getArticles = function (cart, handler) {
    		articles = CartArticleResource.query({ userID: cart.userID, id: cart.id }, function () {
    			handler(articles);
    		});
    	};

    	var prepareCarts = function (carts, article, handler) {

    		var articleCarts = article.carts;
    		var isWanted = false;

    		for(var i = 0; i < carts.length; i++)
    		{
    			for(var j = 0; j < articleCarts.length; j++)
    			{
    				if (carts[i].id == articleCarts[j].cartID)
    				{
    					carts[i].wanted = true;
    					isWanted = true;
    				}	
    			}
    		}

    		if (handler)
    		{
    			handler(carts, isWanted);
    		}

    		return carts;
    	};

    	var articleCarts = [];

    	var addArticle = function (article, handler) {

    		getCarts($localStorage.user.id, function (carts) {

    			carts = prepareCarts(carts, article);
    			articleCarts = [];

    			var CartController = function ($scope, $mdDialog) {

    				$scope.carts = carts;
    				$scope.article = article;

    				$scope.hide = function () {
    					$mdDialog.hide();
    				};
    				$scope.cancel = function () {
    					$mdDialog.cancel();
    				};
    				$scope.edit = function () {
    					$mdDialog.hide($scope.carts);
    				};
    			};

    			var config = {
    				controller: CartController,
    				template: '/views/dlgs/addArticleToCart.dlg.html'
    			};

    			Dialog.custom(config, function (carts) {

    				var promises = [];
    				article.carts = [];

    				for(var i = 0; i < carts.length; i++)
    				{
    					var cart = carts[i];

    					if (cart.wanted == true)
    					{
    						var articleCart = new CartArticleResource();

    						articleCart.cartID = cart.id;
    						articleCart.articleID = article.id;
    						articleCart.userID = cart.userID;
    						articleCart.id = cart.id;

    						var promise = CartArticleResource.save(articleCart, function (cart) {
    							cart.wanted = true;
    							articleCarts.push(cart);
    							article.carts.push({
    								articleID: article.id,
									cartID: cart.id
    							});
    						});

    						promises.push(promise);
    					}
    					else
    					{
    						removeArticle(cart, article, function () { });
    					}
    				}

    				Promise.all(promises).then(function () {
    					handler(articleCarts, article);
    				});

    			}, function () { });

    		});
    	};

    	var removeArticle = function (cart, article, handler) {
    		var articleCart = new CartArticleResource();
    		var original = article;

    		articleCart.cartID = cart.id;
    		articleCart.articleID = article.id;

    		CartArticleResource.removeArticle({
    			userID: cart.userID,
    			id: cart.id,
    			articleID: article.id
    		}, function () {

    			if (articles)
    			{
    				articles.splice(articles.indexOf(original), 1);
    			}

    			handler(articles);
    		});
    	};

    	var getNewResource = function () {
    		return new CartResource();
    	};

    	return {
    		getAll: getCarts,
			get: getCart,
			add: add,
			getArticles: getArticles,
			addArticle: addArticle,
			removeArticle: removeArticle,
    		delete: deleteCart,
    		update: update,
    		getNewResource: getNewResource,
    		prepareCarts: prepareCarts
    	};
    }]);