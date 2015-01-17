var express = require('express');
var router = express.Router();

/* GET api page. */
router.get('/', function(req, res, next) {
  res.status(200).send("ok - api");
});

module.exports = router;
