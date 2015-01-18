var mongoose = require('mongoose');

var userSchema = mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    isClient: {type: Boolean, required: true}
});

module.exports = userSchema;
