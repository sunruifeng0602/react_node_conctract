const Koa = require('koa')
const KoaBody = require('koa-body')
const cors = require('koa2-cors')

const userRouter = require('../router/user.routr')
const emailRouter = require('../router/email.route')
const errHandler = require('./errHandler')

const app = new Koa()

app.use(cors())
app.use(KoaBody())
app.use(userRouter.routes())
app.use(emailRouter.routes())

app.on('error',errHandler)

module.exports = app