var mongoose = require('mongoose');
var userSchema = require('./schemas/user');
var siteSchema = require('./schemas/site');

mongoose.model('user', userSchema);
mongoose.model('site', siteSchema);
