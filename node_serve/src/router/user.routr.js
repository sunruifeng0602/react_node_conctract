const Router = require('koa-router')
const {
        register, 
        login ,
        changePassword , 
        setAccount
} = require('../controller/user.controller')
const {
        userValidator,
        verifyUser,
        cryptPassword,
        verifyLogin
} = require('../middleware/user.middleware')

//const {getAccount} = require('../middleware/account.middleware')

const {verifyEmailCode} = require('../middleware/email.middleware')
const {auth} = require('../middleware/auth.middleware')

const router  = new Router()

router.post('/register', verifyEmailCode,userValidator , verifyUser , cryptPassword,register)

router.post('/login',userValidator,verifyLogin,login)

router.patch('/',auth,cryptPassword,changePassword)

router.post('/setaccount',auth,setAccount)

module.exports = router