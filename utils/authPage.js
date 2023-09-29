const {Admin} = require("../models/relations");

const authPage =  (requiredRoles) => {
  return async (request, response, next) => {
    const { adminId } = request.params;
    const admin = await Admin.findByPk(adminId);
    const role = admin.role;
    if (!admin || !requiredRoles.includes(role)) {
      return response.status(401).json({
        message: 'You have no access'
      });
    }
    next();
  };
};

module.exports = { authPage };