const testController = require('../controller/tests')
const testRouter = require('express').Router()
const authenticateToken = require('../utils/auth-token')

testRouter.post('/solve-test', authenticateToken,  testController.SolveTest)
testRouter.post('/solve-test', authenticateToken,  testController.createTest)


module.exports = testRouter

