const themesController = require('../controller/testThemes')
const themesRouter  = require('express').Router()



themesRouter.post('/create', themesController.createTheme)


module.exports = themesRouter