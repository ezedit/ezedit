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

        initialize: function(){
            var testField = {
                name: 'Bio',
                description: 'Your main biography that talks about your life story and why you are cool.',
                value: 'TODO: write bio'
            }
            this.collection = new Fields();
            for(var k=0;k<5;k++)
            {
                this.collection.push(new Field(testField));
            }
        },

        render: function(){
            this.$el.html(this.template());
            for(var k=0;k<this.collection.length;k++)
            {
                var siteView = new FieldView({model: this.collection.at(k)});
                this.$('#fields-container').append(siteView.render().el);
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
            this.$('.btn-new-field').show();
            this.$('#new-field').hide();

            var newField = new Field({
                name: e.target.elements['fieldName'].value,
                description: e.target.elements['fieldDescription'].value,
                value: e.target.elements['fieldValue'].value
            })

            // TODO: create on server
            this.collection.unshift(newField);

            this.render();
        }
    });
    return SitePageView;
});