const fileContract = require('../contracts/file.contract')
//console.log(fileContract.methods)


class ContractService{
    async uploadFileToContract ( nameWriter,style , date , intro , cover ,account) {
        try{
            const receipt = await fileContract.methods.publishFileInfo(nameWriter,style , date , intro , cover)
                            .send({from : account ,gas : 6000000})
            //console.log(receipt.events.publishFileSuccess.returnValues)
        }catch(err){
            console.error(err)
        }
    }

    async downloadFileToContract(id,account){
        try{
            const receipt = await fileContract.methods.downloadFile(id)
                            .send({from : account,gas : 6000000})
            //console.log(receipt.events.downloadSuccess.returnValues)
        }catch(err){
            console.error(err)
        }
    }

    async getFileInfoFromContract(id){
        try{
            const receipt = await fileContract.methods.getFilesInfo(id)
                                .send({from : '0x49fF96Ae1f0906A0946452aBC98E8aB3A5e6EFb8',gas : 6000000})
            //console.log(receipt.events.getFilesInfoSuccess.returnValues)
            let res = receipt.events.getFilesInfoSuccess.returnValues
            res.id = id
            return  res ? res : null
        }catch(err){
            console.error(err)
        }
        
    }

    async getFileLengthFromContract(){
        try{
            const receipt = await fileContract.methods.getFileLength()
                                .send({from : '0x49fF96Ae1f0906A0946452aBC98E8aB3A5e6EFb8',gas : 6000000})
            //console.log(receipt.events.getFileLengthSuccess.returnValues)
            const res = receipt.events.getFileLengthSuccess.returnValues
            return res ? res : null
        }catch(err){

        }

    }

    async evaluateFileToContract(id,score,content,account){
        try{
            const receipt = await fileContract.methods.evaluate(id,score,content)
                                .send({from : account,gas : 6000000})
            //console.log(receipt.events.evaluateSuccess.returnValues)
            let res = receipt.events.evaluateSuccess.returnValues
            res.content = content
            return res ? res : null
        }catch(err){
            console.error(err)
        }
        
    }

    async getCommentLengthFromContract(fileId,account){
        try{
            const receipt = await fileContract.methods.getCommentLength(fileId)
                                .send({from : '0x49fF96Ae1f0906A0946452aBC98E8aB3A5e6EFb8',gas : 6000000})
            //console.log(receipt.events.getCommentLengthSuccess.returnValues)
            let res = receipt.events.getCommentLengthSuccess.returnValues
            res.fileId = fileId
            return res ? res : null
        }catch(err){
            console.error(err)
        }
        
    }

    async getComentFromContract(fileId,contentId){
        try{
            const receipt = await fileContract.methods.getCommentInfo(fileId,contentId)
                                .send({from : '0x49fF96Ae1f0906A0946452aBC98E8aB3A5e6EFb8',gas : 6000000})
            //console.log(receipt.events.getCommentInfoSuccess.returnValues) 
            let res = receipt.events.getCommentInfoSuccess.returnValues
            res.contentId = contentId
            return res ? res : null
        }catch(err){
            console.error(err)
        }

    }

    async getDownloadNumsFromContract(fileId){
        try{
            const receipt = await fileContract.methods.getDownloadNums(fileId)
                                .send({from : '0x49fF96Ae1f0906A0946452aBC98E8aB3A5e6EFb8',gas : 6000000})
            const res = receipt.events.getDownloadNumsSuccess.returnValues
            return res ? res : null
        }catch(err){
            console.error(err)
        }
    }

    async getDownloadFileFromContract(account){
        try{
            const receipt = await fileContract.methods.getDownloadFile()
                                .send({from : account , gas : 6000000})
            const res = receipt.events.getDownloadFileSuccess.returnValues
            return res? res : null
        }catch(err){
            console.error(err)
        }
    }

    async getUploadFileFromContract(account){
        try{
            console.log(account)
            const receipt = await fileContract.methods.getPublishFile()
                            .send({from : account,gas : 6000000})
            const res = receipt.events.getPublishFilesuccess.returnValues
            //console.log(res)
            return res ? res : null
        }catch(err){

        }
    }
}

module.exports = new ContractService()