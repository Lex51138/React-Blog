import React, { Component, PropTypes } from 'react'
import {
    BrowserRouter as Router,
    Route,
    Switch,
    Redirect
} from 'react-router-dom'
import TurnTable from './turnTable'
import AddChoice from '././components/addChoice'
import CreateChoice from './createChoice'
import Index from './Index'
import './style.less';

class Decision extends Component {
    render() {
        return (
            <div className='Index_Box'>
                <Switch>
                <Route path='/小决定/turnTable/:did' component={TurnTable} />      
                <Route path={'/小决定/add'} component={AddChoice} />
                <Route path={'/小决定/create/:model'} component={CreateChoice} />
                <Route path='/小决定/:id' component={Index} />    
                    {/* <Route component={NotFound}/> */}
                </Switch>
             </div>
        )
        
    }
    componentDidMount(){
        window.screen.width<=768?$(".background")[0].style.backgroundColor="#fff":"";//手机显示将背景变白
    }
  
}
export default Decision;