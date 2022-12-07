const { Router } = require('express');
const {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
  patchUsers
} = require('../controllers/user');

const router = Router();

router.get('/', getUsers);

router.post('/', postUsers);

router.put('/:id', updateUsers);

router.patch('/', patchUsers);

router.delete('/', deleteUsers);

module.exports = router;
