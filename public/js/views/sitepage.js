define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/sitepage.html'
], function($, _, Backbone, templateText){
    var SitePageView = Backbone.View.extend({
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
    return SitePageView;
});