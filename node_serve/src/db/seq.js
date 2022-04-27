const {Sequelize} = require('sequelize')
const {DATABASE,DBUSERNAME,DBPASSWORD,DBHOST} = require('../config/config.default')


const seq = new Sequelize(DATABASE,DBUSERNAME,DBPASSWORD,{
    host : DBHOST,
    dialect : 'mysql'
})

// seq
//     .authenticate()
//     .then(()=>{
//         console.log('success')
//     })
//     .catch((error)=>{
//         console.log('failed',error)
//     })

module.exports  = seq
