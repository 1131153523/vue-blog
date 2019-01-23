const Model = require('../model/index')
class ProjectController {
    static async getProjects (ctx) {
        try {
            let data = JSON.parse(JSON.stringify(await Model.getProjects()))
            data = data.map(e => {
                delete e.article_path
                return e
            })
            ctx.body = {
                code: 1,
                data: data,
                isShow: false
            }
        } catch(e) {
            console.log(e)
            console.log('服务器出错,　获取项目目录失败');
            ctx.body = {
                code: 0,
                msg: '服务器出错,　获取项目目录失败'
            }
        }
    }
}   

module.exports = ProjectController

