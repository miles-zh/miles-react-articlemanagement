
import Loading from '../components/Loading/Loading';
import Loadable from 'react-loadable';
// console.log(Loading)

// import Dashboard from './Dashboard/Dashboard';
// import Login from './Login/Login';
// import Notfound from './Notfound/Notfound';
// import Setting from './Settings/Setting';
// import ArticleList from './Article/Article';
// import ArticleEdit from './Article/Edit';


const Dashboard=Loadable({
    loader:()=>import('./Dashboard/Dashboard'),
    loading: Loading,
})   


const Setting = Loadable({
    loader: () =>import('./Settings/Setting'),
    loading: Loading,
})
const Login=Loadable({
    loader:()=>import('./Login/Login'),
    loading: Loading,
})   
const Notfound=Loadable({
    loader:()=>import('./Notfound/Notfound'),
    loading: Loading,
})   
const ArticleList = Loadable({
    loader: () => import('./Article/Article'),
    loading: Loading,
})   
const ArticleEdit = Loadable({
    loader: () => import('./Article/Edit'),
    loading: Loading,
})   
const Notification = Loadable({
    loader: () => import('./Notifications/Notification'),
    loading: Loading,
})

const Noauth =Loadable({
    loader:()=>import('./Noauth/Noauth'),
    loading:Loading
})
const Profile = Loadable({
    loader: () => import('./Profile/Profile'),
    loading: Loading
})


export {
    Dashboard,
    Login,
    Notfound,
    Setting,
    ArticleList,
    ArticleEdit,
    Notification,
    Noauth,
    Profile
}