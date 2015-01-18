define([
    'jquery',
    'underscore',
    'backbone',
    'router',
    'text!/templates/sitepage.html',
    'views/field',
    'models/field',
    'models/fields'
], function($, _, Backbone, Router, templateText, FieldView, Field, Fields){
    var SitePageView = Backbone.View.extend({
        tagName: 'div',
        className: 'page',

        template: _.template(templateText),

        events: {
            'click .btn-new-field': 'newField',
            'submit #new-field form': 'createField'
        },

        navOptions: {
            'hideLogin': true,
            'hideRegister': true,
            'hideLogout': false
        },

        initialize: function(opt){
            var self = this;
            this.router = opt.router;
            this.siteId = opt.siteId;

            $.get('/api/sites/'+this.siteId).done(function(data) {
                self.site = data;
                self.render();
            }).fail(function(){
               console.log("Failed to get site");
            });
        },

        render: function(){
            this.$el.html(this.template({siteId: this.siteId}));
            if(this.site)
            {
                for(var k=0;k<this.site.fields.length;k++)
                {
                    var fieldView = new FieldView({model: this.site.fields[k], site: this.site, siteId: this.siteId, parent: this});
                    this.$('#fields-container').append(fieldView.render().el);
                }
            }
            if (window.session.isClient) {
                this.$('.btn-new-field').hide();
            }
            return this;
        },

        newField: function(e){
            e.preventDefault();
            this.$('.btn-new-field').hide();
            this.$('#new-field').show();
            this.$('#new-field form')[0].reset();
            this.$('#new-field form input')[0].focus();
        },

        createField: function(e){
            e.preventDefault();
            var self = this;

            var newField = {
                name: e.target.elements['fieldName'].value,
                description: e.target.elements['fieldDescription'].value,
                body: e.target.elements['fieldBody'].value
            };


            this.site.fields.unshift(newField);

            $.ajax({
                type: "PUT",
                url: '/api/sites/'+this.siteId,
                data: JSON.stringify(this.site),
                dataType: 'json',
                contentType: 'application/json'
            }).done(function(data){
                self.site = data;
                self.$('.btn-new-field').show();
                self.$('#new-field').hide();
                self.render();
            }).fail(function() {
                console.log("failed to update site fields");
            });
        }
    });
    return SitePageView;
});