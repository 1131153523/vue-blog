const jwt = require('jsonwebtoken')
module.exports = async (ctx, next) => {
    let {token} = ctx.request.body
    
    try {
        let decoded = await jwt.verify(token, 'ffyyhh')
        if (decoded && decoded.exp <= new Date() / 1000) {
            ctx.status = 401
            ctx.body = {
                code:0,
                msg: 'token过期'
            }
        } else {
            return await next()
        }
    } catch (e) {
        ctx.status = 401
        ctx.body = {
            code:0,
            msg: 'token可能过期或伪造'
        }
        console.log(e)
        console.log('token可能过期或伪造')
    }
}