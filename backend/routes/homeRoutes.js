const express = require('express');
const router = express.Router();
const { getDoctors, getStats, getDashboard } = require('../controllers/homeController');
const protect = require('../middleware/auth');// your existing JWT middleware

router.get('/doctors', getDoctors);       // public
router.get('/stats', getStats);           // public
router.get('/dashboard', protect, getDashboard); // protected

module.exports = router;