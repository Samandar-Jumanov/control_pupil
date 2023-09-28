const themeController = require('../admin-controller/theme')
const themeRouter = require('express').Router()


themeRouter.post('/create-theme', themeController.createTheme)

module.exports = themeRouter