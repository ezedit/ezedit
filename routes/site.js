var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// GET /site
router.get('/site', function(req, res, next) {
  mongoose.model('site').find(function(err, sites) {
    if (err) {
      console.log(err);
    } else {
      res.send(sites);
    }
  });
});

// GET /site/:id
router.get('/site/:id', function(req, res, next) {
  mongoose.model('site').findOne({ _id: req.params.id }, function(err, sites) {
    if (err) {
      console.log(err);
    } else {
      res.send(sites);
    }
  });
});

// PUT /site/:id
router.put('/site/:id', function(req, res, next) {
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
router.post('/site', function(req, res, next) {
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
