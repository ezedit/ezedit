var mongoose = require('mongoose');
var siteSchema = require('./schemas/site');

mongoose.model('site', siteSchema);
