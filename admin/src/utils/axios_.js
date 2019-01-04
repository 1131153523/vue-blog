import axios from 'axios'
import { Loading, Notification, Message } from 'element-ui'
// 超时时间
axios.defaults.timeout = 5000
// http请求拦截器
var loadinginstace
axios.interceptors.request.use(config => {
    // element ui Loading方法
    return config
}, error => {
    Message.error({
        message: '加载超时',
        offset: 200
    })
    return Promise.reject(error)
})
// http响应拦截器
axios.interceptors.response.use(data => {
    if (typeof data.data.isShow === 'undefined') {
        if (data.data.code === 1) {
            Message.success({
                message: data.data.msg,
                offset: 200
            })
        } else if (data.data.code === 0){
            Message.error({
                message: data.data.msg,
                offset: 200
            })
        } else {
            Message.error({
                message: '加载失败',
                offset: 200
            })
        }
    }
    return data
}, error => {
    Message.error({
        message: '加载失败',
        offset: 200
    })
    return Promise.reject(error)
})
export default axios