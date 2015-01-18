var mongoose = require('mongoose');
var fieldSchema = require('./field');

var siteSchema = mongoose.Schema({
    user: mongoose.Schema.Types.ObjectId,
    name: {type: String, required: true},
    login: {type: String, required: true},
    password:  {type: String, required: true},
    fields: {type: [fieldSchema], required: false}
});

module.exports = siteSchema;
