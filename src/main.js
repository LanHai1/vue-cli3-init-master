import Vue from 'vue'
import App from './App.vue'
import router from './router/index.js'
import store from './store/index'
import $ from 'jquery'
import '@/utils/global' //全局

import './promission' //这里进行路由后台获取的模拟
import 'api/mock/mock'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import "amfe-flexible" // 引入flexible

// svg
import 'assets/icon/iconfont.js'
import IconSvg from 'components/iconFont/index.vue'
//全局注册icon-svg
Vue.component('icon-svg', IconSvg)


import axios from 'axios';
Vue.prototype.$axios = axios;

//设置为 false 以阻止 vue 在启动时生成生产提示
Vue.config.productionTip = false;

Vue.use(ElementUI);

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')