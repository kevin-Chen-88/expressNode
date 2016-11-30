var express = require('express');
var router = express.Router();
var sign = require('../controllers/sign');
var topic = require('../controllers/topic');
var auth = require('../middlewares/auth');

/* 显示注册页面 */
router.get('/reg',sign.getReg);

/* 提交注册信息 */
router.post('/reg',sign.postReg);

/* 显示登录页面 */
router.get('/login',sign.getLogin);

/* 提交登录信息 */
router.post('/login',sign.postLogin);

/* 提交登出信息 */
router.get('/loginOut',sign.postLoginOut);

/* 发表话题页面 */
router.get('/topic/create',auth.requireLogin,topic.showTopicCreate);

/* 处理用户提交话题信息 */
router.post('/topic/create',auth.requireLogin,topic.topicCreate);

module.exports = router;
