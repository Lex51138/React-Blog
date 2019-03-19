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
    itemarr=itemarr.split(',');
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
        responseClient(res,500,1,'我真的不知道你在刷你🐎');
    }
})
//删除小决定
router.get('/delDecision',(req,res)=>{
   let {did} = req.query;
   Decision.remove({'_id':did}).then(data=>{
    responseClient(res, 200, 0, 'success', data);
   }).catch(
       err=>{
        responseClient(err);
       }
   )
})
//更改小决定
router.post('/updDecision',(req,res)=>{
    let {_id,itemarr,model,repeat,title,userid} = req.body;
    itemarr=itemarr.split(',')
    //list.itemarr=list.itemarr.split(',');
    Decision.update({_id},{'title':title,'model':model,'repeat':repeat,'itemarr':itemarr}).then(data=>{
        responseClient(res, 200, 0, 'success', data);
    }).catch(err=>{
        responseClient(err);
    })
})
module.exports = router;