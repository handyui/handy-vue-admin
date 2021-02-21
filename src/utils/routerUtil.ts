import { getUserAndRole } from '/@/api/system'
// import {constantRouterComponents} from './constantRouterComponents'
import router from "/@/router/index";
import {routes, common, notFound, asyncRouterMap} from "/@/router/routes";
// import {notFound} from '@/router/modules/error'
import {Empty} from 'ant-design-vue'
// import common from "@/router/common";
import store from "/@/store";

import {ACCESS_TOKEN} from '/@/store/mutation-types'
import {createStorage} from '/@/utils/Storage'
const Storage = createStorage()
const token = Storage.get(ACCESS_TOKEN)

/**
 * 数组转树形结构
 * @param list 源数组
 * @param tree 树
 * @param parentId 父ID
 */
const listToTree = (list, tree, parentId) => {
    list.forEach(item => {
        // 判断是否为父级菜单
        if (item.parentId === parentId) {
            const child = {
                ...item,
                key: item.key || item.name,
                children: []
            }
            // 迭代 list， 找到当前菜单相符合的所有子菜单
            listToTree(list, child.children, item.id)
            // 删掉不存在 children 值的属性
            if (child.children.length <= 0) {
                delete child.children
            }
            // 加入到树中
            tree.push(child)
        }
    })
}

/**
 * 格式化树形结构数据 生成 vue-router 层级路由表
 *
 * @param routerMap
 * @param parent
 * @returns {*}
 */
export const generator = (routerMap, parent?: any) => {
    return routerMap.map(item => {
        const {title, show, hideChildren, hiddenHeaderContent, target, icon} = item || {}
        const currentRouter: any = {
            // 如果路由设置了 path，则作为默认 path，否则 路由地址 动态拼接生成如 /dashboard/workplace
            path: `${parent && parent.url || ''}/${item.url || '/'}`,
            // 路由名称，建议唯一
            name: item.url || '',
            // 该路由对应页面的 组件 :方案1
            // component: asyncRouterMap[item.component || item.key],
            // 该路由对应页面的 组件 :方案2 (动态加载)
            component: (asyncRouterMap[item.url])  || (() => import('/@/views/error/404.vue')),
            props: true,
            // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
            meta: {
                title: title,
                icon: icon || undefined,
                hiddenHeaderContent: hiddenHeaderContent,
                target: target,
                permission: item.actions || []
            }
        }
        // 是否设置了隐藏菜单
        if (show === false) {
            currentRouter.hidden = true
        }
        // 是否设置了隐藏子菜单
        if (hideChildren) {
            currentRouter.hideChildrenInMenu = true
        }
        // 为了防止出现后端返回结果不规范，处理有可能出现拼接出两个 反斜杠
        if (!currentRouter.path.startsWith('http')) {
            currentRouter.path = currentRouter.path.replace('//', '')
        }
        // 重定向
        item.redirect && (currentRouter.redirect = item.redirect)
        // 是否有子菜单，并递归处理
        if (item.children && item.children.length > 0) {
            // Recursion
            currentRouter.children = generator(item.children, currentRouter)
        }
        router.addRoute(currentRouter)
        return currentRouter
    })
}

/**
 * 异步生成菜单树， 方案二
 * @param dataList
 */
const list2tree = (items, parentId = 0, arr = []) => {
    return items.filter(item => item.parentId == parentId).map((item: any) => {
        const {icon, menuId, name, title, parentId, sort, meta, menuPath} = item

        const path = menuPath.startsWith('/') ? menuPath : '/' + menuPath

        return {
            path: path,
            // 路由名称，建议唯一
            name: path || '',
            children: list2tree(items, item.menuId, []),
            // 该路由对应页面的 组件 (动态加载)
            component: (asyncRouterMap[path]) || Empty || (() => import('/@/views/error/404.vue')),
            props: true,
            // meta: 页面标题, 菜单图标, 页面权限(供指令权限用，可去掉)
            meta: {
                title: title,
                icon: icon,
                // hiddenHeaderContent: hiddenHeaderContent,
                // permission: item.actions || []
                // TODO 简单模拟CRUD权限：创建（Create）、更新（Update）、读取（Retrieve）和删除（Delete）操作，可以自行修改查看页面效果
                // permission: parentId == -1
                //     ? []
                //     : ['create', 'update', 'retrieve', 'delete' ].map(n => `${url.split('/').filter(m => m.trim() != '').join('.')}.${n}`)
            }
        }
    })
}

/**
 * 动态生成菜单
 * @param token
 * @returns {Promise<Router>}
 */
export const generatorDynamicRouter = () => {
    return new Promise((resolve, reject) => {
        // getUserAndRole().then(result => {
        const param={
            token: token,
            userToken: token
        }
        getUserAndRole(param).then(result => {
            const menuNav: any = []
            const childrenNav = []
            //      后端数据, 根级树数组,  根级 PID
            // listToTree(data, childrenNav, 0)
            // rootRouter.children = childrenNav
            menuNav.push(childrenNav)
            const routeList = list2tree(result.result.menuList)
            // console.log(routeList, '根据后端返回的权限路由生成')
            routeList.forEach(item => {
                // 设置模块重定向到菜单
                if (item.children?.length > 0 && !item.redirect) {
                    item.redirect = {name: item.children[0].name}
                }
            })
            const layout = routes.find(item => item.name == 'Layout')!
            layout.children = [
                ...common,
                ...routeList
            ]
            router.addRoute(layout)
            router.addRoute(notFound)
            resolve(layout.children)
        }).catch(err => {
            reject(err)
        })
    })
}
