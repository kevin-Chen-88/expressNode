/**
 * Created by Kevin on 2016/7/19.
 */
var mongoose = require('mongoose');
mongoose.connect('mongodb://127.0.0.1:27017/nodeWeb');

var userModel = require('./user');
var topicModel = require('./topic');

exports.UserModel = userModel;
exports.TopicModel = topicModel;