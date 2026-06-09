const User = require('../models/User');

// ─── GET DOCTORS (public) ─────────────────────────────
const getDoctors = async (req, res) => {
try {
    const doctors = await User.find({ role: 'doctor' })
    .select('name phone occupation gender -_id');

    res.status(200).json({ success: true, doctors });

} catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
}
};

// ─── GET STATS (public) ───────────────────────────────
const getStats = async (req, res) => {
try {
    const totalDoctors  = await User.countDocuments({ role: 'doctor' });
    const totalPatients = await User.countDocuments({ role: 'patient' });

    res.status(200).json({ success: true, totalDoctors, totalPatients });

} catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
}
};

// ─── GET DASHBOARD (protected) ───────────────────────
const getDashboard = async (req, res) => {
try {
    const { role, id } = req.user;

    if (role === 'patient') {
    return res.status(200).json({ success: true, message: 'Patient dashboard', userId: id });
    }

    if (role === 'doctor') {
    return res.status(200).json({ success: true, message: 'Doctor dashboard', userId: id });
    }

    if (role === 'admin') {
    const totalUsers = await User.countDocuments();
    return res.status(200).json({ success: true, message: 'Admin dashboard', totalUsers });
    }

} catch (err) {
    res.status(500).json({ success: false, message: 'Server error', error: err.message });
}
};

module.exports = { getDoctors, getStats, getDashboard };