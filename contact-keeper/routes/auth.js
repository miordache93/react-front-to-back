const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const User = require('../models/User');

// @route     GET /api/auth
// @desc      Get logged in user
// @access    Private
router.get('/', auth, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password');

    res.json(user);
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server error');
  }
});

// @route     POST /api/auth
// @desc      Auth user & get token
// @access    Public
const routeChecks = [
  check('email', 'Please include a valid email').isEmail(),
  check('password', 'Password is required').exists()
];
router.post('/',
  routeChecks,
  async (req, res) => {
    console.log(req);
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { email, password } = req.body;

    try {
      let user = await User.findOne({ email });
      if (!user) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const isMatched = await bcrypt.compare(password, user.password);

      if (!isMatched) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id
        }
      };

      jwt.sign(payload, config.get('jwtSecret'), {
        expiresIn: 360000,
      }, (err, token) => {
        if (err) throw errors;
        res.json({ token });
      });
    } catch (error) {
      console.error(error.message);
      res.status(500).send('Server Error');
    }
  });

module.exports = router;
