const Model = require('../model/index')
class AboutController {
    static async getAbout (ctx) {
        try {
            let data = JSON.parse(JSON.stringify(await Model.getAbout()))
            data = data[0]
            delete data.article_path
            ctx.body = {
                code: 1,
                data: data,
                isShow: false
            }
        } catch(e) {
            console.log(e)
            console.log('服务器错误，获取关于我内容失败');
            ctx.body = {
                code: 0,
                msg: '服务器错误，获取关于我内容失败'
            }
        }
    }
}   

module.exports = AboutController

