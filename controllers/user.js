const { response } = require('express');
const User = require('../models/user');
const bcryptjs = require('bcryptjs');

const getUsers = async (req, res = response) => {
  const { limit = 5, offset = 0 } = req.query;

  const [totalUsers, users] = await Promise.all([
    User.countDocuments({ status: true }),
    User.find({ status: true }).limit(limit).skip(offset)
  ]);

  res.json({
    totalUsers,
    users
  });
};

const postUsers = async (req, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Encrypt password
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(password, salt);

  //Save to db
  await user.save();
  res.json({
    user
  });
};

const updateUsers = async (req, res = response) => {
  const { id } = req.params;
  const { _id, password, google, email, ...user } = req.body;

  //Validar
  if (password) {
    const salt = bcryptjs.genSaltSync(10);
    user.password = bcryptjs.hashSync(password, salt);
  }

  const userDB = await User.findByIdAndUpdate(id, user);

  res.json(userDB);
};

const patchUsers = (req, res = response) => {
  res.json({
    msg: 'patch API - controller'
  });
};

const deleteUsers = async (req, res = response) => {
  const { id } = req.params;

  const user = await User.findByIdAndUpdate(id, { status: false });
  const userAuthenticated = req.user;
  res.json({ user, userAuthenticated });
};

module.exports = { getUsers, postUsers, updateUsers, patchUsers, deleteUsers };
