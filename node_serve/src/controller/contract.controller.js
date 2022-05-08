const {
    uploadFileToContract, 
    downloadFileToContract,
    getFileInfoFromContract
} = require('../service/contract.service')

class ContractController {

    async uploadFileContract(ctx,next) {
        try{
            const {fileName,authorName,selectStyle,selectDate,resourceDescription} = ctx.request.body
            const fileHash = ctx.body
            const res = await uploadFileToContract(authorName,selectStyle,0,resourceDescription,fileHash)
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
            const res = await downloadFileToContract(id)
        }catch(err){
            console.log(err)
        }


    }

    async getFileDetial(ctx,next){
        try{
            const id  = ctx.request.body.id
            const res = await getFileInfoFromContract(id)
            ctx.body = {
                code : 0,
                message : '获取文件详情成功'+ id,
                result : ''
            }
        }catch(err){
            console.error(err)
        }

    }

    async getFilesList(ctx,next){
        try{

        }catch(err){
            console.error(err)
        }
    }
}


module.exports = new ContractController()