const { sendEmail } = require('../service/email.service')

class EmailController{

    async emailCaptcha(ctx,next){

        const { email , type } = ctx.request.body
        //console.log(email ,type)
        const res = await sendEmail(email,type)
        ctx.body = {
            code : 0,
            message : '验证码已成功发送',
            result : ''
        }     
        //ctx.body = '验证码已发送'
    }

}

module.exports = new EmailController()