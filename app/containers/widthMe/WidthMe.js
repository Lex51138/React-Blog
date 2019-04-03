import React,{Component,PropTypes} from 'react'
import './style.less'
import { Card, Tooltip ,Tag} from 'antd'
import { Link } from 'react-router-dom'
import {cloudTagColor} from '../home/components/articleListCell/ArticleListCell'
const { Meta } = Card

export default class WidthMe extends Component{
  constructor(props){
      super(props);
  }
  render(){
     return(
             <div className='Sidebar'>
            <Card hoverable={true} className="card" cover={
              <img src="https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1527245834290&di=2286cc7354adc925f79b92b719162dd4&imgtype=0&src=http%3A%2F%2Fpic32.photophoto.cn%2F20140828%2F0005018403917054_b.jpg" />
            }>
            <div className="authorImg">
              <img src="http://fs.1473.cn/e5a5376f-c033-4fa8-a86c-d6ecbae99d7d.jpg" alt="" />
            </div>
            <Meta
              title={
                <div>
                  <span className="card-title">Lex</span>
                </div>
              }
              description={
                <div>
                  <p className="abstract">前端切图狮 🦁 。</p>
                  <p className="abstract">
                    <span>文章 - {this.props.total}</span>
                    <span style={{ marginRight: 10, marginLeft: 10 }}>|</span>
                    <span>访问 - 0</span>
                  </p>
                </div>
              }
            />
          </Card>
          
         <Card title="FOLLOW ME" hoverable={true} className="card">
         <div className="icon-git-wrp">
            <div className="call">
                <Tooltip title="个人简历">
                <Link to="/resume">&#xe605;</Link>
            </Tooltip>
            <Tooltip title="github">
              <a href="https://github.com/hide-on-brush" target="view_window">
              &#xe64a;
              </a>
            </Tooltip>
            <Tooltip
            title={
              <img
                className="wx"
                src="http://fs.1473.cn/86c6d8a1-11af-408a-9f75-f6b46031677d.png"
                alt="微信"
                width={100}
                height={100}
              />
            }>
            <a>&#xe61a;</a>
          </Tooltip>
          <Tooltip title="372264507">
          <a>&#xe630;</a>
          </Tooltip>
            <Tooltip title="知乎">
              <a
                href="https://www.zhihu.com/people/hasi-43/activities"
                target="view_window">
                &#xe69a;
              </a>
            </Tooltip>
          </div>
        </div>
      </Card>

      <Card title="云标签" hoverable={true} className="card">
            {
              this.props.tags.map(result=>{
                if(result.type=='cloud'){
                  return (
                    <a href={`/${result.name}`}>
                      <Tag color={cloudTagColor[result.name]}>{result.name}</Tag>
                    </a>
                  )
                }
              })
            }
      </Card>
        </div>   
     ) 
  }
}
