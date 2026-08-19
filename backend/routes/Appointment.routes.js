const express = require('express');
const router = express.Router();
const {
  getAvailableSlots,
  createAppointment,
  getAppointmentById,
  listAppointments,
} = require('../controllers/AppointmentController');

const { protect } = require('../middleware/auth');

router.get('/slots', getAvailableSlots);
router.post('/', createAppointment);       // stays public — patients book without login
router.get('/:id', getAppointmentById);
router.get('/', protect, listAppointments); // admin-only list

// Adjust this import to match your existing auth middleware's export name
// const { protect } = require('../middleware/auth');

router.get('/slots', getAvailableSlots);
router.post('/', createAppointment);
router.get('/:id', getAppointmentById);

// Doctor/admin-facing — protect this once your auth middleware is wired in
router.get('/', /* protect, */ listAppointments);

module.exports = router;