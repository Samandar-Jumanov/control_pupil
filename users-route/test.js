const testController = require('../users-controller/tests')
const userTestRouter = require('express').Router()
const authenticateToken = require('../utils/auth-token')

userTestRouter.post('/solve-test', authenticateToken,  testController.SolveTest)
module.exports = userTestRouter

