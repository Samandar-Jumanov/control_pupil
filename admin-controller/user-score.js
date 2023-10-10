const { Scores, Users } = require('../models/relations')

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



const getSingUserScores = async (request, response , next ) =>{
    const {userId} = request.params


    try {
        const user = await Users.findByPk(userId , {
            include: [Scores]
        })

        if(!user){
            return response.status(404).json({
                message :' User not found '
            })
        }
        const userAllScore = await user.getScores()
        return response.status(200).json({
            userAllScore : userAllScore
        })  

    } catch (error) {
        next(error)
        
    }
}

module.exports = {getAllUserScores , getSingUserScores}
