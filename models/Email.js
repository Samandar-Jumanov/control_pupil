const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connect-db");


const Emails = sequelize.define('emails', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true, 
        primaryKey : true 
    },
    body : {
        type : DataTypes.TEXT,
        allowNull : false 
    },
     to : {
        type : DataTypes.STRING,
        allowNull : false 
     },
     from : {
        type : DataTypes.STRING ,
        allowNull : false 
     }
})

module.exports = Emails