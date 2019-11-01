import React, { Component } from 'react'
import { Icon, Input, Button, Checkbox,Form,Card} from 'antd'
import {connect} from 'react-redux'
import './login.less'
import {login} from '../../actions/usersaction'
import {Redirect} from 'react-router-dom';
const mapState=state=>({
    isLogin:state.usersreducer.isLogin,
    isLoading: state.usersreducer.isLoading
})

// @connect(mapState)
 class Login extends Component {
     handleSubmit = e => {
         e.preventDefault();
         this.props.form.validateFields((err, values) => {
             if (!err) {
                 console.log(values);
                 this.props.login(values)
             }
         });
     };
    render() {
        // console.log(this.props)
        const { getFieldDecorator } = this.props.form;
        return (
            this.props.isLogin ? <Redirect to='/admin'></Redirect> :
            <>
                
                <Card title='QF admin 登录' className='qf-login-wrapper'>
                <Form onSubmit={this.handleSubmit} className="login-form">
                    <Form.Item>
                        {getFieldDecorator('username', {
                            rules: [{ required: true, message: '用户名必填' }],
                        })(
                            <Input
                                prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                placeholder="用户名"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('password', {
                            rules: [{ required: true, message: '密码必填' }],
                        })(
                            <Input
                                prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                type="password"
                                placeholder="密码"
                            />,
                        )}
                    </Form.Item>
                    <Form.Item>
                        {getFieldDecorator('remember', {
                            valuePropName: 'checked',
                            initialValue: true,
                        })(<Checkbox>记住我</Checkbox>)}
                        
                        <Button type="primary" htmlType="submit" className="login-form-button">
                            登录
                        </Button>
                       
                    </Form.Item>
                </Form>
                </Card>
            </>
        )
    }
}


export default connect(mapState,{login})(Form.create()(Login))