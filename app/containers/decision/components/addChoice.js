import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import '../style.less';

const Todo = (item) => (//小决定首页渲染决定组件
    <div className='Index_Item_Box'>
        <div className="Index_Item"><span>🤔</span><span>item</span><a >&#xe68b;</a><a>&#xe600;</a></div>
    </div>
)
class AddChoice extends Component {
    render() {
        // const {indexlist} = this.props;
        return (
            <div>
                <div className="Index_Head">
                    <a className='Index_Head_Return'>&#xe8b5;</a>
                </div>
                <h1>选取模板</h1>
                <div className='Index_Todo_Box'>
                 <div className='kzh_box'>
                 <p>客制化</p>
                 <div className='Index_Item_Box'><Link to="/小决定/create">&#xe68b;<span>创建新决定</span></Link></div>
                 </div>
                </div>
            </div>
        )
    }
}


export default AddChoice