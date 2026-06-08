const crypto = require('crypto');
const OTP = require('../models/OTP');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { sendOTP } = require('../utils/twilioOtp');

// Step 1: Send OTP
const forgotPassword = async (req, res) => {
try {
    const { phone } = req.body;

    const user = await User.findOne({ phone });
    if (!user) return res.status(404).json({ message: 'No account found with this number' });

    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // 6-digit OTP
    const expiresAt = new Date(Date.now() + 10 * 60 * 1000); // 10 minutes

    // Delete old OTPs for this phone
    await OTP.deleteMany({ phone });

    // Save new OTP
    await OTP.create({ phone, otp, expiresAt });

    // Send via Twilio
    await sendOTP(phone, otp);

    res.status(200).json({ message: 'OTP sent to your phone number' });
} catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
}
};

// Step 2: Verify OTP
const verifyOtp = async (req, res) => {
try {
    const { phone, otp } = req.body;

    const record = await OTP.findOne({ phone, otp, used: false });
    if (!record) return res.status(400).json({ message: 'Invalid OTP' });

    if (record.expiresAt < new Date())
    return res.status(400).json({ message: 'OTP expired' });

    // Mark OTP as used
    record.used = true;
    await record.save();

    // Generate a short-lived reset token
    const resetToken = crypto.randomBytes(32).toString('hex');

    // Save reset token to user
    await User.findOneAndUpdate(
    { phone },
      { resetToken, resetTokenExpiry: new Date(Date.now() + 15 * 60 * 1000) }
    );

    res.status(200).json({ message: 'OTP verified', resetToken });
} catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
}
};

// Step 3: Reset Password
const resetPassword = async (req, res) => {
try {
    const { resetToken, newPassword } = req.body;

    const user = await User.findOne({
    resetToken,
    resetTokenExpiry: { $gt: new Date() },
    });

    if (!user) return res.status(400).json({ message: 'Invalid or expired reset token' });

    const hashed = await bcrypt.hash(newPassword, 10);
    user.password = hashed;
    user.resetToken = undefined;
    user.resetTokenExpiry = undefined;
    await user.save();

    res.status(200).json({ message: 'Password reset successful' });
} catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
}
};

module.exports = { forgotPassword, verifyOtp, resetPassword };