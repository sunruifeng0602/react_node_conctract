const Router = require('koa-router')

const {emailCaptcha} = require('../controller/emaile.controller')

const router  = new Router()

router.post('/emilecode',emailCaptcha)

module.exports = router