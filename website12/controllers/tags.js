const Model = require('../model/index')
class TagsController {
    static async getTags(ctx) {
        try {
            let tags = await Model.getTags()
            let res = JSON.parse(JSON.stringify(tags))
            ctx.body = {
                code: 1,
                data: res,
                msg: '成功',
                isShow: false
            }
        }catch (e) {
            console.log(e);
            ctx.body = {
                code: 0,
                msg: '服务器出错，查询标签失败'
            }
            console.log('服务器出错，查询标签失败')
        }
    }
    static async removeTag (ctx) {
        let {tags_id} = ctx.request.body
        try {
            let data = await Model.removeTag(tags_id)
            if (data.affectedRows > 0) {
                ctx.body = {
                    code: 1,
                    msg: '删除成功'
                }
            } else {
                ctx.body = {
                    code: 0,
                    msg: '该标签不存在'
                }
            }
        } catch (e) {
            console.log(e)
            console.log('删除标签失败')
            ctx.body = {
                code: 0,
                msg: '服务器出错，删除标签失败'
            }
        }
    }
    static async addTag(ctx) {
        let value = ctx.request.body
        try {
            let data = await Model.addTag(value)
            if (data.affectedRows > 0) {
                ctx.body = {
                    code: 1,
                    msg: '添加标签成功'
                }
            }
        } catch (e) {
            console.log(e)
            console.log('服务器出错，添加标签失败')
            ctx.body = {
                code: 0,
                msg: '服务器出错，添加标签失败'
            }
        }

    }
}

module.exports = TagsController

