const initialState = ['首页'];

export const actionTypes = {
    GET_ALL_TAGS:"GET_ALL_TAGS",
    SET_TAGS:"RESPONSE_GET_ALL_TAGS",
    DELETE_TAG:"DELETE_TAG",
    ADD_TAG:"ADD_TAG",
    ADMIN_SET_TAGS:"ADMIN_SET_TAGS"
};

export const actions = {
    get_all_tags:function (admin) {
        return{
            type:actionTypes.GET_ALL_TAGS,
            admin
        }
    },
    delete_tag:function (name) {
        return{
            type:actionTypes.DELETE_TAG,
            name
        }
    },
    add_tag:function (data) {
        return{
            type:actionTypes.ADD_TAG,
            data
        }
    }
};

export function reducer(state=initialState,action) {
    switch (action.type){
        case actionTypes.SET_TAGS:
            return [...state,...action.data];
        case actionTypes.ADMIN_SET_TAGS:
            return [...action.data];
        default:
            return  state;
    }
}

