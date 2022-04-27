
const {getEmailCode} = require('../service/email.service')
const {emailCodeNotMatch , emailCodeError} = require('../constant/err.type')

const  verifyEmailCode = async (ctx,next) =>{

    const {email,code} = ctx.request.body

    try{
        const res = await getEmailCode({email , code})
        if(!res){
            console.error('邮箱验证码不匹配')
            ctx.app.emit('error',emailCodeNotMatch,ctx)
            return
        }
    }catch(err){
        console.error('邮箱验证出错',err)
        ctx.app.emit('error', emailCodeError,ctx)
        return
    }
    await next()
}

module.exports = {
    verifyEmailCode
}