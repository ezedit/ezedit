define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/frontpage.html'
], function($, _, Backbone, templateText){
    var FrontPageView = Backbone.View.extend({
        tagName: 'div',
        className: 'page',

        template: _.template(templateText),

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