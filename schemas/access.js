/**
 * article 表结构
 **/

import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    ip:String,//ip字符
    artlist:Array,//改ip访问过的文章id数组
})