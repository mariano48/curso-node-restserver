const { Router } = require('express');
const { check } = require('express-validator');
const {
  getUsers,
  postUsers,
  updateUsers,
  deleteUsers,
  patchUsers
} = require('../controllers/user');
const { validate } = require('../middlewares/validate');
const {
  isValidRole,
  emailExists,
  idExists
} = require('../helpers/dbvalidators');

const router = Router();

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'Name is obligatory').not().isEmpty(),
    check('password', 'Password require more than 6 letters').isLength({
      min: 6
    }),
    check('email', 'Invalid email').isEmail(),
    check('email').custom(emailExists),
    // check('role', 'Invalid role').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    check('role').custom(isValidRole),
    validate
  ],
  postUsers
);

router.put(
  '/:id',
  [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(idExists),
    check('role').custom(isValidRole),
    validate
  ],
  updateUsers
);

router.patch('/', patchUsers);

router.delete(
  '/:id',
  [
    check('id', 'Invalid ID').isMongoId(),
    check('id').custom(idExists),
    validate
  ],
  deleteUsers
);

module.exports = router;
