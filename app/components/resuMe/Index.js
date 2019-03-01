import * as React from 'react'


const Index = ()=>(
 <div className="index" key="index">
    <img
      className="header-img"
      src="http://fs.1473.cn/e5a5376f-c033-4fa8-a86c-d6ecbae99d7d.jpg"
      alt="header-img"
      key="img"
    />
    <p className="title" key="title">
      生活是一种绵延不绝的渴望，渴望不断上升，变得更伟大而高贵。
    </p>
    <div className="split" key="split" />
    <div className="about_me">
    <p key="name">姓名：李泉</p>
    <p key="work">一名应届毕业生</p>
    <p key="education">学历专业：专科 深圳技师学院 电子信息技术系</p>
    <p key="blog">个人博客：点击左上角</p>
    <p key="post">期望职位：Web前端工程师</p>
    </div>
  </div>
)


export default Index