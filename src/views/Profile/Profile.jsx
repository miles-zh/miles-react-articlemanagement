import React, { Component } from 'react'

import {Card,Upload,Spin} from 'antd'


import axios from 'axios'

import {connect}from 'react-redux'
import { changeAvatar } from '../../actions/usersaction'



const mapState=state=>{
    return {
        avatarUrl:state.usersreducer.avatar
    }
}

 class Profile extends Component {
    constructor(){
        super()
        this.state = {
            isUpLoading: false,
            avatarUrl:''
        };
    }

    handleUploadAvatar = ({file})=> {
        // console.log(file)
        this.setState({
            isUpLoading:true
        })
        const data=new FormData()
        data.append('Token','91177a605aa2fdaec3eb33dd0ac9db83dec51b72:sYj3Owqrl-wCL9JlMBSUbifHG_U=:eyJkZWFkbGluZSI6MTU3MjYxMDUzNywiYWN0aW9uIjoiZ2V0IiwidWlkIjoiNzAyODE0IiwiYWlkIjoiMTY0MjEyNyIsImZyb20iOiJmaWxlIn0=')
        data.append('file',file)
        // console.log(data)
        axios.post('http://up.imgapi.com',data).then(res=>{
            console.log(res)
            if(res.status===200){
                // this.setState({
                //     avatarUrl:res.data.linkurl
                // })
                this.props.changeAvatar(res.data.linkurl)
            }
        }).catch(err=>{}).finally(()=>{
            this.setState({
                isUpLoading:false
            })
        })
    }
    render() {
        console.log(this.props)
        return (
            <div>
                <Card title="个人设置" bordered={false}>
                    <Upload
                    name="avatar"
                    listType="picture-card"
                    className="avatar-uploader"
                    showUploadList={false}
                    // action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
                    
                    customRequest={this.handleUploadAvatar}
                    >
                        <Spin spinning={this.state.isUpLoading}>
                            {this.props.avatarUrl ? <img src={this.props.avatarUrl} alt="avatar" style={{ width: '100%' }} /> : <span>点击上传</span>}
                        </Spin>
                    
                </Upload>
                </Card>
                
            </div>
        )
    }
}
export default connect(mapState,{changeAvatar})(Profile)
