const randomstring = require('randomstring')
const {CODE_LENGTH,CODE_EMAIL} = require('../config/config.default')

const emailTransport  = require('../email/email.transpoter')
const mailer = require('../model/email.model')
const {sendEmailCodeError} = require('../constant/err.type')


class EmailService{

    async sendEmail(email,type){
        const code =  randomstring.generate(6)
        try {
            const res = await emailTransport.sendMail({
                from : CODE_EMAIL,
                to : email,
                subject : '你好这是您的邮箱验证码',
                text : '说明内容',
                html : `<h2>系统提示</h2>:<p> 您的验证码如下：<span>${code}</span> 请勿让他人知道</p>`
            })
            if(res){
                await mailer.create({email,code,type})
            }
        }catch(err){
            console.error('发送邮箱验证码错误',err)
            ctx.app.emit('error',sendEmailCodeError,ctx)
        }
    }

    async getEmailCode({id , email , code}){
        const whereOpt = {}

        id && Object.assign(whereOpt, { id })
        email && Object.assign(whereOpt ,{ email })
        code && Object.assign(whereOpt ,{ code })

        const res = await mailer.findOne({
            attributes : ['id' , 'email' , 'code'],
            where : whereOpt
        })

        return  res ? res.dataValues : null
    }
}

module.exports = new EmailService