define([
    'jquery',
    'underscore',
    'backbone',
    'models/field'
], function($, _, Backbone, Field){
    var Fields = Backbone.Collection.extend({
        model: Field
    });
    return Fields;
});