import Express from 'express'
const router = Express.Router();
import User from '../../models/user'
import {MD5_SUFFIX,responseClient,md5} from '../util'

/**
 *定义回复模板
 */


router.post('/login', (req, res) => {
    let {username, password} = req.body;
    if (!username) {
        responseClient(res, 400, 2, '用户名不可为空');
        return;
    }
    if (!password) {
        responseClient(res, 400, 2, '密码不可为空');
        return;
    }
    User.findOne({
        username,
        password: md5(password + MD5_SUFFIX)
    }).then(userInfo => {
        if (userInfo) {
            //登录成功
            let data = {};
            data.username = userInfo.username;
            data.userType = userInfo.type;
            data.userId = userInfo._id;
            data.avatar = userInfo.avatar;
            //登录成功后设置session
            req.session.userInfo = data;

            responseClient(res, 200, 0, '登录成功', data);
            return;
        }
        responseClient(res, 400, 1, '用户名密码错误');

    }).catch(err => {
        responseClient(res);
    })
});


router.post('/register', (req, res) => {
    let {userName, password, passwordRe} = req.body;
    if (!userName) {
        responseClient(res, 400, 2, '用户名不可为空');
        return;
    }
    if (!password) {
        responseClient(res, 400, 2, '密码不可为空');
        return;
    }
    if (password !== passwordRe) {
        responseClient(res, 400, 2, '两次密码不一致');
        return;
    }
    //验证用户是否已经在数据库中
    User.findOne({username: userName})
        .then(data => {
            if (data) {//如果存在
                responseClient(res, 200, 1, '用户名已存在');
                return;
            }
            //用户不存在
            //保存到数据库
            let user = new User({
                username: userName,
                password: md5(password + MD5_SUFFIX),//MD5+随机字符串加密
                type: 'user',
                avatar:''
            });
            user.save()
                .then(function () {
                    User.findOne({username: userName})
                        .then(userInfo=>{
                            let data = {};
                            data.username = userInfo.username;
                            data.userType = userInfo.type;
                            data.userId = userInfo._id;
                            data.avatar = userInfo.avatar;
                            responseClient(res, 200, 0, '注册成功', data);
                            return;
                        });
                })
        }).catch(err => {
        responseClient(res);
        return;
    });
});

//用户验证
router.get('/userInfo',function (req,res) {
    if(req.session.userInfo){
        responseClient(res,200,0,'',req.session.userInfo)
    }else{
        responseClient(res,200,1,'请重新登录',req.session.userInfo)
    }
});

//更换用户头像
router.post('/useravatar',(req,res)=>{
    const {uid,avatar} = req.query;
    console.log(uid,avatar);
    User.update({_id:uid},{avatar:avatar}).then(
        User.findOne({_id:uid}).then(
            (result)=>{
                responseClient(res,200,0,'更换头像成功',result)
            }
        )
    ).catch(err=>{
        responseClient(res);
        return;
    });
   
})
router.get('/logout',function (req,res) {
    req.session.destroy();
    res.redirect('/');
});

module.exports = router;