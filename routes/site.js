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
      res.send(sites);
    }
  });
});

// GET /sites/:id
router.get('/sites/:id', function(req, res, next) {
  mongoose.model('site').findOne({ _id: req.params.id }, function(err, sites) {
    if (err) {
      console.log(err);
      next();
    } else {
      res.send(sites);
    }
  });
});

// PUT /sites/:id
router.put('/sites/:id',
  passport.authenticate('local'),
  function(req, res, next) {
    mongoose.model('site').findByIdAndUpdate(req.params.id, req.body, function(err, site) {
      if (err) {
        console.log(err);
        next();
      } else {
        res.send(site);
      }
    });
});

// DELETE /sites/:id
router.delete('/sites/:id',
  passport.authenticate('local'),
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
  passport.authenticate('local'),
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
