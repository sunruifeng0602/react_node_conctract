const Router = require('koa-router')
const {uploadFile,downloadFile} = require('../middleware/ipfs.middleware')
const {
    uploadFileContract,
    downloadFileContract,
    getFileDetial,
    getFilesList
} = require('../controller/contract.controller')

const router  = new Router()

router.post('/upload',uploadFile,uploadFileContract)

router.post('/download',downloadFile,downloadFileContract)

router.post('/detial',getFileDetial)

module.exports = router
