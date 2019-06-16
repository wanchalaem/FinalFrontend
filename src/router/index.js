import Vue from 'vue'
import Router from 'vue-router'


import TestCrud1 from '../views/testcrud1';
  
import Order from '../views/order'; 


Vue.use(Router)

function loadView(view) {
    return () => import(`../views/${view}.vue`)
}

export default new Router({

    routes: [ 
        {
            path: '/',
            name: '',
            component: loadView('home')
        },  //PJ ใหม่อันใหม่
        {
            path: '/pedit',
            name: 'pedit',
            component: loadView('pedit')
        },  //PJ ใหม่อันใหม่
        {
            path: '/phistory',
            name: 'phistory',
            component: loadView('phistory')
        },  //PJ ใหม่อันใหม่
        {
            path: '/pchart',
            name: 'pchart',
            component: loadView('pchart')
        },  //กราฟ
        {
            path: '/users',
            name: 'users',
            component: loadView('users')
        },  //PJ ใหม่อันใหม่
        {
            path: '/dashboard',
            name: 'dashboard',
            component: loadView('dashboard')
        },  //PJ ใหม่อันใหม่
        
        { path: '/testcrud1',component: TestCrud1 },
          
        { path: '/order',component: Order }, 
        { path: '/logout',component: loadView('logout')}, 
        // { path: '/product',component: Product }, 
        // { path: '/order_detail',component: Order_detail },

 
    ]
})
