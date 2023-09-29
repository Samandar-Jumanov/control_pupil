const emailController = require('../admin-controller/send-email')
const { checkAdminRole } = require('../utils/authPage')
const emailRouter  = require('express').Router()

emailRouter.post('/send-email', checkAdminRole,  emailController.sendEmail)

module.exports = {emailRouter}