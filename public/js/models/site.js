define([
    'jquery',
    'underscore',
    'backbone',
], function($, _, Backbone){
    var Site = Backbone.Model.extend({
        defaults: {
            name: 'Untitled Field',
            description: 'No description.',
            value: 'Lorem Ipsum'
        }
    });
    return Site;
});