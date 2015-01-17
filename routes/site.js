var express = require('express');
var router = express.Router();

// GET /site
router.get('/site', function(req, res, next) {
  res.send("ok");
});

module.exports = router;
