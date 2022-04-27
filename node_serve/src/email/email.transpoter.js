const nodemailer = require('nodemailer')

const {CODE_EMAIL,EMAIL_PASS,EMAIL_SERVICE} = require('../config/config.default')
const transporter = nodemailer.createTransport({
    service : EMAIL_SERVICE,
    secureConnection : true,
    auth : {
        user : CODE_EMAIL,
        pass : EMAIL_PASS
    }
})

module.exports = transporter