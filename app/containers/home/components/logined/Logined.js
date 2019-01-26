import React from 'react'
import style from './style.css'
import {Button} from 'antd'

export const Logined = (props) => (
    <div className={style.container}>
        <img src={props.userInfo.avatar}/>
        <input type="file" className={style.fky} id={props.userInfo.userId} onChange={props.onChangeClick.bind(this)}/>
        <p>欢迎：{props.userInfo.username}</p>
        <p className={style.centerP}>访问偶的博客~</p>
        {props.userInfo.userType === 'admin' ?
            <Button onClick={() => props.history.push('/admin')} type="primary">点击进入管理页面</Button> : null}
            <Button onClick={props.LoginOut.bind(this)} className={style.loginOut_Btn}type="danger">退出登录</Button>
    </div>
    
);