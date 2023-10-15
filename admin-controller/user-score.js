const { Scores, Users } = require('../models/relations')
const { redisClient } = require('../utils/redis')
require('dotenv').config()





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
const getSingleUserScores = async (request, response, next) => {
    const { userId } = request.params;
        
    try {
        const data = await redisClient.get(`score?userId=${userId}`);
        
        if (data != null) {
            console.log('Hit');
            response.json({
                data: JSON.parse(data)
            });
            return;
        } else {
            const user = await Users.findByPk(userId, {
                include: {
                    model: Scores,
                    as: 'scores'
                }
            });
            if (!user) {
                return response.status(404).json({
                    message: 'User not found'
                });
            }
            
            const userAllScore = await user.getScores();
            await redisClient.set(`score?userId=${userId}`, JSON.stringify(userAllScore));
            
            response.status(200).json({
                userAllScore: userAllScore
            });
        }
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: error
        });
    }
}

module.exports = {getAllUserScores , getSingleUserScores }
