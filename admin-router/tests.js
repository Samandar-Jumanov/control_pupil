const adminTestController  = require('../admin-controller/test')
const adminTestRouter = require('express').Router()
const { authPage } = require('../utils/authPage')


adminTestRouter.post('/create-test', authPage('admin'),  adminTestController.createTest)

module.exports = adminTestRouter

