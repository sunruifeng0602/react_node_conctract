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

const {auth} = require('../middleware/auth.middleware')
const {getAccount} = require('../middleware/account.middleware')

const router  = new Router()

router.post('/upload',auth,getAccount,uploadFile,uploadFileContract)

router.post('/download',auth,getAccount,downloadFile,downloadFileContract)

router.post('/detial',getFileDetial)

router.post('/filelist',getFilesList)//

router.post('/evaluate',auth,getAccount,evaluateFile)

router.post('/getcomment',getComment)

router.post('/downloadlist',auth,getAccount,getDownloadFileList)//

router.post('/uploadlist',auth,getAccount,getUploadFileList)//

router.post('/uploadRequest',getUploadRequest)

module.exports = router
