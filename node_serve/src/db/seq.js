const {Sequelize} = require('sequelize')
const {DATABASE,DBUSERNAME,DBPASSWORD,DBHOST} = require('../config/config.default')


const seq = new Sequelize(DATABASE,DBUSERNAME,DBPASSWORD,{
    host : DBHOST,
    dialect : 'mysql'
})

module.exports  = seq
