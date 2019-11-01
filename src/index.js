import React from 'react';
import {render} from 'react-dom';
import { ConfigProvider } from 'antd';
import zhCN from 'antd/es/locale/zh_CN';
import App from './App';
import './index.less';
import {HashRouter as Router,Route,Switch,Redirect} from 'react-router-dom'
import {mainRouter} from './routes/route'
import store from './store';
import {Provider} from 'react-redux';
// console.log(store.getState())
render(
    <Provider store={store}>
    <ConfigProvider locale={zhCN}>
    <Router>
        <Switch>
            <Route path='/admin' 
            // render={(routeProps)=>{
            //     // Todo 权限，需要登录才能够访问/admin
            //     return store.getState().usersreducer.isLogin? <App {...routeProps} />:<Redirect to='/login'></Redirect>
            // }}
            component={App}
            ></Route>
            {
                mainRouter.map(route=>{
                    return <Route path={route.pathname} component={route.component} key={route.pathname}></Route>
                })
            }
            <Redirect to='/admin' from='/' exact></Redirect>
            <Redirect to='/404'></Redirect>
        </Switch> 
    </Router>
    </ConfigProvider>
    </Provider>,
    document.querySelector('#root')
)