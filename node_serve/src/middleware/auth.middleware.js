const jwt  = require('jsonwebtoken')

const {JWT_SECRET} = require('../config/config.default')
const {tokenExpiredError,jsonWebTokenError} = require('../constant/err.type')

const auth = async ( ctx , next ) => {
    
    const {authorization } = ctx.request.header
    const token = authorization.replace('Bearer ','')
    //console.log(token)

    try{
        //user 包含payload 的信息 (id ,username,is_admin)
        const user = jwt.verify(token,JWT_SECRET)
        ctx.state.user = user
    }catch(err){
        switch(err.name){
            case 'TokenExpiredError':
                console.error('token已过期',err)
                return ctx.app.emit('error',tokenExpiredError,ctx)
            case 'JsonWebTokenError':
                console.error('无效的token',err)
                return ctx.app.emit('error',jsonWebTokenError,ctx)
        }
    }
    await next()
}
module.exports = {
    auth
}