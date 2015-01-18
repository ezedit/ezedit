define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/site.html'
], function($, _, Backbone, templateText){
    var SiteView = Backbone.View.extend({
        template: _.template(templateText),

        render: function(){
            this.$el.html(this.template());
            return this;
        }
    });
    return SiteView;
});