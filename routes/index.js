var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/mainpage', function(req, res, next) {
  res.render('index', { title: 'Comments Section' });
});

module.exports = router;