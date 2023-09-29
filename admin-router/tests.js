const adminTestController  = require('../admin-controller/test')
const adminTestRouter = require('express').Router()
const { authPage } = require('../utils/authPage')



adminTestRouter.post('/create-test',  authPage('admin', 'teacher'),   adminTestController.createTest) //creates 
adminTestRouter.get('/get-all',    adminTestController.getAllTests) //get all 
adminTestRouter.get('/get/:testId',   adminTestController.getTestById) //get by id 
adminTestRouter.put('/update-test/:testId',    adminTestController.updateTest) //update test
adminTestRouter.delete('/delete-test/:testId',   adminTestController.deleteTest) //delete  test








module.exports = {adminTestRouter}

