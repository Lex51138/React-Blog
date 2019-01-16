/**
 * replay 表结构
 **/

import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    artid:String,//评论的文章的ID
    content:String,//评论内容
    userid:String,//评论者id
    time:String,//评论时间  
    reuid:String,//回复评论的评论的id
});