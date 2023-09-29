const express = require('express')
const sequelize = require('./utils/connect-db')
const app = express()
const usersAuthRouter = require('./users-route/users-auth')
const userTestRouter = require('./users-route/test')

const {adminTestRouter} = require('./admin-router/tests')
const {adminAuthRouter} = require('./admin-router/auth')
const {emailRouter} = require('./admin-router/email')
const {themeRouter} = require('./admin-router/theme')
const {userScoreRouter} = require('./admin-router/users-score')


sequelize.sync().then(()=>{
    console.log('DB created ')
}).catch((err)=>{
    console.log(err)
})

app.get('/', (request , response , next )=>{
    response.send('It is working ')
})

app.use(express.json())
app.use('/users', usersAuthRouter) //checked all worked 
app.use('/tests', userTestRouter) //... 

//admin routing 
app.use('/admin/tests', adminTestRouter) //checked all worked 
app.use('/admin/auth', adminAuthRouter) //checked all worked 
app.use('/admin/email',emailRouter ) //gonna be check 
app.use('/admin/theme', themeRouter) //checked all worked 
app.use('/admin/user-score',userScoreRouter )

//Admin side -------------------------
//tests / crud 
//theme , //crud 
// sendEmail , // post
// able to get user info //get 

//Pupil side 
//to solve a test 
//auth (such as login , signup )



app.listen(3001 , ()=>{
    console.log('Server is running ')
})