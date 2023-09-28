const Scores = require("./Scores");
const Test  = require("./Test");
const TestThemes = require("./TestThemes");
const Users = require("./users");

//test and users 
Test.belongsTo(Users , {
    foreignKey : "userId"
})
 
Users.hasMany(Test , {
    foreignKey :'userId',
    as : 'tests'
})

//Users and scores 
Scores.belongsTo(Users , {
    foreignKey :'userId'
})

Users.hasMany(Scores, {
    foreignKey :'userId',
    as : 'scores'
})

//Themes and Tests 

Test.belongsTo(TestThemes, {
    foreignKey :'themeId'
})

TestThemes.hasMany(Test, {
    foreignKey :'themeId', 
    as :'tests'
})

module.exports = {
    Test, 
    Users, 
    TestThemes,
    Scores
}







