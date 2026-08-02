const jwt = require('jsonwebtoken');
const User = require('../models/User');

const generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: '30d' });
};

// POST /api/auth/register
exports.register = async (req, res) => {
    try {
    const { name, phone, password, role } = req.body;
    console.log('BODY RECEIVED:', req.body);

    if (!name || !phone || !password) {
    return res.status(400).json({ message: 'Missing required fields' });
    }

    const existing = await User.findOne({ phone });
    if (existing) {
    return res.status(409).json({ message: 'Phone number already registered' });
    }

    const user = await User.create({ name, phone, password, role });

    res.status(201).json({
    _id: user._id,
    name: user.name,
    phone: user.phone,
    role: user.role,
    token: generateToken(user._id),
    });
} catch (err) {
    res.status(400).json({ message: 'Registration failed', error: err.message });
}
};

// POST /api/auth/login
exports.login = async (req, res) => {
try {
    const { phone, password } = req.body;

    if (!phone || !password) {
    return res.status(400).json({ message: 'Phone and password are required' });
    }

    const user = await User.findOne({ phone });
    if (!user || !(await user.matchPassword(password))) {
    return res.status(401).json({ message: 'Invalid phone number or password' });
    }

    res.json({
    _id: user._id,
    name: user.name,
    phone: user.phone,
    role: user.role,
    token: generateToken(user._id),
    });
    } catch (err) {
    res.status(500).json({ message: 'Login failed', error: err.message });
    }
};

// GET /api/auth/me  (protected)
exports.getMe = async (req, res) => {
    try {
    const user = await User.findById(req.user.id).select('-password');
    if (!user) return res.status(404).json({ message: 'User not found' });
    res.json(user);
    } catch (err) {
    res.status(500).json({ message: 'Failed to fetch user', error: err.message });
    }
};