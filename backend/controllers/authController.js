const bcrypt  = require('bcryptjs');
const jwt     = require('jsonwebtoken');
const crypto  = require('crypto');
const User    = require('../models/User');
const OTP     = require('../models/OTP');
const { sendOTP } = require('../utils/twilioOtp');

// ─── REGISTER ────────────────────────────────────────
const register = async (req, res) => {
const { name, phone, password, age, height, weight, occupation, gender } = req.body;

try {
    // check all fields present
    if (!name || !phone || !password || !age || !height || !weight || !occupation || !gender) {
    return res.status(400).json({ success: false, message: 'All fields are required' });
    }

    // check duplicate phone
    const existing = await User.findOne({ phone });
    if (existing) {
    return res.status(400).json({ success: false, message: 'Phone number already registered' });
    }

    const hashed = await bcrypt.hash(password, 10);

    const user = await User.create({
    name, phone, password: hashed,
    age, height, weight, occupation, gender
    });

    res.status(201).json({ success: true, message: 'Registration successful' });

} catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
}
};

// ─── LOGIN ───────────────────────────────────────────
const login = async (req, res) => {
const { phone, password } = req.body;

try {
    if (!phone || !password) {
    return res.status(400).json({ success: false, message: 'Phone and password are required' });
    }

    const user = await User.findOne({ phone });
    if (!user) {
    return res.status(404).json({ success: false, message: 'No account found with this number' });
    }

    const match = await bcrypt.compare(password, user.password);
    if (!match) {
    return res.status(400).json({ success: false, message: 'Incorrect password' });
    }

    const token = jwt.sign(
    { id: user._id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: '7d' }
    );

    res.status(200).json({
    success: true,
    token,
    user: {
        name: user.name,
        role: user.role,
        phone: user.phone
    }
    });

} catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
}
};

// ─── FORGOT PASSWORD - Step 1: Send OTP ──────────────
const forgotPassword = async (req, res) => {
const { phone } = req.body;

try {
    if (!phone) {
    return res.status(400).json({ success: false, message: 'Phone number is required' });
    }

    const user = await User.findOne({ phone });
    if (!user) {
    return res.status(404).json({ success: false, message: 'No account found with this number' });
    }

    const otp       = Math.floor(100000 + Math.random() * 900000).toString();
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 mins

    await OTP.deleteMany({ phone });
    await OTP.create({ phone, otp, expiresAt });
    await sendOTP(phone, otp);

    res.status(200).json({ success: true, message: 'OTP sent to your phone number' });

} catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
}
};

// ─── VERIFY OTP - Step 2 ─────────────────────────────
const verifyOtp = async (req, res) => {
const { phone, otp } = req.body;

try {
    if (!phone || !otp) {
    return res.status(400).json({ success: false, message: 'Phone and OTP are required' });
    }

    const record = await OTP.findOne({ phone, otp, used: false });
    if (!record) {
    return res.status(400).json({ success: false, message: 'Invalid OTP' });
    }

    if (record.expiresAt < new Date()) {
    return res.status(400).json({ success: false, message: 'OTP has expired' });
    }

    record.used = true;
    await record.save();

    const resetToken       = crypto.randomBytes(32).toString('hex');
    const resetTokenExpiry = new Date(Date.now() + 15 * 60 * 1000); // 15 mins

    await User.findOneAndUpdate({ phone }, { resetToken, resetTokenExpiry });

    res.status(200).json({ success: true, message: 'OTP verified', resetToken });

} catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
}
};

// ─── RESET PASSWORD - Step 3 ─────────────────────────
const resetPassword = async (req, res) => {
const { resetToken, newPassword } = req.body;

try {
    if (!resetToken || !newPassword) {
    return res.status(400).json({ success: false, message: 'Token and new password are required' });
    }

    const user = await User.findOne({
    resetToken,
    resetTokenExpiry: { $gt: new Date() }
    });

    if (!user) {
    return res.status(400).json({ success: false, message: 'Invalid or expired reset token' });
    }

    user.password         = await bcrypt.hash(newPassword, 10);
    user.resetToken       = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ success: true, message: 'Password reset successful' });

} catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
}
};

module.exports = { register, login, forgotPassword, verifyOtp, resetPassword };