import React, {Component, PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {
    Redirect
} from 'react-router-dom'
import QueueAnim from 'rc-queue-anim'
import style from './style.css'
import ArticleList from "./components/articelList/ArticleList";
import {Pagination} from 'antd';
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions as frontActions} from '../../reducers/frontReducer'
const {get_article_list,get_article_detail} = frontActions;

class Home extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        const {tags} = this.props;
        localStorage.setItem('userInfo', JSON.stringify(this.props.userInfo));
        return (
            tags.length > 1 && this.props.match.params.tag && (tags.indexOf(this.props.match.params.tag) === -1 || this.props.location.pathname.lastIndexOf('\/') > 0)//判断URL是否有这个标签没有则重定向路由404
                ?
                // <Redirect to='/404'/>
                ""
                :
                <div className={style.container}>
                    <ArticleList //渲染文章列表
                        history={this.props.history}
                        data={this.props.articleList}
                        getArticleDetail={this.props.get_article_detail}
                    />
                    <QueueAnim className="Pagination" delay={1000}>
                    <div className={style.paginationContainer}>
                        <Pagination //ANTD分页工具
                            defaultPageSize={5}
                            onChange={(pageNum) => {
                                this.props.get_article_list(this.props.match.params.tag || '', pageNum);
                            }}
                            current={this.props.pageNum}
                            total={this.props.total}/>
                    </div>
                    </QueueAnim>
                </div>
        )
    }

    componentDidMount() {
        this.props.get_article_list(this.props.match.params.tag || '')
    }
}

Home.defaultProps = {
    userInfo: {},
    pageNum: 1,
    total: 0,
    articleList: []
};

Home.propsTypes = {
    pageNum: PropTypes.number.isRequired,
    total: PropTypes.number.isRequired,
    articleList: PropTypes.array.isRequired
};

function mapStateToProps(state) {
    return {
        tags: state.admin.tags,
        pageNum: state.front.pageNum,
        total: state.front.total,
        articleList: state.front.articleList
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_article_list: bindActionCreators(get_article_list, dispatch),
        get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Home);