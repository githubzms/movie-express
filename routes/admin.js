var express = require('express');
var router = express.Router();
var adminController=require('../controllers/admin.js')

// 拦截是否是管理员
router.use((req,res,next)=>{
  if(req.session.username&&req.session.isAdmin){
      next();
  }else{
    res.send({
      msg:'无权限',
      status:-1
    })
  }
});

router.get('/',adminController.index);
router.get('/getuser',adminController.getuser)
router.post('/removeUser',adminController.removeUser)
module.exports = router;
