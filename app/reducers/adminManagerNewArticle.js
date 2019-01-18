const initialState={
    title:'',
    content:'',
    tags:[],
    id:'',
    summary:'',
    coverimg:''
};
export const actionTypes = {
    UPDATING_TITLE:"UPDATING_TITLE",
    UPDATING_CONTENT:"UPDATING_CONTENT",
    UPDATING_TAGS:"UPDATING_TAGS",
    SAVE_ARTICLE:"SAVE_ARTICLE",
    SET_ARTICLE_ID:"SET_ARTICLE_ID",
    UPDATING_SUMMARY:"UPDATING_SUMMARY",
    UPDATE_COVERIMG:"UPDATE_COVERIMG"
};
export const actions = {
    update_title:function (title) {
        return{
            type:actionTypes.UPDATING_TITLE,
            title
        }
    },
    update_content:function (content) {
        return{
            type:actionTypes.UPDATING_CONTENT,
            content
        }
    },
    update_tags:function (tags) {
        return{
            type:actionTypes.UPDATING_TAGS,
            tags
        }
    },
    save_article:function (data) {
        return{
            type:actionTypes.SAVE_ARTICLE,
            data
        }
     },
     update_summary:(summary)=>{
        return{
            type:actionTypes.UPDATING_SUMMARY,
            summary
        }
     },
     update_coverimg:(coverimg)=>{
        return{
            type:actionTypes.UPDATE_COVERIMG,
            coverimg
        }
     }
};


export function reducer(state=initialState,action) {
    switch (action.type){
        case actionTypes.UPDATING_TITLE:
            return{
                ...state,title:action.title
            };
        case actionTypes.UPDATING_CONTENT:
            return{
                ...state,content:action.content
            };
        case actionTypes.UPDATING_TAGS:
            return{
                ...state,tags:action.tags
            };
        case actionTypes.SET_ARTICLE_ID:
            return{
                ...state,id:action.id
            };
        case actionTypes.UPDATING_SUMMARY:
            return{
                ...state,summary:action.summary
            };
        case actionTypes.UPDATE_COVERIMG:
            return{
                ...state,coverimg:action.coverimg
            }
        default:
            return state;
    }
}