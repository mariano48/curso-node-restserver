const JWT = require('jsonwebtoken');

const generateJWT = (uid = '') => {
  return new Promise((resolve, reject) => {
    const payload = { uid };

    JWT.sign(
      payload,
      process.env.SECRETORPRIVATEKEY,
      {
        expiresIn: '4h'
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('Couldnt generate Jwt');
        } else {
          resolve(token);
        }
      }
    );
  });
};

module.exports = { generateJWT };
