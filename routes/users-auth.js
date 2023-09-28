const usersAuthController = require('../controller/users-auth')
const usersAuthRouter = require('express').Router()
const validateEmail = require('../utils/checkEmail')

usersAuthRouter.post('/signup', validateEmail,  usersAuthController.SignUp)
usersAuthRouter.post('/login', validateEmail, usersAuthController.Login)


module.exports = usersAuthRouter


