const sequelize = require("../utils/connect-db");
const  { DataTypes } = require('sequelize')


const Admin = sequelize.define('Admin', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true ,
        autoIncrement : true 
    
    },
    firstName : {
        type : DataTypes.STRING ,
        allowNull : false ,
        unique : true 
    },
    lastName : {
        type : DataTypes.STRING ,
        allowNull : false 
    },
    password : {
        type : DataTypes.STRING ,
        allowNull : false 
    },
    role : {
        type : DataTypes.STRING,
        allowNull : false 
    },
    token : {
        type : DataTypes.STRING ,
        allowNull : false 
    }
})


module.exports = Admin 

