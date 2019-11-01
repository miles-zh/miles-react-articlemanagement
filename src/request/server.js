import axios from 'axios';
import {message} from 'antd';
const isDev=process.env.NODE_ENV=== 'development'
const service = axios.create({
    baseURL:isDev?'http://rap2api.taobao.org/app/mock/234767':''
})
const service1 = axios.create({  // 不需要拦截
    baseURL: isDev ? 'http://rap2api.taobao.org/app/mock/234767' : ''
})
service.interceptors.request.use((config)=>{
    
    // config.data={
    //     ...config
    // }

    config.data=Object.assign({},config.data,{
        // authToken:window.localStorage.getItem('authToken')
        authToken:'itfffsfsgrga'
    })

    // console.log(config)
    return config
})
service.interceptors.response.use((res)=>{
    // console.log(res.data.code)
    if(res.data.code === 200){
        return res.data.data
    }else{
        // 处理错误
        
        message.error('错误')
    }
})
// 获取文章列表
export const getArticles=(offset,limited)=>{
    return service.post('/api/v1/articlelist',{
        offset,
        limited
    })
}
// 通过id删除文章
export const deleteArticleId=(id)=>{
    return service.post(`/api/v1/articlelistdelete/${id}`)
}
// 通过id获取文章
export const getArticleId = (id) => {
    return service.post(`/api/v1/article/${id}`)
}
// 通过id保存文章
export const saveArticle= (id,data) => {
    return service.post(`/api/v1/articleedit/${id}`,data)
}
export const getArticleAmount = () => {
    return service.post('/api/v1/articleamount')
}
// 设置通知列表
export const getNotifications=()=>{
    return service.post('/api/v1/notification')
}
// 登录
// export const loginRequest = (userInfo) => {
//     return service.post('/api/v1/login',userInfo)
// }

export const loginRequest = (userInfo) => {
    return service1.post('/api/v1/login', userInfo)
}