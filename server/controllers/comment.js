const Model = require('../model/index')
class CommentController {
    static async toComment (ctx) {
        try {
            let {comment_content, article_id} = ctx.request.body
            comment_content = comment_content.replace('<', '&lt;').replace('>', '&gt;')
            let data = await Model.toComment({...ctx.request.body, comment_content})
            await Model.updateArticleComment(article_id)
            if (data.affectedRows > 0) {
                ctx.body = {
                    code: 1,
                    msg: '评论成功',
                    isShow: false
                }
            } else {
                ctx.body = {
                    code: 0,
                    msg: '评论失败，请重试',
                    isShow: false
                }                
            }
        } catch (e) {
            console.log(e)
            console.log('服务器错误，评论保存失败');
            ctx.body = {
                code: 0,
                msg: '服务器错误,评论失败',
                isShow: false
            }
        }

    }
    static async getCommentsById (ctx) {
        let id = ctx.request.body.article_id
        try {
            let data = JSON.parse(JSON.stringify(await Model.getCommentsById(id)))
            ctx.body = {
                code: 1,
                data: data,
                isShow: false
            }
        } catch (e) {
            console.log(e)
            console.log('服务器错误，获取评论失败');
            ctx.body = {
                code: 0,
                msg: '服务器错误，获取评论失败',
                isShow: false
            }
        }
    }
}   

module.exports = CommentController

