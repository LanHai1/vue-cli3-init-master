import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const constantRouterMap = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    redirect: "/userAction/login"
  }, { // 用户登陆注册操作
    path: '/userAction',
    name: 'userAction',
    component: () => import(/* webpackChunkName: "loginAction" */ '@/views/userAction/Login.vue'),
    children: [{
      path: 'login',
      components: {
        loginview: () => import(/* webpackChunkName: "LoginFill" */ "@/components/login/LoginFill.vue")
      }
    }, {
      path: 'register',
      components: {
        loginview: () => import(/* webpackChunkName: "RegisterFill" */ "@/components/register/RegisterFill.vue")
      }
    }]
  }, {
    path: "/main",
    name: "main",
    component: () => import(/* webpackChunkName: "layout" */ '@/views/layout/index.vue')
  }, {
    path: "/404",
    name: "notFound",
    component: () => import(/* webpackChunkName: "notFound" */ '@/views/notFound/index.vue')
  }
]


export default new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes: constantRouterMap
})
