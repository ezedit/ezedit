var mongoose = require('mongoose');
var siteSchema = require('./schemas/site');

module.exports = mongoose.model('site', siteSchema);
