const { Scores, Users } = require('../models/relations')
const {Redis} = require('ioredis')
require('dotenv').config()
const redisClient = new Redis({url : process.env.REDIS_URL , legacyMode : true})

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
       
        
        redisClient.get(`score?userId=${userId}`, async (err, data) => {
            if (err) {
               console.log(err.stack);
               console.log("Missing data");
            }

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
                redisClient.setex(`score?userId=${userId}`, 3600,  JSON.stringify(userAllScore));
                return  response.status(200).json({
                    userAllScore: userAllScore
                });
            }
        });

    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: error
        });
    }
}

module.exports = {getAllUserScores , getSingleUserScores , redisClient}
