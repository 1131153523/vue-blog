import axios from './axios_'

export default function (url, data={}, type='GET') {
    return new Promise(function (resolve, reject) {
        let promise
        if (type === 'GET') {  //如果请求为get
            let dataStr = '' //数据拼接字符串
            Object.keys(data).forEach(key => {     //把json数据拼接成键值对字符串
                dataStr += key + '=' + data[key] + '&'
            })
            if (dataStr !== '') {   //如果域名后参数不为空，就把最后的&去掉 ，因为上面拼接的字符串最后会有一个&
                dataStr = dataStr.substring(0, dataStr.lastIndexOf('&'))
                url = url + '?' + dataStr
            }
            promise = axios.get(url)
        } else {
            promise = axios.post(url, {...data, token: window.sessionStorage.getItem('token')})
        }
        promise.then(function (response) {
            resolve(response.data)
        }).catch(function (error) {
            reject(error)
        })
    })
}