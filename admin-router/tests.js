const adminTestController  = require('../admin-controller/test')
const adminTestRouter = require('express').Router()
const { authPage } = require('../utils/authPage')



adminTestRouter.post('/create-test',  authPage('admin', 'teacher'),   adminTestController.createTest) //creates 
adminTestRouter.post('/get-all',  authPage('admin', 'teacher'),   adminTestController.getAllTests) //get all 
adminTestRouter.post('/get/:testId',  authPage('admin', 'teacher'),   adminTestController.getTestById) //get by id 
adminTestRouter.post('/update-test/:testId',  authPage('admin', 'teacher'),   adminTestController.updateTest) //update test
adminTestRouter.post('/delete-test/:testId',  authPage('admin', 'teacher'),   adminTestController.deleteTest) //delete  test








module.exports = {adminTestRouter}

