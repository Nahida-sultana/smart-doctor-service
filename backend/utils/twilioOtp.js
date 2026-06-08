const sendOTP = async (phoneNumber, otp) => {
  // Mock OTP - just log to console (for development/demo)
console.log(`📱 OTP for ${phoneNumber}: ${otp}`);
};

module.exports = { sendOTP };