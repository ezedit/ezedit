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
                if (!data.isClient) {
                    router.showSites();
                } else {
                    router.showSite(data.siteId);
                }
            }).fail(function(xhr, status, errorThrown){
                window.session = undefined;
                router.showFrontPage();
            });
        };

        return {
            initialize: initialize
        };
    });