var mongoose = require('mongoose');

var fieldSchema = mongoose.Schema({
    name: String,
    description: String,
    body: String
});

module.exports = fieldSchema;
