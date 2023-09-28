const emailController = require('../admin-controller/send-email')
const { authPage } = require('../utils/authPage')
const emailRouter  = require('express').Router()

emailRouter.post('/send-email', authPage('admin'),  emailController.sendEmail)

module.exports = emailRouter