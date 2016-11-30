/**
 * Created by Kevin on 2016/7/20.
 */
var validator = require('validator');
var TopicModel = require('../models').TopicModel;

exports.showTopicCreate = function(req,res){
    res.render('topic/create',{title:'发表话题'});
};

exports.topicCreate = function(req,res){
    var topicTitle = validator.trim(req.body.topicTitle);
    var tab = validator.trim(req.body.tab);
    var tContent = validator.trim(req.body.tContent);

    var isEmpty = [topicTitle,tab,tContent].some(function(item){
        return item === '';
    });

    if(isEmpty){
        res.status(422);
        res.render('topic/create',{title:'发表话题',error:'您填写的信息不完整！'});
    };

    var topicData = {
        title: topicTitle,
        tab: tab,
        content: tContent,
        userName: req.session.user.userName,
        createTime: Date.now()
    };

    console.log(topicData);

    TopicModel.addTopic(topicData,function(err,result){
        if(err){
            return res.render('topic/create',{title:'发表话题',error:'话题添加失败！'});
        };
        res.render('topic/create',{title:'发表话题',success:'发表话题成功！'});
    });
};