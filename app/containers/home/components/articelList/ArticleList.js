import React,{Component,PropTypes} from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import QueueAnim from 'rc-queue-anim'
import {ArticleListCell} from "../articleListCell/ArticleListCell";

export default class ArticleList extends Component{
    constructor(props){
        super(props);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this)
    }
    render(){
        let cloudTags  = [];
        const {tagsItem} = this.props;
        return(
            <div>
                <QueueAnim
                    animConfig={[
                      { opacity: [1, 0], translateY: [0, 50] },
                      { opacity: [1, 0], translateY: [0, -50] }
                    ]}>
                    {
                        this.props.data.map((item,index)=>{
                            cloudTags = [];
                            item.tags.map(result=>{
                                for(let i = 0;i<tagsItem.length;i++){
                                    if(tagsItem[i].name==result&&tagsItem[i].type=='cloud'){
                                        cloudTags.push(result);
                                    }
                                }
                            })
                            return(<ArticleListCell getArticleDetail={this.props.getArticleDetail} history={this.props.history} key={index} data={item} cloudTags={cloudTags}/>)
                        })
                    }
                </QueueAnim>
            </div>
        )
    }
}