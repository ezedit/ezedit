define([
    'jquery',
    'underscore',
    'backbone',
    'views/frontpage',
    'views/sitespage'
], function($, _, Backbone, FrontPageView, SitesPageView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'showFrontPage',
            'sites': 'showSites',
            'site/:id': 'showSite'
        },

        showFrontPage: function(){
            this.switchPage(new FrontPageView());
        },

        showSites: function(){
            this.switchPage(new SitesPageView());
        },

        showSite: function(){
            this.switchPage(new FrontPageView());
        },

        switchPage: function(view){
            this.view && (this.view.close ? this.view.close() : this.view.remove())
            this.view = view;
            $("#content").html(view.render().el);
        }
    });

    var initialize = function(){
        var router = new AppRouter();
        Backbone.history.start();
        return router;
    };

    return {
        initialize: initialize
    };
});