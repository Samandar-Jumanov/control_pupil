const {Users , Test, Scores} =  require('../models/relations')
const sequelize = require('../utils/connect-db')


const getUserAllScores = async (request , response , next ) =>{
    const {userId} = request.params 

    try {
        const user = await Users.findByPk(userId)

        if(!user){
            return response.json({
                message :'User not found '
            })
        }

        const userAllScores = await user.getScores()
        return response.json({
            userAllScores : userAllScores
        })
    } catch (error) {
        next(error)
    }
}


const SolveTest = async (request , response , next ) =>{
    const {userId, testId , selectedAnswer } = request.body 
    let t;
    try {
        t =  await sequelize.transaction();
        const user = await Users.findByPk(userId  , {transaction : t })
        if(!user){
            return response.status(401).json({
                message :'Unauthorized'
            })
        }

        const test = await Test.findByPk(testId , {transaction : t })
        if(!test){
            return response.json({
                message :'Test not found '
            })
        }

        const newScore = await Scores.create({
            userId : userId ,
            testId : testId,
            testCount : 0 ,
            solvedCount : 0,
            percetange : ''
        } , { transaction : t })
       
        
        if(selectedAnswer === test.trueAnswer){
            newScore.testCount++
            newScore.solvedCount++
            await newScore.save()
            return;
        }
        newScore.testCount++
        await newScore.save()
       return;

    } catch (error) {
        next(error)
        
    }
}


module.exports = {SolveTest , getUserAllScores}