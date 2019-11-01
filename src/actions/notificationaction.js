

import actionTypes from './actionTypes'
// console.log(actionTypes)
import {
    getNotifications
} from '../request/server';

const startPost=()=>{
    return {
        type:actionTypes.START_NOTIFICATION_POST
    }
}

const finishPost = () => {
    return {
        type: actionTypes.FINISH_NOTIFICATION_POST
    }
}
export const markNotificationAsReadById=(id)=>{
    // console.log(id)
    return dispatch=>{
        dispatch(startPost())
        // 模拟的是一个服务端的请求
        setTimeout(()=>{
            dispatch({type:actionTypes.MARK_NOTIFICATION_AS_READ_BY_ID,payload:{id}})
            dispatch(finishPost())
        },1000)
    }
}
export const markAllNotificationAsRead = () => {
    // console.log(actionTypes.MARK_ALL_NOTIFICATION_AS_READ)
    return dispatch => {
        dispatch(startPost())
        // 模拟的是一个服务端的请求
        setTimeout(() => {
            dispatch({
                type: actionTypes.MARK_ALL_NOTIFICATION_AS_READ,
                
            })
            dispatch(finishPost())
        }, 1000)
    }
}
export const getNotificationList=()=>{
    return dispatch=>{
        dispatch(startPost())
        getNotifications().then(res => {
            // console.log(res)
            dispatch({
                type:actionTypes.RECIVED_NOTIFICATIONS,
                payload:{list:res.list}
            })
            dispatch(finishPost())
        })
    }
}