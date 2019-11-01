import {
    Dashboard,
    Login,
    Notfound,
    Setting,
    ArticleList,
    ArticleEdit,
    Notification,
    Noauth,
    Profile
} from '../views/view'

export const mainRouter=[
    {
        pathname:'/login',
        component:Login
    },
    {
        pathname: '/404',
        component: Notfound
    }   
]

export const adminRouter=[
    {
        pathname:'/admin/dashboard',
        component:Dashboard,
        title:'仪表盘',
        icon:'dashboard',
        isNav:true,
        roles:['001','002','003']
    },
    
    {
        pathname: '/admin/article',
        component: ArticleList,
        title:'文章管理',
        isNav:true,
        icon: 'unordered-list',
        exact:true,
        roles: ['001', '002']
    },
    {
        pathname: '/admin/article/:id',
        component: ArticleEdit,
        title:'文章编辑',
        isNav:false,
        roles: ['001','002']
    },  
    {
        pathname: '/admin/setting',
        component: Setting,
        icon: 'setting',
        title: '设置',
        isNav: true,
        roles: ['001']
    },
    {
        pathname: '/admin/notification',
        component: Notification,
        // icon: 'setting',
        title: '通知中心',
        isNav: false,
        roles: ['001', '002','003']
    },
    {
        pathname: '/admin/noauth',
        component: Noauth,
        // icon: 'setting',
        roles: ['001', '002', '003'],
        isNav: false
    },
    {
        pathname: '/admin/profile',
        component: Profile,
        // icon: 'setting',
        roles: ['001', '002', '003'],
        isNav: false
    }
    
]