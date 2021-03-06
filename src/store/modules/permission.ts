/**
 * 向后端请求用户的菜单，动态生成路由
 */
// import { constantRouterMap } from '@/config/router.config'
import {Module} from 'vuex'
import { generatorDynamicRouter } from '/@/utils/routerUtil'

const state = {
    addRouters: [],
    menus: [],
}

type StateType = typeof state

const asyncRouter: Module<StateType, any> = {
    namespaced: true,
    state,
    mutations: {
        SET_ROUTERS: (state, routers) => {
            state.menus = routers
        },
    },
    actions: {
        GenerateRoutes ({ commit }) {
            return new Promise(resolve => {
                generatorDynamicRouter().then(routers => {
                    commit('SET_ROUTERS', routers)
                    resolve(null)
                })
            })
        },
    },
}

export default asyncRouter
