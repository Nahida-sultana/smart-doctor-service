require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const appointmentRoutes = require('./routes/Appointment.routes');
const bulletinRoutes = require('./routes/Bulletin.routes');
const awarenessRoutes = require('./routes/Awareness.routes');
const authRoutes = require('./routes/auth.routes');

const app = express();

// Connect to MongoDB
connectDB();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/appointments', appointmentRoutes);
app.use('/api/bulletins', bulletinRoutes);
app.use('/api/awareness-posts', awarenessRoutes);
app.use('/api/auth', authRoutes);

app.get('/', (req, res) => {
  res.send('Smart Doctor Service API is running');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});