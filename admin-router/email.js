const emailController = require('../admin-controller/send-email')
const emailRouter  = require('express').Router()


emailRouter.post('/send-email', emailController.sendEmail)

module.exports = emailRouter