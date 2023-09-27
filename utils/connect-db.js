const { Sequelize } = require('sequelize')
require('dotenv').config()


const sequelize  =  new Sequelize(process.env.DBURL , {
    dialect : 'postgres'
})


sequelize.authenticate().then(()=>{
    console.log('DB connected sucesfully')
}).catch((error)=>{
    console.log('Unable to connect db ' , error)
})

module.exports = sequelize