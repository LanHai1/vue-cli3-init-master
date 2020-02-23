import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const router = new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: () => import('@/views/index'),
        redirect: "/userAction/login"
    }, {
        path: '/userAction',
        name: 'userAction',
        component: () => import('@/views/userAction/Login.vue'),
        children: [{
            path: 'login',
            components: {
                login_view: () => import('@/components/login/LoginFill')
            }
        }, {
            path: 'register',
            components: {
                login_view: () => import('@/components/register/RegisterFill')
            }
        }]
    }]
})