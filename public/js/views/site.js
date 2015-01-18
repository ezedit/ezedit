define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/site.html',
    'models/field'
], function($, _, Backbone, templateText){
    var SiteView = Backbone.View.extend({
        className: "field",

        template: _.template(templateText),

        events: {
            'keyup .field-value': 'valueChanged',
            'click .btn-save-field': 'save'
        },

        render: function(){
            this.$el.html(this.template(this.model.attributes));
            this.$('.field-name').editable({
               success: function() {
                   console.log("Edited field name!");
               }
            });
            this.$('.field-description').editable({
               success: function() {
                   console.log("Edited field description!");
               }
            });
            return this;
        },

        valueChanged: function() {
            if(this.model.get('value') != this.$('.field-name').html())
                this.$('.btn-save-field').show();
        },

        save: function() {
            console.log("saved");
            this.$('.btn-save-field').hide();
        }

    });
    return SiteView;
});