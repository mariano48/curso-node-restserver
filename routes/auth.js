const { Router } = require('express');
const { check } = require('express-validator');
const { login, googleSignIn } = require('../controllers/auth');
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

router.post(
  '/google',
  [check('id_token', 'id_token is obligatory').not().isEmpty(), validate],
  googleSignIn
);

module.exports = router;
