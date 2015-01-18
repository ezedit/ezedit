define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'text!/templates/frontpage.html'
], function($, _, Backbone, Router, templateText){
    var FrontPageView = Backbone.View.extend({
        tagName: 'div',
        className: 'page',

        template: _.template(templateText),

        initialize: function() {
            if(window.session)
                this.router.showSites();
        },

        navOptions: {
            'hideLogin': false,
            'hideRegister': false,
            'hideLogout': true
        },

        render: function(){
            this.$el.html(this.template());
            return this;
        }
    });
    return FrontPageView;
});