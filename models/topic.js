/**
 * Created by Kevin on 2016/7/20.
 */
var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var topicSchema = new Schema({
    title: { type:String ,required:true},
    tab: { type:String ,required:true},
    content: { type: String, default: '' ,required:true},
    userName: { type:String },
    createTime: { type: Date, default: Date.now }
});

topicSchema.statics.addTopic = function(topicData,callback){
    this.create(topicData,callback);
};

module.exports = mongoose.model('topic',topicSchema);