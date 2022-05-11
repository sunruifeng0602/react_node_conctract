const path = require('path')

const Koa = require('koa')
const KoaBody = require('koa-body')
const cors = require('koa2-cors')
//const send = require('koa-send')

const userRouter = require('../router/user.routr')
const emailRouter = require('../router/email.route')
const contractRouter = require('../router/contract.route')
const errHandler = require('./errHandler')

const app = new Koa()

app.use(cors())
app.use(KoaBody({
    multipart: true,
    formidable :{
        uploadDir : path.join(__dirname,'../uploads'),
        maxFieldsSize: 256 * 1024 * 1024,
        maxFileSize: 512 * 1024 * 1024,
        keepExtensions : true,
    }
}))
app.use(userRouter.routes())
app.use(emailRouter.routes())
app.use(contractRouter.routes())
app.use(contractRouter.allowedMethods())

app.on('error',errHandler)

module.exports = app