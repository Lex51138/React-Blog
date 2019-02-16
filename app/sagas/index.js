import {fork} from 'redux-saga/effects'
import {loginFlow, registerFlow, user_auth,login_out} from './homeSaga'
import {get_all_users_flow} from './adminManagerUsersSaga'
import {getAllTagsFlow, addTagFlow, delTagFlow} from './adminManagerTagsSaga'
import {saveArticleFlow} from './adminManagerNewArticleSaga'
import {getArticleListFlow,deleteArticleFlow,editArticleFlow} from './adminManagerArticleSaga'
import {getArticlesListFlow,getArticleDetailFlow,updateUserAvatarFlow} from './frontSaga'
import {get_reply_flow,add_reply_flow} from './replySaga'
export default function* rootSaga() {
    yield  fork(loginFlow);
    yield  fork(registerFlow);
    yield  fork(user_auth);
    yield fork(get_all_users_flow);
    yield fork(getAllTagsFlow);
    yield fork(addTagFlow);
    yield fork(delTagFlow);
    yield fork(saveArticleFlow);
    yield fork(getArticleListFlow);
    yield fork(deleteArticleFlow);
    yield fork(getArticlesListFlow);
    yield fork(getArticleDetailFlow);
    yield fork(editArticleFlow);
    yield fork(updateUserAvatarFlow);
    yield fork(login_out);
    yield fork(get_reply_flow);
    yield fork(add_reply_flow);
}
