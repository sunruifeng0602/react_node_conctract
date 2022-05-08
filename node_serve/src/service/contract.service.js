const fileContract = require('../contracts/file.contract')
//console.log(fileContract.methods)


class ContractService{
    async uploadFileToContract ( nameWriter,style , date , intro , cover ) {
        try{
            const receipt = await fileContract.methods.publishFileInfo(nameWriter,style , date , intro , cover)
                            .send({from : '0x49fF96Ae1f0906A0946452aBC98E8aB3A5e6EFb8',gas : 6000000})
            //console.log(receipt.events.publishFileSuccess.returnValues)
        }catch(err){
            console.error(err)
        }
    }

    async downloadFileToContract(id){
        try{
            const receipt = await fileContract.methods.downloadFile(id)
                            .send({from : '0x49fF96Ae1f0906A0946452aBC98E8aB3A5e6EFb8',gas : 6000000})
            //console.log(receipt.events.downloadSuccess.returnValues)
        }catch(err){
            console.error(err)
        }
    }

    async getFileInfoFromContract(id){
        const receipt = await fileContract.methods.getFilesInfo(id)
                            .send({from : '0x49fF96Ae1f0906A0946452aBC98E8aB3A5e6EFb8',gas : 6000000})
        console.log(receipt.events.getFilesInfoSuccess.returnValues)
        //console.log("获取文件详情信息")
    }

}

module.exports = new ContractService()