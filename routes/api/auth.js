const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const config = require ('config');
const jwt = require ('jsonwebtoken');



// Item model
const User = require('../../models/User');

// @route   GET api/auth
// @desc    Authenticate user
// @access  Public
router.post('/', (req, res) => {
  const {email, password } = req.body;

  // Simple Validation
  if (!email || !password) {
    return res.status(400).json({ msg: 'Please Enter all fields'});
  }
  //Check for existing users
  User.findOne({ email })
  .then(user => {
    if(!user) return res.status(400).json({msg: 'User does not exist'});

    //Validate password
    bcrypt.compare(password, user.password)
    .then(isMatch => {
      if(!isMatch) return res.status(400).json({msg: 'invalid credentials'});

      jwt.sign(
        {id: user.id },
        config.get('jwtSecret'),
        {expiresIn: 1800 },
        (err, token) => {
          if (err) throw err;
          res.json({
            token,
            user: {
              id: user.id,
              name: user.name,
              email: user.email
            }
          });
        }
      )
    });
  })
});


module.exports = router;