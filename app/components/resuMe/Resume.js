import { Carousel, Dropdown, Icon, Menu, Tooltip } from 'antd'
import * as React from 'react'
import { Link } from 'react-router-dom'
import About from './About'
import CallMe from './CallMe'
import Index from './Index'
import Skill from './Skill'
import './style.less'
import Undergo from './Undergo'
import Works from './Works'


class Resume extends React.Component {
    const pageList = [
        { color: '#85ada3', component: <Index />, title: '首页' },
        { color: '#0e8d82', component: <About />, title: '关于我' },
        { color: '#4b5b8a', component: <Skill />, title: '技能栈' },
        { color: '#925b4b', component: <Undergo />, title: '经历' },
        { color: '#48829c', component: <Works />, title: '作品集' },
        { color: '#9d946d', component: <CallMe />, title: '联系我' }
      ]
      const dotList = [
        { icon: '&#xe600;', label: '首页' },
        { icon: '&#xe63e;', label: '关于我' },
        { icon: '&#xe7b6;', label: '技能栈' },
        { icon: '&#xe7a2;', label: '经历' },
        { icon: '&#xe619;', label: '作品' },
        { icon: '&#xe601;', label: '联系我' }
      ]
    constructor(props) {
        super(props);
    }
    render(){
        const menu = (
            <Menu>
              {this.pageList.map((item, index) => (
                <Menu.Item key={item.color} onClick={() => this.dotClick(index)}>
                  <div>{item.title}</div>
                </Menu.Item>
              ))}
            </Menu>
          )
        return(
            <div>
                
            </div>
        )
    }
}