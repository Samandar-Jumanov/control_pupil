const themeController = require('../admin-controller/theme')
const themeRouter = require('express').Router()
const {  checkAdminRole } = require('../utils/authPage')

themeRouter.post('/create-theme',checkAdminRole ,     themeController.createTheme) //create theme 
themeRouter.get('/get-all',   checkAdminRole ,   themeController.getAllThemes)  // get all themes
themeRouter.get('/get-theme/:themeId', checkAdminRole , themeController.getThemeById) // get theme by id 
themeRouter.get('/get-theme/:adminId',  checkAdminRole ,  themeController.getAllAdminThemes) // get theme  by  admin id 
themeRouter.put('/update-theme/:themeId', checkAdminRole ,  themeController.updateTheme) // update theme 
themeRouter.delete('/delete-theme/:themeId',   checkAdminRole , themeController.deleteTheme) //  delete them 

module.exports = {themeRouter}