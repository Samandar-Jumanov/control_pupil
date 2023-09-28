const usersAuthController = require('../users-controller/users-auth')
const validateEmail = require('../utils/checkEmail')
const usersAuthRouter = require('express').Router()

usersAuthRouter.post('/signup',  validateEmail(),    usersAuthController.SignUp)
usersAuthRouter.post('/login',   validateEmail(),   usersAuthController.Login)


module.exports = usersAuthRouter


