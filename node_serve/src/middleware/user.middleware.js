const bcrypt = require('bcryptjs')

const {getUserInfo} = require('../service/user.service')
const {
    userFormateError,
    usreAlreadyExisted,
    userRegisterError,
    userDoesNotExist,
    userLoginError,
    invalidPassword
} = require('../constant/err.type')

const userValidator = async (ctx , next) =>{

    const {username,password,nickname} = ctx.request.body

    //验证密码用户名不为空
    if (!username ||!password){
        console.error('用户名或密码为空',ctx.request.body)
        ctx.app.emit('errpr',userFormateError,ctx)
        return
    }

    await next()

}
const verifyUser = async (ctx ,next ) => {

    const {username,password,nickname} = ctx.request.body
    //验证用户是都已经存在
    try{
        const res = await getUserInfo({username})
        //console.log(res)
        if(res){
            console.error('用户名已经存在',username)
            ctx.app.emit('error',usreAlreadyExisted,ctx)
            return 
        }
    }catch(error){
        ctx.app.emit('error',userRegisterError,ctx)
        return
    }
    await next()
}

const cryptPassword = async (ctx,next) =>{
    const {password} = ctx.request.body
    
    const salt = bcrypt.genSaltSync(10)
    const hash = bcrypt.hashSync(password,salt)

    ctx.request.body.password =hash

    await next()
}

const verifyLogin = async (ctx,next) =>{
    
    const {username,password} = ctx.request.body

    try{
        const res = await getUserInfo({username})
        //console.log(res)
        //验证用户是否存在
        if(!res){
            console.error('用户名不存在',username)
            ctx.app.emit('error',userDoesNotExist,ctx)
            return 
        }
        //验证用户密码是否正确
        if(!bcrypt.compareSync(password,res.password)){
            console.error('密码不正确',username)
            ctx.app.emit('error',invalidPassword,ctx)
            return 
        }
    }catch(error){
        return ctx.app.emit('error',userLoginError,ctx)
    }
    await next()
}

module.exports = {
    userValidator,
    verifyUser,
    cryptPassword,
    verifyLogin
}