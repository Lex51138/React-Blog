import {
    Comment, Avatar, Form, Button, List, Input,
  } from 'antd';
  import {connect} from 'react-redux';
  import React,{Component} from 'react';
  import {bindActionCreators} from 'redux'
  import ReplyList from './ReplyList';
  import {actions} from '../../../../reducers/reply';
  const {get_all_reply,update_pageNum,add_reply} = actions;
  const TextArea = Input.TextArea;
  import dateFormat from 'dateformat'
  import style from './style.less'
  var $ = require('jquery');
  window.$ = $;
  
const Editor = ({
    onSubmit, submitting,loging,initvalue,qxreply
  }) => (
    <div>
      <Form.Item>
        <TextArea className='Reply_Content' rows={4} maxlength="20" placeholder={initvalue} disabled={loging}/>
        </Form.Item>
      <Form.Item>
        <Button
          htmlType="submit"
          loading={submitting}
          onClick={onSubmit.bind(this)}
          type="primary"
          disabled={loging}
          id=""
          className='Reply_Btn'
        >
         发表评论&nbsp;<span className='shua_ni_ma'></span>
        </Button>
        <span className='qx' onClick={qxreply.bind(this)}>点我取消回复用户。</span>
      </Form.Item>
    </div>
  )

class Reply extends Component{
    constructor(props){
        super(props);
    }
    handleSubmit = (e)=>{
      let requsername = $(".Reply_Content")[0].placeholder.substring(1,$(".Reply_Content")[0].placeholder.length-1);
      let data = {};
      data.artid = this.props.artid;
      data.content = $("textarea")[0].value;
      data.userid = this.props.userinfo.userId;
      data.username = this.props.userinfo.username;
      data.time = dateFormat(new Date(), 'yyyy-mm-dd HH:MM:ss');
      data.replyid = e.target.id;
      data.requsername = requsername;
      this.props.add_reply(data);
      //加载计时器15s结束可以继续评论
      $(".Reply_Btn ")[0].disabled = true;
      $("textarea")[0].value='';
      $(".shua_ni_ma")[0].innerText = 15;
      var shuanima = setInterval(()=>{
        if($(".shua_ni_ma")[0].innerText==0){
          clearInterval(shuanima);
          $(".shua_ni_ma")[0].innerText = "";
          $(".Reply_Btn ")[0].disabled = false;
          return;
        }
        $(".shua_ni_ma")[0].innerText = ($(".shua_ni_ma")[0].innerText-1);
      },1000)
      // this.props.get_article_detail(this.props.location.state.id);
    }
    qxreply = ()=>{
      $(".Reply_Content")[0].placeholder='可以嘴臭作者哦~';
      $(".Reply_Content")[0].value='';
      $(".Reply_Btn")[0].id='';
    }
    render(){
      let loging,initvalue;
      const {avatar,username} = this.props.userinfo;
      const submitting = this.props.submitting;
      this.props.userinfo.username==undefined?(loging=true,initvalue="请先登录账号再评论哦~"):(loging=false,initvalue="可以嘴臭作者哦~") //判断是否登陆 没登录不给发言
        return(
        
            <div id="Reply_Box">
            <Comment
            avatar={(
              <Avatar
                src={avatar}
                alt={username}
              />
            )}
            content={(
              <Editor
                onSubmit={this.handleSubmit}
                submitting={this.props.submitting}
                // value={value}
                loging={loging}
                initvalue={initvalue}
                qxreply={this.qxreply}
              />
            )}
          />
            <ReplyList submitting={submitting} replylist={this.props.replylist}/>
            </div>
            )
        
    }
    componentDidMount() {
      this.props.get_all_reply(this.props.artid);
  }
  }

  function mapStateToProps(state) {
    const {pageNum,total,replylist} = state.reply;
    const userinfo = state.globalState.userInfo;
    const submitting = state.globalState.isFetching;
    return{
      pageNum,
      total,
      replylist,
      userinfo,
      submitting
    }
}

function mapDispatchToProps(dispatch) {
  return{
    get_all_reply:bindActionCreators(get_all_reply,dispatch),
    update_pageNum:bindActionCreators(update_pageNum,dispatch),
    add_reply:bindActionCreators(add_reply,dispatch),
    // get_article_detail:bindActionCreators(get_article_detail,dispatch)
  }
}

Reply.defaultProps = {
  submitting:true
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Reply);