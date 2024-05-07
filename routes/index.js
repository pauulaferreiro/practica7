var express = require('express');
var router = express.Router();

const postController = require('../controllers/post');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blog' });
});

router.get('/author',function(req, res, next){
  res.render('author',  { title: 'Blog' });
})

router.param('postId', postController.load);

router.get('/posts/:postId(\\d+)/attachment', postController.attachment);

module.exports = router;
