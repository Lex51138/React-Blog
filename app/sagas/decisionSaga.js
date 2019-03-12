import {put, take, call, select} from 'redux-saga/effects'
import {get} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionTypes as decisionActionTypes} from '../reducers/decision'
import Title from 'antd/lib/skeleton/Title';


export function* get_decision_flow(){
    while(true){
        let req = yield take(decisionActionTypes.GET_DECISION);
        let res = yield call(get_decision,req.userid);
        if(res.code==0){
            yield put({type:ReplyActionTypes.RESOLVE_GET_DECISION,data:res.data})
        }
        else{
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
        }
    }
}
export function* get_decision(userid){
    yield put({type:IndexActionTypes.FETCH_START});
    try{
        return yield call(get,'/decision/getDecision',userid);
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
        let res = yield call(add_reply,req.data);
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
export function* update_reply_flow(){
    while(true){
        let req = yield take(decisionActionTypes.UPDATE_DECISION);
        let res = yield call(update_reply,req.did,req.list);
        if(res.code==0){
            yield put({type:decisionActionTypes.GET_DECISION,userid:res.userid});
            yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:'更改决定成功',msgType:1});
        }
        else{
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
        }
    }
}
export function* update_reply(did,list){
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