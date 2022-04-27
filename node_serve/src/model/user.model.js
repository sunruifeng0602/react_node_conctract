const {DataTypes} = require('sequelize')

const seq = require('../db/seq')

//创建模型
const User = seq.define('User',{
    username : {
        type : DataTypes.STRING,
        allowNull : false,
        unique : true,
        comment : '用户名即邮箱，主键' 
    },
    password : {
        type : DataTypes.STRING,
        //allowNull : false,
        //unique : true,
        comment : 'password'
    },
    nickname : {
        type : DataTypes.STRING,
        //allowNull : false,
        //unique : true,
        comment : "昵称"
    },
    account : {
        type : DataTypes.STRING,
        allowNull : true,
        defaultValue : '0x00000',
        comment : '以太坊账户'
    },
    is_admin :{
        type : DataTypes.BOOLEAN,
        allowNull : false,
        defaultValue : 0,
        comment :' 是否为管理员,1是,0否,默认为0'
    }
})

//强制同步数据库(创建数据表)
//User.sync({force : true})

module.exports = User