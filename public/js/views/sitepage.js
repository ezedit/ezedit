define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/sitepage.html',
    'views/site',
    'models/field'
], function($, _, Backbone, templateText, SiteView, Field){
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
            var testField = {
                name: 'Bio',
                description: 'Your main biography that talks about your life story and why you are cool.',
                value: 'TODO: write bio'
            }
            for(var k=0;k<5;k++)
            {
                var siteView = new SiteView({model: new Field(testField)});
                this.$('#fields-container').append(siteView.render().el);
            }
            return this;
        }
    });
    return SitePageView;
});