import Express from 'express'

const router = Express.Router();
import Article from '../../models/article'
import {responseClient} from '../util'

router.post('/addArticle', function (req, res) {
    const {
        title,
        content,
        time,
        tags,
        coverimg,
        isPublish,
        summary
    } = req.body;
    let fmimg = `/${Math.round(Math.random() * 9 + 1)}.jpg`;//封面图片
    const author = req.session.userInfo.username;
    coverimg==undefined?"":fmimg=coverimg;//判断是否有封面图没有的话就给他随机一张
    const viewCount = 0;
    const commentCount = 0;
    let tempArticle = new Article({
        title,
        content,
        isPublish,
        viewCount,
        commentCount,
        time,
        author,
        coverImg:fmimg,
        summary,
        tags:tags.split(',')
    });
    tempArticle.save().then(data=>{
        responseClient(res,200,0,'保存成功',data)
    }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.post('/updateArticle',(req,res)=>{
    const {
        title,
        content,
        time,
        tags,
        isPublish,
        id,
        summary
    } = req.body;
    Article.update({_id:id},{title,content,time,tags:tags.split(','),isPublish,summary})
        .then(result=>{
            console.log(result);
            responseClient(res,200,0,'更新成功',result)
        }).cancel(err=>{
        console.log(err);
        responseClient(res);
    });
});

router.get('/delArticle',(req,res)=>{
    let id = req.query.id;
    Article.remove({_id:id})
        .then(result=>{
            if(result.result.n === 1){
                responseClient(res,200,0,'删除成功!')
            }else{
                responseClient(res,200,1,'文章不存在');
            }
        }).cancel(err=>{
            responseClient(res);
    })
});

module.exports = router;