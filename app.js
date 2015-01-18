try {
    var config = require('./config.json');
} catch (e) {
    console.log('Could not find config.json');
}

var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

var apiRoot = '/api';
var routes = require('./routes/index');
var apiRoutes = require('./routes/api');
var siteRoutes = require('./routes/site');
var loginRoutes = require('./routes/login');

var app = express();

// uncomment after placing your favicon in /public
//app.use(favicon(__dirname + '/public/favicon.ico'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use(apiRoot, apiRoutes);
app.use(apiRoot, siteRoutes);
app.use(apiRoot, loginRoutes);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.status(404).send('Not Found');
  next();
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

// set up mongoose
if (process.env.MONGOLAB_URI) {
    mongoose.connect(process.env.MONGOLAB_URI);
} else if (config.db_user && config.db_pass && config.db_uri) {
    mongoose.connect('mongodb://' + config.db_user + ':' + config.db_pass + '@' + config.db_uri);
} else {
    mongoose.connect('mongodb://test:test@localhost:5555');
}
require('./models/models');

module.exports = app;
