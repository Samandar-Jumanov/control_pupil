const express = require('express')
const sequelize = require('./control_pupil/models/utils/connect-db')
const app = express()


app.get('/', (req, res , next )=>{
    res.send('Started succefuly ')
})


sequelize.sync().then(()=>{
    console.log('Db created ')
}).catch((err)=>{
    console.log(err)
})

app.listen(3001 , ()=>{
    console.log('Server started succesfully')
})

