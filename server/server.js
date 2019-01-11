import path from 'path'
import Express from 'express'
import favicon from 'serve-favicon'
import httpProxy from 'http-proxy'
import compression from 'compression'
import config from '../config/config'
import connectHistoryApiFallback from 'connect-history-api-fallback'


const app = new Express();
const port = config.port;


//原本想另起一个服务处理api请求的。。端口一直被占用就算了 反正也没什么人访问 服务器无压力QAQ

// const proxy = httpProxy.createProxyServer({//反向代理API请求
//     target: targetUrl,
//     changeOrigin: true, // 改变来源为当前主机
//   secure: false // 信任不安全的证书
// })

// proxy.on('error', function (err, req, res) {// 捕获异常
//     res.writeHead(500, {
//         'Content-Type': 'text/plain'
//     });
//     res.end('Something went wrong. And we are reporting a custom error message.');
//     console.log(`代理api服务时异常 错误信息：${err}`);
//     return;
//     console.log(`反向代理api服务成功! api server 地址：${targetUrl}`);
// });

//开启gzip
app.use(compression());
//加载静态资源
app.use('/', connectHistoryApiFallback());
app.use('/', Express.static(path.join(__dirname, "..", 'build')));
app.use('/', Express.static(path.join(__dirname, "..", 'static')));


app.use(compression());
app.use(favicon(path.join(__dirname, '..', 'static', 'favicon.ico')));

//处理api请求
app.use('/api',require('./api/apiServer'));



//热更新
if (process.env.NODE_ENV !== 'production') {
    console.log(`开发模式热更新启动`);
    const Webpack = require('webpack');
    const WebpackDevMiddleware = require('webpack-dev-middleware');
    const WebpackHotMiddleware = require('webpack-hot-middleware');
    const webpackConfig = require('../webpack.dev');

    const compiler = Webpack(webpackConfig);

    app.use(WebpackDevMiddleware(compiler, {
        publicPath: '/',
        stats: { colors: true },
        lazy: false
    }));
    app.use(WebpackHotMiddleware(compiler));
}

//监听挂起
app.listen(port, (err) => {
    if (err) {
        console.error(err)
    } else {
        console.log(`api地址端口${port}`);
    }
});