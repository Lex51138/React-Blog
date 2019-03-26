import React from 'react'
import { Spin } from 'antd'


import style from './style.css'

const city = ['花村','努巴尼','尼泊尔','漓江塔','66号公路','多拉多','国王大道','格兰之森','格蓝迪发电站','超时空漩涡','安图恩副本','卢克攻坚队','直布罗陀'];
export const Loading=()=>(
        <div className={style.container}>
            <Spin tip={'正在前往...'+city[Math.floor(Math.random()*city.length)]}
            size="large"/>
        </div>
);