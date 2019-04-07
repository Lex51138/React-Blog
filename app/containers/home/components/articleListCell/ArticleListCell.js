import React from 'react'
import style from './style.css'
import {Link} from 'react-router-dom'
import { Tag } from 'antd';
export const cloudTagColor = {
    'React':'purple',
    '记录':'blue',
    'js':'gold'
}
export const ArticleListCell = (props)=>(
    <div className={`${style.container} `} onClick={()=>{props.history.push(`/detail/${props.data._id}`,{id:props.data._id});props.getArticleDetail(props.data._id)}}>
        <div className={style.cover}>
            <img className="cover_Img" src={props.data.coverImg} alt=""/>
        </div>
        <div className={style.bottomContainer}>
            <p className={style.title}>
                {props.data.title}
            </p>
            <span className={style.Cloud_Tags_Box}> {
                props.cloudTags.map(result => (
                    <a href={`/${result}`}>
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
                <span className={style.lastSpan+' lastspan'}>
                    阅读全文<span> >></span>
                </span>
            </div>
        </div>
    </div>
);