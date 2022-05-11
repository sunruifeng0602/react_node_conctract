const Router = require('koa-router')
const {uploadFile,downloadFile ,getUploadRequest} = require('../middleware/ipfs.middleware')
const {
    uploadFileContract,
    downloadFileContract,
    getFileDetial,
    getFilesList,
    evaluateFile,
    getComment,
    getDownloadFileList,
    getUploadFileList,
} = require('../controller/contract.controller')

const router  = new Router()

router.post('/upload',uploadFile,uploadFileContract)

router.post('/download',downloadFile,downloadFileContract)

router.post('/detial',getFileDetial)

router.post('/filelist',getFilesList)

router.post('/evaluate',evaluateFile)

router.post('/getcomment',getComment)

router.post('/downloadlist',getDownloadFileList)

router.post('/uploadlist',getUploadFileList)

router.post('/uploadRequest',getUploadRequest)

module.exports = router
