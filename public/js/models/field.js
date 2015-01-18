define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var Field = Backbone.Model.extend({
        defaults: {
            name: 'Untitled Field',
            description: 'No description.',
            body: 'Lorem Ipsum'
        }
    });
    return Field;
});