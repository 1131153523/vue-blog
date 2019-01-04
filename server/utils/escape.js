const mysql  = require('mysql')
const escape = function(template, ...subs) {
    let result = ''  //初始化最后的结果
    //循环拼接字符串
    for (let i = 0; i < subs.length; i++) {
        result += template[i]
        result += mysql.escape(subs[i])
    }
    result += template[template.length - 1]  //最后的模板也要拼接
    return result
}
module.exports = escape