var bcrypt = require('bcrypt');
var express = require('express');
var router = express.Router();
var passport = require('passport');

// GET /
router.get('/login', function(req, res, next) {
  bcrypt.genSalt(10, function(err, salt) {
    if (err) {
      console.log(err);
    } else {
      bcrypt.hash('123testing', salt, function(err, hash) {
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

router.post('/login',
    passport.authenticate('local', { successRedirect: '/', failureRedirect: '/login' }),
    function(req, res, next) {
      res.send(200);
    }
);

module.exports = router;
