const express = require('express')
const sequelize = require('./utils/connect-db')
const app = express()
const usersAuthRouter = require('./routes/users-auth')
const testRouter = require('./routes/test')
const sendMailRoute = require('./routes/mails')
const themesRouter = require('./routes/themes')



sequelize.sync().then(()=>{
    console.log('DB created ')
}).catch((err)=>{
    console.log(err)
})

app.get('/', (request , response , next )=>{
    response.send('It is working ')
})

app.use(express.json())
app.use('/users', usersAuthRouter)
app.use('/tests', testRouter)
app.use('/mails', sendMailRoute)
app.use('/theme', themesRouter)


//Admin side -------------------------
//to create a test , 
//theme ,
// sendEmail ,
// able to get user info

//Pupil side 
//to solve a test 
//auth (such as login , signup )



app.listen(3001 , ()=>{
    console.log('Server is running ')
})