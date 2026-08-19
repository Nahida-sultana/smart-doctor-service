const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema(
{
    name: { type: String, required: true, trim: true },
    phone: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    validate: {
        validator: (v) => /^[0-9+\-\s]{10,15}$/.test(v),
        message: 'Invalid phone number',
    },
    },
    email: { type: String, trim: true, lowercase: true },
    password: { type: String, required: true },
    role: { type: String, enum: ['patient', 'doctor', 'admin'], default: 'patient' },
    isApproved: { type: Boolean, default: true },
    },
    { timestamps: true }
);

userSchema.pre('save', async function () {
    if (!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

module.exports = mongoose.model('User', userSchema);