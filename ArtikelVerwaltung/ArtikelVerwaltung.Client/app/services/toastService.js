app.factory('Toast', function ($mdToast, $translate) {

	var defaultConfig = {
		position: 'top right',
		delay: 3000
	};

	var show = function (msg, config) {

		var c = config || defaultConfig;

		$mdToast.show(
			$mdToast.simple()
				.textContent(msg)
				.position(c.position)
				.hideDelay(c.delay)
		);
	};

	var translateAndShow = function (key, handler, config) {
		$translate(key).then(function (message) {
		    show(message, config);
		    if (handler) {
		        handler();
		    }
		}, function () {
			show(key, config);
			if (handler) {
			    handler();
			}
		});
	};

	return {
		show: show,
		translateAndShow: translateAndShow
	};
});