let mongoose = require('mongoose');
mongoose.set('useCreateIndex',true);
let {head} =require('../untils/config.js');
let url=require('url');
let userSchaema = new mongoose.Schema({
    username: { type: String, required: true, index: { unique: true } },
    password: { type: String, required: true },
    email: { type: String, required: true, index: { unique: true } },
    date: { type: Date, default: Date.now() },
    isAdmin:{type:Boolean,default:false},
    userHead:{type:String,default:url.resolve(head.baseUrl,'logo.png')}
})

let userModel = mongoose.model('user', userSchaema);
userModel.createIndexes();
let save = (data) => {
    let user = new userModel(data);
    return user.save().then(() => {
        return true
    }).catch(() => {
        return false;
    })

}

let findLogin=(data)=>{
    return userModel.findOne(data);
}
let updatePassword=(email,password)=>{
    return userModel.update({email},{$set:{password}}).then(()=>{
        return true;
    }).catch(()=>{
        return false;
    })
}

let getuser=()=>{
    return userModel.find();
}

let removeUser=(email)=>{
    return userModel.deleteOne({email})
}

let updateImg=(username,userHead)=>{
    return userModel.update({username},{$set:{userHead}})
    .then(res=>{
        return true;
    }).catch(()=>{
        return false;
    })
}
module.exports = {
    save,
    updatePassword,
    findLogin,
    removeUser,
    getuser,
    updateImg
}