const themeController = require('../admin-controller/theme')
const themeRouter = require('express').Router()
const { authPage } = require('../utils/authPage')

themeRouter.post('/create-theme',  authPage('admin', 'teacher'),    themeController.createTheme) //create theme 
themeRouter.get('/get-all',  authPage('admin', 'teacher'),    themeController.getAllThemes)  // get all themes
themeRouter.get('/get-theme/:themeId',  authPage('admin', 'teacher'),    themeController.getThemeById) // get theme by id 
themeRouter.put('/update-theme/:themeId/:adminId',  themeController.updateTheme) // update theme 
themeRouter.delete('/delete-theme/:themeId/:adminId',  authPage('admin', 'teacher') ,     themeController.deleteTheme) //  delete them 


module.exports = {themeRouter}