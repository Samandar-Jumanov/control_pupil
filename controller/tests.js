const {Users , Test, Scores} =  require('../models/relations')
const sequelize = require('../utils/connect-db')





const getUserAllScores = async (request , response , next ) =>{
    const {userId} = request.params 

    try {
        const user = await Users.findByPk(userId, {
            include :[{
                model :Scores , as :'scores'
            }]
        })

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


const SolveTest = async (request, response, next) => {
  const { userId, testId, selectedAnswer } = request.body;
  let t;
  try {
    t = await sequelize.transaction();

    const user = await Users.findByPk(userId, { transaction: t });
    if (!user) {
      return response.status(401).json({
        message: 'Unauthorized'
      });
    }

    const test = await Test.findByPk(testId, { transaction: t });
    if (!test) {
      return response.json({
        message: 'Test not found'
      });
    }

    const newScore = await Scores.create(
      {
        userId: userId,
        testId: testId,
        testCount: 0,
        solvedCount: 0,
        percantage: '0%'
      },
      { transaction: t }
    );

    if (selectedAnswer === test.trueAnswer) {
      newScore.testCount++;
      newScore.solvedCount++;
    } else {
      newScore.testCount++;
    }
    console.log(newScore);
    await newScore.save();
    await user.addScores(newScore, {transaction : t })
    await t.commit()
    return response.json({
      message: 'Test completed',
      newScore: newScore
    });
  } catch (error) {
    await t.rollback();
    console.log(error);
    next(error);
  }
};

const createTest = async (request , response , next ) =>{

    try {
        const newTest = await Test.create({
            themeId :1 ,
            trueAnswer : "a",
            question :'Find true answer',
            a:'True answer',
            b:'Wrong answer',
            c:'Wrong answer',
            d: 'Wrong answer',
        })

        console.log(newTest)
        response.json({
            message :'Test created ',
            newTest:newTest
        })
    } catch (error) {
      console.log(error)
    }

}

module.exports = {SolveTest , getUserAllScores , createTest}