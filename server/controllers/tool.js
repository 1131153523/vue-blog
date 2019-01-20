const Model = require('../model/index')
class ToolController {
    static async getTools (ctx) {
        try {
            let data = JSON.parse(JSON.stringify(await Model.getTools()))
            ctx.body = {
                code: 1,
                data: data,
                isShow: false
            }
        } catch (e) {
            console.log(e);
            console.log('服务器错误，获取工具箱内容失败')
            ctx.body = {
                code: 0,
                msg: '服务器错误，获取工具箱内容失败'
            }
        }
    }
    static async deleteTool (ctx) {
        try {
            let res = await Model.deleteTool(ctx.request.body)
            if (res.affectedRows > 0) {
                ctx.body = {
                    code: 1,
                    msg: '删除成功'
                }
            } else {
                ctx.body = {
                    code: 0,
                    msg: '该工具不存在'
                }                
            }
        } catch(e) {
            console.log(e);
            console.log('服务器错误，工具删除失败')
            ctx.body = {
                code: 0,
                msg: '服务器错误，工具删除失败'
            }
        }
    }
    static async updateTool (ctx) {
        try {
            await Model.updateTool(ctx.request.body)
            ctx.body = {
                code: 1,
                msg: '更新成功'
            }                
        } catch(e) {
            console.log(e);
            console.log('服务器错误，工具更新失败')
            ctx.body = {
                code: 0,
                msg: '服务器错误，工具更新失败'
            }
        }
    }
    static async addTool (ctx) {
        try {
            await Model.addTool(ctx.request.body)
            ctx.body = {
                code: 1,
                msg: '添加成功'
            }                 
        } catch (e) {
            console.log(e);
            console.log('服务器错误，工具添加失败')
            ctx.body = {
                code: 0,
                msg: '服务器错误，工具添加失败'
            }            
        }
    }
}   

module.exports = ToolController

