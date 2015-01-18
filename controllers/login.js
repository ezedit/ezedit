var passport = require('passport');

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