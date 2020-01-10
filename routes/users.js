var express = require('express');
var router = express.Router();
var usersController=require('../controllers/users.js')
var multer  = require('multer')
var upload = multer({ dest: 'public/images' })
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post('/login',usersController.login);
router.post('/register',usersController.register);
router.get('/code',usersController.code);
router.get('/logout',usersController.logout);
router.get('/getuser',usersController.getuser);
router.post('/findpsd',usersController.findpsd);
router.get('/getcodeImg',usersController.getcodeImg);
router.post('/uploadImg', upload.single('file'),usersController.uploadImg);

module.exports = router;
