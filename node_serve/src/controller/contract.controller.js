
class ContractController {

    async uploadFileContract(ctx,next) {
        console.log(ctx.body)
        //ctx.body = 'upload dile success'
    }
}

module.exports = new ContractController()