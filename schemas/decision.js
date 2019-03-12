/**
 * decision 表结构
 **/

import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    userid:String,//用户id
    title:String,//决定标题
    itemarr:String,//决定事项数组
    model:Number,//模板类型
    repeat:Number,//是否重复抽取
});