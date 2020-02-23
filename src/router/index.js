import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export const router = new Router({
    routes: [{
        path: '/',
        name: 'index',
        component: () => import('@/views/index'),
        redirect: "/login"
    }, {
        path: '/login',
        name: 'login',
        component: () => import('@/views/userAction/Login.vue')
    }]
})