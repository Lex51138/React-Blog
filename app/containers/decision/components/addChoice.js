import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router-dom'
import {emoji} from '../Index'
// import {addTodo} from './Todo'
import '../style.less';


export const model = [
    {
        title:'真心話&大冒險',
        itemarr:['真心話','大冒險','Pass'],
        model:0,
        repeat:0
    },
    {
        title:'聚餐吃什麽？',
        itemarr:['自助','日料','海鮮','麻辣燙','拉麵'],
        model:1,
        repeat:0
    },
    {
        title:'投個骰子',
        itemarr:['1','2','3','4','5','6'],
        model:2,
        repeat:0
    },
    {
        title:'今天誰買單',
        itemarr:['吃貨1','吃貨2','吃貨3'],
        model:3,
        repeat:0
    },
    {
        title:'真心話',
        itemarr:['你們家裏誰的脾氣最大？','最喜歡在座的哪位異性','最反感別人的什麽行爲？','你的初吻年齡？','最不滿意的身體部位？','做過最丟臉的事是什麽？'],
        model:4,
        repeat:0
    },
    {
        title:'大冒險',
        itemarr:['把離你最近的異性抱起來','做一個最性感的表情或動作','自摸自己身體的每個部位','蹲在凳子上做便秘狀','模仿特殊職業女子拉客','和右邊的人接吻10秒'],
        model:5,
        repeat:0
    },
    {
        title:'送女朋友什麽禮物？',
        itemarr:['包包','紅包','口紅'],
        model:6,
        repeat:0
    },
    {
        title:'送男朋友什麽禮物？',
        itemarr:['nintendo switch','機械鍵盤','游戲皮膚','電動牙刷','單反相機','發燒耳機','Apple Watch'],
        model:7,
        repeat:0
    },
    {
        title:'考那個學校？',
        itemarr:['清華','北大','你稍微有點膨脹'],
        model:8,
        repeat:0
    },
    {
        title:'今天做什麽運動？',
        itemarr:['跑步','游泳','打球','器械'],
        model:9,
        repeat:0
    },
    
];

const TodoList = ({data})=>(//创建决定页面Todo组件
    <div>{
        data.map((data,key)=>(
            <Link to={`/小决定/create/${key}`}><div className='Index_Item_Box'>
                <div className="Index_Item">
                    <a>{emoji[data.model]}</a><span>{data.title}</span>
                </div>
            </div>              
            </Link>
        ))
    }</div>
)
class AddChoice extends Component {
    constructor(props){
        super(props);
    }
    render() {
        const goBack= ()=>{
            history.go(-1);
        }
        return (
            <div>
                <div className="Index_Head">
                    <a className='Index_Head_Return' onClick={goBack}>&#xe8b5;</a>
                </div>
                <h1>选取模板</h1>
                <div className='Index_Todo_Box'>
                    <div className='kzh_box'>
                        <p>客制化</p>
                        <Link to="/小决定/create"><div className='Index_Item_Box'>&#xe68b;<span>创建新决定</span></div></Link>
                    </div>
                    <div className="model_box">
                        <p>模板</p>
                        <div className="item">    
                          <TodoList data = {model}/>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default AddChoice;