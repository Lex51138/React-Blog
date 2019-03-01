import * as React from 'react'
const list = [
  {
    content:
      '自己第一个react全栈项目，项目采用前后端分离，代码符合eslint规范，前端采用的技术栈有react，redux,redux-saga,antd等等。' +
      '后端采用的技术栈有node，mongoose,exxpress。',
    title: '个人博客系统及其后台管理',
    url: 'http://lexblog.cn'
  },
  {
    content:
      '针对各类比赛打分管理的系统，技术栈使用的是JQuery+node+mysql' +
      '面向整个校园技能节的所有比赛，对各个比赛的初赛预赛决赛进行分数管理，比赛排名管理，比赛报名管理',
    title: '打分管理系统',
    url: 'http://dafen.1473.cn'
  },
  {
    content:
      '针对攀岩比赛管理的手机端系统，功能包括：选手报名比赛，评委打分，管理多个赛事的裁判，报名裁判等等' +
      '技术栈使用的是JQuery+php+mysql',
    title: '攀岩系统手机端',
    url: 'http://climb.1473.cn/'
  },
  {
    content:
      '来到校园参与的第一个项目，主要面向校园的论坛系统。技术栈有原生js+ajax+php+mysql，' +
      '功能包括：发表帖子，评论帖子，创建新板块，管理帖子用户' ,
    title: 'cms论坛',
    url: 'http://cms.1473.cn/'
  }
]
const Works = () => {
  return (
    <div className="works">
      <p className="title">作品集</p>
      <div className="cards">
        {list.map((item, index) => (
          <div key={index} className="item">
            <span className="work-title">{item.title}</span>
            <p>{item.content}</p>
            <a className="work-link" href={item.url} target="view_window">
              &#xe609;
            </a>
          </div>
        ))}
      </div>
      <p>
        <a
          href="https://github.com/hide-on-brush"
          style={{
            color: '#fff',
            cursor: 'pointer'
          }}>
          在github上查看更多
        </a>
      </p>
    </div>
  )
}

export default Works
