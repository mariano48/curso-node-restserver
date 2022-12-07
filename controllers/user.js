const { response } = require('express');

const getUsers = (req, res = response) => {
  const { nombre } = req.query;

  res.json({
    msg: 'get API - controller',
    nombre
  });
};

const postUsers = (req, res = response) => {
  const { nombre, edad } = req.body;

  res.json({
    msg: 'post API - controller',
    nombre,
    edad
  });
};

const updateUsers = (req, res = response) => {
  const id = req.params.id;

  res.json({
    msg: 'put API - controller',
    id
  });
};

const patchUsers = (req, res = response) => {
  res.json({
    msg: 'patch API - controller'
  });
};

const deleteUsers = (req, res = response) => {
  res.json({
    msg: 'delete API - controller'
  });
};

module.exports = { getUsers, postUsers, updateUsers, patchUsers, deleteUsers };
