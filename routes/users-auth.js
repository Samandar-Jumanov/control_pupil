const usersAuthController = require('../controller/users-auth')
const usersAuthRouter = require('express').Router()
const validateEmail = require('../utils/checkEmail')

usersAuthRouter.post('/signup',   usersAuthController.SignUp)
usersAuthRouter.post('/login',  usersAuthController.Login)


module.exports = usersAuthRouter


