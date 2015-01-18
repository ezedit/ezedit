var mongoose = require('mongoose');
var _ = require('underscore');

module.exports.getAllSites = function(req, res, next) {
    mongoose.model('site').find(function(err, sites) {
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
};

module.exports.getSite = function(req, res, next) {
    mongoose.model('site').findOne({ _id: req.params.id }, function(err, site) {
        if (err) {
            console.log(err);
            next();
        } else {
            res.send(_.omit(site.toObject(), ['__v', 'password']));
        }
    });
};

module.exports.getSiteScript = function(req, res, next) {
    mongoose.model('site').findOne({ _id: req.params.id }, function(err, site) {
        if (err) {
            console.log(err);
            next();
        } else {
            var content = _.omit(site.toObject(), ['__v', 'password']);
            console.log(content);
            var script = 'var content = {';
            script += 'name: ' + content.name + ', ';
            script += 'login: ' + content.login;

            if (content.fields !== undefined && content.fields.length !== 0) {
                script +=', fields: [';

                content.fields.forEach(function(element) {
                    script += '{';
                    script += 'name: ' + element.name + ', ';
                    script += 'description: ' + element.name + ', ';
                    script += 'body: ' + element.body;
                    script += '},';
                });

                // remove trailing comma
                script = script.slice(0, -1);
                script += ']';
            }

            script += '};';
            res.status(200).send(script);
        }
    });
};

module.exports.updateSite = function(req, res, next) {
    mongoose.model('site').findByIdAndUpdate(req.params.id, req.body, function(err, site) {
        if (err) {
            console.log(err);
            next();
        } else {
            res.send(_.omit(site.toObject(), ['__v', 'password']));
        }
    });
};

module.exports.deleteSite = function(req, res, next) {
    mongoose.model('site').findOneAndRemove(req.params.id, function(err, site) {
        if (err) {
            console.log(err);
            next();
        } else {
            res.status(204);
        }
    });
};

module.exports.createSite = function(req, res, next) {
    var Site = require('../models/site');
    var data = req.body;

    var site = new Site({
        name: data.name,
        login: data.login,
        password: data.password,
        fields: data.fields
    });

    site.save(function(err, site) {
        if (err) {
            console.log(err);
            next();
        } else {
            res.send(site);
        }
    });
};