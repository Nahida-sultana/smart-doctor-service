const Appointment = require('../models/Appointment');

const ALL_SLOTS = [
  '09:00 AM', '09:30 AM', '10:00 AM', '10:30 AM',
  '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM',
  '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM',
];

// GET /api/appointments/slots?date=YYYY-MM-DD
exports.getAvailableSlots = async (req, res) => {
  try {
    const { date } = req.query;
    if (!date) return res.status(400).json({ message: 'date is required' });

    const requestedDate = new Date(date);

    // Clinic closed on Fridays
    if (requestedDate.getDay() === 5) {
      return res.json({ date, slots: [] });
    }

    const booked = await Appointment.find({
      date: requestedDate,
      status: { $ne: 'cancelled' },
    }).select('time');

    const bookedTimes = booked.map((a) => a.time);
    const available = ALL_SLOTS.filter((slot) => !bookedTimes.includes(slot));

    res.json({ date, slots: available });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch slots', error: err.message });
  }
};

// POST /api/appointments
exports.createAppointment = async (req, res) => {
  try {
    const { patientName, phone, email, notes, date, time, consultType } = req.body;

    if (!patientName || !phone || !email || !date || !time || !consultType) {
      return res.status(400).json({ message: 'Missing required fields' });
    }

    const requestedDate = new Date(date);
    if (requestedDate.getDay() === 5) {
      return res.status(400).json({ message: 'Clinic is closed on Fridays' });
    }
    if (requestedDate < new Date().setHours(0, 0, 0, 0)) {
      return res.status(400).json({ message: 'Cannot book a past date' });
    }

    const clash = await Appointment.findOne({
      date: requestedDate,
      time,
      status: { $ne: 'cancelled' },
    });
    if (clash) {
      return res.status(409).json({ message: 'This slot was just booked, please pick another' });
    }

    const appointment = await Appointment.create({
      patientName, phone, email, notes, date: requestedDate, time, consultType,
    });

    res.status(201).json(appointment);
  } catch (err) {
    res.status(400).json({ message: 'Failed to create appointment', error: err.message });
  }
};

// GET /api/appointments/:id
exports.getAppointmentById = async (req, res) => {
  try {
    const appointment = await Appointment.findById(req.params.id);
    if (!appointment) return res.status(404).json({ message: 'Not found' });
    res.json(appointment);
  } catch (err) {
    res.status(400).json({ message: 'Invalid id', error: err.message });
  }
};

// GET /api/appointments  (admin/doctor-facing, gate with auth middleware)
exports.listAppointments = async (req, res) => {
  try {
    const { date, status } = req.query;
    const filter = {};
    if (date) filter.date = new Date(date);
    if (status) filter.status = status;

    const appointments = await Appointment.find(filter).sort({ date: 1, time: 1 });
    res.json(appointments);
  } catch (err) {
    res.status(500).json({ message: 'Failed to list appointments', error: err.message });
  }
};