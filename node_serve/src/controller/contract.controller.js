const {
    uploadFileToContract, 
    downloadFileToContract,
    getFileInfoFromContract,
    getFileLengthFromContract,
    evaluateFileToContract,
    getCommentLengthFromContract,
    getComentFromContract,
    getDownloadNumsFromContract,
    getDownloadFileFromContract,
    getUploadFileFromContract
} = require('../service/contract.service')

class ContractController {

    async uploadFileContract(ctx,next) {
        try{
            const {fileName,authorName,selectStyle,resourceDescription,account} = ctx.request.body
            const fileHash = ctx.body
            //console.log(fileHash)
            const res = await uploadFileToContract(authorName,selectStyle,0,resourceDescription,fileHash,account)
            ctx.body = {
                code : 0 ,
                message : '文件上传成功',
                result : ''
            }
        }catch(err){
            console.error(err)
        }
    }

    async downloadFileContract(ctx,next){
        try{
            const id  = ctx.request.body.id
            const account = ctx.request.body.account
            const res = await downloadFileToContract(id,account)
        }catch(err){
            console.log(err)
        }
    }

    async getFileDetial(ctx,next){
        try{
            const id  = ctx.request.body.id
            const res = await getFileInfoFromContract(id)
            const downloadNums = await getDownloadNumsFromContract(id)
            if(res && downloadNums){
                ctx.body = {
                    code : 0,
                    message : '获取文件详情成功'+ id,
                    result : {
                        id : id,
                        nameWriter : res.nameWriter,
                        style : res.style,
                        uploadAge : res.uploadAge,
                        infro : res.intro,
                        hash : res.cover,
                        score : res.score,
                        comment : res.comment,
                        downloadNum : downloadNums.downloadNum
                    }
                }
            }
        }catch(err){
            console.error(err)
        }

    }

    async getFilesList(ctx,next){
        try{
            const res = await getFileLengthFromContract()
            const filesList = []
            for(let i = 0 ; i < parseInt(res.filesLength) ; i ++){
                const fileres = await getFileInfoFromContract(i)
                filesList.push(fileres)
            }
            if(filesList[0]){
                ctx.body = {
                    code : 0,
                    message : "获取文件列表成功",
                    result: {
                        length : res.filesLength,
                        list : filesList
                    }
                }            
            }   
        }catch(err){
            console.error(err)
        }
    }

    async evaluateFile(ctx,next){
        try{
            const id = ctx.request.body.id
            const score = ctx.request.body.score
            const content = ctx.request.body.content
            const account = ctx.request.body.account
            console.log(account)
            const res = await evaluateFileToContract(parseInt(id),parseInt(score),content,account)
            if(res){
                ctx.body = {
                    code : 0,
                    message : "评论成功",
                    result : res
                }
            }
        }catch(err){
            console.error(err)
        }
    }

    async getComment(ctx,next){
        try{
            const id  = ctx.request.body.id
            const commentLength = await getCommentLengthFromContract(id)
            //console.log(commentLength)
            const fileId = commentLength.fileId
            const contentId = commentLength.filesCommentsId
            const commentList = []
            for(let i  = 0 ; i < parseInt(contentId); i++ ){
                const res = await getComentFromContract(parseInt(fileId),i)
                commentList.push(res)
            }
            if(commentList){
                ctx.body = {
                    code : 0,
                    message : "获取文件评论成功",
                    result : {
                        commentList : commentList ,

                    }
                }
            }
        }catch(err){
            console.error(err)
        }

    }

    async getDownloadFileList(ctx,next){
        try{
            //console.log(ctx.request.body)
            const { account } = ctx.request.body
            const downloadFileList = await getDownloadFileFromContract(account)
            const downloadFileInfor = []
            //console.log(downloadFileList.downloadFilesID)
            for(let i  = 0 ; i < downloadFileList.downloadFilesID.length ; i++){
                //console.log(downloadFileList.downloadFilesID[i])
                downloadFileInfor.push(await getFileInfoFromContract(downloadFileList.downloadFilesID[i]))
            }
            if(downloadFileInfor){
                ctx.body = {
                    code : 0,
                    message : "获取账户下下载文件记录成功",
                    result : downloadFileInfor
                }
            }
        }catch(err){
            console.error(err)
        }
    }

    async getUploadFileList(ctx,next){
        try{
            const { account } = ctx.request.body
            const uploadFileList = await getUploadFileFromContract(account)
            //console.log(uploadFileList.uploadFilesId)
            const uploadFileInfor = []
            for(let i = 0 ; i < uploadFileList.uploadFilesId.length ; i++){
                uploadFileInfor.push(await getFileInfoFromContract(uploadFileList.uploadFilesId[i]))
            }
            if(uploadFileInfor){
                ctx.body = {
                    code : 0,
                    message : "获取上传文件列表记录成功",
                    result : uploadFileInfor
                }
            }
        }catch(err){
            console.error(err)
        }

    }

}


module.exports = new ContractController()