const testController = require('../controller/tests')
const testRouter = require('express').Router()
const authenticateToken = require('../utils/auth-token')

testRouter.post('/solve-test', authenticateToken,  testController.SolveTest)
testRouter.post('/create', authenticateToken,  testController.createTest)
testRouter.post('/user-info/:userId', authenticateToken,  testController.getUserAllScores)



module.exports = testRouter

