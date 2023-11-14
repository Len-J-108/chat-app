const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const { User } = require('../models/User');

// Route for creating a new user
router.post('/create', [
  check('email').isEmail().withMessage('Invalid email address'),
], async (req, res) => {
  // Check for validation errors
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  // Validated data
  const { email, userName, password } = req.body;

  try {
    // Check if the email already exists in the model
    const existingUser = await User.findOne({ email });

    if (existingUser) {
      return res.status(400).json({ message: 'Email address already in use' });
    }

    // Create a new user using Mongoose model
    const newUser = new User({
      userName,
      email,
      password,
    });

    // Save the user to the database
    const savedUser = await newUser.save();

    res.json(savedUser);
  } catch (error) {
    console.error(error);
    res.status(500).send('Server Error');
  }
});

module.exports = router;