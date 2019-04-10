import Express from 'express'
import Tags from '../../models/tags'
import Article from '../../models/article'
import Access from '../../models/access'
import {responseClient} from '../util'
const router = Express.Router();

router.use('/decision', require('./decision'));

router.use('/reply', require('./reply'));

router.use('/user', require('./user'));

//获取全部标签
router.get('/getAllTags', function (req, res) {
    var clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    Access.findOne({ip:clientIp}).then(result=>{
        if(result==null){
            let newAccess = new Access({
                ip:clientIp,
                artlist:[],
            })
            newAccess.save().then(result=>{});
        }
    })
    Tags.find().then(data => {
        responseClient(res, 200, 0, '请求成功', data);
    }).catch(err => {
        responseClient(res);
    })
});
//搜索文章
router.get('/searchArticles',function(req,res){
    let responseData = {};
    let keys = "/"+req.query.key+"/" || null;
    let skip = (req.query.pageNum - 1) < 0 ? 0 : (req.query.pageNum - 1) * 5;
    Article.find({'title':{ $regex: '.*' + req.query.key + '.*' }}, '_id title isPublish author viewCount commentCount time coverImg summary total tags', {
        skip: skip,
        limit: 5
    }).then(result=>{
        responseData.list = result;
        responseClient(res, 200, 0, 'success', responseData);
    }).cancel(err => {
        responseClient(res);
    })
})
//获取文章
router.get('/getArticles', function (req, res) {
    let tag = req.query.tag || null;
    let isPublish = req.query.isPublish;
    let searchCondition = {
        isPublish,
    };
    if (tag) {
        searchCondition.tags = tag;
    }
    if (isPublish === 'false') {
        searchCondition = null
    }
    let skip = (req.query.pageNum - 1) < 0 ? 0 : (req.query.pageNum - 1) * 5;
    let responseData = {
        total: 0,
        list: []
    };
    Article.count(searchCondition)
        .then(count => {
            responseData.total = count;
            Article.find(searchCondition, '_id title Topping isPublish author viewCount commentCount time coverImg summary total tags', {
                skip: skip,
                limit: 5
            }).sort({Topping:-1,time:-1}).then(result => {
                    responseData.list = result;
                    responseClient(res, 200, 0, 'success', responseData);
                }).cancel(err => {
                throw err
            })
        }).cancel(err => {
        responseClient(res);
    });
});
//获取文章详情
router.get('/getArticleDetail', (req, res) => {
    var clientIp = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
    let _id = req.query.id;
   Article.findOne({_id})
       .then(data=>{
        Access.findOne({ip:clientIp}).then(result=>{
            if(result.artlist.length==0){//如果访问数组为空 就直接添加并更改
                result.artlist.push(_id);
                const resultArr = result.artlist;
                Access.update({ip:clientIp},{artlist:resultArr}).then();
                data.viewCount = data.viewCount+1;
            }
            else{
                if(result.artlist.indexOf(_id)==-1){
                    result.artlist.push(_id);
                    const resultArr = result.artlist;
                    data.viewCount = data.viewCount+1;
                    Access.update({ip:clientIp},{artlist:resultArr}).then();
                }
                else{
                    data.viewCount = data.viewCount;
                }
            }
        }).finally(_=>{
            Article.update({_id},{viewCount:data.viewCount})
            .then(result=>{
                responseClient(res,200,0,'success',data);
            }).cancel(err=>{
                throw err;
            })
        })
       }).cancel(err => {
       responseClient(res);
   });
});
//获取访问记录
router.get('/getAccess', (req, res) => {
    Access.find().then(result=>{
        responseClient(res,200,0,'success',result);
    })
})
module.exports = router;



