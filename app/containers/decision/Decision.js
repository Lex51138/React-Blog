import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import NotFound from "../../";
import AddChoice from '././components/addChoice'
import CreateChoice from './createChoice'
import Index from './Index'
import './style.less';

class Decision extends Component {
    render() {
        return (
            <div className='Index_Box'>
                <Switch>
                <Route path={'/小决定/add'} component={AddChoice} />
                <Route path={'/小决定/create'} component={CreateChoice} />
                <Route path='/小决定' component={Index} />        
                    {/* <Route component={NotFound}/> */}
                </Switch>
             </div>
        )
    }
}
export default Decision;