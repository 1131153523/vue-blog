const createToken = require('../token/createToken')
const Model = require('../model/index')
const github = require('../config/github')
const fetch = require('node-fetch')
const md5  = require('js-md5')
class UserController {
    static async loginPost (ctx) {
        let {username, password} = ctx.request.body
        password = md5(md5(md5(password)))
        try {
            let data = await Model.login(username, password)
            let res = JSON.parse(JSON.stringify(data))
            if (res.length <= 0) {
                ctx.body = {
                    code: 0,
                    msg: '用户名或密码错误'
                }
            } else {
                let token = await createToken(username)
                try {
                    let time = new Date().toLocaleString().replace(/\//g, '-')
                    let promise = await Model.updateToken({token, loginTime: time}, res[0]['admin_id'])
                    if (promise.affectedRows >= 0) {
                        ctx.body = {
                            code: 1,
                            data: {
                                token: token,
                                username: username
                            },
                            msg: '登录成功',
                            isShow: false
                        }
                    }
                } catch (e) {
                    ctx.status = 500
                    ctx.body = {
                        code: 0,
                        msg: '服务器出错, token 更新数据库失败'
                    }
                    console.log(e)
                    console.log('服务器出错, token 更新数据库失败')
                }
            }
        } catch(e) {
            ctx.status = 500
            ctx.body = {
                code: 0,
                msg: '服务器出错,login 查询数据库失败'
            }
            console.log(e)
            console.log('服务器出错, login 查询数据库失败')
        }
    }

    static async checkPrepass(ctx) {
        try {
            let {prepass} = ctx.request.body
            let data = await Model.checkPrepass({...ctx.request.body, prepass: md5(md5(md5(prepass)))})
            if (data.length > 0) {
                ctx.body  = {
                    code: 1,
                    msg: '原密码正确'
                }
            } else {
                ctx.body  = {
                    code: 0,
                    msg: '原密码错误'
                }
            }
        } catch(e){
            ctx.status = 500
            ctx.body  = {
                code: 0,
                msg: '服务器出错,checkPrepass 查询数据库失败'
            }
            console.log(e)
            console.log('服务器出错, checkPrepass 查询数据库失败')
        }
    }
    static async changePass(ctx){
        try {
            let {username, password, token} = ctx.request.body
            let data = await Model.changePass({username, password: md5(md5(md5(password))), token})
            if (data.affectedRows > 0) {
                ctx.body = {
                    code: 1,
                    msg: '修改成功'
                }
            } else {
                ctx.body = {
                    code: 0,
                    msg: 'token过期或用户不存在'
                }
            }
        } catch (e) {
            ctx.status = 500
            ctx.body  = {
                code: 0,
                msg: '服务器出错,更新密码失败'
            }
            console.log(e)
            console.log('服务器出错, 更新密码失败')
        }
    }

    static async addManager (ctx) {
        try {
            let {pass} = ctx.request.body
            await Model.addManager({...ctx.request.body, pass: md5(md5(md5(pass)))})
            ctx.body = {
                code: 1,
                msg: '添加成功'
            }
        } catch(e) {
            ctx.body  = {
                code: 0,
                msg: '服务器出错,添加管理失败'
            }
            console.log(e)
            console.log('服务器出错,添加管理失败')
        }
    }
}

module.exports = UserController

