define([
    'jquery',
    'underscore',
    'backbone',
    'text!/templates/field.html',
    'models/field'
], function($, _, Backbone, templateText){
    var FieldView = Backbone.View.extend({
        className: "field",

        template: _.template(templateText),

        events: {
            'keyup .field-body': 'bodyChanged',
            'click .btn-save-field': 'save'
        },

        render: function(){
            this.$el.html(this.template(this.model));
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

        bodyChanged: function() {
            if(this.model.body != this.$('.field-name').html())
                this.$('.btn-save-field').show();
        },

        save: function() {
            console.log("saved");
            this.$('.btn-save-field').hide();
        }

    });
    return FieldView;
});