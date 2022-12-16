const { response } = require('express');

const isAdminRole = (req, res = response, next) => {
  if (!req.user) {
    return res.status(500).json({
      msg: 'Cant verify user role without validate JWT first'
    });
  }

  const { role, name } = req.user;

  if (role !== 'ADMIN_ROLE') {
    return res.status(401).json({
      msg: `${name} is not an admin`
    });
  }

  next();
};

const hasRole = (...roles) => {
  return (req, res = response, next) => {
    console.log(roles[1], req.user.role);
    if (!req.user) {
      return res.status(500).json({
        msg: 'Cant verify user role without validate JWT first'
      });
    }

    if (!roles.includes(req.user.role)) {
      return res.status(401).json({
        msg: `The service require one of these roles ${roles}`
      });
    }

    next();
  };
};

module.exports = { isAdminRole, hasRole };
