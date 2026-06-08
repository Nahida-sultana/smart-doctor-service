const User = require('../models/User');

const getDoctors = async (req, res) => {
try {
    const doctors = await User.find({ role: 'doctor' }).select('name phone -_id');
    res.status(200).json({ doctors });
} catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
}
};

const getStats = async (req, res) => {
try {
    const totalDoctors = await User.countDocuments({ role: 'doctor' });
    const totalPatients = await User.countDocuments({ role: 'patient' });
    res.status(200).json({ totalDoctors, totalPatients });
} catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
}
};

const getDashboard = async (req, res) => {
try {
    const { role, id } = req.user;
    if (role === 'patient') return res.status(200).json({ message: 'Patient dashboard', userId: id });
    if (role === 'doctor') return res.status(200).json({ message: 'Doctor dashboard', userId: id });
    if (role === 'admin') {
    const totalUsers = await User.countDocuments();
    return res.status(200).json({ message: 'Admin dashboard', totalUsers });
    }
} catch (err) {
    res.status(500).json({ message: 'Server error', error: err.message });
}
};

module.exports = { getDoctors, getStats, getDashboard };