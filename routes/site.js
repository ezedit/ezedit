var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');

// GET /site
router.get('/site', function(req, res, next) {
  mongoose.model('site').find(function(err, sites) {
    if (err) {
      console.log('Error: ' + err);
    }

    res.send(sites);
  });
});

// GET /site/:id
router.get('/site/:id', function(req, res, next) {
  mongoose.model('site').findById(req.params.id, function(err, sites) {
    if (err) {
      console.log('Error: ' + err);
    }

    res.send(sites);
  });
});

module.exports = router;
