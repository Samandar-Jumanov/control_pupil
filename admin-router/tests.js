const adminTestController  = require('../admin-controller/test')
const adminTestRouter = require('express').Router()
const { authPage } = require('../utils/authPage')



adminTestRouter.post('/create-test',  authPage('admin', 'teacher'),   adminTestController.createTest) //creates 
adminTestRouter.get('/get-all',  authPage('admin', 'teacher'),   adminTestController.getAllTests) //get all 
adminTestRouter.get('/get/:testId',  authPage('admin', 'teacher'),   adminTestController.getTestById) //get by id 
adminTestRouter.put('/update-test/:testId',  authPage('admin', 'teacher'),   adminTestController.updateTest) //update test
adminTestRouter.delete('/delete-test/:testId',  authPage('admin', 'teacher'),   adminTestController.deleteTest) //delete  test








module.exports = {adminTestRouter}

