import React, {Component, PropTypes} from 'react'
import { Link } from 'react-router-dom'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {connect} from 'react-redux'
import {actions} from '../../reducers/index'
import {bindActionCreators} from 'redux'

const {user_auth} = actions;
class AdminIndex extends Component {
    constructor(props) {
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }

    render() {
        return(
            <div>
                <h1 >Lex blog 后台管理</h1>
                <Link to="/">
                <a href=''>点我回到首页</a>
                </Link>
            </div>
        )

    }
}

AdminIndex.defaultProps = {
    isAdmin:false
};

function mapStateToProps(state) {
    return {
        isAdmin: state.globalState.userInfo.userType === 'admin',
        userInfo:state.globalState.userInfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
        user_auth:bindActionCreators(user_auth,dispatch)
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminIndex)