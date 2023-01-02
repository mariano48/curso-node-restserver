const User = require('../models/user');
const bcriptjs = require('bcryptjs');
const { generateJWT } = require('../helpers/generateJWT');
const { googleVerify } = require('../helpers/google-verify');
const { json } = require('express');

const login = async (req, res = response) => {
  const { email, password } = req.body;

  try {
    // Verify that email exist
    const user = await User.findOne({ email });

    if (!user) {
      return res.status(400).json({
        msg: 'Invalid Email'
      });
    }
    //User is active?
    if (!user.status) {
      return res.status(400).json({
        msg: 'User disabled'
      });
    }

    //Verify password
    const validPw = bcriptjs.compareSync(password, user.password);

    if (!validPw) {
      return res.status(400).json({
        msg: 'Password incorrect'
      });
    }

    //Generate JWT

    const token = await generateJWT(user.id);

    res.json({
      user,
      token
    });
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      msg: 'Something went wrong'
    });
  }
};

const googleSignIn = async (req, res = response) => {
  const { id_token } = req.body;

  try {
    const { name, picture, email } = await googleVerify(id_token);

    let user = await User.findOne({ email });

    if (!user) {
      const data = {
        name,
        email,
        password: 'none',
        img: picture,
        google: true,
        role: 'USER_ROLE'
      };

      user = new User(data);

      await user.save();
    }

    if (!user.status) {
      return res.status(401).json({
        msg: 'user blocked'
      });
    }

    const token = generateJWT(user.id);

    res.json({
      user,
      token
    });
  } catch (error) {
    res.status(400).json({
      ok: false,
      msg: 'Invalid token'
    });
  }
};

module.exports = { login, googleSignIn };
