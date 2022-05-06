const Router = require('koa-router')
const {uploadFile,downloadFile} = require('../middleware/ipfs.middleware')
const {uploadFileContract,downloadFileContract} = require('../controller/contract.controller')

const router  = new Router()

router.post('/upload',uploadFile,uploadFileContract)

router.post('/download',downloadFile,downloadFileContract)

module.exports = router
