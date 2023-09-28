const {Users , Test, Scores} =  require('../models/relations')
const sequelize = require('../utils/connect-db')


const SolveTest = async (request, response, next) => {
  const { userId, testId, selectedAnswer  , themeName } = request.body;
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
        percantage: '0%',
        themeName : themeName
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



module.exports = {SolveTest  }