const { Scores, Users } = require('../models/relations')
const redis = require('redis')
require('dotenv').config()
const redisClient =  redis.createClient({  legacyMode : true , url :process.env.REDIS_URL})

redisClient.connect().then(()=>{
    console.log('Redis Connected')
}).catch((err)=>{
    console.log(err)
})


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
        redisClient.get(`score?userId=${userId}`, async (err, data) => {
            if (err) {
                console.error('Miss');
                return;
            }
            if (data) {
                console.log('Hit');
                response.json({
                    data: JSON.parse(data)
                });
                return;
            } else {
                const userAllScore = await user.getScores();
                redisClient.set(`score?userId=${userId}`, JSON.stringify(userAllScore));
                console.log(userAllScore);
                response.status(200).json({
                    userAllScore: userAllScore
                });
                return;
            }
        });
    } catch (error) {
        console.log(error);
        return response.status(500).json({
            message: error
        });
    }
}
module.exports = {getAllUserScores , getSingleUserScores}
