const adminTestController  = require('../admin-controller/test')
const adminTestRouter = require('express').Router()

adminTestRouter.post('/create-test', adminTestController.createTest)

module.exports = adminTestRouter

