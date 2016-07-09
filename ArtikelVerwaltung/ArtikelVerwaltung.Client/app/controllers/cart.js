app.controller('CartCtrl', [
    '$rootScope', '$scope', 'Cart', 
    function ($rootScope, $scope, Cart) {

    	var userId = 1;

    	$scope.carts = null;
    	$scope.selectedCart = null;

    	Cart.getAll(userId, function (carts) {
    		$scope.carts = carts;
    	});

    	$scope.cartOptions = [
			['Warenkorb bearbeiten', function ($itemScope) {
				$scope.edit($itemScope.cart);
			}],
            ['Warenkorb löschen', function ($itemScope) {
            	$scope.delete($itemScope.cart);
            }]
    	];

    	$scope.articleOptions = [
            ['Artikel löschen', function ($itemScope) {
            	$scope.removeArticle($itemScope.article);
            }]
    	];

    	$scope.getTotal = function () {
    		var total = 0;

    		$scope.articles = $scope.articles || [];

    		for (var i = 0; i < $scope.articles.length; i++) {
    			total += $scope.articles[i].price;
    		}
    		return total;
    	}

    	$scope.add = function () {
    		Cart.add(userId, function (cart) {
    			$scope.carts.push(cart);
    		});
    	};

    	$scope.edit = function (cart) {
    		Cart.update(cart, function () {

    		});
    	};

    	$scope.delete = function (cart) {
    		Cart.delete(cart, function (carts) {

    			if (cart == $scope.selectedCart)
    			{
    				$scope.articles = null;
    				$scope.selectedCart = null;
    			}

    			$scope.carts = carts;
    		});
    	};

    	$scope.removeArticle = function (article) {
    		Cart.removeArticle($scope.selectedCart, article, function (articles) {
    			$scope.articles = articles;
    		});
    	};

    	$scope.getArticles = function (cart) {

    		$scope.selectedCart = cart;

    		Cart.getArticles(cart, function (articles) {
    			$scope.articles = articles;
    		});
    	};

    }]);