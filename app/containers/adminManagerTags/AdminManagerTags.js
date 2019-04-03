import React,{Component,PropTypes} from 'react'
import {connect} from 'react-redux'
import {bindActionCreators} from 'redux'
import {actions} from '../../reducers/adminManagerTags'
import style from './style.css'
import {Tag, Input, Tooltip, Button} from 'antd'

const {get_all_tags,delete_tag,add_tag} = actions;

class AdminManagerTags extends Component{
    constructor(props){
        super(props);
        this.state={
            tags: ['首页', 'HTML', 'CSS','JAVASCRIPT'],
            inputVisible: false,
            inputValue: '',
        }
    }
    handleClose = (removedTag) => {
        //删除标签
        this.props.deleteTag(removedTag)
    };

    showInput = () => {
        this.setState({ inputVisible: true }, () => this.input.focus());
    };

    handleInputChange = (e) => {
        this.setState({ inputValue: e.target.value });
    };

    handleInputConfirm = (e) => {
        // 添加标签
        this.props.addTag({'name':this.state.inputValue,'type':e.target.id});
        this.setState({
            inputVisible:  false,
            inputValue: '',
        });
    };

    saveInputRef = input => this.input = input;
    render(){
        const { inputVisible, inputValue } = this.state;
        const {tags} = this.props;
        let data;
        data = tags;
        return(
            <div>
                <h2 className={style.titleStyle}>标签管理</h2>
                {
                    data.map((tag, index) => {
                     if(tag.type=='main'){
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag className={style.tagStyle} key={index} closable={index !== 0} afterClose={() => this.handleClose(tag.name)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag.name}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip key={tag.name} title={tag.name}>{tagElem}</Tooltip> : tagElem;
                     }
                })}
                {inputVisible && (
                    <Input
                        className={style.tagStyle}
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        style={{ width: 108 }}
                        value={inputValue}
                        id='main'
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && <Button className={style.tagStyle} size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>}
                <h2 className={style.titleStyle}>云标签管理</h2>

                {data.map((tag, index) => {
                    if(tag.type=='cloud'){
                    const isLongTag = tag.length > 20;
                    const tagElem = (
                        <Tag className={style.tagStyle} key={index} closable={index !== 0} afterClose={() => this.handleClose(tag.name)}>
                            {isLongTag ? `${tag.slice(0, 20)}...` : tag.name}
                        </Tag>
                    );
                    return isLongTag ? <Tooltip key={tag.name} title={tag.name}>{tagElem}</Tooltip> : tagElem;
                    }
                })}
                {inputVisible && (
                    <Input
                        className={style.tagStyle}
                        ref={this.saveInputRef}
                        type="text"
                        size="small"
                        id='cloud'
                        style={{ width: 108 }}
                        value={inputValue}
                        onChange={this.handleInputChange}
                        onBlur={this.handleInputConfirm}
                        onPressEnter={this.handleInputConfirm}
                    />
                )}
                {!inputVisible && <Button className={style.tagStyle} size="small" type="dashed" onClick={this.showInput}>+ New Tag</Button>}

            </div>
        )
    }
    componentDidMount() {
        this.props.getAllTags(1);
    }
}
function mapStateToProps(state) {
    return{
        tags:state.admin.tags
    }
}

function mapDispatchToProps(dispatch) {
    return{
        getAllTags : bindActionCreators(get_all_tags,dispatch),
        deleteTag : bindActionCreators(delete_tag,dispatch),
        addTag : bindActionCreators(add_tag,dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(AdminManagerTags)