import {put, take, call,} from 'redux-saga/effects'
import {get,post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as decisionActionTypes} from '../reducers/decision'
import Title from 'antd/lib/skeleton/Title';


export function* get_decision_flow(){
    while(true){
        let req = yield take(decisionActionTypes.GET_DECISION);
        let res = yield call(get_decision,req.userid,req.getone,req.did);
        if(res.code==0){
            if(req.getone=='1'){
                yield put({type:decisionActionTypes.UPDATE_CURRENTLIST,data:res.data})
            }
            else{
                yield put({type:decisionActionTypes.RESOLVE_GET_DECISION,data:res.data})
            }
            
        }
        else{
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
        }
    }
}
export function* get_decision(userid,getone,did){
    yield put({type:IndexActionTypes.FETCH_START});
    try{
        return yield call(get,`/decision/getDecision?userid=${userid}&getone=${getone}&did=${did}`);
    }
    catch(err){
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
    }finally{
        yield put({type: IndexActionTypes.FETCH_END});
    }
}
export function* add_decision_flow(){
    while(true){
        let req = yield take(decisionActionTypes.ADD_DECISION);
        let res = yield call(add_decision,req.data);
        if(res.code==0){
            yield put({type:decisionActionTypes.GET_DECISION,userid:res.userid});
            yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:'添加决定成功',msgType:1});
        }
        else{
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0 });
        }
    }
}
export function* add_decision(data){
    yield put({type:IndexActionTypes.FETCH_START});
    try{
        return yield call(post,'/decision/addDecision',data);
    }
    catch(err){
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    }
    finally{
        yield put({type: IndexActionTypes.FETCH_END})
    }
}
export function* update_decision_flow(){
    while(true){
        let req = yield take(decisionActionTypes.UPDATE_DECISION);
        let res = yield call(update_decision,req.did,req.list);
        if(res.code==0){
            yield put({type:decisionActionTypes.GET_DECISION,userid:res.userid});
            yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:'更改决定成功',msgType:1});
        }
        else{
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
        }
    }
}
export function* update_decision(did,list){
    yield put({type: IndexActionTypes.FETCH_START});
    try{
        return yield call(post,'/decision/updateDecision',did,list);
    }catch(err){
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    }
    finally{
        yield put({type: IndexActionTypes.FETCH_END});
    }
}

export function* update_currentlist_flow(){
    while(true){
        let req = yield take(decisionActionTypes.UPDATE_CURRENTLIST);
        yield put({type:decisionActionTypes.UPDATE_CURRENTLIST,data:req.data});
    }
}