import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import { actions as decisionActinos } from '../../reducers/decision'
const { get_decision, del_decision } = decisionActinos
import './style.less';

let canvas = 0;
let repeatarr = new Array();
const zhizhen = [
    {}, {'zhen': '-0'},
    {'zhen': '-12'},
    {'zhen': '1'},
    {'zhen':'0.97'},
    {'zhen':'1.1'},
    {'zhen':'1.15'},
    {'zhen':'1.22'},
    {'zhen':'1.23'},
    {'zhen':'1.35'},
    {'zhen':'1.28'},
    {'zhen':'1.35'}
]
const TableScript = (itemarr) =>{
     if(document.getElementById("can1")===null||canvas>=1||itemarr.length==0)return;
        //运行canvas脚本
        var can1 = document.getElementById("can1");
        var ctx = can1.getContext("2d");
        // ctx.clearRect(0, 0, 1000,1000);
        canvas++
        var nums =   itemarr;
        var colors = ["#983335", "#77963f", "#5d437c", "#35859f","#983335","#35859f","#983345","#985335","#52437c","#983345","#779633","#35859d"];
        var start = 0;
        var int = 100/itemarr.length;
        var zhuan = 0;
        var iszhuan = false;
        var end = 0;
        var angle = 0;
        var req;
        var result;
         
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

        //绘制圆饼上的数
        function pieNum() {
            for (var i = 0; i < nums.length; i++) {
                start = int / 50 * Math.PI / 2;
                ctx.rotate(end + start +zhuan);//旋转数值
                if(nums[i].length>6){//字数多的话多行显示字体
                    ctx.font = "16px scans-serif";
                    ctx.fillStyle = "#000";
                    var newarr = nums[i].split("");
                    newarr.map((item,key)=>{
                        if(key>7){
                            ctx.fillText(item, key*14.5-34, 20);
                        }
                        else{
                            ctx.fillText(item, 80+key*14.5, 0);
                        }
                    })
                }
                else if(nums[i].length>4){
                    ctx.font = "17px scans-serif";
                    ctx.fillStyle = "#000";
                    ctx.fillText(nums[i], 90, 10);
                }
                else{
                    ctx.font = "20px scans-serif";
                    ctx.fillStyle = "#000";
                    ctx.fillText(nums[i], 117, 10); 
                }
                end = int / 50 * Math.PI / 2;
                angle += end + start +zhuan;
            }
        }
        function drawButton() {//绘制按钮，以及按钮上start的字
            ctx.save()
            ctx.beginPath()
            ctx.fillStyle = '#EDEEF0'
            ctx.arc(0, 0, 60, 0, Math.PI * 2, false)
            ctx.fill()
            ctx.restore()

            //绘制字体
            ctx.save()
            ctx.beginPath()
            ctx.rotate(0.36-angle);//保持字体不转动
            ctx.fillStyle = '#3493ef'
            ctx.font = '20px Arial'
            ctx.fillText('冲鸭', -ctx.measureText('冲鸭').width / 2, 8)
            
            ctx.restore()
        }
        // 绘制箭头
        function drawArrow() {
            let piancha = parseFloat(zhizhen[nums.length-1].zhen);

            ctx.save();
            ctx.beginPath();
             ctx.rotate(0.15-angle-piancha);//调整箭头角度 减去当前转动的角度总和使箭头看起来不会旋转
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
                    speed<=0?speed=0.01:speed=speed-0.002;
                    zhuan = zhuan-speed;
                    if(zhuan<=0){
                        cancelAnimationFrame(req);
                        iszhuan = false;
                        clearInterval(slow);
                    }
                },450)
            }, 1200);
          })
         
        function render(){
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
        render();
        canvas++;
}

class TurnTable extends Component {
    constructor(props) {
        super(props);
        this.state = {
            time: '',
        }
    }
    render() {
        const goBack = () => {
            history.go(-1);
        }
        let {itemarr,repeat} = this.props.currentlist
        return (
            <div className='turnTable_Parent'>
                <div className="Index_Head">
                    <a className='Index_Head_Return' onClick={goBack}>&#xe8b5;</a>
                </div>
                <div className='Table_Title_Box'>
                    <p>{this.props.currentlist.title}</p>
                </div>
                <div className='Table_zhuan_Box'>
                    <canvas id="can1" width="426px" height="426px"></canvas>  
                </div>
                {
                    TableScript(itemarr,repeat)
                }
                <div className='Table_zhuan_Fotter'><p>爱滴魔力转圈圈</p></div>
            </div>
        )
    }
    componentDidMount() {
        this.props.get_decision('',1,this.props.match.params.did);
        document.documentElement.scrollTop = 0;//回到顶部
    }
    componentWillMount(){
        canvas = 0;
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