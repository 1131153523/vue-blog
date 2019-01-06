const Model = require('../model/index')
const base_dir = __dirname.slice(0, __dirname.lastIndexOf('/server/') + 8)
const fs = require('fs')
class ArticleController {
    static async getDraft(ctx) {
        try {
            let content = JSON.parse(JSON.stringify(await Model.getDraft()))
            ctx.body = {
                code:1,
                isShow:false,
                data: content[0].draft_content
            }
        } catch (e){
            console.log('上次记录内容获取失败')
            console.log(e)
            ctx.body = {
                code: 0,
                msg: '服务器出错，上次记录内容获取失败'
            }
        }
    }
    static async saveDraft(ctx){
        try {
            let data = JSON.parse(JSON.stringify(await Model.saveDraft(ctx.request.body)))
            if (data.changedRows >= 0) {
                ctx.body = {
                    code:1,
                    isShow:false
                }
            } else {
                ctx.body = {
                    code:0,
                    msg: '服务器出错，存稿失败'
                }
            }
        }catch (e) {
            console.log('存稿失败')
            console.log(e)
            ctx.body = {
                code:0,
                msg: '服务器出错，存稿失败'
            }
        }
    }
    static async writeArticle (ctx) {
        let {article_content,article_title} = ctx.request.body
        console.log(article_title);
        let path = `${base_dir}static/articles/${article_title.trim()}.md`
        try {
            if (!fs.existsSync(path)) {
                await fs.writeFileSync(path, article_content)
            } else {
                ctx.body = {
                    code: 0,
                    msg: '该文章已经存在，请更换标题或修改文章'
                }
                return;
            }
            try {
                await Model.writeArticle({...ctx.request.body, article_path: path})
                ctx.body = {
                    code: 1,
                    msg: '发布成功'
                }
            } catch (e) {
                console.log('发布失败');
                console.log(e);
                ctx.body = {
                    code:0,
                    msg: '服务器出错，发布失败'
                }
            }
        } catch (e) {
            console.log('保存失败');
            console.log(e);
            ctx.body = {
                code:0,
                msg: '服务器出错，保存失败'
            }
        }

    }
    static async uploadArticleImg (ctx) {
        let {_name, miniurl} = ctx.request.body
        let path = `${base_dir}static/uploads/articleImg/${_name}`
        let base64 = miniurl.replace(/^data:image\/\w+;base64,/, "")
        let dataBuffer = new Buffer(base64, 'base64')
        let url = `http://${ctx.request.host}/uploads/articleImg/${_name}`
        if (fs.existsSync(path)) {
            ctx.body = {
                code: 1,
                isShow: false,
                data: url
            }
        } else {
            try {
                fs.writeFileSync(path, dataBuffer)
                ctx.body = {
                    code: 1,
                    isShow: false,
                    data: url
                }
            } catch (e) {
                console.log(e)
                console.log('服务器出错，上传图片失败')
                ctx.body = {
                    code: 0,
                    msg: '服务器出错，上传图片失败'
                }
            }
        }
    }
    static async getArticleList (ctx) {
        try {
            let data = await Model.getArticleList()
            if (data.every(item => item.tags_id && !item.tags_name)) {
                let a = data.find(item => item.tags_id && !item.tags_name)
                ctx.body = {
                    code: 0,
                    msg: `文章名为${a.article_title}的标签可能删除，请更改文章的标签`
                }
            }
            ctx.body = {
                code: 1,
                data: data,
                isShow: false
            }
        } catch (e) {
            console.log('服务器错误，获取文章列表失败');
            console.log(e)
            ctx.body = {
                code: 0,
                msg: '服务器错误，获取文章列表失败'
            }
        }
    }
    static async uploadArticle (ctx) {
        let {article_title, tags_id} = ctx.request.body
        console.log(ctx.request.body);
        let prePath = ctx.request.files.file.path
        let {type} = ctx.request.files.file
        if (!article_title || !tags_id) {
            ctx.body = {
                code: 0,
                msg: '标签或标题不能为空'
            }
            return
        }
        if (type !== 'text/markdown') {
            ctx.body = {
                code: 0,
                msg: '请上传markdown文件'
            }
            return
        } else {
            try {
                let file = fs.readFileSync(prePath)
                let path = `${base_dir}static/articles/${article_title.trim()}.md`
                if (fs.existsSync(path)) {
                    ctx.body = {
                        code: 0,
                        msg: '该文章已经存在，请更换标题或修改文章'
                    }
                } else {
                    try {
                        fs.writeFileSync(path, file)
                    } catch (e) {
                        console.log(e)
                        console.log('服务器错误，写入文件失败')
                        ctx.body = {
                            code: 0,
                            msg: '服务器错误，写入文件失败'
                        }
                    }
                    try {
                        await Model.uploadArticle({...ctx.request.body, article_path: path})
                        ctx.body = {
                            code: 1,
                            msg: '发布成功'
                        }
                    } catch (e) {
                        console.log(e)
                        console.log('服务器错误，发布失败')
                        ctx.body = {
                            code: 0,
                            msg: '服务器错误，写入文件失败'
                        }
                    }

                }
            } catch (e) {
                console.log(e)
                console.log('服务器错误，读取文件失败')
                ctx.body = {
                    code: 0,
                    msg: '服务器错误，读取文件失败'
                }
            }
        }

    }
    static async updateArticleVerify (ctx) {
        try {
            let data = await Model.updateArticleVerify(ctx.request.body)
            if (data.changedRows > 0) {
                ctx.body = {
                    code: 1,
                    msg: '审核通过',
                    isShow: false
                }
            } else {
                ctx.body = {
                    code: 0,
                    msg: '该文章已经审核通过'
                }
            }
        } catch (e) {
            console.log(e)
            console.log('服务器错误，更新审核状态失败')
            ctx.body = {
                code: 0,
                msg: '服务器错误，更新审核状态失败'
            }
        }

        
    }
    static async getArticleById (ctx) {
        try {
            let data = await Model.getArticleById(ctx.request.body.article_id)
            if (data.length === 1) {  
                let path = data[0].article_path
                try {
                    let content = fs.readFileSync(path)
                    ctx.body = {
                        code: 1,
                        isShow: false,
                        data: content + ''
                    }
                    
                } catch (e) {
                    console.log(e)
                    console.log('服务器错误，读取文章失败')
                    ctx.body = {
                        code: 0,
                        msg: '服务器错误，读取文章失败'
                    }
                }
            }
            
        } catch(e) {
            console.log(e)
            console.log('服务器错误，查询文章失败')
            ctx.body = {
                code: 0,
                msg: '服务器错误，查询文章失败'
            }
        }
    }
    static async uploadArticleTumbImg (ctx) {
        let {article_id} = ctx.request.body
        let prePath = ctx.request.files.file.path
        let name = ctx.request.files.file.name
        let type = ctx.request.files.file.type
        if (type !== 'image/png' || type !== 'image/jpg' || type !== 'image/jpeg' || type !== 'image/gif') {
            ctx.body = {
                code: 0,
                msg: '上传失败，只支持上传图片'
            }
        }

        try {
            let file = fs.readFileSync(prePath)
            let path = `${base_dir}static/uploads/articleTumbImg/${+new Date()}-${name}`
            fs.writeFileSync(path, file)
            try {
                let data = await Model.uploadArticleTumbImg(article_id, `/uploads/articleTumbImg/${+new Date()}-${name}`)
                if (data.changedRows > 0) {
                    ctx.body = {
                        code: 1,
                        msg: '上传成功',
                        data: {article_img: `/uploads/articleTumbImg/${+new Date()}-${name}`, article_id: article_id}
                    }
                } else {
                    ctx.body = {
                        code: 0,
                        msg: '该图片路径已存在'
                    }
                }
            } catch (e) {
                console.log(e)
                console.log('服务器错误，上传图片失败')
                ctx.body = {
                    code: 0,
                    msg: '服务器错误，上传图片失败'
                }
            }
        } catch (e) {
            console.log(e)
            console.log('服务器错误，图片读取或写入失败')
            ctx.body = {
                code: 0,
                msg: '服务器错误，图片读取或写入失败'
            }
        }
    }
}

module.exports = ArticleController

