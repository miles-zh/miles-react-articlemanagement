import React, { Component } from 'react'
import { Layout, Menu, Icon,Dropdown,Avatar,Badge} from 'antd';
import {withRouter} from 'react-router-dom';
import {adminRouter}from '../../routes/route';
import {connect} from 'react-redux'
import { getNotificationList} from '../../actions/notificationaction'
import {logout} from '../../actions/usersaction';
import logo from './logo.png';
import './frame.less';
const { Header, Content, Sider } = Layout;

const menus=adminRouter.filter(route=>route.isNav===true)
const mapState=state=>{
    // console.log(state.notificationreducer.list)
    return {
        notificationCount:state.notificationreducer.list.filter(item=>
            item.hasRead===false
        ).length,
        avatar:state.usersreducer.avatar,
        displayName: state.usersreducer.displayName
    }
}
// @withRouter
// @connect(mapState,{getNotificationList,logout})
class Frame extends Component {
    componentDidMount(){
        this.props.getNotificationList()
    }
    onMenuClick = ({key})=>{
        // console.log(key)
        // console.log(this.props)
         this.props.history.push(key)
        
    }
    
    onDropdownMenuClick = ({key}) => {
        // console.log(key)
        if (key ==='/login'){
            this.props.logout()
        }else{
            this.props.history.push(key)
        }
        
    }
    render() {
        // console.log(this.props.avatar)
        const selectedKeyArr = this.props.location.pathname.split('/');
        // console.log(selectedKeyArr)
        selectedKeyArr.length === 2 ? selectedKeyArr.push('dashboard') : selectedKeyArr.length=3
        // console.log(selectedKeyArr)
        const menu = (
            <Menu onClick={this.onDropdownMenuClick}>
                <Menu.Item key="/admin/notification" >
                    <Badge dot={Boolean(this.props.notificationCount)}>
                    
                        通知中心
                   </Badge>
                </Menu.Item>
                <Menu.Item key="/admin/profile">
                    
                        个人设置
                   
                </Menu.Item>  
                <Menu.Item key="/login" >
                    
                        退出登录
                    
                </Menu.Item>  
            </Menu>
        );
        
        return (
            
            <>   
                <Layout style={{ maxHeight:'95%'}}>
                    <Header className="header qf-header" style={{backgroundColor:'#fff'}}>
                        <div className="logo qf-logo">
                           <img src={logo} alt="QFRAME"/> 
                        </div>
                        <div>
                            <Dropdown overlay={menu}>
                                
                                    <div className="ant-dropdown-link" href="#">
                                    <Avatar src={this.props.avatar} />

                                        <span>欢迎您！{this.props.displayName}</span> 
                                    <Badge count={this.props.notificationCount} offset={[-20,-10]}>
                                        <Icon type="down" />
                                        </Badge>
                                    </div>
                                
                                
                            </Dropdown>,
                        </div>
                    </Header>
                    <Layout>
                        <Sider width={150} style={{ background: '#fff' }}>
                            <Menu
                                mode="inline"
                                defaultSelectedKeys={[selectedKeyArr.join('/')]}
                                onClick={this.onMenuClick}
                                style={{ height: '100%', borderRight: 0 }}
                            >
                                
                                    {/* <Menu.Item key="1">option1</Menu.Item> */}
                                   {
                                       menus.map(item=>{
                                           return (
                                               <Menu.Item key={item.pathname}>
                                                   <Icon type={item.icon} />
                                                    {item.title}
                                               </Menu.Item>
                                           )
                                       })
                                   }
                               
                            </Menu>
                        </Sider>
                        <Layout style={{ padding: '10px'}}>
                            
                            <Content
                                style={{
                                    background: '#fff',
                                    padding: 24,
                                    margin: 0,
                                    minHeight: 280,
                                }}
                            >
                                {this.props.children}
                            </Content>
                        </Layout>
                    </Layout>
                </Layout>,
            </>
        )
    }
}

export default connect(mapState, { getNotificationList, logout })(withRouter(Frame))