/**
 * 用户的表结构
 */
import mongoose from 'mongoose'

module.exports = new mongoose.Schema({
    username:String,
    password:String,
    site:String,//用户站点
    type:String,//管理员、弟弟用户、普通用户
    Avatar:String//用户头像

});


