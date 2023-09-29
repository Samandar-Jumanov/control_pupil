const {TestThemes, Admin} = require("../models/relations")
const sequelize = require("../utils/connect-db");

// Create a theme
const createTheme = async (request, response, next) => {
  const { themeName , adminId } = request.body;
 
  let t ; 
  try {
    t =  await sequelize.transaction();
    const existingTheme = await TestThemes.findOne({
      where: { theme : themeName },
    } , { transaction : t });

    const admin = await Admin.findByPk(adminId);

    if (!admin) {
      return response.json({
        message: 'Admin not found',
      });
    }

    if (existingTheme) {
      return response.json({
        message: 'Theme already exists',
      });
    }

    const newTheme = await TestThemes.create({
      theme: themeName,
      adminId: adminId,
    } , { transaction : t }) ;

    await admin.addTestThemes(newTheme , { transaction : t });
    await admin.save();
    await t.commit();

    response.status(201).json({
      message: 'Theme created successfully',
      theme: newTheme,
    });

  } catch (error) {
    console.log(error)
    await t.rollback();
    next(error);
  }
};

// Read all themes
const getAllThemes = async (request, response, next) => {
  try {
    const themes = await TestThemes.findAll();
    response.status(200).json({
      themes,
    });
  } catch (error) {
    next(error);
  }
};

// Read a single theme by ID
const getThemeById = async (request, response, next) => {
  const { themeId } = request.params;

  try {
    const theme = await TestThemes.findByPk(themeId);
    if (!theme) {
      return response.json({
        message: 'Theme not found',
      });
    }

    response.status(200).json({
      theme,
    });
  } catch (error) {
    next(error);
  }
};

// Update a theme
// Update a theme
const updateTheme = async (request, response, next) => {
    const { themeId } = request.params;
    const { updatedThemName, adminId } = request.body;
  
    let t;
    try {
      t = await sequelize.transaction();
  
      const existingTheme = await TestThemes.findByPk(themeId);
      if (!existingTheme) {
        return response.json({
          message: 'Theme not found',
        });
      }
  
      const admin = await Admin.findByPk(adminId);
      if (!admin) {
        return response.json({
          message: 'Admin not found',
        });
      }
      
      console.log(existingTheme);
  
      await existingTheme.update(
        {
          theme: updatedThemName,
        },
        { transaction: t }
      );
  
      console.log(existingTheme);
  
      response.status(200).json({
        message: 'Theme updated successfully',
        theme: existingTheme,
      });
  
      await t.commit();
    } catch (error) {g
      console.log(error);
      await t.rollback();
      next(error);
    }
  };
  
// Delete a theme

const deleteTheme = async (request, response, next) => {
  const { themeId } = request.params;
  const { adminId } = request.body;
  let t;

  try {
    t = await sequelize.transaction();

    const theme = await TestThemes.findByPk(themeId , {transaction : t });
    const admin = await Admin.findByPk(adminId, { transaction: t });

    if (!admin) {
      return response.json({
        message: "Admin not found",
      });
    }

    if (!theme) {
      return response.json({
        message: "Theme not found",
      });
    }

    // await admin.removeTestThemes(theme, { transaction: t });
    await theme.destroy({ transaction: t });
    await t.commit();

    response.status(200).json({
      message: "Theme deleted successfully",
    });
  } catch (error) {
    console.log(error);
    if (t) {
      await t.rollback();
    }
    next(error);
  }
}
module.exports = {
  createTheme,
  getAllThemes,
  getThemeById,
  updateTheme,
  deleteTheme,
};