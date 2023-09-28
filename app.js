const express = require('express')
const sequelize = require('./utils/connect-db')
const app = express()
const usersAuthRouter = require('./users-route/users-auth')
const userTestRouter = require('./users-route/test')
const adminTestRouter = require('./admin-router/tests')
const adminAuthRouter = require('./admin-router/auth')
const emailRouter = require('./admin-router/email')
const themeRouter = require('./admin-router/theme')
const userScoreRouter = require('./admin-router/users-score')


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
app.use('/tests', userTestRouter)

//admin routing 
app.use('/admin/tests', adminTestRouter)
app.use('/admin/auth', adminAuthRouter)
app.use('/admin/email',emailRouter )
app.use('/admin/theme', themeRouter)
app.use('/admin/user-score',userScoreRouter )

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