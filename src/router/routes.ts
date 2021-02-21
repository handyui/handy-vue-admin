import Layout from '/@/layout/index.vue'
import routerView from '/@/layout/routerView.vue'
import { RouteRecordRaw } from 'vue-router'


export const notFound = {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  redirect: '/error/404',
  component: () => import(/* webpackChunkName: "404" */ '/@/views/error/404.vue')
}

export const errorRoutes = {
  path: '/:pathMatch(.*)*',
  name: 'error',
  redirect: '/error/404',
  component: routerView,
  meta: {
      title: '错误页',
      icon: 'EditOutlined',
      hidden: true
  },
  children: [
      {
          path: '404',
          name: `error-404`,
          meta: {
              title: '404',
              icon: 'UserOutlined'
          },
          component: () => import('/@/views/error/404.vue')
      }
  ]
}

export const common = [
  {
    path: '/dashboard',
    name: 'dashboard',
    redirect: '/dashboard/welcome',
    component: routerView,
    meta: { title: '系统看板', icon: 'facebook' },
    children: [
      {
        path: 'welcome',
        name: `dashboard-welcome`,
        meta: {
            title: '首页',
            icon: 'facebook',
        },
        component: () => import('/@/views/Home.vue'),
      },
    ]
  },
  {
    path: '/table',
    name: 'table',
    meta: {title: '表格', icon: 'bar-chart' },
    component: routerView,
    redirect: "/table-base",
    children: [
      {
        path: 'table-base',
        name: 'table-base',
        meta: { title: '基础表格', icon: '' },
        component: () => import('/@/views/table/base.vue')
      },
      {
        path: 'icons',
        name: 'icons',
        meta: { title: '图标', icon: '' },
        component: () => import('/@/views/icons/index.vue')
      }
    ]
  },
]

export const asyncRouterMap = {
  '/system': routerView, // 系统管理
  '/system/access': () => import(/* webpackChunkName: "system-access" */ '/@/views/system/access/index.vue'), // 菜单资源管理
  '/system/account': () => import(/* webpackChunkName: "system-account" */ '/@/views/system/account/index.vue'), // 账号管理
  '/system/dict': () => import(/* webpackChunkName: "system-dict" */ '/@/views/system/dict/index.vue'), // 字典管理
  '/system/role': () => import(/* webpackChunkName: "system-role" */ '/@/views/system/role/index.vue'), // 角色管理
  '/system/organization': () => import(/* webpackChunkName: "monitor-organization" */ '/@/views/system/organization/index.vue'), // 单位管理
  '/system/loginLog': () => import(/* webpackChunkName: "monitor-loginLog" */ '/@/views/monitor/loginLog/index.vue'), // 登录日志
  '/system/oper': () => import(/* webpackChunkName: "monitor-oper" */ '/@/views/monitor/oper/index.vue'), // 操作日志
}

export const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Layout',
    redirect: '/dashboard',
    component: Layout,
    meta: { title: '首页'},
    children: [
      ...common
        // ...asyncRouterMap
    ]
  },
  // errorRoutes,
  { path: '/login', name: 'login', component: () => import('/@/views/login/index.vue') },
]
