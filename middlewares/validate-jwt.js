const JWT = require('jsonwebtoken');
const User = require('../models/user');

const validateJWT = async (req = request, res = response, next) => {
  const token = req.header('x-token');

  if (!token) {
    return res.status(401).json({
      msg: 'Please loging first'
    });
  }

  try {
    const { uid } = JWT.verify(token, process.env.SECRETORPRIVATEKEY);
    const user = await User.findById(uid);

    if (!user) {
      return res.status(401).json({
        msg: 'User doesnt exist in db'
      });
    }

    //Verify uid status
    if (!user.status) {
      return res.status(401).json({
        msg: 'Invalid token - user disabled'
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log(error);
    res.status(401).json({
      msg: 'Invalid token'
    });
  }
};

module.exports = { validateJWT };
