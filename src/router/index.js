import Vue from 'vue'
import Router from 'vue-router'
import Layout from '@/views/layout'

Vue.use(Router)

let constantRouterMap = [{
    path: '/',
    name: 'index',
    component: () => import('@/views/index'),
    redirect: "/userAction/login"
}, { // 用户登陆注册操作
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
}, {
    path: "/main",
    name: "main",
    component: Layout
}, {
    path: "/404",
    name: "notFound",
    component: () => import('@/views/notFound')
}]

// export const router = new Router({
//     routes: constantRouterMap
// })

export default new Router({
    routes: constantRouterMap
})