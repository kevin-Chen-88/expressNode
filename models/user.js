/**
 * Created by Kevin on 2016/7/18.
 */
var mongoose = require('mongoose');
var UserSchema = new mongoose.Schema({
    userName:String,
    passWord:String,
    eMail:String
});

UserSchema.statics.getUserByRegInfo = function(userName,eMail,callback){
    var cond = {'$or':[{userName:userName},{eMail:eMail}]};
    this.find(cond,callback);
};

UserSchema.statics.addUser = function(user,callback){
    this.create(user,callback);
};

UserSchema.statics.getUser = function(userName,passWord,callback){
    this.findOne({userName:userName,passWord:passWord},callback);
};

module.exports = mongoose.model('User',UserSchema);