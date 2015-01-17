console.log('sites.js');

var express = require('express');
var router = express.Router();

/* GET sites page. */
router.get('/sites', function(req, res, next) {
  res.status(200).send("ok - sites");
});

module.exports = router;
