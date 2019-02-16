const initialState = {
    replylist: [],
    pageNum: 1,
    total:0
};
export const actionsTypes = {
    'GET_ALL_REPLY': "GET_ALL_REPLY",
    'RESOLVE_GET_ALL_REPLY': "RESOLVE_GET_ALL_REPLY",
    'UPDATE_PAGENUM':'UPDATE_PAGENUM',
    "ADD_REPLY":"ADD_REPLY"
};

export const actions = {
    get_all_reply: (artid) => {
        return {
            type: actionsTypes.GET_ALL_REPLY,
            artid
        }
    },
    update_pageNum:(pageNum)=>{
        return{
            type:actionsTypes.UPDATE_PAGENUM,
            pageNum
        }
    },
    add_reply:(data)=>{
        return{
            type:actionsTypes.ADD_REPLY,
            data
        }
    }
};

export function reply(state = initialState, action) {
    switch (action.type) {
        case actionsTypes.RESOLVE_GET_ALL_REPLY:
            return {
                ...state,
                replylist: action.data.replylist,
                total:action.data.total
            };
            case actionsTypes.UPDATE_PAGENUM:
            return {
                ...state,pageNum:action.PageNum
            };
        default:
            return state;

    }
}