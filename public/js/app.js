    define([
        'jquery',
        'underscore',
        'backbone',
        'router',
    ], function($, _, Backbone, Router){
        var initialize = function(){
            var router = Router.initialize();
            router.navigate('/');
        }

        return {
            initialize: initialize
        };
    });