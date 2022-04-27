
const User  = require('../model/user.model')
const {userRegisterError} = require('../constant/err.type')

class UserService{
    async creatUser(username,password,nickname){
        //插入用户数据
        console.log(username,password,nickname)
        try {
            const res = await User.create({ username ,  password , nickname })
            //console.log(res)
            return res
        }catch(error){
            console.log(error)
            ctx.app.emit('error',userRegisterError,ctx)
        } 
    }

    async getUserInfo({id ,username, password,is_admin}){
        
        const whereOpt = {}

        id && Object.assign(whereOpt, { id })
        username && Object.assign(whereOpt, { username })
        password && Object.assign(whereOpt, { password })
        is_admin && Object.assign(whereOpt, { is_admin })

        const res = await User.findOne({
            attributes : ['id', 'username', 'password'],
            where : whereOpt
        })
        //console.log(res)
        return  res ? res.dataValues : null
        // if (res === null ){
        //     return false
        // }
        // else{
        //     return true
        // }
    }

    async updateById({id ,username, password,is_admin}){
        const whereOpt = {id}
        const newUser = {}

        username && Object.assign(newUser, { username })
        password && Object.assign(newUser, { password })
        is_admin && Object.assign(newUser, { is_admin })

        //console.log(newUser)
        const res = await User.update(newUser,{
            where : whereOpt
        })
        //console.log(res)

        return res[0] > 0 ? true : false

    }
}

module.exports = new UserService
