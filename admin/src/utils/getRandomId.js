import md5 from 'js-md5'
export default  () => {
    let id = md5((+new Date()).toString())
    return id.substring(0, 10)
}