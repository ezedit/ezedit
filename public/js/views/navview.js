define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/nav.html'
], function($, _, Backbone, templateText){
    var NavView = Backbone.View.extend({
        tagName: 'div',

        template: _.template(templateText),

        render: function(navOptions){
            this.$el.html(this.template());
            if(navOptions){
                if(navOptions.hideLogin)
                    this.$('#nav-login').hide();
                if(navOptions.hideRegister)
                    this.$('#nav-register').hide();
                if(navOptions.hideLogout)
                    this.$('#nav-logout').hide();
            }
            return this;
        }
    });
    return NavView;
});