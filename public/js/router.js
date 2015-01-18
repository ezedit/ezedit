define([
    'jquery',
    'underscore',
    'backbone',
    'views/frontpage',
    'views/sitespage',
    'views/sitepage'
], function($, _, Backbone, FrontPageView, SitesPageView, SitePageView){
    var AppRouter = Backbone.Router.extend({
        routes: {
            '': 'showFrontPage',
            'sites': 'showSites',
            'sites/:id': 'showSite'
        },

        showFrontPage: function(){
            if(window.session)
                this.showSites();
            else
            {
                this.switchPage(new FrontPageView({router: this}));
                this.navigate('');
            }
        },

        showSites: function(){
            if(!window.session)
                this.showFrontPage();
            else {
                this.switchPage(new SitesPageView({router: this}));
                this.navigate('sites');
            }
        },

        showSite: function(id){
            if(!window.session)
                this.showFrontPage();
            else {
                this.switchPage(new SitePageView({router: this, siteId: id}));
                this.navigate('sites/' + id);
            }
        },

        switchPage: function(view){
            this.view && (this.view.close ? this.view.close() : this.view.remove())
            this.view = view;
            $("#content").html(view.render().el);
            Backbone.trigger('page-switch');
        }
    });

    var router = new AppRouter();

    Backbone.history.start();
    return router;
});