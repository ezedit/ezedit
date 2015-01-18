require.config({
    shim : {
        'bootstrap' : { 'deps' :['jquery'] },
        'x-editable' : { 'deps' :['jquery', 'bootstrap'] }
    },
    paths: {
        'jquery': '../bower_components/jquery/dist/jquery.min',
        'underscore': '../bower_components/underscore/underscore-min',
        'bootstrap': '../bower_components/bootstrap/dist/js/bootstrap.min',
        'backbone': '../bower_components/backbone/backbone',
        'x-editable': '../bower_components/x-editable/dist/bootstrap3-editable/js/bootstrap-editable',
        'text': '../bower_components/requirejs-text/text'
    }
});

require(['jquery', 'bootstrap', 'x-editable', 'app'], function($, Bootstrap, xEditable, App){
    $.fn.editable.defaults.mode = 'inline';
    App.initialize();
});