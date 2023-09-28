const Emails = require("../models/Email")
const nodemailer = require('nodemailer')

const sendEmail = async (request , response , next ) =>{
    const {to , body , subject } = request.body 

    const email = "haad@gmail.com"
    try {
        const newEmail = await Emails.create({
            to : to ,
            body : body ,
            subject : subject,
            from : email
        })

        console.log(newEmail)
        const transPorter =  nodemailer.createTransport({
            host :'host',
            port : 587 ,
            secure : false ,
            auth :{
                user:'username',
                pass:'password'
            }
        })

        await transPorter.sendMail({
            from : email,
            to : to ,
            subject : subject,
            text:body 
        })

        response.status(201).json({
            messsage  :'Send succesfully'
        })
    } catch (error) {
        console.log(error)
        next(error)
    }
}


const getAllEmails = async (request , response , next ) =>{

    try {
        const allEmails =  await Emails.findAll()
        response.status(200).json({
            allEmails : allEmails
        })
        
    } catch (error) {
        next(error)
    }

}


module.exports = {sendEmail , getAllEmails}