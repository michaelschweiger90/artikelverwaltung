
app.controller('CartCtrl', [
    '$rootScope', '$scope', 'Cart', 
    function ($rootScope, $scope, Cart) {

    	var userId = 1;

    	$scope.carts = null;

    	Cart.getAll(userId, function (carts) {
    		$scope.carts = carts;
    	});

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
    			$scope.carts = carts;
    		});
    	};

    }]);