
const {getUserInfo} = require('../service/user.service')

const getAccount = async (ctx,next) =>{

    const id = ctx.state.user.id
    try{
        const res = await getUserInfo({id})
        if(res){
            ctx.account = res.account
            console.log(ctx.account)
        }
    }catch(err){
        console.error(err)
    }
    await next()
}

module.exports ={
    getAccount
}