/**
 * Created by Kevin on 2016/7/18.
 */
var UserModel = require('../models').UserModel;
var eventProxy = require('eventProxy');


exports.getReg = function(req,res){
    res.render('sign/reg',{title:'注册'});
};

exports.postReg = function(req,res){
    var ep = new eventProxy();
    ep.on('errorMsg', function (msg) {
        res.status(422);
        res.render('sign/reg',{title:'注册',error:msg});
    });
    //获取数据
    var userName = req.body.userName;
    var passWord = req.body.passWord;
    var rePassWord = req.body.rePassWord;
    var eMail = req.body.eMail;

    //校验数据
    var hasEmptyInfo = [userName,passWord,rePassWord,eMail].some(function(item){
        return item === '';
    });
    var isPassDiff = passWord !== rePassWord;
    if(hasEmptyInfo || isPassDiff){
        ep.emit('errorMsg','注册信息错误');
        return;
    }

    //保存到数据库
    UserModel.getUserByRegInfo(userName,eMail,function(err,users){
        if(err){
            ep.emit('errorMsg','获取用户信息失败！');
            return;
        };
        if(users.length > 0 ){
            ep.emit('errorMsg',users);
            return;
        };

        UserModel.addUser({userName:userName,passWord:passWord,eMail:eMail},function(err,result){
            if(result){
                res.render('sign/reg',{title:'注册',success:'恭喜您注册成功！'});
            }else{
                ep.emit('errorMsg','注册失败！');
            };
        });
    });

};

exports.getLogin = function(req,res){
    res.render('sign/login',{title:'登录'});
};

exports.postLogin = function(req,res){
    var ep = new eventProxy();
    ep.on('errorMsg', function (msg) {
        res.status(422);
        res.render('sign/login',{title:'登录',error:msg});
    });

    var loginName = req.body.loginName;
    var passWord = req.body.passWord;

    if(!loginName || !passWord){
        //res.render('sign/login',{error:'您填写的信息不完整！'});
        ep.emit('errorMsg','您填写的信息不完整！');
        return;
    };

    UserModel.getUser(loginName,passWord,function(err,user){
        if(err){
            ep.emit('errorMsg','查询数据失败！');
            return;
        };

        if(user){
            req.session.user = user;
            res.render('sign/login',{title:'登录',success:'登录成功！'});
        }else{
            res.status(422);
            ep.emit('errorMsg','用户名或者密码错误！');
        };
    });
};

exports.postLoginOut = function(req,res){
    req.session.destroy();
    res.redirect('/login');
};