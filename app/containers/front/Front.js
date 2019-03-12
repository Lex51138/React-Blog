import React,{Component,PropTypes} from 'react'
import { BackTop, Col, Layout, Row} from 'antd'
import {connect} from 'react-redux'
import {Detail} from '../detail'
import decision from '../decision/Decision'
import {Home} from '../home'
import style from './style.less'
import {
    Switch,
    Route
} from 'react-router-dom'
import Menus from "../components/menu/Menus";

import {bindActionCreators} from 'redux'
import {actions} from '../../reducers/adminManagerTags'
import {actions as FrontActinos} from '../../reducers/frontReducer'
import Login from "../home/components/login/Login";
import {Logined} from "../home/components/logined/Logined";
import WidthMe from "../widthMe/WidthMe"
import {actions as IndexActions} from '../../reducers/index'
import Identicon from 'identicon.js';
const {get_all_tags} = actions;
const {get_article_list,update_user_avatar} = FrontActinos;
const {Content} = Layout
var $ = require('jquery');
window.$ = $;

import Footer from './Footer'

class Front extends Component{
    constructor(props){
        super(props);
    }
    onChangeClick = (e,uid)=>{
        const input = e.target;// 保留input
        const update_avatar = this.props.update_avatar//保留更改头像方法


        var f=input.files[0];
        var formData=new FormData();
        formData.append('smfile',f);

        $.ajax({
            url: 'https://sm.ms/api/upload',
            type: 'POST',
            success: function (data) {
                update_avatar(input.id,data.data.url);
            },
            error: function (data) {
                console.log(data);
            },

            data: formData,
            cache: false,
            contentType: false,
            processData: false
        })
        }
    LoginOut = ()=>{
        this.props.login_out();   
    }
    render(){
        const {url} = this.props.match;
        const {login, register} = this.props;
        let hash,data; 
        if(this.props.userInfo.userId==''||this.props.userInfo.userId==undefined){}
        else{
            hash = this.props.userInfo.userId;
            data = new Identicon(hash).toString()
        }
        this.props.userInfo.avatar==""?this.props.userInfo.avatar=`data:image/png;base64,${data}`:"";
        let total;
        this.props.total.length>0?total = this.props.total[0].total:total=0;
        return(
            <Layout>
             <BackTop />
              <Menus getArticleList={(tag)=>this.props.get_article_list(tag,1)} categories={this.props.categories} history={this.props.history}/>
            <Layout>
             <Content>
                <Row >
                <Col xs={1} sm={1} md={1} lg={1} xl={3} xxl={5} />
                <Col className = 'body_box' xs={22} sm={22} md={22} lg={20} xl={18} xxl={14}>
                    <Row type="flex">
                    <Col 
                        xs={24}
                        sm={24}
                        md={24}
                        lg={17}
                        xl={17}
                        xxl={17}
                    >
                    <div className={style.content}>
                        <Switch>
                            <Route path={`/小决定`} component={decision}/>
                            <Route exact path={url} component={Home}/>
                            <Route path={`/detail/:id`} component={Detail}/>
                            <Route path={`/:tag`} component={Home}/>
                            {/* <Route component={NotFound}/> */}
                        </Switch>
                    </div>
                    </Col>
                    <Col 
                        xs={24}
                        sm={24}
                        md={24}
                        lg={{ span: 6, offset: 1 }}
                        xl={{ span: 6, offset: 1 }}
                        xxl={{ span: 6, offset: 1 }}
                    >
                    <div className={`${style.loginContainer}`}>
                    <WidthMe total={total}/>
                            {this.props.userInfo.userId 
                            ?
                            <Logined history={this.props.history} 
                            userInfo={this.props.userInfo} 
                            onChangeClick={this.onChangeClick} 
                            LoginOut = {this.LoginOut}
                            /> 
                            :
                            <Login login={login} register={register}/>}  
                        </div>
                    </Col>
                    </Row>
                 </Col>
                </Row>
            </Content>
            <Footer/>
        </Layout>
                </Layout>
        )
    }

    componentDidMount() {
        this.props.get_all_tags();
    }
    componentWillMount() { //在render前引用不然会报错
        //引入百度统计
        var _hmt = _hmt || [];
        (function () {
            var hm = document.createElement("script");
            hm.src = "https://hm.baidu.com/hm.js?c50445aac772fad4b0395330ce12cb78";
            var s = document.getElementsByTagName("script")[0];
            s.parentNode.insertBefore(hm, s);
        })();
    }
}

Front.defaultProps = {
    categories:[]
};

Front.propTypes = {
    categories:PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return{
        categories:state.admin.tags,
        userInfo: state.globalState.userInfo,
        total:state.front.articleList
    }
}
function mapDispatchToProps(dispatch) {
    return{
        get_all_tags:bindActionCreators(get_all_tags,dispatch),
        get_article_list:bindActionCreators(get_article_list,dispatch),
        login: bindActionCreators(IndexActions.get_login, dispatch),
        register: bindActionCreators(IndexActions.get_register, dispatch),
        login_out:bindActionCreators(IndexActions.login_out,dispatch),
        update_avatar:bindActionCreators(update_user_avatar,dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Front)