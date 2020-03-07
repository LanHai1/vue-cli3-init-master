import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import 'jquery'
import "amfe-flexible" // 引入flexible

import './promission' //这里进行路由后台获取的模拟

import globals from '@/utils/global.ts' //全局
Vue.prototype.$globals = globals;

import VueRouter from 'vue-router';
const routerPush: any = VueRouter.prototype.push
VueRouter.prototype.push = function push(location: any) {
  return routerPush.call(this, location).catch((error: any) => error)
}

// svg
import 'assets/icon/iconfont.js'
import IconSvg from 'components/iconFont/index.vue'
//全局注册icon-svg
Vue.component('icon-svg', IconSvg)

import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

Vue.config.productionTip = false

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
