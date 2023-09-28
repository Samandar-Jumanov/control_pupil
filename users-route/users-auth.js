const usersAuthController = require('../users-controller/users-auth')
const usersAuthRouter = require('express').Router()

usersAuthRouter.post('/signup',   usersAuthController.SignUp)
usersAuthRouter.post('/login',  usersAuthController.Login)


module.exports = usersAuthRouter


