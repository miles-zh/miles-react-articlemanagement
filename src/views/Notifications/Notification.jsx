import React, { Component } from 'react'
// import InfiniteScroll from 'react-infinite-scroller';
import {Card,Button,List,Avatar,Badge,Spin} from 'antd'
import {connect} from 'react-redux'
import {markNotificationAsReadById,markAllNotificationAsRead} from '../../actions/notificationaction'
// const data = [
//     {
//         title: 'Ant Design Title 1',
//     },
//     {
//         title: 'Ant Design Title 2',
//     },
//     {
//         title: 'Ant Design Title 3',
//     },
//     {
//         title: 'Ant Design Title 4',
//     },
// ];
const mapState= state =>{
    // console.log(state.notificationreducer)
    const {
        list,
        isLoading
    } = state.notificationreducer
    return {
        list,
        isLoading
    }
}
// @connect(mapState,{markNotificationAsReadById,markAllNotificationAsRead})
 class Notification extends Component {
    render() {
        // console.log(this.props)
        return (
            <div>
                
                <Spin spinning={this.props.isLoading}>
                <Card title='通知中心' bordered={false} extra={<Button disabled={this.props.list.every(item=>item.hasRead===true)} onClick={this.props.markAllNotificationAsRead.bind(this)}>全部标记位已读</Button>}>
                        
                            <List
                                style={{maxHeight:"300px",overflow:'auto'}}
                                itemLayout="horizontal"
                                dataSource={this.props.list}
                                renderItem={item => (
                                    <List.Item extra={
                                    item.hasRead?null:<Button onClick={this.props.markNotificationAsReadById.bind(this,item.id)}>标记为已读</Button> 
                                    }>
                                        <List.Item.Meta
                                            avatar={<Avatar src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png" />}
                                            title={<Badge dot={!item.hasRead}>{item.title}</Badge>}
                                            description={item.desc}
                                        />
                                    </List.Item>
                                )}
                                
                            />,
                        
                    
                </Card>
                </Spin>
            </div>
        )
    }
}
export default connect(mapState, { markNotificationAsReadById, markAllNotificationAsRead })(Notification)
