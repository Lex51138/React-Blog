import React,{Component,PropTypes} from 'react'
import { BackTop, Col, Layout, Row} from 'antd'
import {connect} from 'react-redux'
import {Detail} from '../detail'
import {Home} from '../home'
import style from './style.less'
import {
    Switch,
    Route
} from 'react-router-dom'
import Menus from "../components/menu/Menus";
import NotFound from "../../components/notFound/NotFound";
import {bindActionCreators} from 'redux'
import {actions} from '../../reducers/adminManagerTags'
import {actions as FrontActinos} from '../../reducers/frontReducer'
import Login from "../home/components/login/Login";
import {Logined} from "../home/components/logined/Logined";
import WidthMe from "../widthMe/WidthMe"
import {actions as IndexActions} from '../../reducers/index'
const {get_all_tags} = actions;
const {get_article_list} = FrontActinos;
const {Content} = Layout
import Footer from './Footer'

class Front extends Component{
    constructor(props){
        super(props);
    }

    render(){
        const {url} = this.props.match;
        const {login, register} = this.props;
        // ?:
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
                            <Route exact path={url} component={Home}/>
                            <Route path={`/detail/:id`} component={Detail}/>
                            <Route path={`/:tag`} component={Home}/>
                            <Route component={NotFound}/>
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
                    <WidthMe />
                            {this.props.userInfo.userId ?
                            <Logined history={this.props.history} userInfo={this.props.userInfo}/> :
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
        userInfo: state.globalState.userInfo
    }
}
function mapDispatchToProps(dispatch) {
    return{
        get_all_tags:bindActionCreators(get_all_tags,dispatch),
        get_article_list:bindActionCreators(get_article_list,dispatch),
        login: bindActionCreators(IndexActions.get_login, dispatch),
        register: bindActionCreators(IndexActions.get_register, dispatch)
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Front)