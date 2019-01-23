const Koa = require('koa')
const app = new Koa()
const json = require('koa-json')
const onerror = require('koa-onerror')
// const render = require('koa-art-template');
const koaBody = require('koa-body');
const logger = require('koa-logger')
const index = require('./routes/index')
const checkToken = require('./token/checkToken')
const path = require('path')

var cors = require('koa2-cors');
// error handler
onerror(app)
app.use(cors({
    origin: function(ctx) {
        return '*';
    },
    exposeHeaders: ['WWW-Authenticate', 'Server-Authorization'],
    maxAge: 111111111,
    credentials: true,
    allowMethods: ['GET', 'POST', 'DELETE'],
    allowHeaders: ['Content-Type', 'Authorization', 'Accept'],
}));
app.use(koaBody({
    multipart: true,
    formidable: {
        maxFileSize: 200*1024*1024
    }
}));
app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/static'))
// render(app, {
//     root: path.join(__dirname, 'view'),
//     extname: '.html',
//     debug: process.env.NODE_ENV !== 'production'
// });



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
