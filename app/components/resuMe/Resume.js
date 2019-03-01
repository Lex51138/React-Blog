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
    constructor(props) {
        super(props);
        this.state = {
          currentIndex:0,
        }
        this.pageList = [
          { color: '#85ada3', component: <Index />, title: '首页' ,components: <Index />},
          { color: '&#xe607', component: <About />, title: '关于我',components:<About /> },
          { color: '#4b5b8a', component: <Skill />, title: '技能栈',components:<Skill /> },
          // { color: '#925b4b', component: <Undergo />, title: '经历' ,components:<Undergo />},
          { color: '#48829c', component: <Works />, title: '作品集' ,components:<Works />},
          { color: '#9d946d', component: <CallMe />, title: '联系我' ,components:<CallMe />}
        ];
        this.dotList =[
          { icon: '&#xe677;', label: '首页' },
          { icon: '&#xe60d;', label: '关于我' },
          { icon: '&#xe60c;', label: '技能栈' },
          // { icon: '&#xe60e;', label: '工作经历' },
          { icon: '&#xe620;', label: '作品' },
          { icon: '&#xe66f;', label: '联系我' }
        ]
      }
      dotClick = (index) => {
        this.carousel.goTo(index)
        this.setState({ currentIndex: index })
      }

      onWheel = (e) => {
        if (e.deltaY > 0) {
          this.carousel.next()
        } else {
          this.carousel.prev()
        }
      }

    render(){
        const menu = ( //右侧简历菜单
            <Menu>
              {this.pageList.map((item, index) => (
                <Menu.Item key={item.color} onClick={() => this.dotClick(index)}>
                  <div>{item.title}</div>
                </Menu.Item>
              ))}
            </Menu>
          )
          const settings = {
            beforeChange: (currentSlid,nextSlide) => {
              this.setState({ currentIndex: nextSlide })
            },
            dots: false,
            infinite: false
          }
          const { currentIndex } = this.state;
        return(
          // 头部作者头像部分
          <div className="resume" onWheel={this.onWheel}>
            <div className="resume-header">
              <Tooltip title="博客首页" placement="rightBottom">
                <Link to="/">
                  <img
                    src="http://fs.1473.cn/e5a5376f-c033-4fa8-a86c-d6ecbae99d7d.jpg"
                    alt=""
                  />
                </Link>
              </Tooltip>
              <div className="resume-menu-button">
                <Dropdown overlay={menu} trigger={['click']}>
                  <Icon type="bars" className="menu-button" />
                </Dropdown>
              </div>
            </div>
            {/* 幻灯片部分 */}
            <Carousel
              vertical={true}
              {...settings}
              ref={ref => (this.carousel = ref)}>
              {this.pageList.map((item, index) => (
                <div key={index} className={`item${index}`}>
                  <div className="resume-item">{item.components}</div>
                </div>
              ))}
            </Carousel>
            {/* 右边导航栏 */}
            <div className="resume-dots">
              {this.dotList.map((item, index) => (
                <div
                  className="dot-wrp"
                  key={index}
                  onClick={() => this.dotClick(index)}>
                  <Tooltip placement="left" title={item.label}>
                    <div
                      key={index}
                      dangerouslySetInnerHTML={{ __html: item.icon }}
                      className={currentIndex === index ? 'dot' : 'item'}
                    />
                  </Tooltip>
                </div>
              ))}
            </div>
            {/* 向上的小图标 */}
            {currentIndex < 4 && (
              <div className="next" onClick={() => this.carousel.next()}>
                &#xe61e;
              </div>
            )}
          </div> 
        )
    }
}
export default Resume;