const jwt  = require('jsonwebtoken')

const {creatUser,getUserInfo,updateById} = require('../service/user.service')
const {JWT_SECRET} = require ('../config/config.default')
const {changPasswordError} = require('../constant/err.type')


const maxAge = 1000*60*60*24

class UserController{
    
    async register(ctx,next){

        const {username,password,nickname} = ctx.request.body
        //console.log(username,password,nickname)
        const res = await creatUser(username,password,nickname)
        //console.log(res)
        ctx.body = {
            code : 0,
            message : '注册成功',
            result :{
                //code : 0 ,
                id : res.id,
                username : res.username,
            }
        }
    }

    async login(ctx,next){
        const { username } = ctx.request.body
        //获取用户信息
        //在token的payload总没记录id,username,is_admin
        console.log(username)
        try{
            const {password,...res} = await getUserInfo({username})
            const token = jwt.sign(res , JWT_SECRET , {expiresIn : '1d'})
            ctx.cookies.set('token',token,{
                domain : 'localhost',
                path : '/',
                maxAge : maxAge,
                httpOnly : false,
                overwrite : false
            })
            ctx.body ={
                code : 0,
                message : '用户登录成功',
                result :{
                    token : token,
                    username : res.username,
                    id : res.id
                }
            }
        }catch(err){
            console.error('用户登录失败', err)
        }
    }

    async changePassword(ctx,next){

        const id  = ctx.state.user.id
        const password = ctx.request.body.password
        console.log(id ,password)
        try{
            const res = await updateById({id,password})
            if (res){
                ctx.body = {
                    code : 0,
                    message : '修改密码成功',
                    result : ''
                }
            }else{
                ctx.app.emit('error',changPasswordError,ctx)
            }

        }catch(err){
            console.error(err)
        }
       
    }

    async setAccount(ctx,next){
        const id = ctx.state.user.id
        const username = ctx.state.user.username
        const account = ctx.request.body.account
        console.log(account)
        try{
            const res = await updateById({id,account})
            if(res){
                ctx.body = {
                    code : 0 ,
                    message : "绑定以太坊账户成功",
                    result : {
                        id : id,
                        username : username ,
                        account : account  
                    }
                }
            }
        }catch(err){
            console.error(err)
        }

        await next()
    }

    //emailCaptcha
}
module.exports = new UserController()