import {put, take, call, fork} from 'redux-saga/effects'
import {get, post} from '../fetch/fetch'
import {actionsTypes as IndexActionTypes} from '../reducers'
import {actionsTypes as ReplyActionTypes} from '../reducers/reply'


export function* add_reply_flow(){
    while(true){
        let req = yield take (ReplyActionTypes.ADD_REPLY);
        if (req.data.content === '') {
            yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '请输入评论内容', msgType: 0});
            return;
        }
            let res = yield call(add_reply,req.data);
            if(res.code === 0){
                yield put({type: ReplyActionTypes.GET_ALL_REPLY,artid:req.data.artid});
                yield put({type:IndexActionTypes.SET_MESSAGE,msgContent:'评论成功',msgType:1});
            }
            else {
                yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
            }
    }
}

export function* add_reply(data){
    yield put({type: IndexActionTypes.FETCH_START});
    try{
        return yield call(post,`/reply/addReply`,data)
    }catch(err){
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    }finally{
        yield put({type: IndexActionTypes.FETCH_END})
    }
}

export function* get_reply_flow(){
    while(true){
       let req = yield take(ReplyActionTypes.GET_ALL_REPLY)
       let res = yield call(get_reply,req.artid);
       if(res.code===0){
            yield put({type:ReplyActionTypes.RESOLVE_GET_ALL_REPLY,data:res.data})
       }
       else{
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: res.message, msgType: 0});
       }
    }
}

export function* get_reply(artid){
    yield put({type: IndexActionTypes.FETCH_START});
    try{
        return yield call(get,`/reply/getReply?artid=${artid}`)
    }catch(err){
        yield put({type: IndexActionTypes.SET_MESSAGE, msgContent: '网络请求错误', msgType: 0});
    }finally{
        yield put({type: IndexActionTypes.FETCH_END})
    } 
}