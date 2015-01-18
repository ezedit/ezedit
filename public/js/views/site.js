define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/site.html',
], function($, _, Backbone, templateText){
    var SiteView = Backbone.View.extend({
        tagName: "tr",

        template: _.template(templateText),


        render: function(){
            this.$el.html(this.template(this.model.attributes));
            return this;
        },

    });
    return SiteView;
});