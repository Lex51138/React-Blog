const initialState = {
    indexlist : [],
    currentlist : {
        title:"",
        itemarr:[]
    }
};

export const actionTypes = {
    'GET_DECISION':"GET_DECISION",
    "RESOLVE_GET_DECISION":"RESOLVE_GET_DECISION",
    "UPDATE_DECISION":"UPDATE_DECISION",
    "ADD_DECISION":"ADD_DECISION",
    "UPDATE_CURRENTLIST":"UPDATE_CURRENTLIST",
    "DEL_DECISION":"DEL_DECISION"
}

export const actions = {
    get_decision:(userid,getone,did)=>({
        type: actionTypes.GET_DECISION,
        userid,
        getone,
        did
    }),
    update_decision:(did,list,i)=>({
        type: actionTypes.UPDATE_DECISION,
        did,
        list,
        // i
    }),
    del_decision:(did)=>({
        type: actionTypes.DEL_DECISION,
        did
    }),
    add_decision:(data)=>({
        type: actionTypes.ADD_DECISION,
        data
    }),
    update_currentlist:(data)=>({
        type: actionTypes.UPDATE_CURRENTLIST,
        data
    })
}

export const decision = (state = initialState,action)=>{
    switch(action.type){
        case actionTypes.RESOLVE_GET_DECISION:
        return {
            ...state,
            indexlist:action.data
        };
        case actionTypes.ADD_DECISION:
        return{
            ...state,
            indexlist:state.indexlist.concat(action.data)
        };
        case actionTypes.UPDATE_CURRENTLIST:
        return{
            ...state,
            currentlist:action.data
        }

        default:
        return state;
    }

}
