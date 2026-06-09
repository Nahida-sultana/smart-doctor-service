// utils/twilioOtp.js

const sendOTP = async (phone, otp) => {
  // TODO: replace with real Twilio integration before production
  console.log(`📱 OTP for ${phone}: ${otp}`);
};

module.exports = { sendOTP };