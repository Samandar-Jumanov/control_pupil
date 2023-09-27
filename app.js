const express = require('express')
const sequelize = require('./utils/connect-db')
const app = express()




sequelize.sync().then(()=>{
    console.log('DB created ')
}).catch((err)=>{
    console.log(err)
})

app.get('/', (request , response , next )=>{
    response.send('It is working ')
})



app.listen(3001 , ()=>{
    console.log('Server is running ')
})