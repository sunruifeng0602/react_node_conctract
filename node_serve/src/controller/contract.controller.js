
class ContractController {

    async uploadFileContract(ctx,next) {
        console.log(ctx.body)
        //ctx.body = 'upload dile success'
    }

    async downloadFileContract(ctx,next){
        console.log(ctx.body)
    }
}


module.exports = new ContractController()