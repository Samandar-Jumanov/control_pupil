const themeController = require('../admin-controller/theme')
const themeRouter = require('express').Router()
const { authPage } = require('../utils/authPage')

themeRouter.post('/create-theme', authPage('admin'),  themeController.createTheme)

module.exports = themeRouter