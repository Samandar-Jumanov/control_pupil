const {TestThemes} = require("../models/relations");




const createTheme = async (request ,response , next ) =>{
  try {
    const theme = await TestThemes.create({
      theme: 'My Theme',
    });

    console.log('Theme created:', theme);
    response.json({
      theme : theme 
    })

  } catch (error) {
    console.error('Error creating theme:', error);
  }
}


module.exports = {createTheme}