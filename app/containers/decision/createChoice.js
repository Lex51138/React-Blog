import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { emoji } from './Index'
import { connect } from 'react-redux'
import { actions as decisionActinos } from '../../reducers/decision'
const { add_decision, update_currentlist,get_decision,update_decision} = decisionActinos;
import { model } from './components/addChoice'
// import {addTodo} from './Todo'
import './style.less';
import { S_IFIFO } from 'constants';

const TodoList = ({ data, handleChange, del }) => (//创建决定页面Todo组件
    <div className='wdnmd'>
        {
            data.map((result, key) => (
                <div id={key} className='Index_Item_Box add'>
                    <a className='delete' onClick={del.bind(this)}>&#xe600;</a>
                    <input type="text" placeholder='選項' onChange={handleChange.bind(this)} value={result} className="Opition_Input" />
                    <div className='Weights'>權重</div>
                </div>
            ))
        }
    </div>

)
class CreateChoice extends Component {
    constructor(props) {
        super(props);
    }

    handleChange = e => {
        var newarr = [];
        newarr = this.props.currentlist.itemarr;
        newarr[parseInt(e.target.parentNode.id)] = e.target.value;
        this.setState({ itemarr: newarr });
    }
    changeTitle = e => {
        this.setState({ title: e.target.value });
    }
    del = e => {
        var newarr = this.props.currentlist.itemarr;
        newarr.splice(parseInt(e.target.parentNode.id), 1)
        this.setState({ itemarr: newarr });
    }
    add = e => {
        var newarr = [];
        newarr = this.props.currentlist.itemarr.concat("");
        this.setState({ itemarr: newarr });
    }
    uploadChoice = _ => {
        let data = this.props.currentlist;
        if(this.state != null){
            if(this.state.title!=undefined){
                data.title=this.state.title;
            }
        } 
        data.repeat = $(".Check")[0].checked ? 1 : 0;
        data.userid = this.props.userId;
        if (this.props.match.params.model.length>3) {//判断是更改还是添加
            this.props.update_decision(this.props.match.params.model,data);
        }else{
            this.props.add_decision(data);
        }
        setTimeout(_=>{window.location.href=`/小决定/${this.props.userId}`},1000);
    }
    render() {
        const goBack = () => {
            history.go(-1);
        }
        let emo;
        if(this.props.match.params.model=="new"){
            emo = 6;
        }else if(this.props.match.params.model.length>=4){
            emo = this.props.currentlist.model;
        }else{
            emo = parseInt(this.props.match.params.model)
        }
        return (
            <div>
                <div className="Index_Head">
                    <a className='Index_Head_Return' onClick={goBack}>&#xe8b5;</a>
                    <a className="Index_Head_Add" onClick={this.uploadChoice.bind(this)}>&#xe625;</a>
                </div>
                <div className='Index_Item_Box create'>
                <span className='create_span'>
                {emoji[emo]}
                </span>
                <input onChange={this.changeTitle.bind(this)} className='create_input' 
                value={this.state != null ? this.state.title : this.props.currentlist.title} placeholder="問題" type="text" />
                </div>
                <div className="Option_box">
                    {
                        this.props.match.params.model ?
                            <TodoList
                                data={this.state != null ? this.state.itemarr : this.props.currentlist.itemarr}
                                handleChange={this.handleChange.bind()}
                                del={this.del}
                            />
                            : ""
                    }
                </div>
                <div className="special_box">
                    <div className='Index_Item_Box' onClick={this.add.bind(this)}><a >&#xe63d;</a><span>添加新選項</span></div>
                    <div className='Index_Item_Box repeat'>
                        <a >&#xe639;</a><span>不重複抽取</span>
                        <label className="switch" >
                            <input className='Check' type="checkbox" />
                            <div className="slider round"></div>
                        </label>
                    </div>
                </div>
            </div>
        )
    }
    componentDidMount() {  
        let data;
        if (this.props.match.params.model.length>3) {//更改的data
            this.props.get_decision('',1,this.props.match.params.model);
        }
        else{//选取模板或创建新决定的data
            data = model[parseInt(this.props.match.params.model)];
            this.props.update_currentlist(data);
        } 
        document.documentElement.scrollTop = 0;//回到顶部 
    }
    componentWillUpdate(){
        if(parseInt(this.props.currentlist.repeat)){
            $(".Check")[0].checked=true;
          }
    }
}
CreateChoice.defaultProps = {
    currentlist: {
        title: "",
        itemarr: [],
        userid: "",
        model: 6,
        repeat: 0
    },

};

function mapStateToProps(state) {
    let { userId } = state.globalState.userInfo;
    let currentlist = state.decision.currentlist;
  
    return {
        userId,
        currentlist,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_decision:bindActionCreators(get_decision, dispatch),
        add_decision: bindActionCreators(add_decision, dispatch),
        update_currentlist: bindActionCreators(update_currentlist, dispatch),
        update_decision:bindActionCreators(update_decision, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateChoice);