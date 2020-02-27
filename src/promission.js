import router from './router/index.js'
const _import = require('./router/_import_' + process.env.NODE_ENV) //获取组件的方法
import Layout from '@/views/layout' //Layout 是架构组件，不在后台返回，在文件里单独引入

import {
  setLocalStorage,
  getLocalStorage
} from "utils/auth"

var getRouter //用来获取后台拿到的路由

// 假装fakeRouter是通过后台接口请求回来的数据
let fakeRouter = {
  "router": [{
    "path": "",
    "component": "Layout",
    "redirect": "dashboard",
    "children": [{
      "path": "dashboard",
      "component": "homePage/index",
      "meta": {
        "title": "首页",
        "icon": "el-icon-refrigerator"
      }
    }]
  }, {
    "path": "/a",
    "component": "Layout",
    "redirect": "dashboard1",
    "children": [{
      "path": "dashboard1",
      "component": "homePage/index",
      "meta": {
        "title": "首页",
        "icon": "el-icon-refrigerator"
      }
    }]
  }, {
    "path": "/example",
    "component": "Layout",
    "redirect": "/example/table",
    "name": "Example",
    "meta": {
      "title": "案例",
      "icon": "el-icon-grape"
    },
    "children": [{
        "path": "table",
        "name": "Table",
        "component": "homePage/index",
        "meta": {
          "title": "表格",
          "icon": "el-icon-watermelon"
        }
      },
      {
        "path": "tree",
        "name": "Tree",
        "component": "homePage/index",
        "meta": {
          "title": "树形菜单",
          "icon": "el-icon-cherry"
        }
      }
    ]
  }]

}
router.beforeEach((to, from, next) => {
  console.log(getRouter)
  if (!getRouter) { //不加这个判断，路由会陷入死循环
    if (!getLocalStorage('router')) {
      // axios.get('xxxx').then(res => {
      console.log('beforeEach  getRouter')
      getRouter = fakeRouter.router //假装模拟后台请求得到的路由数据
      setLocalStorage('router', getRouter) //存储路由到localStorage

      routerGo(to, next) //执行路由跳转方法
      // })
    } else { //从localStorage拿到了路由
      getRouter = getLocalStorage('router') //拿到路由
      console.log(getRouter)
      routerGo(to, next)
    }
  } else {
    next()
  }

})

function routerGo(to, next) {
  getRouter = filterAsyncRouter(getRouter) //过滤路由
  //404页面最后添加
  const unFound = {
    path: '*',
    redirect: '/404',
    hidden: true
  } 
  getRouter.push(unFound)
  router.addRoutes(getRouter) //动态添加路由
  global.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  next({
    ...to,
    replace: true
  })
}

/**
 * 遍历后台传来的路由字符串，转换为组件对象
 */
function filterAsyncRouter(asyncRouterMap) {
  const accessedRouters = asyncRouterMap.filter(route => {
    if (route.component) {
      if (route.component === 'Layout') { //Layout组件特殊处理
        route.component = Layout
      } else {
        route.component = _import(route.component)
      }
    }
    if (route.children && route.children.length) {
      route.children = filterAsyncRouter(route.children)
    }
    return true
  })

  return accessedRouters
}