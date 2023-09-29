const adminTestController  = require('../admin-controller/test')
const { checkAdminRole } = require('../utils/authPage')
const adminTestRouter = require('express').Router()



adminTestRouter.post('/create-test',  checkAdminRole,    adminTestController.createTest) //creates 
adminTestRouter.get('/get-all',    checkAdminRole,   adminTestController.getAllTests) //get all 
adminTestRouter.get('/get/:testId',    checkAdminRole,   adminTestController.getTestById) //get by id 
adminTestRouter.get('/get/:adminId',    checkAdminRole,   adminTestController.getAllAdminTests) //get by  admin id 
adminTestRouter.put('/update-test/:testId',   checkAdminRole,    adminTestController.updateTest) //update test
adminTestRouter.delete('/delete-test/:testId',   checkAdminRole,    adminTestController.deleteTest) //delete  test








module.exports = {adminTestRouter}

