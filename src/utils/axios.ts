import axios from 'axios'

// import getEnv from './env'
// console.log(getEnv)
// console.log(import.meta.env.DEV)

import {ACCESS_TOKEN} from '/@/store/mutation-types'
import {createStorage} from '/@/utils/Storage'
const Storage = createStorage()

class HttpRequest {
    loading: any
    data: any
    atoken: any
    queue: any
    cancelDuplicated: boolean
    constructor () {
        this.loading = null
        this.data=null
        this.atoken = null
        // 存储请求队列
        this.queue = new Map()
        this.cancelDuplicated = true
    }
    // // 销毁请求实例
    destroy (url:any) {
        this.queue.delete(url)
    }
    removePendingAjax(config: any){
        if (!this.cancelDuplicated) return

        const url = [
            config.method,
            config.url,
            JSON.stringify(config.params),
            JSON.stringify(config.data)
          ].join('&')

        if( this.queue.has(url)){
            const cancel = this.queue.get(url)
            cancel(url)
            this.destroy (url)
        }
    }
    addPendingAjax(config:any){
        if (!this.cancelDuplicated) return
        const url = [
            config.method,
            config.url,
            JSON.stringify(config.params),
            JSON.stringify(config.data)
        ].join('&')
        config.cancelToken = config.cancelToken || new axios.CancelToken((cancel) => {
            if(!this.queue.has(url)){
                this.queue.set(url, cancel)
            }
        })
    }
    // 请求拦截
    interceptors (instance:any, url:any) {
        // 添加请求拦截器
        instance.interceptors.request.use((config: any) => {
            this.removePendingAjax(config)
            this.addPendingAjax(config)
            
            // console.log('this.queue1111=======>', this.queue, this.queue.has(url))
            const token = Storage.get(ACCESS_TOKEN)
            // 判断是否存在token，如果存在的话，请求带上token,后端接口判断请求头有无token
            if (token) {
                config.headers.token = token 
            }
       /*     let whiteList = ['/saasContentDetail/queryAllByPage', '/saasContentCover/queryCaseListByParam']
            // 添加全局的loading..以及不需要loading 页面的配置
            // 不添加loading 白名单
            if (!Object.keys(this.queue).length) {
                let valid = true
                whiteList.forEach(reg => {
                    if (url.indexOf(reg) != -1) {
                        valid = false
                    }
                })
                if (valid) {
                    this.loading = Loading.service({
                        lock: true,
                        text: '加载中……',
                        background: 'rgba(0, 0, 0, 0.7)'
                    })
                    console.log('加载中...')
                } else {
                    this.loading.close()
                }
            }
      */
            return config
        }, (error:any) => {
            return Promise.reject(error)
        })
        // 添加响应拦截器
        instance.interceptors.response.use((res:any) => {
            // 在请求结束后，移除本次请求
            this.removePendingAjax(res) 

            // 关闭loading
            // this.loading.close()
            const { data } = res
            // this.destroy(url)
            return data
            // if (data.code == '10000') { // token过期
            //     if (!window.isRefreshing) {
            //     window.isRefreshing = true
            //     // res.headers.Authorization = res.data.data.token
            //     this.atoken = res.data.data.token
            //     setToken(res.data.data.token)
            //     return this.request(this.data).then(res=>{
            //         // console.log('失效重新请求了===========>')
            //         // console.log(res)
            //         window.isRefreshing = false
            //         this.atoken = null
            //         this.data = null
            //         this.distroy(url)
            //         return res
            //     })
            //     }
            // }else if (data.code == '10001') { // token失效
            //     Message({
            //         message: '登录超时，请重新登录',
            //         type: 'error',
            //         duration: 5 * 1000
            //     })
            //     store.dispatch('LoginOut').then(()=>{
            //         location.reload() // 为了重新实例化vue-router对象 避免bug
            //     })
            // }else{
            //     this.distroy(url)
            //     return data
            // }
        }, (error:any) => {
            if (axios.isCancel(error)) {
                console.log('repeated request: ' + error.message)
              } else {
                // handle error code
              }
              return Promise.reject(error)
        })
    }

    request (options:any) {
        this.data = options
        const instance = axios.create({
            // baseURL: process.env.NODE_ENV === 'development' ? '/api/' : 'http://b.sayid760.fun/api/', 
            baseURL: 'http://b.sayid760.fun/api/', 
            timeout: 60000, // request timeout
            // withCredentials: true,
            headers: {
                'Content-Type': 'application/json; charset=utf-8',
                // 'X-URL-PATH': location.pathname
            }
        })
        this.interceptors(instance, options.url)
        options = Object.assign({}, options)
        return instance(options)
    }
}

export default HttpRequest
