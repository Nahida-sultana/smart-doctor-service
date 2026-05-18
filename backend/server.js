const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('✅ MongoDB Connected'))
.catch(err => console.log('❌ Connection failed:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));

// Test route
app.get('/', (req, res) => {
res.send('Smart Doctor API is running!');
});

app.listen(process.env.PORT, () => {
console.log(`🚀 Server running on port ${process.env.PORT}`);
});