import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions as decisionActinos } from '../../reducers/decision'
const { get_decision, del_decision } = decisionActinos
import './style.less';


class TurnTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
        }
    }
    render() {
        return (
            <div className='turnTable_Parent'>
                <div className="Index_Head">
                    <Link to="/小决定/add"><a className="Index_Head_Add">&#xe601;</a></Link>
                </div>
                <div className='Table_Title_Box'>
                    <p>今晚吃点啥</p>
                    <p className='Table_Title'>？？？</p>
                </div>
                <div className='Table_zhuan_Box'>
                    <canvas id="can1" width="426px" height="426px"></canvas>
                </div>
                <div className='Table_zhuan_Fotter'><p>爱滴魔力转圈圈</p></div>
            </div>
        )
    }
    componentWillMount() {
        // this.props.get_decision(this.props.match.params.did);
    }
    componentDidMount() {
        var can1 = document.getElementById("can1");
        var ctx = can1.getContext("2d");
        var nums = [12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5, 12.5];
        var colors = ["#983335", "#77963f", "#5d437c", "#35859f"];
        var start = 0;
        var int = 12.5;
        var zhuan = 0;
        var iszhuan = false;
        var end = 0;
        var angle;
        var req;
        ctx.translate(213, 213);
        //绘制圆饼
        function pieChart() {
            for (var i = 0; i < nums.length; i++) {
                ctx.beginPath();
                ctx.moveTo(0, 0);
                end += (int / 50 * Math.PI);//终止角度
                ctx.strokeStyle = "white";
                ctx.fillStyle = colors[i];
                ctx.arc(0, 0, 200, start, end);
                ctx.fill();
                ctx.closePath();
                ctx.stroke();
                start += int / 50 * Math.PI;//起始角度
            }
        }
        //绘制圆饼上的数值
        function pieNum() {
            for (var i = 0; i < nums.length; i++) {
                start = int / 50 * Math.PI / 2;
                ctx.rotate(end + start +zhuan);//旋转数值
                ctx.font = "25px scans-serif";
                ctx.fillStyle = "#000";
                ctx.fillText(nums[i] + "%", 117, 0);
                end = int / 50 * Math.PI / 2;
            }
        }
        function drawButton() {//绘制按钮，以及按钮上start的字
            ctx.save()
            ctx.beginPath()
            // ctx.rotate(0);
            ctx.fillStyle = '#EDEEF0'
            ctx.arc(0, 0, 60, 0, Math.PI * 2, false)
            ctx.fill()
            ctx.restore()

            //绘制字体
            ctx.save()
            ctx.beginPath()
            ctx.fillStyle = '#3493ef'
            ctx.font = '20px Arial'
            ctx.fillText('冲鸭', -ctx.measureText('冲鸭').width / 2, 8)
            ctx.restore()
        }
        // 绘制箭头
        function drawArrow() {
            ctx.save();
            ctx.beginPath();
            ctx.rotate(24.08-end+start);
            ctx.fillStyle = '#EDEEF0';
            ctx.moveTo(41, 20)//设置起点
            ctx.lineTo(80, -10);    
            ctx.lineTo(30, -32);       
            ctx.closePath();
            ctx.fill();
            ctx.restore();
        }
          
        can1.addEventListener('mousedown', e => {
            zhuan = 0.04
            if(iszhuan){
                return;
            }
            else{
                iszhuan = true;
                req = window.requestAnimationFrame(zhuanquan);
            }
            setTimeout(() => {
                var speed = 0.01;
                var slow = setInterval(_=>{
                    speed<=0?speed=0.01:speed=speed-0.005;
                    zhuan = zhuan-speed;
                    if(zhuan<=0){
                        cancelAnimationFrame(req);
                        iszhuan = false;
                        clearInterval(slow);
                    }
                },200)
            }, 1500);
          })
         
        function render(first){
            pieChart();
            pieNum();
            drawButton();
            drawArrow();
        }
        function zhuanquan(){
            ctx.clearRect(0, 0, 426,426)
            pieChart();
            pieNum();
            drawButton();
            drawArrow();
            req = window.requestAnimationFrame(zhuanquan);
        }
        render(true);
       
    }

}

TurnTable.defaultProps = {
    currentlist: {
        title: "",
        itemarr: [],
        userid: "",
        model: 6,
        repeat: 0
    },
}

function mapStateToProps(state) {
    let currentlist = state.decision.currentlist;
    return {
        currentlist,
    }
}

function mapDispatchToProps(dispatch) {
    return {
        get_decision: bindActionCreators(get_decision, dispatch),
    }
}

export default connect(
    mapStateToProps,
    mapDispatchToProps
)(TurnTable);