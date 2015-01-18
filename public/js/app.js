    define([
        'jquery',
        'underscore',
        'backbone',
        'router',
        'views/navview'
    ], function($, _, Backbone, Router, NavView){
        var initialize = function(){
            var router = Router;
            var nav = new NavView();
            $('#nav-container').html(nav.render(router.view && router.view.navOptions).el);

            $.get('/api/session').done(function(data) {
                window.session = data;
                // TODO: navigate to right page based on user type
                router.showSites();
            }).fail(function(xhr, status, errorThrown){
                window.session = undefined;
                router.showFrontPage();
            });
        };

        return {
            initialize: initialize
        };
    });