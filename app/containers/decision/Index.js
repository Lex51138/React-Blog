import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { Link } from 'react-router-dom'
import { actions as decisionActinos } from '../../reducers/decision'
const { get_decision } = decisionActinos
import './style.less';

const Todo = (item) => (//小决定首页渲染决定组件
    <div className='Index_Item_Box'>
        <div className="Index_Item"><span>🤔</span><span>item</span><a >&#xe68b;</a><a>&#xe600;</a></div>
    </div>
)
class Index extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const {indexlist} = this.props
        return (
            <div>
                <div className="Index_Head">
                    <a className='Index_Head_Return'>&#xe8b5;</a>
                    {/* <span>tips:手机打开体验更佳</span> */}
                    <Link to="/小决定/add"><a className="Index_Head_Add">&#xe601;</a></Link>
                    
                </div>
                <h1>决定</h1>
                <div className='Index_Todo_Box'>
                    {
                        indexlist.length == 0 ?
                            <div className='nothing'>点击右上角的+创建小决定吧</div>
                            : indexlist.map((item) => {
                                <Todo item={item} />
                            })
                    }
                </div>
            </div>
        )
    }
}


Index.defaultProps = {
    indexlist: [],
    currentlist: []
};

function mapStateToProps(state) {
    return {
        indexlist: state.indexlist
    }
}
function mapDispatchToProps(dispatch) {
    return {
        get_decision: bindActionCreators(get_decision, dispatch),
    }
}
export default connect(
    mapStateToProps,
    mapDispatchToProps
)(Index)