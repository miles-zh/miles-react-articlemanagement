import React, { Component ,createRef} from 'react'
import { Button, Card, Form, Input, DatePicker,Spin,message} from 'antd'
import E from 'wangeditor'
import './edit.less'
import { getArticleId ,saveArticle} from '../../request/server'
import moment from 'moment'
// @Form.create()


const formItemLayout={
    labelCol:{
        span:4
    },
    wrapperCol:{
        span:16
    }
}
 class Edit extends Component {
     constructor(){
         super()
         this.editorRef=createRef()
         this.state={
             isLoading:false
         }
     }
     handleSubmit=(e)=>{
         e.preventDefault();
         this.setState({
             isLoading: true
         })
         this.props.form.validateFields((err, values) => {
             if (!err) {
                //  console.log('Received values of form: ', values);
                 const data=Object.assign({},values,{
                     createAt:values.createAt.valueOf()
                 })
                //  console.log(data)
                 saveArticle(this.props.match.params.id,data).then(res=>{
                     console.log(res)
                     message.success(res.msg)
                     // 根据需求实现跳转
                     this.props.history.push('/admin/article')
                 }).finally(()=>{
                     this.setState({
                         isLoading: false
                     })
                 })
             }
         });
     }
     initEditor=()=>{
         this.editor=new E(this.editorRef.current)
         this.editor.customConfig.onchange = (html)=> {
             // html 即变化之后的内容
            //  console.log(html)
            //  console.log(this.props)
             this.props.form.setFieldsValue({
                 content:html
             })
         }
         this.editor.create()
     }
     componentDidMount(){
         this.initEditor()
         this.setState({
             isLoading:true
         })
         getArticleId(this.props.match.params.id).then(res=>{
            //  console.log(res)
             this.props.form.setFieldsValue({
                 
                 title:res.title,
                 author:res.author,
                 amount:res.amount,
                //  content: res.content,
                 createAt:moment(res.createAt)

             })
             this.editor.txt.html(res.content)
         }).finally(()=>{
             this.setState({
                 isLoading: false
             })
         })
     }
    render() {
        // console.log(this.props)
        const {
                getFieldDecorator
            }=this.props.form
        return (
            
            <>
                <Card
                title='文章编辑页'
                bordered={false}
                extra={<Button onClick={this.props.history.goBack}>取消</Button>}
                >
                    <Spin spinning={this.state.isLoading}>
                    <Form 
                    onSubmit={this.handleSubmit} 
                    // className="login-form"
                    // labelCol={{span:4}}
                    // wrapperCol={{span:20}}
                    {...formItemLayout}
                    >
                        <Form.Item label="标题">
                            {getFieldDecorator('title', {
                                rules: [{ required: true, message: 'Please input your title!'},{min:10,message:'title必须大于10位'},{max:20,message:'title必须小于20位'}],
                            })(
                                <Input
                                    // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="title"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="作者">
                            {getFieldDecorator('author', {
                                rules: [{ required: true, message: 'Please input your author!' }, { min: 2, message: 'author必须大于2位' }, { max: 4, message: 'author必须小于4位' }],
                            })(
                                <Input
                                    // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="admin"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="阅读量">
                            {getFieldDecorator('amount', {
                                rules: [{ required: false, message: 'Please input your amount!' }],
                            })(
                                <Input
                                    // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                    placeholder="0"
                                />,
                            )}
                        </Form.Item>
                        <Form.Item label="发布时间">
                            {getFieldDecorator('createAt', {
                                rules: [{ required: true, message: 'Please input your createAt!' }],
                            })(
                                // <Input
                                //     // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                //     placeholder="0"
                                // />,
                                <DatePicker showTime placeholder='选择时间' />
                            )}
                        </Form.Item>
                        <Form.Item label="文章内容">
                            {getFieldDecorator('content', {
                                rules: [{ required: true, message: 'Please input your content!' }],
                                initialValue:'我是一个初始值'
                            })(
                                // <Input
                                //     // prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }} />}
                                //     placeholder="0"
                                // />,
                                // <div contentEditable style={{minHeight:'200px',border:'1px solid #ccc'}}></div>
                                <div ref={this.editorRef} className='qf-editor'></div>
                            )}
                        </Form.Item>
                        
                        <Form.Item
                            wrapperCol={{
                                 offset: 4
                            }}
                        >
                            <Button type="primary" htmlType="submit">
                                保存修改
                            </Button>
                        </Form.Item>
                    </Form>
                    </Spin>
                </Card>
            </>
        )
    }
}
// export default Edit
export default Form.create()(Edit)
