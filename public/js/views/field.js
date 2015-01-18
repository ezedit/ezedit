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

        initialize: function(opt) {
            this.site = opt.site;
            this.siteId = opt.siteId;
            this.parent = opt.parent;

        },

        render: function(){
            this.$el.html(this.template(this.model));
            //this.$('.field-name').editable({
            //   success: function() {
            //       console.log("Edited field name!");
            //   }
            //});
            //this.$('.field-description').editable({
            //   success: function() {
            //       console.log("Edited field description!");
            //   }
            //});
            return this;
        },

        bodyChanged: function() {
            if(this.model.body != this.$('.field-name').html())
                this.$('.btn-save-field').show();
        },

        save: function() {
            var self = this;
            this.model.body = this.$('.field-body').val();
            $.ajax({
                type: "PUT",
                url: '/api/sites/'+this.siteId,
                data: JSON.stringify(this.site),
                dataType: 'json',
                contentType: 'application/json'
            }).done(function(data){
                self.parent.site = self.site = data;
                self.$('.btn-new-field').show();
                self.$('#new-field').hide();
                self.parent.render();
            }).fail(function() {
                console.log("failed to update site fields");
            });
            this.$('.btn-save-field').hide();
        }

    });
    return FieldView;
});