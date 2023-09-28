const usersScoreController = require('../admin-controller/user-score')
const userScoreRouter = require('express').Router()


userScoreRouter.get('/get-all', usersScoreController.getAllUserScores)

module.exports = userScoreRouter
