const { TestThemes, Test, Admin } = require("../models/relations");
const sequelize = require("../utils/connect-db");

const createTest = async (request, response, next) => {
  const { themeName, question, a, b, c, d, trueAnswer, adminId } = request.body;

  let t;
  try {
    t = await sequelize.transaction();

    const theme = await TestThemes.findOne({ where: { theme: themeName } }, { transaction: t });
    const admin = await Admin.findByPk(adminId , { transaction : t });

    if (!admin) {
      return response.status(404).json({
        message: "Admin not found",
      });
    }

    if (!theme) {
      return response.json({
        message: "Theme not found",
      });
    }

    const newTest = await Test.create(
      {
        themeId: theme.id,
        themeName: themeName,
        question: question,
        trueAnswer: trueAnswer,
        a: a,
        b: b,
        c: c,
        d: d,
        adminId: adminId,
      },
      { transaction: t }
    );

    await theme.addTests(newTest, { transaction: t });
    await admin.addCreatedTests(newTest, { transaction: t });
    await admin.save();
    await theme.save();
    await t.commit();

    response.json({
      message: "Test created successfully",
      newTest: newTest,
    });
  } catch (error) {
    console.log(error);
    await t.rollback();
    next(error);
  }
};

// Read all tests
const getAllTests = async (request, response, next) => {
  try {
    const tests = await Test.findAll();
    response.status(200).json({
      tests,
    });
  } catch (error) {
    next(error);
  }
};

// Read a single test by ID
const getTestById = async (request, response, next) => {
  const { testId } = request.params;

  try {
    const test = await Test.findByPk(testId);
    if (!test) {
      return response.json({
        message: "Test not found",
      });
    }

    response.status(200).json({
      test,
    });
  } catch (error) {
    next(error);
  }
};

// Update a test
const updateTest = async (request, response, next) => {
  const { testId } = request.params;
  const { themeName, question, a, b, c, d, trueAnswer } = request.body;

  let t ; 
  try {
     t = await sequelize.transaction();
    const existingTest = await Test.findByPk(testId);
    const admin = await  Admin.findByPk(existingTest.adminId , {transaction : t })
    
    if(!admin){
        return response.json({
            message :"Admin not found"
        })
    }
    if (!existingTest) {
      return response.json({
        message: "Test not found",
      });
    }

    await existingTest.update({
      themeName: themeName,
      question: question,
      a: a,
      b: b,
      c: c,
      d: d,
      trueAnswer: trueAnswer,
    } , { transaction : t });

    await admin.save()
    await t.commit();

    response.status(200).json({
      message: "Test updated successfully",
      test: existingTest,
    });
  } catch (error) {
    await t.rollback();
    console.log(error)
    next(error);
  }
};

// Delete a test
const deleteTest = async (request, response, next) => {
  const { testId } = request.params;

  let t; 
  try {

    t = await sequelize.transaction();

    const test = await Test.findByPk(testId);
    const admin = await Admin.findByPk(test.adminId , { transaction : t })

       
    if(!admin){
        return response.json({
            message :"Admin not found"
        })
    }

    
    
    if (!test) {
      return response.json({
        message: "Test not found",
      });
    }

    await test.destroy();
    await admin.removeCreatedTests(test , {transaction : t })
    await admin.save()
    await t.commit();
    
    response.status(200).json({
      message: "Test deleted successfully",
    });
  } catch (error) {
    console.log(error)
    await t.rollback();
    next(error);
  }
};


const getAllAdminTests = async (request , response , next ) =>{
  const {adminId} = request.body 

  try {
    const admin = await Admin.findByPk(adminId)
    const adminAllTests = await admin.getCreatedTests()

    return response.json({
      tests :adminAllTests
    })
    
  } catch (error) {
    console.log(error)
    next(error)
    
  }
}

module.exports = {
  createTest,
  getAllTests,
  getTestById,
  updateTest,
  deleteTest,
  getAllAdminTests
};