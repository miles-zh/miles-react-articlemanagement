import actionTypes from './actionTypes'
// console.log(actionTypes)
import {
    loginRequest
} from '../request/server';


const startLogin=()=>{
    return {
        type:actionTypes.START_LOGIN
    }
}
const loginSuccess = (userInfo) => {

    return {
        type: actionTypes.LOGIN_SUCCESS,
        payload:{
            userInfo
        }

    }
}
const loginFailed = () => {
     window.localStorage.removeItem('authToken')
     window.sessionStorage.removeItem('authToken')
     window.localStorage.removeItem('userInfo')
     window.sessionStorage.removeItem('userInfo')
    return {
        type: actionTypes.LOGIN_FAILED
    }
}

export const login =(userInfo)=>{
    
    return dispatch=>{
        dispatch(startLogin())
        loginRequest(userInfo).then(res=>{
            // console.log(res)
            const {
                authToken,
                ...userInfo
            }=res.data.data
            if(res.data.code===200){
                if(userInfo.remember===true){
                    window.localStorage.setItem('authToken',authToken)
                    window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
                }else{
                    window.sessionStorage.setItem('authToken', authToken)
                    window.sessionStorage.setItem('userInfo', JSON.stringify(userInfo))
                }
                
                dispatch(loginSuccess(res.data.data))
            }else{
                dispatch(loginFailed())
            }
        })
    }

}

export const logout=()=>{
    // 实际的项目中要告诉服务端已经退出
    return dispatch=>{
        dispatch(loginFailed())
    }
}

export const changeAvatar=(avatarUrl)=>{
    return {
        type:actionTypes.CHANGE_AVATAR,
        payload:{
            avatarUrl
        }
    }
}