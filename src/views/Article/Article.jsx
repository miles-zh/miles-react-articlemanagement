import React, { Component } from 'react'
import { Card, Button, Table, Tag, Modal, Typography, Message, Tooltip} from 'antd';
import {getArticles,deleteArticleId} from '../../request/server';
import XLSX from 'xlsx'

import moment from 'moment'


const titleDisplayMap={
    id:'id',
    title:'标题',
    author:"作者",
    createAt:"创建时间",
    amount:'阅读量'
}
export default class ArticleList extends Component {
    constructor(){
        super()
        this.state={
            dataSource:[],
            columns:[],
            total:0,
            isLoading:true,
            offset:0,
            limited:5,
            deleteArticleContent:null,
            isShowArticleModal:false,
            deleteArticleConfirmLoading:false,
            currentDeleteArticleId:null,
        }
    }
    getData=()=>{
        getArticles(this.state.offset, this.state.limited).then(res => {
            // console.log(res)
            const columnsKeys = Object.keys(res.list[0])
            const columns = columnsKeys.map(item => {
                if (item === 'amount') {
                    return {
                        title: titleDisplayMap[item],
                        dataIndex: item,
                        key: item,
                        render: (record) => {
                            // const amount = record.amount
                            // console.log(record)
                            return (<Tooltip title={record > 200 ? '超过200' : '未超过200'}>
                                    <Tag color={record > 200 ? '#f40' : 'green'} >{record}</Tag>
                                </Tooltip>)
                            //  return   <Tag>dd</Tag>
                            
                        }

                    }
                } else if (item === 'createAt') {
                    return {
                        title: titleDisplayMap[item],
                        dataIndex: item,
                        key: item,
                        render: (text, record) => {
                            const createAt = record.createAt
                            return moment(createAt).format('YYYY年MM月DD日 HH:mm:ss')
                        }

                    }
                } else {
                    return {
                        title: titleDisplayMap[item],
                        dataIndex: item,
                        key: item,

                    }
                }

            })
            columns.push({
                title: '操作',
                key: 'action',
                render: (record) => {
                    return <Button.Group>
                        <Button type="primary" size="small" onClick={()=>{
                            this.toEdit(record)
                        }}>
                            编辑
                        </Button>
                        <Button type="danger" size="small" onClick={()=>{
                            this.showDeleteArticle(record)
                        }}>
                            删除
                        </Button>
                    </Button.Group>
                }
            })
            // 如果请求完成后组件已经销毁，就不需要setState
            // if(!this.updater.isMounted(this)) return;
            this.setState({
                total: res.total,
                dataSource: this.state.dataSource.concat(res.list),
                columns: columns,

            },()=>{
                // console.log(this.state.dataSource)
            })
        }).catch((err) => {
            // 处理错误
        }).finally(() => {
            // if (!this.updater.isMounted(this)) return;
            this.setState({
                isLoading: false
            })
        })
    }
    toEdit=(record)=>{
        // console.log(record)
        this.props.history.push({
            pathname:`/admin/article/${record.id}`,
            // state:{
            //     title:record.title
            // }
        })
    }
    showDeleteArticle=(record)=>{
        console.log(record)
        // 使用函数的方式定制不强
        // Modal.confirm({
        //     title:<Typography>确定要删除<b style={{color:'#f00'}}>{ record.title }</b>这一篇文章?</Typography>,
        //     content:'此操作不可逆，请考虑清楚',
        //     onOk:()=>{
        //         deleteArticleh(record.id).then((res)=>{
        //             console.log(res)
        //         })
        //     }
        // })


        this.setState({
            isShowArticleModal:true,
            deleteArticleContent: <Typography>确定要删除<b style={{ color: '#f00' }}>{record.title}</b>这一篇文章?</Typography>,
            currentDeleteArticleId:record.id
        })
    }
    hideDeleteModal=()=>{
        this.setState({
            isShowArticleModal:false,
            deleteArticleConfirmLoading:false,
        })
    }
    deleteArticle=(id)=>{
        this.setState({
            deleteArticleConfirmLoading:true
        })
        deleteArticleId(id).then((res)=>{
            // console.log(res)
            Message.success(res.msg)
        }).finally(()=>{
            this.setState({
                deleteArticleConfirmLoading: false,
                isShowArticleModal:false,
                offset:0
            },()=>{
                this.getData()
            })
            
            
        })
    }
    componentDidMount(){
        // console.log(this.updater.isMounted(this))
        this.setState({
            isLoading:true
        })
        this.getData()
    }
    componentWillUnmount(){

    }
    onPageChange=(page,pageSize)=>{
        console.log({page,pageSize})
        this.setState({
            offset:(page-1)*pageSize,
            limited:pageSize
        },()=>{
            this.getData()
        })
    }
    onShowSizeChange=(current,size)=>{
        // console.log({current,size})
        this.setState({
            offset:0,
            limited:size
        },()=>{
            this.getData()
        })
    }
    toExcel=()=>{
        // console.log('toExcel')
        /* convert state to workbook */

        // const data=[Object.keys(this.state.dataSource[0])]
        const data=[['文章标题','作者','阅读量','创建日期']]
        // const dataSource=this.state.dataSource.reduce()
        for(let i=0;i<this.state.dataSource.length;i++){
            data.push([ 
                this.state.dataSource[i].title,
                this.state.dataSource[i].author,
                this.state.dataSource[i].amount,
                moment(this.state.dataSource[i].createAt).format('YYYY-MM-DD HH:mm:ss')
            ])
        }
        // console.log(data)

        const ws = XLSX.utils.aoa_to_sheet(data);
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, "SheetJS");
        /* generate XLSX file and send to client */
        XLSX.writeFile(wb, `articles${moment().format('YYYY-MM-DD HH-mm-ss')}.xlsx`)
    }
    render() {
        return (
            <>
            
                <Card 
                title="文章列表" 
                bordered={false} 
                
                extra={<Button onClick={this.toExcel}>导出excel</Button>} >
                    <Table 
                            rowKey={record=>record.id}
                            dataSource={this.state.dataSource} 
                            columns={this.state.columns}
                            pagination={{
                                current:this.state.offset/this.state.limited+1,
                                total:this.state.total,
                                hideOnSinglePage:true,
                                showQuickJumper: true,
                                showSizeChanger: true,
                                onChange:this.onPageChange,
                                onShowSizeChange:this.onShowSizeChange,
                                pageSizeOptions:['5','10','20','30','40']
                                
                            }}
                            scroll={{
                                y: 300
                            }} 
                            loading={this.state.isLoading} >;
                    </Table>
                    <Modal 
                        title='此操作不可逆，请考虑清楚！！！'
                        visible={this.state.isShowArticleModal}
                        onCancel={this.hideDeleteModal}
                        maskClosable={false}
                        confirmLoading={this.state.deleteArticleConfirmLoading}
                        onOk={()=>{this.deleteArticle(this.state.currentDeleteArticleId)}}
                    >
                        {this.state.deleteArticleContent}
                    </Modal>
                </Card>
                
            </>
        )
    }
}
