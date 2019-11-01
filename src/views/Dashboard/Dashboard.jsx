import React, { Component ,createRef} from 'react'
import {Card,Row,Col} from 'antd'
import './dashboard.less'
import echarts from 'echarts'
import {getArticleAmount} from '../../request/server'

// const overViewColors=[]
// console.log(echarts)

export default class Dashboard extends Component {
    constructor(){
        super()
        this.articleAmount=createRef()
    }
    initArticleChart=()=>{
        this.articleChart=echarts.init(this.articleAmount.current)
        getArticleAmount().then(res=>{
            // console.log(res)
            const option = {
                color: ['#3398DB'],
                tooltip: {
                    trigger: 'axis',
                    axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                        type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                    }
                },
                grid: {
                    left: '3%',
                    right: '4%',
                    bottom: '3%',
                    containLabel: true
                },
                xAxis: {
                    type: 'category',
                    axisTick: {
                        alignWithLabel: true
                    },
                    data: res.amount.map(item=>item.month
                    )
                },
                yAxis: {
                    type: 'value'
                },
                series: [{
                    data: Object.values(res.amount),
                    type: 'bar',
                    // areaStyle: {},
                    name: '直接访问',
                    barWidth: '40%',
                }]
            };
            this.articleChart.setOption(option);
        })
        


        // 使用刚指定的配置项和数据显示图表。
        
    }
    componentDidMount(){
        this.initArticleChart()

    }
    render() {
        return (
            <>
                <Card title='概览' bordered={true}>
                    <Row gutter={16}>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box qf-gutter-box" style={{backgroundColor:'#2986f6'}}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box qf-gutter-box" style={{ backgroundColor: '#29f6f6' }}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box qf-gutter-box" style={{ backgroundColor: '#2f86f6' }}>col-6</div>
                        </Col>
                        <Col className="gutter-row" span={6}>
                            <div className="gutter-box qf-gutter-box" style={{ backgroundColor: '#f906f6' }}>col-6</div>
                        </Col>
                    </Row>
                </Card>
                <Card title='用户文章浏览量' bordered={true}>
                    <div ref={this.articleAmount} style={{height:'300px'}}></div>
                </Card>
                
            </>
        )
    }
}
