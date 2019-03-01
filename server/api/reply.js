import Express from 'express'
const router = Express.Router();

import Reply from '../../models/reply'
import {responseClient} from '../util'
import User from '../../models/user'
import Article from '../../models/article'
import { reply } from '../../app/reducers/reply';


//添加评论
router.post('/addReply',(req,res)=>{

    let {artid,content,userid,username,time,replyid,requsername} = req.body;
    if(req.session.userInfo){
        Reply.findOne({artid,content}).then(result=>{
            console.log(result,'cnm');
            let newReply = new Reply({
                artid,
                content,
                userid,
                username,
                time,
                replyid,
                requsername
            })
            newReply.save().then(data=>{
                Article.findOne({_id:artid}).then(result=>{
                    console.log(result);
                    Article.update({_id:artid},{commentCount:(result.commentCount+1)}).then(()=>{
                        responseClient(res, 200, 0, '评论成功', data);
                    });
                })
            }).catch((err)=>{
                responseClient(err);
            })
        })
    }
    else{
        responseClient(res,500,1,'刷你麻痹')
    }
})

//获取文章的评论
router.get('/getReply',(req,res)=>{
    let {artid} = req.query;
    let buer = true;
    let data = {};
    
    Reply.find({'artid':artid,'replyid':""}).then(result=>{ //获取父级评论
        data.replylist=[];
        data.total = result.length;
        result.forEach((items,keys) => { //遍历父级评论数据
                let replyid = items.id;//获取父级评论id
                data.replylist[keys]={};
                data.replylist[keys]._id=items.id;
                data.replylist[keys].content=items.content;
                data.replylist[keys].userid=items.userid;
                data.replylist[keys].time=items.time;
                data.replylist[keys].username=items.username;
                data.replylist[keys].replyid=items.replyid;

                User.findOne({_id:items.userid}).then(result=>{
                    data.replylist[keys].avatar=result.avatar;
                    Reply.find({'replyid':replyid}).then(result=>{ //通过父级id查找子评论
                        data.replylist[keys].childReplyList=[];//将子评论加入数据
                        result.forEach((item,key)=>{
                            data.replylist[keys].childReplyList[key] = {};
                            data.replylist[keys].childReplyList[key]._id = item._id;
                            data.replylist[keys].childReplyList[key].content = item.content;
                            data.replylist[keys].childReplyList[key].userid = item.userid;
                            data.replylist[keys].childReplyList[key].time = item.time;
                            data.replylist[keys].childReplyList[key].replyid = item.replyid;
                            data.replylist[keys].childReplyList[key].username = item.username;
                            data.replylist[keys].childReplyList[key].requsername = item.requsername;

                            User.findOne({_id:item.userid}).then(result=>{ 
                                data.replylist[keys].childReplyList[key].avatar = result.avatar;
                            })
                        })
                    })
                })
        });
    }).catch((err)=>{
        responseClient(err);
    })

   setTimeout(() => {
    console.log(data);
    responseClient(res,200,0,'sucess',data);
    return;
   },1500);
})

//删除评论
router.get('/delReply',(req,res)=>{
    let {replyid} = req.body;
    Reply.remove({'_id':replyid}).then(result=>{
        responseClient(res, 200, 0, '删除成功', result);
    }).catch(err=>{
        responseClient(err);
    })
})
module.exports = router;