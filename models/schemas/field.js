var mongoose = require('mongoose');

var fieldSchema = mongoose.Schema({
    name: {type: String, required: true},
    description: {type: String, required: true},
    body: {type: String, required: true}
});

module.exports = fieldSchema;
