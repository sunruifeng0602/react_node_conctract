const {DataTypes} = require('sequelize')

const seq = require('../db/seq')

//创建模型
const Email = seq.define('Email',{
    id : {
        type :DataTypes.INTEGER,
        primaryKey : true,
        autoIncrement : true
    },
    email : {
        type : DataTypes.STRING,
        comment : '邮箱' 
    },
    code : {
        type : DataTypes.STRING,
        comment : '验证码'
    },
    type : {
        type : DataTypes.STRING,
        comment : '验证码类型 0 : changePassword , 1 : register'
    }
})

//强制同步数据库(创建数据表)
//Email.sync({force : true})

module.exports = Email