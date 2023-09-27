const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connect-db");


const Scores = sequelize.define('scores', {
    id : {
        type : DataTypes.INTEGER,
        primaryKey : true ,
        autoIncrement : true 
    },
    userId : {
        type :DataTypes.INTEGER,
        allowNull : false 
    },
    testId : {
        type : DataTypes.INTEGER,
        allowNull : false 
    }, 
    testCount : {
        type :DataTypes.INTEGER,
        allowNull : false 
    },
    solvedCount : {
        type : DataTypes.INTEGER,
        allowNull : false 
    },
    percantage : {
        type : DataTypes.STRING ,
        allowNull : false 
    }
})

module.exports = Scores

