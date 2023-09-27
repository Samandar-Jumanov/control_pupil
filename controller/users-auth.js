const {Users} = require("../models/relations")
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
require('dotenv').config()


const SignUp =  async (request , response , next ) =>{
    const {username , password , email } = request.body 

    try {
        const existingUser = await Users.findOne({
            where : {email}
        })
        if(existingUser){
            return response.json({
                message :'User has already account '
            })
        }
        const hashedPassword = bcrypt.hash(password , 10)
        const token = process.env.SECRETKEY
        const  newUser = await Users.create({
                username : username ,
                password : hashedPassword,
                email : email,
                token : token 
            })
            const newToken = jwt.sign({userId : newUser.id}, process.env.SECRETKEY)
            newUser.token = newToken
            await newUser.save()
        
            const newUserInfo = {
                email : newUser.email ,
                userId : newUser.id ,
                token : newUser.token,
                username : newUser.username 
            }
            return response.json({
                message :'User created succefully',
                user : newUserInfo
            })

    } catch (error) {
        next(error)
    }
}



const Login = async (request , response , next ) =>{
    const {email , password} = request.body

    try {
        const existingUser = await Users.findOne({
            where : {email}
        })

        if(!existingUser){
            return response.json({
                message :' User not found '
            })
        }

        const isPasswordCorrect = bcrypt.compare(password , existingUser.password)
        
        if(!isPasswordCorrect){
            return response.json({
                message :'Invalid password '
            })
        }

        const newToken = jwt.sign({userId : existingUser.id}, process.env.SECRETKEY)
        existingUser.token = newToken
        await existingUser.save()

        const userInfo = {
           username :    existingUser.username ,
           email : existingUser.email ,
           token : existingUser.token ,
           username : existingUser.username 
        }
        return response.json({
            message :"Logged in succefully",
            user: userInfo
        })
    } catch (error) {
        
    }
}

module.exports = {
    SignUp,
    Login 
}

