const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { forgotPassword, verifyOtp, resetPassword } = require('../controllers/authController');

// =====================
// REGISTER
// =====================
router.post('/register', async (req, res) => {
const { name, phone, password, role } = req.body;

try {
    const existing = await User.findOne({ phone });
    if (existing) {
    return res.status(400).json({ message: 'Phone number already in use' });
    }

    const hashed = await bcrypt.hash(password, 10);
    const user = new User({ name, phone, password: hashed, role });
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
const { phone, password } = req.body;

try {
    const user = await User.findOne({ phone });
    if (!user) {
    return res.status(400).json({ message: 'User not found' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
    return res.status(400).json({ message: 'Wrong password' });
    }

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

// =====================
// FORGOT PASSWORD
// =====================
router.post('/forgot-password', forgotPassword);
router.post('/verify-otp', verifyOtp);
router.post('/reset-password', resetPassword);

module.exports = router;