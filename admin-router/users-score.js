const usersScoreController = require('../admin-controller/user-score')
const userScoreRouter = require('express').Router()
const { checkAdminRole } = require('../utils/authPage')


userScoreRouter.get('/get-all',  checkAdminRole,    usersScoreController.getAllUserScores)

module.exports = {userScoreRouter}
