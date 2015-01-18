var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('underscore');

module.exports.ok = function(req, res, next) {
    res.send('ok');
};

module.exports.login = function(req, res, next) {
    res.send(200);
};

module.exports.logout = function(req, res, next) {
    req.logout();
    res.send(200);
};

module.exports.isLoggedIn = function(req, res, next) {
    if(req.user)
        next();
    else
        res.send(401);
};

module.exports.getSession = function(req, res, next) {
    if(req.user) {
        // If the user is a client, get their site.
        if (req.user.isClient) {
            mongoose.model('site').findOne({ client: req.user.id }, function(err, site) {
                if (err) {
                    console.log(err);
                    next();
                } else {
                    var usr = req.user.toObject();
                    usr.siteId = site.id;
                    res.send(_.omit(usr, ['__v', 'password']));
                }
            });
        } else {
            res.send(_.omit(req.user.toObject(), ['__v', 'password']));
        }
    }
};
