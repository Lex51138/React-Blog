import React,{Component} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {bindActionCreators} from 'redux'
import {connect} from 'react-redux'
import {actions} from "../../reducers/frontReducer";
const {get_article_detail} = actions;
import Reply from'./components/reply/Reply'
import style from './style.css'
import marked from 'marked'
marked.setOptions({
    highlight: code => hljs.highlightAuto(code).value,
  });

const ReplyLength = ({total})=>(
    <p className={style.Reply_Length}>{`${total} 条评论`}</p>
)
class Detail extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render(){
        const {articleContent,title,author,viewCount,commentCount,time} = this.props;
        const output = marked(articleContent||"正在拼命加载文章中..............");
        return(
            <div>
            <div className={style.container}>
                <h2 className="detail_title">{title}</h2>
                <div className={style.articleInfo}>
                    <span >
                        <img className={style.authorImg} src={require('./author.png')}/> {author}
                    </span>
                    <div className={style.time}>
                        <img src={require('./calendar.png')}/> {time}
                    </div>
                    <span>
                        <img src={require('./comments.png')}/> {commentCount}
                    </span>
                    <span>
                        <img src={require('./views.png')}/> {viewCount}
                    </span>
                </div>
                <div id='preview' className={style.content}  dangerouslySetInnerHTML={{ __html: output }}>
                
                        {/* {remark().use(reactRenderer).processSync(articleContent).contents} */}
                </div>
            </div>
            <ReplyLength total={this.props.commentCount}/>
            <Reply artid = {this.props.location.state.id}/>
            </div>
        )
    }

    componentDidMount() {
        this.props.get_article_detail(this.props.location.state.id);
        document.documentElement.scrollTop = 0;//回到顶部
    }
}
function mapStateToProps(state) {
    const {content,title,author,viewCount,commentCount,time} = state.front.articleDetail;
    return{
        articleContent:content,
        title,
        author,
        viewCount,
        commentCount,
        time,
    }
}

function mapDispatchToProps(dispatch) {
    return{
        get_article_detail:bindActionCreators(get_article_detail,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Detail);