import React, { Component } from 'react'
import {Route,Switch,Redirect} from 'react-router-dom'
import {
    adminRouter
} from './routes/route'
import {Frame} from './components/component';
// import {Noauth}from './views/view';
import {connect} from 'react-redux';
// console.log(Frame)
// 定义高阶组件
// const testHOC= (WrappedComponent)=>{
//     return class HOCComponent extends Component{
//         render(){
//             return (
//                 <>
//                 <WrappedComponent></WrappedComponent>
//                 <div>这是高阶组件里的信息</div>
//                 </>
//             )
//         }
//     }
// }
// console.log(adminRouter)

// @testHOC


const mapState= state =>{
   return {
       isLogin:state.usersreducer.isLogin,
       role:state.usersreducer.role
   } 
}
 class App extends Component {
    render() {
        // console.log(this.props)
        return (
            this.props.isLogin?
            <Frame>
    
                <Switch>
                    {
                        adminRouter.map(route => {
                            return <Route 
                            key={route.pathname} 
                            path = { route.pathname}
                            exact={route.exact}
                            render = {
                                    (routeProps) => {
                                     
                                        // console.log(route.roles.includes(this.props.role))
                                        // console.log(route.roles)
                                        // console.log(this.props)

                               return (route.roles.includes(this.props.role))?(<route.component {...routeProps} />):(<Redirect to='/admin/noauth' />)
                               
                                
                            }}></Route>
                        })  
                    }
                    <Redirect to={adminRouter[0].pathname} from="/admin" exact></Redirect>
                    <Redirect to='/404' ></Redirect>
                </Switch>
            </Frame>
            :
            <Redirect to='/login'></Redirect>
        )
    }
}

// export default testHOC(App)
export default connect(mapState)(App)