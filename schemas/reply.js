/**
 * replay 表结构
 **/

import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    artid:String,//评论的文章的ID
    content:String,//评论内容
    userid:String,//评论者id
    username:String,//评论用户名
    time:String,//评论时间  
    replyid:String,//回复评论的评论的id
    requsername:String,//回复评论的用户id
});