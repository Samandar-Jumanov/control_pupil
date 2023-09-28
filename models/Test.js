const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connect-db");


const Test =  sequelize.define('Test', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true ,
        primaryKey : true 
    },
    themeId : {
      type : DataTypes.INTEGER,
      allowNull : false 
    },
    trueAnswer : {
        type : DataTypes.STRING,
        allowNull : false
    },
    question : {
        type : DataTypes.TEXT ,
        allowNull : false 
    },
    a : {
        type : DataTypes.TEXT,
        allowNull : false 
    },
    b: {
        type : DataTypes.TEXT,
        allowNull : false 
    }, 
    c: {
        type : DataTypes.TEXT,
        allowNull : false 
    },
    d : {
        type : DataTypes.TEXT,
        allowNull : false 
    }
})




module.exports = Test 
