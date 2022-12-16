const { Router } = require('express');
const { check } = require('express-validator');
const { login } = require('../controllers/auth');
const { validate } = require('../middlewares/validate');

const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email is obligatory').isEmail(),
    check('password', 'Password is obligatory').not().isEmpty(),
    validate
  ],
  login
);

module.exports = router;
