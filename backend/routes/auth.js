const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// =====================
// REGISTER
// =====================
router.post('/register', async (req, res) => {
const { name, email, password, role } = req.body;

try {
    // Check if email already exists
    const existing = await User.findOne({ email });
    if (existing) {
    return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the password
    const hashed = await bcrypt.hash(password, 10);

    // Save new user
    const user = new User({ name, email, password: hashed, role });
    await user.save();

    res.status(201).json({ message: 'User registered successfully' });

} catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
}
});

// =====================
// LOGIN
// =====================
router.post('/login', async (req, res) => {
const { email, password } = req.body;

try {
    // Find user by email
    const user = await User.findOne({ email });
    if (!user) {
    return res.status(400).json({ message: 'User not found' });
    }

    // Check password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
    return res.status(400).json({ message: 'Wrong password' });
    }

    // Generate token
    const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
    );

    res.json({ token, role: user.role, name: user.name });

} catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
}
});

module.exports = router;