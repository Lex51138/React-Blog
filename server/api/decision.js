import Express from 'express'
const router = Express.Router();
import Decision from '../../models/decision'
import {responseClient} from '../util'

//获取用户的小决定
router.get('/getDecision',(req,res)=>{
    let{userid,getone,did} = req.query;
    if(getone=="1"){
        Decision.findOne({'_id':did}).then(data=>{
            responseClient(res, 200, 0, 'success', data);
        }).catch(err=>{
            responseClient(err);
        })
    }
    else{
        Decision.find({'userid':userid}).then(data=>{
            responseClient(res, 200, 0, 'success', data);
        }).catch(err=>{
            responseClient(err);
        })
    }
  
})
//添加小决定
router.post('/addDecision',(req,res)=>{
    let {title,model,repeat,itemarr,userid} = req.body;
    if(req.session.userInfo){
        let newDecision = new Decision({
            userid,
            title,
            itemarr,
            model,
            repeat
        })
        newDecision.save().then((data)=>{
            responseClient(res, 200, 0, 'success', data);
        }).catch(err=>{
            responseClient(err);
        })
    }
    else{
        responseClient(res,500,1,'刷你麻痹');
    }
})
//删除小决定
router.get('/delDecision',(req,res)=>{
   let {id} = req.body;
   Decision.delete({'_id':id}).then(data=>{
    responseClient(res, 200, 0, 'success', data);
   }).catch(
       err=>{
        responseClient(err);
       }
   )
})
//更改小决定
router.post('/updDecision',(req,res)=>{
    let {id,itemarr,title,repeat} = req.body;
    Decision.updateOne({'_id':id}).then(data=>{
        responseClient(res, 200, 0, 'success', data);
    }).catch(err=>{
        responseClient(err);
    })
})
module.exports = router;