define([
    'jquery',
    'underscore',
    'backbone',
    'models/site'
], function($, _, Backbone, Site){
    var Sites = Backbone.Collection.extend({
        model: Site,
        url: '/api/sites'
    });
    return Sites;
});