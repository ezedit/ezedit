define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/sitespage.html'
], function($, _, Backbone, templateText){
    var SitesPageView = Backbone.View.extend({
        tagName: 'div',
        className: 'page',

        template: _.template(templateText),

        navOptions: {
            'hideLogin': true,
            'hideRegister': true,
            'hideLogout': false
        },

        render: function(){
            this.$el.html(this.template());
            return this;
        }
    });
    return SitesPageView;
});