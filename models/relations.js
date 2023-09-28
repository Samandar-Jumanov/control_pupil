const Scores = require("./Scores");
const Test  = require("./Test");
const TestThemes = require("./TestThemes");
const Admin = require("./admin");
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

//Admin and tests 
Test.belongsTo(Admin , {
    foreignKey :'adminId'
})
Admin.hasMany(Test, {
    foreignKey : "adminId",
    as :'createdTests'
})



//Admin and TestThemes
TestThemes.belongsTo(Admin , {
    foreignKey :'adminId'
})


Admin.hasMany(TestThemes , {
    foreignKey :'adminId',
    as :'testThemes'
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
    Scores,
    Admin 
}







