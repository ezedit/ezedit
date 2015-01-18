var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var passport = require('passport');

var loginCtrl = require('../controllers/login');
var sitesCtrl = require('../controllers/sites');
var usersCtrl = require('../controllers/users');

router.get('/', loginCtrl.ok); // ???
router.post('/login', passport.authenticate('local'), loginCtrl.login);
router.get('/logout', loginCtrl.logout);

router.get('/sites', sitesCtrl.getAllSites);
router.get('/sites/:id', sitesCtrl.getSite);
router.get('/sites/:id/script', sitesCtrl.getSiteScript);
router.put('/sites/:id', loginCtrl.isLoggedIn, sitesCtrl.updateSite);
router.post('/sites/:id', loginCtrl.isLoggedIn, sitesCtrl.createSite);
router.delete('/sites/:id', loginCtrl.isLoggedIn, sitesCtrl.deleteSite);

router.get('/users', usersCtrl.getAllUsers);
router.get('/users/:id', usersCtrl.getUser);
router.get('/users/:id/sites', usersCtrl.getUserSites);
router.put('/users/:id', loginCtrl.isLoggedIn, usersCtrl.updateUser);
router.delete('/users/:id', loginCtrl.isLoggedIn, usersCtrl.deleteUser);
router.post('/users', loginCtrl.isLoggedIn, usersCtrl.createUser);


// TODO: misc weird routes we should delete later
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

module.exports = router;
