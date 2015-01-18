    define([
        'jquery',
        'underscore',
        'backbone',
        'router',
        'views/navview'
    ], function($, _, Backbone, Router, NavView){
        var initialize = function(){
            var router = Router.initialize();
            var nav = new NavView();
            $('#nav-container').html(nav.render(router.view && router.view.navOptions).el);
            router.on('route', function(){
                $('#nav-container').html(nav.render(router.view && router.view.navOptions).el);
            });
        };

        return {
            initialize: initialize
        };
    });