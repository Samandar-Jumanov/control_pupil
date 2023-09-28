const {TestThemes, Test, Admin} = require("../models/relations");
const sequelize = require("../utils/connect-db");


const createTest = async (request , response , next ) =>{
    const {themeName , question , a, b , c , d , trueAnswer , adminId } = request.body 

    let t;
    try {
        t = await sequelize.transaction();
        const theme = await TestThemes.findOne({where : {themeName}} , {transaction : t })
        const admin = await Admin.findByPk(adminId)

        if(!admin){
            return response.status(404).json({
                message :'Admin not found '
            })
        }

        if(!theme){
            return response.json({
                message :'Theme not found  '
            })
        }

        const newTest = await Test.create({
            themeId : theme.id ,
            themeName : themeName ,
            question : question,
            trueAnswer : trueAnswer, 
            a: a ,
            b:b, 
            c : c ,
            d : d, 
            adminId : adminId 
        } , {transaction : t })

        await  theme.addTests(newTest , {transaction : t })
        await admin.addCreatedTests(newTest , {transaction : t })
        await admin.save()
        await theme.save();
        await t.commit();

        response.json({
            messsage :'Test created succefully',
            newTest : newTest
        })

    } catch (error) {
        await t.rollback();
        next(error)
    }
} 

module.exports = {
    createTest
}