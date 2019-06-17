import {
    Comment, Tag, Avatar,
  } from 'antd';
  import React,{Component} from 'react'
  import Identicon from 'identicon.js';
  import moment from 'moment';
  moment.locale('zh-cn');
  import style from './style.css'

  class ExampleComment extends Component{
    constructor(props){
      super(props);
  }
  replyUser = (e)=>{
    const btn = e.target;
    $(".Reply_Btn")[0].id=btn.id;
    $(".Reply_Content")[0].placeholder=`@${btn.attributes[1].nodeValue}：`;
    $(".Reply_Content")[0].value='';
    $(".Reply_Content")[0].focus();
    $("#Reply_Box")[0].scrollIntoView(true);
  }
    render(){
      const {children,datalist,parentid} =this.props;
      let avatar; //为了没有设置头像的人自动生成与用户id唯一的像素头像
      if(datalist.avatar==''){
        const hash = datalist.userid;
        const data = new Identicon(hash).toString()
        avatar = `data:image/png;base64,${data}`;
      }
      else{
        avatar = datalist.avatar;
      }
      return(
        <Comment
        actions={[<a className={style.Reply}  name = {datalist.username} id = {parentid} onClick={this.replyUser.bind(this)}>回复 </a>]}
        author={<div><a>{datalist.username}</a>
        {datalist.username=='Lex'?(<Tag style={{"margin-left":"6px"}} color='#108ee9'>站长</Tag>):""}
        <span>{moment(datalist.time).fromNow()}</span></div>}
        avatar={(
          <Avatar
            src={avatar}
            alt={datalist.username}
          />
        )}
        content={<p><a className={style.Reply}>{datalist.requsername==undefined?"":`@${datalist.requsername}：`}</a>{datalist.content}</p>}
      >
        {children}
      </Comment>
      )
    }
  }
  class ReplyList extends Component{
    constructor(props){
        super(props);
    }
    render(){
      let replylist = this.props.replylist;
      return(
        <div>
        {
          replylist.map((items,keys) => (
            <ExampleComment key={keys} datalist={items} parentid={items._id}>
            {
              replylist[keys].childReplyList.map((item,keys)=>(
                <ExampleComment key={keys} datalist={item} parentid={items._id}/>
              ))
            }
            </ExampleComment>
        ))
      }
        </div>
      )
    }
  }

  export default ReplyList;