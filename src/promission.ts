import router from './router/index'
const _import: any = require('./router/_import_' + process.env.NODE_ENV) //获取组件的方法
import Layout from '@/views/layout/index.vue' //Layout 是架构组件，不在后台返回，在文件里单独引入
import Vue from 'vue'

import {
  setLocalStorage,
  getLocalStorage
} from "./utils/auth"

let getRouter: any; //用来获取后台拿到的路由

const fakeRouter: any = {
  "router": [{
    "path": "",
    "component": "Layout",
    "redirect": "dashboard",
    "id": "1",
    "meta": {
      "title": "首页",
      "icon": "shouye"
    },
    "children": [{
      "id": "1",
      "path": "dashboard",
      "component": "homePage/index",
      "meta": {
        "title": "首页",
        "icon": "shouye"
      }
    }]
  }, {
    "path": "/a",
    "component": "Layout",
    "redirect": "bpmn",
    "id": "2",
    "meta": {
      "title": "bpmn",
      "icon": "mingxinghuodong"
    },
    "children": [{
      "path": "bpmn",
      "component": "bpmn/showBpmn",
      "id": "2",
      "meta": {
        "title": "bpmn",
        "icon": "mingxinghuodong"
      }
    }]
  }, {
    "path": "/example",
    "component": "Layout",
    "redirect": "icon",
    "name": "Example",
    "id": "3",
    "meta": {
      "title": "组件",
      "icon": "fuzhi"
    },
    "children": [{
      "path": "icon",
      "name": "Icon",
      "component": "icon/index",
      "id": "4",
      "meta": {
        "title": "iconfont"
      }
    },
    {
      "path": "tree",
      "name": "Tree",
      "component": "tree/index",
      "id": "5",
      "meta": {
        "title": "树形菜单"
      }
    }
    ]
  }]
}

/**
 * 遍历后台传来的路由字符串，转换为组件对象
 */
function filterAsyncRouter(asyncRouterMap: any[]) {
  const accessedRouters = asyncRouterMap.filter((route: any) => {
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

const routerGo = (to: any, next: any) => {
  getRouter = filterAsyncRouter(getRouter) //过滤路由
  //404页面最后添加
  const unFound = {
    path: '*',
    redirect: '/404',
    hidden: true
  }
  getRouter.push(unFound)
  router.addRoutes(getRouter);//动态添加路由
  (Vue as any).prototype.$globals.antRouter = getRouter //将路由数据传递给全局变量，做侧边栏菜单渲染工作
  // console.log(getRouter, "sssss")
  next({
    ...to,
    replace: true
  })
}

router.beforeEach((to: any, from: any, next: any) => {
  if (to.path === "/main" && getRouter){
    console.log(to, 333, getRouter)
    router.push(`${getRouter[0].path}/${getRouter[0].redirect}`)
  }
  if (!getRouter) { //不加这个判断，路由会陷入死循环
    if (!getLocalStorage('router')) {
      // axios.get('xxxx').then(res => {
      console.log('beforeEach  getRouter')
      getRouter = fakeRouter.router //假装模拟后台请求得到的路由数据
      setLocalStorage('router', getRouter) //存储路由到localStorage
      routerGo(to, next) //执行路由跳转方法
      // })
    } else {
      //从localStorage拿到了路由
      getRouter = JSON.parse(getLocalStorage('router') || "[]") //拿到路由
      routerGo(to, next)
    }
  } else {
    next()
  }

})





// 假装fakeRouter是通过后台接口请求回来的数据
// let fakeRouter = {
//   "router": [{
//     "path": "",
//     "component": "Layout",
//     "redirect": "dashboard",
//     "id": "1",
//     "meta": {
//       "title": "首页",
//       "icon": "shouye"
//     },
//     "children": [{
//       "id": "1",
//       "path": "dashboard",
//       "component": "homePage/index",
//       "meta": {
//         "title": "首页",
//         "icon": "shouye"
//       }
//     }]
//   }, {
//     "path": "/a",
//     "component": "Layout",
//     "redirect": "bpmn",
//     "id": "2",
//     "meta": {
//       "title": "bpmn",
//       "icon": "mingxinghuodong"
//     },
//     "children": [{
//       "path": "bpmn",
//       "component": "bpmn/showBpmn",
//       "id": "2",
//       "meta": {
//         "title": "bpmn",
//         "icon": "mingxinghuodong"
//       }
//     }]
//   }, {
//     "path": "/example",
//     "component": "Layout",
//     "redirect": "/example/icon",
//     "name": "Example",
//     "id": "3",
//     "meta": {
//       "title": "组件",
//       "icon": "fuzhi"
//     },
//     "children": [{
//       "path": "icon",
//       "name": "Icon",
//       "component": "icon/index",
//       "id": "4",
//       "meta": {
//         "title": "iconfont"
//       }
//     },
//     {
//       "path": "tree",
//       "name": "Tree",
//       "component": "tree/index",
//       "id": "5",
//       "meta": {
//         "title": "树形菜单"
//       }
//     }
//     ]
//   }]

// }






