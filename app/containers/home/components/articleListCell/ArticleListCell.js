import React from 'react'
import style from './style.css'
import {Link} from 'react-router-dom'
import { Tag } from 'antd';
export const cloudTagColor = {
    'React':'purple',
    '记录':'blue',
    'js':'gold',
    '置顶':'#f50',
    'Vue':'green',
}
export const ArticleListCell = (props)=>(
    <div className={`${style.container} `}onClick = {(document.body.clientWidth<600?()=>{props.history.push(`/detail/${props.data._id}`,{id:props.data._id});props.getArticleDetail(props.data._id)}:"")} >
        <div className={style.cover}>
            <img className="cover_Img" src={props.data.coverImg} alt=""/>
        </div>
        <div className={style.bottomContainer}>
            <p className={style.title}>
                {props.data.title}
                {props.data.Topping==1?( <Tag style= {{"margin-left":"10px"}} color={cloudTagColor['置顶']}>置顶</Tag>):""}
            </p>
            <span className={style.Cloud_Tags_Box}> {
                props.cloudTags.map((result,index) => (
                    <a key={index} href={`/${result}`}>
                    <Tag color={cloudTagColor[result]}>{result}</Tag>
                    </a>
                ))
            }
            </span>
            <p className={style.summary}>
                {props.data.summary}
            </p>
            <div>
                <p>
                    <span>
                        <img src={require('./calendar.png')} alt="发表日期"/>
                        {props.data.time}
                    </span>
                    <span>
                        <img src={require('./views.png')} alt="阅读数"/>
                        {props.data.viewCount}
                    </span>
                    <span>
                        <img src={require('./comments.png')} alt="评论数"/>
                        {props.data.commentCount}
                    </span>
                </p>
                <span onClick={()=>{props.history.push(`/detail/${props.data._id}`,{id:props.data._id});props.getArticleDetail(props.data._id)}} 
                    className={style.lastSpan+' lastspan'}>
                    READ MORE<span> &#xe604;</span>
                </span>
            </div>
        </div>
    </div>
);