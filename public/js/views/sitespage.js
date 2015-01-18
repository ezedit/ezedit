define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/sitespage.html',
    'models/site',
    'models/sites',
    'views/site'
], function($, _, Backbone, templateText, Site, Sites, SiteView){
    var SitesPageView = Backbone.View.extend({
        tagName: 'div',
        className: 'page',

        template: _.template(templateText),

        events: {
            'click #btn-create-site': 'submitForm',
            'submit #newSiteModal form': 'createSite'
        },

        navOptions: {
            'hideLogin': true,
            'hideRegister': true,
            'hideLogout': false
        },

        initialize: function(opt){
            var self = this;
            self.router = opt.router;
            $.get('/api/users/'+window.session._id+'/sites').done(function(data) {
                self.sites = new Sites();
                _.each(data, function(s){
                   self.sites.push(new Site(s));
                });
                self.render.bind(self)();
            })
        },

        render: function(){
            this.$el.html(this.template());
            if(this.sites) {
                this.sites.each(function (site) {
                    this.$('#sites-table').append(new SiteView({model: site}).render().el)

                });
            }
            return this;
        },

        submitForm: function() {
            this.$('#real-btn-create-site').click();
        },

        createSite: function() {
            var self = this;
            var formEls = $('#newSiteModal form')[0].elements
            var data = {
                name: formEls['siteName'].value,
                login: formEls['siteLogin'].value,
                password: formEls['sitePassword'].value,
                fields: []
            };
            $.ajax({
                type: "POST",
                url: '/api/sites',
                data: JSON.stringify(data),
                dataType: 'json',
                contentType: 'application/json'
            }).done(function(data){
                self.router.showSite(data._id);
            }).fail(function() {
                console.log("failed to create new site");
            });
        },

        newSite: function(){

        }
    });
    return SitesPageView;
});