var config = require('../config.json');
var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();

// GET /
router.get('/login', function(req, res, next) {
  console.log(config.salt);
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      console.log(err);
    } else {
      bcrypt.hash('helloworld', salt, function(err, hash) {
        if (err) {
          console.log(err);
        } else {
          res.send('ok - ' + hash);
        }
      });
    }
  });
});

router.get('/login/:password/:hash', function(req, res, next) {
  //req.params.password
  bcrypt.compare(req.params.password, req.params.hash, function(err, value) {
    if (err) {
      console.log(err);
    } else {
      res.send(value);
      console.log('compare: ' + value);
    }
  });
});


module.exports = router;
