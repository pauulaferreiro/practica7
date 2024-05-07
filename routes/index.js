var express = require('express');
var router = express.Router();

const postController = require('../controllers/post');

const multer = require('multer');
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {fileSize: 20 * 1024 * 1024}
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Blog' });
});

router.get('/author',function(req, res, next){
  res.render('author',  { title: 'Blog' });
})

router.param('postId', postController.load); //tarea 4 

router.get('/posts/:postId(\\d+)/attachment', postController.attachment); //tarea 5. nombre variable -> postId

router.get('/posts', postController.index); //tarea 6

router.get('/posts/:postId(\\d+)', postController.show); //tarea 7

router.get('/posts/new', postController.new); //tarea 8.1

router.post('/posts', upload.single('image'), postController.create); //tarea 8.2

module.exports = router;
