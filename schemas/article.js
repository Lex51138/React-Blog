/**
 * article 表结构
 **/

import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    title:String,//文章标题
    content:String,//文章内容
    viewCount:Number,//浏览次数
    commentCount:Number,//评论次数
    time:String,//发表时间
    coverImg:String,//封面图片
    author:String,//作者
    tags:Array,//标签
    isPublish:Boolean,//是否发布
    summary:String,//摘要
    total:Number,//文章总数
    Topping:Number,//是否显示为置顶
});