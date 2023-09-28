const {Admin} = require("../models/relations")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const createAccount = async (request , response , next ) =>{
    const {firstName , lastName , password } = request.body 

    try {
        
        const exisitingAdmin = await Admin.findOne({
            where : {firstName}
        })

        if(exisitingAdmin){
            return response.json({
                message :'Admin has already account '
            })
        }

        const hashedPassword = await bcrypt.hash(password , 10 )
        const newAdmin = await Admin.create({
            firstName : firstName,
            lastName : lastName,
            password : hashedPassword,
            role :'admin',
            token : process.env.SECRETKEY
        })

        const token  = await jwt.sign({adminId : newAdmin.id}, process.env.SECRETKEY)
        newAdmin.token = token 
        await newAdmin.save()

        response.status(201).json({
            message :'Succes',
            newAdmin : newAdmin
        })
    } catch (error) {
        next(error)
    }
}

const loginAdminAccount = async (request , response , next ) =>{
    const {firstName , password}  = request.body 

    try {

        const admin = await Admin.findOne({
            where : {firstName}
        })

        if(!admin){
            return response.status(401).json({
                message :'Admin not found '
            })
        }
        
        const isTruePassword = await bcrypt.compare(password , admin.password)

        if(!isTruePassword){
            return response.status(403).json({
                message :'Invalid password '
            })
        }

        const token = await jwt.sign({adminId :admin.id}, process.env.SECRETKEY)
        admin.token = token 
        await admin.save()

        return response.json({
            message :'Logged in succesfully',
            admin : admin 
        })
    } catch (error) {
        next(error)
    }
}


module.exports = {
    createAccount,
    loginAdminAccount
}