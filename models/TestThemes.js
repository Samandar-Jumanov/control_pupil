const { DataTypes } = require("sequelize");
const sequelize = require("../utils/connect-db");



const TestThemes = sequelize.define('testTheme', {
    id : {
        type : DataTypes.INTEGER,
        autoIncrement : true ,
        primaryKey : true 
    },
    theme : {
       type : DataTypes.STRING ,
       allowNull : false 
    }, 
    
  
})

module.exports = TestThemes

