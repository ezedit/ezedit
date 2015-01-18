var mongoose = require('mongoose');
var fieldSchema = require('./field');

var siteSchema = mongoose.Schema({
    user: Schema.types.ObjectId,
    name: String,
    login: String,
    password: String,
    fields: [fieldSchema]
});

module.exports = siteSchema;
