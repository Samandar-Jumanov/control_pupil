const sendMailController = require('../controller/send-email')
const sendMailRoute = require('express').Router()


sendMailRoute.post('/send-mail', sendMailController.sendEmail)

module.exports = sendMailRoute