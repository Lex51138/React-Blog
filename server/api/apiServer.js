/**
 * api请求server
 *
 * 0：成功
 * 1：数据不合法
 * 2：客户端数据错误
 * 3：后端错误
 */
import Express from 'express'
import config from '../../config/config'
import bodyParser from 'body-parser'
import mongoose from 'mongoose'
import cookieParser from 'cookie-parser'
import session from 'express-session'
var FileStore = require('session-file-store')(session);


const app = new Express();
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('express_react_cookie'));

var identityKey = 'skey';

app.use(session({
    name: identityKey,
    secret:'express_react_cookie',
    resave: false,
    store: new FileStore(),
    saveUninitialized: false,
    saveUninitialized:true,
    cookie: {maxAge: 60 * 30000 * 30}//过期时间
}));


//展示前台页面路由
app.use('/', require('./main'));
//管理页面路由
app.use('/admin', require('./admin'));

//连接mongodb数据库
mongoose.Promise = require('bluebird');
mongoose.connect(`mongodb://${config.dbHost}:${config.dbPort}/blog`, function (err) {
    if (err) {
        console.log(err, "数据库连接失败");
        return;
    }
    console.log('数据库连接成功');

    // app.listen(port, function (err) {
    //     if (err) {
    //         console.error('err:', err);
    //     } else {
    //         console.info(`===> api服务地址 ${port}`)
    //     }
    // });
});
module.exports = app