const {DataTypes} = require('sequelize')

const seq = require('../db/seq')

const FileType = seq.define('FileType',{
    cid : {
        type : DataTypes.STRING,
        comment : 'cid' 
    },
    type : {
        type : DataTypes.STRING,
        comment : '文件后缀名'
    }
})

//强制同步数据库(创建数据表)
//FileType.sync({force : true})

module.exports = FileType