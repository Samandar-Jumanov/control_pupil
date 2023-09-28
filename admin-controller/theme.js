const {TestThemes, Admin} = require("../models/relations")

const createTheme = async (request , response , next ) =>{
    const { theme , adminId } = request.body 

    try {
        const existingTheme = await TestThemes.findOne({
            where : {theme}
        })
        const admin = await Admin.findByPk(adminId)

        if(!admin){
            return response.json({
                message :'Admin not found'
            })
        }
        if(existingTheme){
            return response.json({
                message :' Theme already exists'
            })
        }
        const newTheme = await TestThemes.create({
            theme : theme ,
            adminId : adminId
        })
        await admin.addTestThemes(newTheme)
        await admin.save()
        console.log(newTheme)
        response.status(201).json({
            message :' Theme created succefully',
            theme : newTheme
        })

    } catch (error) {
        next(error)
    }
}

module.exports = {createTheme}


