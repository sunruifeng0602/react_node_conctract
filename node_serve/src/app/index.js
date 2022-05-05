const path = require('path')

const Koa = require('koa')
const KoaBody = require('koa-body')
const cors = require('koa2-cors')

const userRouter = require('../router/user.routr')
const emailRouter = require('../router/email.route')
const contractRouter = require('../router/contract.route')
const errHandler = require('./errHandler')

const app = new Koa()

app.use(cors())
app.use(KoaBody({
    multipart :true,
    formidable :{
        uploadDir : path.join(__dirname,'../uploads'),
        keepExtensions : true,
    }
}))
app.use(userRouter.routes())
app.use(emailRouter.routes())
app.use(contractRouter.routes())

app.on('error',errHandler)

module.exports = app