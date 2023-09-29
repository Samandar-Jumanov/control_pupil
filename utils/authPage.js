const checkAdminRole = (request, response, next) => {
  const { adminrole } = request.headers;

  if (adminrole && adminrole === 'admin') {
    
    next();
  } else {
    response.status(403).json({
      message: 'Unauthorized access..',
    });
  }
};

module.exports = {checkAdminRole}