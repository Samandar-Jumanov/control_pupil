const usersScoreController = require('../admin-controller/user-score')
const userScoreRouter = require('express').Router()
const { authPage } = require('../utils/authPage')


userScoreRouter.get('/get-all',  authPage('admin', 'teacher'),    usersScoreController.getAllUserScores)

module.exports = {userScoreRouter}
