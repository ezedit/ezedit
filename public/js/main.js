require.config({
   paths: {
       'jquery': '../bower_components/jquery/dist/jquery.min',
       'underscore': '../bower_components/underscore/underscore-min',
       'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
       'backbone': '../bower_components/backbone/backbone',
       'text': '../bower_components/requirejs-text/text'
   }
});

require(['jquery', 'bootstrap', 'app'], function($, Bootstrap, App){
    App.initialize();
});