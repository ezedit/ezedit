var mongoose = require('mongoose');
var userSchema = require('./schemas/user');
module.exports = mongoose.model('user', userSchema);
