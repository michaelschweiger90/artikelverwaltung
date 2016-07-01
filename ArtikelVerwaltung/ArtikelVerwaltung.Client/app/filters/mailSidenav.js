app.filter('mailSidenav', function() {
    return function(input) {
        input = input || "";
        
        var parts = input.split("@");

        return parts[0];
    };
});