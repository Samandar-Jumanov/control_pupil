const testController = require('../controller/tests')
const testRouter = require('express').Router()


testRouter.post('/solve-test', testController.SolveTest)



module.exports = testRouter