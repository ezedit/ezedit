var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('underscore');

// GET /sites
router.get('/sites', function(req, res, next) {
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
});

// GET /sites/:id
router.get('/sites/:id', function(req, res, next) {
  mongoose.model('site').findOne({ _id: req.params.id }, function(err, site) {
    if (err) {
      console.log(err);
      next();
    } else {
      res.send(_.omit(site.toObject(), ['__v', 'password']));
    }
  });
});

// GET /sites/:id/script
router.get('/sites/:id/script', function(req, res, next) {
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
});

// PUT /sites/:id
router.put('/sites/:id',
  // passport.authenticate('local'),
  function(req, res, next) {
    mongoose.model('site').findByIdAndUpdate(req.params.id, req.body, function(err, site) {
      if (err) {
        console.log(err);
        next();
      } else {
        res.send(_.omit(site.toObject(), ['__v', 'password']));
      }
    });
});

// DELETE /sites/:id
router.delete('/sites/:id',
  // passport.authenticate('local'),
  function(req, res, next) {
    mongoose.model('site').findOneAndRemove(req.params.id, function(err, site) {
      if (err) {
        console.log(err);
        next();
      } else {
        res.status(204);
      }
    });
});

// POST /site
router.post('/sites',
  // passport.authenticate('local'),
  function(req, res, next) {
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
});

module.exports = router;
