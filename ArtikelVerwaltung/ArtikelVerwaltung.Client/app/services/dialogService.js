
app.factory('Dialog', function ($mdDialog, $translate) {

        var defaultConfig = {
            title: '',
            content: '',
            ok: "ok",
            cancel : "Abbrechen"
        };

        var confirm = function (obj, sucess, error) {

            var confirm = $mdDialog.confirm()
                .title(obj.title || defaultConfig.title)
                .textContent(obj.content || defaultConfig.content)
                .targetEvent(obj.ev)
                .ok(obj.ok || defaultConfig.ok)
                .cancel(obj.cancel || defaultConfig.cancel)
                .parent(angular.element(document.querySelector(obj.parent)));

            $mdDialog.show(confirm).then(function() {
                sucess();
            }, function() {
                if(error != null)
                {
                    error();
                }
            });
        };

        var custom = function(obj, success, error)
        {
            var config = {
                controller: obj.controller,
                templateUrl: obj.template,
                parent: angular.element(document.body),
                clickOutsideToClose:true
            };

            $mdDialog.show(config).then(function(data) {
                success(data);
            }, function() {
                if(error != null)
                {
                    error();
                }
            });
        };

        return {
            confirm: confirm,
            custom: custom
        };
    });