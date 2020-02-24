var express = require('express');
var router = express.Router();

/* GET chat messages. */
router.get('/chat', function(req, res, next) {
  res.send('Hello World');
});


module.exports = router;
