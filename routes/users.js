var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var passport = require('passport');
var _ = require('underscore');

// GET /users/:id
router.get('/users/:id', function(req, res, next) {
  mongoose.model('user').findOne({ _id: req.params.id }, function(err, user) {
    if (err) {
      console.log(err);
      next();
    } else {
      res.send(_.omit(user.toObject(), ['__v', 'password']));
    }
  });
});

// GET /users/:id/sites
router.get('/users/:id/sites', function(req, res, next) {
  mongoose.model('user').find({ _id: req.params.id }, function(err, user) {
    if (err) {
      console.log(err);
      next();
    } else {
      mongoose.model('site').find({ _id: user._id }, function(err, sites) {
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
    }
  });
});

// PUT /users/:id
router.put('/users/:id',
  passport.authenticate('local'),
  function(req, res, next) {
    mongoose.model('users').findByIdAndUpdate(req.params.id, req.body, function(err, user) {
      if (err) {
        console.log(err);
        next();
      } else {
        res.send(_.omit(user.toObject(), ['__v', 'password']));
      }
    });
});

// DELETE /users/:id
router.delete('/users/:id',
  passport.authenticate('local'),
  function(req, res, next) {
    mongoose.model('user').findOneAndRemove(req.params.id, function(err, user) {
      if (err) {
        console.log(err);
        next();
      } else {
        res.status(204);
      }
    });
});

// POST /users
router.post('/users',
  passport.authenticate('local'),
  function(req, res, next) {
    var User = require('../models/user');
    var data = req.body;

    var user = new User({
      email: data.email,
      password: data.password
    });

    user.save(function(err, user) {
      if (err) {
        console.log(err);
        next();
      } else {
        res.send(_.omit(user.toObject(), ['__v', 'password']));
      }
    });
});

module.exports = router;
