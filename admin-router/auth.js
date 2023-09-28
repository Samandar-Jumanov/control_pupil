const adminAuth = require('../admin-controller/auth')
const adminAuthRouter = require('express').Router()

adminAuthRouter.post('/create-account', adminAuth.createAccount)
adminAuthRouter.post('/login-account', adminAuth.loginAdminAccount)

module.exports = adminAuthRouter
