import Express from 'express'
const router = Express.Router();
import Decision from '../../models/decision'
import {responseClient} from '../util'

//获取用户的小决定
router.get('/getDecision',(req,res)=>{

})
//添加小决定
router.post('/addDecision',(req,res)=>{

})
//删除小决定
router.get('/delDecision',(req,res)=>{
   
})
//更改小决定
router.post('/delDecision',(req,res)=>{
   
})
module.exports = router;