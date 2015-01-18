var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// GET /sites
router.get('/sites', function(req, res) {
  mongoose.model('site').find(function(err, sites) {
    if (err) {
      console.log(err);
    } else {
      res.send(sites);
    }
  });
});

// GET /sites/:id
router.get('/sites/:id', function(req, res) {
  mongoose.model('site').findOne({ _id: req.params.id }, function(err, sites) {
    if (err) {
      console.log(err);
    } else {
      res.send(sites);
    }
  });
});

// PUT /sites/:id
router.put('/sites/:id', function(req, res) {
  // @TODO: add param verification
  mongoose.model('site').findByIdAndUpdate(req.params.id, req.body, function(err, site) {
    if (err) {
      console.log(err);
    } else {
      res.send(site);
    }
  });
});

// POST /site
router.post('/sites', function(req, res) {
  var Site = require('../models/site');
  var data = req.body;

  // @TODO: add param verification
  var site = new Site({
    name: data.name,
    login: data.login,
    password: data.password,
    fields: data.fields
  });

  site.save(function(err, site) {
    if (err) {
      console.log(err);
    } else {
      res.send(site);
    }
  });
});

module.exports = router;
