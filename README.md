# React-Blog
### 关于博客：
要毕业了总感觉该干点什么,一时兴起就弄了个博客放Github上当个作品吧哈哈哈😏

外网地址：www.lexblog.cn(正在部署)

界面不算好看凑合着吧

目前只有一些基本的功能,嘛只是一个初版DEMO还有些功能没时间开发(学校工作室太烦了)

### 项目结构 :📁
```
.
├── README.md                   //项目说明文件
├── app                         //前端源码文件夹
│   ├── components              //前端组件文件夹
│   ├── configureStore.js       //配置store文件
│   ├── containers              //前端容器组件文件夹
│   ├── fetch                   //封装get/post请求文件夹
│   ├── index.js                //APP输出文件
│   ├── lib                     //存放第三方引入文件文件夹
│   ├── reducers                //reducer文件夹，包含actions、actionTypes
│   └── sagas                   //saga文件夹,异步action处理
├── config                      
│   └── config.js               //总应用配置文件
├── modules                     //存放mongoose model文件夹
│   └── user.js                 //存放user model文件
├── package.json
├── postcss.config.js           //postcss配置文件
├── record                      //存放一些记录文件的文件夹
├── schemas                     //mongoose schema文件夹
│   └── users.js
├── server                      // server端源码文件夹
│   ├── api                     //server端 api接口文件夹
│   ├── index.js                //server启动文件
│   ├── server.js               //server文件
│   └── util.js                 //server端工具类文件
├── static                      //静态资源托管文件夹
│   └── favicon.ico
├── webpack.dev.js              //开发环境下webpack配置文件
└── webpack.prod.js             //生产环境下webpack配置文件
```

### 技术栈: 🛠

##前端

- [x] react
- [x] react-redux
- [x] react-router
- [x] redux-saga
- [x] babel
- [x] webpack
- [x] antd UI库

##后端

- [x] node
- [x] Express
- [x] Mongodb
- [x] Mongoose


## 项目运行效果
- 首页
![index](./index.gif)

- 管理员登录

![adminLogined](./record/adminLogined.gif)

- 标签管理

![amdinTag](./record/adminTag.gif)

- 文章详情
![detail](./record/checkArticleDetail.gif)

- 发文
![newArticle](./record/new_article.gif)

## 环境
```
node @8.12.0
db @3.6.4
...
别的就直接npm install 了

```
## 运行

    git clone 
    
    npm i
    
    npm start
