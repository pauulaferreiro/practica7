var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blog' });
});

router.get('/author',function(req, res, next){
  res.render('author',  { title: 'Blog' });
})

module.exports = router;
