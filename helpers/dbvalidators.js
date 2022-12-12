const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
  const roleExists = await Role.findOne({ role });
  if (!roleExists) {
    throw new Error(`The role ${role} isn't a valid entry`);
  }
};

const emailExists = async (email = '') => {
  const emailExist = await User.findOne({ email });
  if (emailExist) {
    throw new Error(`The mail is already in use`);
  }
};

const idExists = async (id) => {
  const userId = await User.findById(id);
  if (!userId) {
    throw new Error(`Id ${id} doesnt exist in DB`);
  }
};

module.exports = { isValidRole, emailExists, idExists };
