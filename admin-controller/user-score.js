const { Scores } = require('../models/relations')

const getAllUserScores = async (request , response , next ) =>{
    try {
        const userAllScore = await Scores.findAll()
        return response.json({
            userAllScore : userAllScore
        })

        
    } catch (error) {
        next(error)
    }
}

module.exports = {getAllUserScores}
