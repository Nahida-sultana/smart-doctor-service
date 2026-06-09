const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// ─── Middleware ───────────────────────────────────────
app.use(cors());
app.use(express.json());

// ─── Database ────────────────────────────────────────
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log(' MongoDB Connected'))
.catch((err) => {
    console.error(' MongoDB connection failed:', err.message);
    process.exit(1); // stop server if DB fails
});

// ─── Routes ──────────────────────────────────────────
app.use('/api/auth', require('./routes/auth'));
app.use('/api/home', require('./routes/homeRoutes'));

// ─── Health Check ─────────────────────────────────────
app.get('/', (req, res) => {
res.json({ message: 'Smart Doctor API is running 🚀' });
});

// ─── 404 Handler ─────────────────────────────────────
app.use((req, res) => {
res.status(404).json({ success: false, message: 'Route not found' });
});

// ─── Global Error Handler ─────────────────────────────
app.use((err, req, res, next) => {
console.error('Server Error:', err.message);
res.status(500).json({ success: false, message: 'Internal server error' });
});

// ─── Start Server ─────────────────────────────────────
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
console.log(`🚀 Server running on port ${PORT}`);
});