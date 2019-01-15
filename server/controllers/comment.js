const Model = require('../model/index')
class CommentController {
    static async toComment (ctx) {
        try {
            let data = await Model.toComment(ctx.request.body)
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
    static async getCommentsByIｄ (ctx) {
        let id = ctx.request.query.article_id
        let data = await Model.getCommentsByIｄ(id)
        console.log(id);
        
    }
}   

module.exports = CommentController

