import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import { bindActionCreators } from 'redux'
import {emoji} from './Index'
import { connect } from 'react-redux'
import { actions as decisionActinos } from '../../reducers/decision'
const  {add_decision,update_currentlist} = decisionActinos;
import {model} from './components/addChoice'
// import {addTodo} from './Todo'
import './style.less';

const TodoList = ({data})=>(//创建决定页面Todo组件
    <div>
        {
            data.itemarr.map(result => (
                <div className='Index_Item_Box add'>
                    <a className='delete'>&#xe600;</a>
                    <input type="text" placeholder='選項' value = {result} className="Opition_Input" />
                    <div className='Weights'>權重</div>
                </div>
            ))
        }
    </div>
    
)
class CreateChoice extends Component {
    constructor(props){
        super(props);
    }
    render(){
        const goBack= ()=>{
            history.go(-1);
        }
        return(
            <div>
            <div className="Index_Head">
                <a className='Index_Head_Return' onClick={goBack}>&#xe8b5;</a>
                <a className="Index_Head_Add">&#xe625;</a>
            </div>
            <div className='Index_Item_Box create'><span className='create_span'>{emoji[parseInt(this.props.match.params.model)]}</span><input className = 'create_input' value = {model[parseInt(this.props.match.params.model)].title} placeholder="問題" type="text"/ ></div>
            <div className="Option_box">
            {
                this.props.match.params.model?
                <TodoList data ={model[parseInt(this.props.match.params.model)]} />
                :""
            }
            </div>
            <div className="special_box">
            <div className='Index_Item_Box'><a >&#xe63d;</a><span>添加新選項</span></div>
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
    componentDidMount(){
      if(model[parseInt(this.props.match.params.model)].repeat){
        $(".Check")[0].checked=true;
      }
      let data = model[parseInt(this.props.match.params.model)];
    //    = Object.assign(model[parseInt(this.props.match.params.model)],{userid:this.props.userId});
        this.props.update_currentlist(data);
    }
      
    
}
 
function mapStateToProps(state) {
    let {userId} = state.globalState.userInfo;
    return{
        userId
    }
}

function mapDispatchToProps(dispatch) {
    return{
        add_decision:bindActionCreators(add_decision,dispatch),
        update_currentlist:bindActionCreators(update_currentlist,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(CreateChoice);