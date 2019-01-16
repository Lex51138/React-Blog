import React,{Component} from 'react'
import Texty from 'rc-texty'
import 'rc-texty/assets/index.css'
import TweenOne from 'rc-tween-one'
import style from './style.less'
import { Col, Dropdown, Icon, Input, Layout, Menu, Row } from 'antd'
const { Header } = Layout
// const { Search } = Input

const geInterval = function (e) {
    switch (e.index) {
        case 0:
            return 0;
        case 1:
            return 150;
        case 2:
        case 3:
        case 4:
        case 5:
        case 6:
            return 150 + 450 + (e.index - 2) * 10;
        default:
            return 150 + 450 + (e.index - 6) * 150;
    }
};

const getEnter = function (e) { 
    var t = {
        opacity: 0,
        scale: 0.8,
        y: '-100%'
    };
    if (e.index >= 2 && e.index <= 6) {
        return { ...t, y: '-30%', duration: 150 }
    }
    return t;
};
const getSplit = (e) => { //头部字体动态分割span
    const t = e.split(' ')
    var c = [];
    t.forEach((str, i) => {
      c.push(<span key={`${str}-${i}`}>{str}</span>)
      if (i < t.length - 1) {
        c.push(<span key={` -${i}`} />)
      }
    })
    return c
  }
  
export default class Menus extends Component{
    constructor(props){
        super(props);
        this.state = {
            current:this.props.categories[0]
        }
    }

    
    handleClick = (e) => { //标签点击
        console.log('click ', e);
        if(e.key === '首页'){
            this.props.getArticleList('');
        }else{
            this.props.getArticleList(e.key);
        }
        let toPath = e.key === '首页'?'/':'/'+e.key;
        this.setState({
            current: e.key,
        });
        this.props.history.push(toPath);
    };

    render(){
        const menu = ( //导航栏元素
            <Menu
            onClick={this.handleClick}
            selectedKeys={[this.state.current]}
            mode="horizontal"
            className={style.MenuContainer}
        >
            {
                this.props.categories.map((item,index)=>(
                    <Menu.Item key={item}>
                        {item}
                    </Menu.Item>
                ))
            }
        </Menu>
        )
        return(
           <div className="header">
              <Header>
              <Row>
                <Col md={0} lg={1} xl={3} xxl={5} />
                <Col md={22} lg={20} xl={18} xxl={14}>
                    <div className="header-logo-wrp">
                        <div className="combined">
                        <Texty
                        className="title"
                        type="mask-top"
                        delay={400}
                        enter={getEnter}
                        interval={geInterval}
                        component={TweenOne}
                        componentProps={{
                          animation: [
                            { x: 130, type: 'set' },
                            { x: 100, delay: 500, duration: 450 },
                            {
                              duration: 300,
                              ease: 'easeOutQuart',
                              x: 0
                            },
                            {
                              delay: -300,
                              duration: 1000,
                              ease: 'easeInOutQuint',
                              letterSpacing: 0,
                              scale: 0.9
                            },
                            {
                              delay: -300,
                              duration: 1000,
                              ease: 'easeInOutQuint',
                              scale: 1,
                              width: '100%'
                            }
                          ]
                        }}>
                        Lex Blog
                      </Texty>
                      <TweenOne
                        className="combined-bar"
                        animation={{
                        delay: 2000,
                        ease: 'easeInOutExpo',
                        type: 'from',
                        width: 0,
                        x: 158
                        }}
                       />
                       <Texty
                        className="content"
                        type="bottom"
                        split={getSplit}
                        delay={2200}
                        interval={30}>
                            记录 自己 学习 历程，文章 写得 不好 请见 谅
                        </Texty>
                        </div>
                        <div className="menu-button-wrp">
                        <Dropdown overlay={menu} trigger={['click']}>
                          <Icon type="bars" className="menu-button" />
                        </Dropdown>
                        </div>
                    </div>
                </Col>
                </Row>
              </Header>
              <Row className="header-footer">
                <Col lg={1} xl={4} xxl={5} />
                <Col lg={22} xl={18} xxl={14}>
                        {menu}
                </Col>
              </Row>
           </div>
        )
    }

    componentDidMount() {
        this.setState({
            current:this.props.history.location.pathname.replace('\/','')||'首页'
        })
    }

}
