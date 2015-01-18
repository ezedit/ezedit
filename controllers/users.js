var mongoose = require('mongoose');
var bcrypt = require('bcrypt');
var _ = require('underscore');

module.exports.getAllUsers = function(req, res, next) {
    mongoose.model('user').find(function(err, users) {
        if (err) {
            console.log(err);
            next();
        } else {
            // Remove the users password from the display
            var ret = [];
            users.forEach(function(element) {
                ret.push(_.omit(element.toObject(), ['__v', 'password']));
            });
            res.send(ret);
        }
    });
};

module.exports.getUser = function(req, res, next) {
    mongoose.model('user').findOne({ _id: req.params.id }, function(err, user) {
        if (err) {
            console.log(err);
            next();
        } else {
            res.send(_.omit(user.toObject(), ['__v', 'password']));
        }
    });
};

module.exports.getUserSites = function(req, res, next) {
    mongoose.model('user').find({ _id: req.params.id }, function(err, user) {
        if (err) {
            console.log(err);
            next();
        } else {
            mongoose.model('site').find({ _id: user._id }, function(err, sites) {
                if (err) {
                    console.log(err);
                    next();
                } else {
                    // Remove the users password from the display
                    var ret = [];
                    sites.forEach(function(element) {
                        ret.push(_.omit(element.toObject(), ['__v', 'password']));
                    });

                    res.send(ret);
                }
            });
        }
    });
};

module.exports.updateUser = function(req, res, next) {
    mongoose.model('user').findByIdAndUpdate(req.params.id, req.body, function(err, user) {
        if (err) {
            console.log(err);
            next();
        } else {
            res.send(_.omit(user.toObject(), ['__v', 'password']));
        }
    });
};

module.exports.deleteUser = function(req, res, next) {
    // TODO: acts weird, doesn't delete right user?
    mongoose.model('user').findOneAndRemove(req.params.id, function(err, user) {
        if (err) {
            console.log(err);
            next();
        } else {
            res.status(204);
        }
    });
};

module.exports.createUser = function(req, res, next) {
    var User = require('../models/user');
    var data = req.body;

    bcrypt.genSalt(10, function(err, salt) {
        if (err) {
            console.log(err);
        } else {
            bcrypt.hash(data.password, salt, function(err, hash) {
                if (err) {
                    console.log(err);
                } else {
                    var user = new User({
                        email: data.email,
                        password: hash
                    });

                    user.save(function(err, user) {
                        if (err) {
                            console.log(err);
                            next();
                        } else {
                            res.send(_.omit(user.toObject(), ['__v', 'password']));
                        }
                    });
                }
            });
        }
    });
};
