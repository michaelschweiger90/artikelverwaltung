/**
 * Created by Matthias Oppacher on 16.05.2016.
 */

app.factory('Cart', [
    'CartResource', 'Dialog',
    function (CartResource, Dialog) {

    	var carts = null;

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
    			console.log(data);
    			newCart.name = data;
    			console.log(newCart);
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

    			console.log(cart);
    			cart.$update({},function () {
    				handler();
    			});
    		}, function () {
    		});
    	};

    	var getNewResource = function () {
    		return new CartResource();
    	};

    	return {
    		getAll: getCarts,
			get: getCart,
    		add: add,
    		delete: deleteCart,
    		update: update,
    		getNewResource: getNewResource
    	};
    }]);