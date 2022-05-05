const Router = require('koa-router')
const {uploadFile} = require('../middleware/ipfs.middleware')
const {uploadFileContract} = require('../controller/contract.controller')

const router  = new Router()

router.post('/upload',uploadFile,uploadFileContract)

module.exports = router
