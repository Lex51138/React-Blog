import { Tooltip } from 'antd'
import * as React from 'react'
const CallMe = () => (
  <div className="call-me">
    <p className="title">联系我</p>
    <div className="tag">
      <span>代码</span>
      <span>灵感</span>
      <span>梦想</span>
      <span>未来</span>
    </div>
    <div className='call_me_box'>
    <p> 注重效率，偏爱敏捷开发</p>
    <p> 喜欢尝试，学习能力强</p>
    <p> 前端即兴趣，兴趣即未来</p>
    <p> 行路有良友，便是捷径</p>
    <p>带上我吧，一起看到更大的世界</p>
    </div>
    <div className='call_box'>
      <p>通过下面方式可以联系我</p>
      <div className="call">
        <Tooltip
          title={
            <img
              className="wx"
              src="http://fs.1473.cn/86c6d8a1-11af-408a-9f75-f6b46031677d.png"
              alt="微信"
            />
          }>
          <a>&#xe61a;</a>
        </Tooltip>
        <Tooltip title="手机号:15099905119">
          <a >
            &#xe610;
        </a>
        </Tooltip>
        <Tooltip title="372264507@qq.com">
          <a>&#xe61d;</a>
        </Tooltip>
        <Tooltip title="github">
          <a href="https://github.com/hide-on-brush"> &#xe64a;</a>
        </Tooltip>
        <Tooltip title="个人博客">
          <a>&#xe60f;</a>
        </Tooltip>
      </div>
    </div>
    <div className="footer">
      <div className="item">All Rights Reserved</div>
    </div>
  </div>
)

export default CallMe
