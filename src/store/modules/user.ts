import { test, login, logout } from '/@/api/user'
// import { getToken, setToken } from '/@/utils'
import {createStorage} from '/@/utils/storage'
import {ACCESS_TOKEN, CURRENT_USER} from '/@/store/mutation-types'

const Storage = createStorage({storage: localStorage})

export default {
  namespaced: true,
  state: {
    userName: '',
    userId: '',
    avatorImgPath: '',
    token: Storage.get(ACCESS_TOKEN, ''),
    access: []
  },
  mutations: {
    setAvator (state, avatorPath) {
      state.avatorImgPath = avatorPath
    },
    setUserId (state, id) {
      state.userId = id
    },
    setUserName (state, name) {
      state.userName = name
    },
    setAccess (state, access) {
      state.access = access
    },
    setToken (state, token) {
      state.token = token
    },
    setInfo: (state, info) => {
      state.info = info
    }
  },
  actions: {
    // 登录
    Login ({ commit }, { loginName, passWord, loginType }) {
      return new Promise((resolve, reject) => {
          login({ loginName, passWord }).then(res => {
            const {result, code} = res
            if (code == 200) {
              Storage.set(ACCESS_TOKEN, result, 7 * 24 * 60 * 60 * 1000)
              Storage.set(CURRENT_USER, result, 7 * 24 * 60 * 60 * 1000)
              commit('setToken', result)
              commit('setInfo', result)
            }
            resolve(res)
          }).catch(err => {
            reject(err)
          })
      })
    },
    // 退出登录
    LogOut ({ state, commit }) {
      return new Promise((resolve, reject) => {
        commit('setToken', '')
        commit('setAccess', [])
        Storage.remove(ACCESS_TOKEN)
        Storage.remove(CURRENT_USER)
        resolve()
      })
    },
    // 获取用户相关信息
    getUserInfo ({ state, commit }) {
      return new Promise((resolve, reject) => {
        // getUserInfo(state.token).then(res => {
        //   const data = res.data
        //   commit('setAvator', data.avator)
        //   commit('setUserName', data.user_name)
        //   commit('setUserId', data.user_id)
        //   commit('setAccess', data.access)
        //   resolve(data)
        // }).catch(err => {
        //   reject(err)
        // })
      })
    }
  }
}
