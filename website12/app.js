const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
const koaBody = require('koa-body');
const logger = require('koa-logger')
const index = require('./routes/index')
const render = require('koa-art-template');
const path = require('path')
const checkToken = require('./token/checkToken')
// error handler
onerror(app)

app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024
    }
}));
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))
render(app, {
    root: path.join(__dirname, 'view'),
    extname: '.html',
    debug: process.env.NODE_ENV !== 'production'
});



// logger
app.use(async (ctx, next) => {
    const start = new Date()
    await next()
    const ms = new Date() - start
    console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})

// routes
app.use(index.routes(), index.allowedMethods())

// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});

module.exports = app
