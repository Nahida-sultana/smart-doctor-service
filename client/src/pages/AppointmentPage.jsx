import { useState } from "react";
import { Calendar, Clock, User, Phone, ChevronLeft, CheckCircle } from "lucide-react";

export default function AppointmentPage({ onBack }) {
  const [selectedDate, setSelectedDate] = useState("");
  const [selectedTime, setSelectedTime] = useState("");
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [reason, setReason] = useState("");
  const [booked, setBooked] = useState(false);

  const timeSlots = [
    "9:00 AM", "9:30 AM", "10:00 AM", "10:30 AM",
    "11:00 AM", "11:30 AM", "2:00 PM", "2:30 PM",
    "3:00 PM", "3:30 PM", "4:00 PM", "4:30 PM"
  ];

  const handleSubmit = () => {
    if (!selectedDate || !selectedTime || !name || !phone) {
      alert("Please fill all required fields!");
      return;
    }
    setBooked(true);
  };

  if (booked) {
    return (
      <div className="flex items-center justify-center min-h-screen px-4 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
        <div className="w-full max-w-md p-10 text-center border shadow-2xl backdrop-blur-md bg-white/60 rounded-3xl border-white/60">
          <div className="flex items-center justify-center w-20 h-20 mx-auto mb-6 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="mb-3 text-3xl font-bold text-gray-900">Appointment Booked!</h2>
          <p className="mb-2 text-gray-600">Dr. Ariyan Jawad</p>
          <p className="mb-1 font-semibold text-cyan-600">{selectedDate}</p>
          <p className="mb-6 font-semibold text-cyan-600">{selectedTime}</p>
          <p className="mb-8 text-sm text-gray-500">
            We will contact you at <span className="font-semibold text-gray-700">{phone}</span> to confirm your appointment.
          </p>
          <button
            onClick={onBack}
            className="w-full py-4 font-semibold text-white transition-all bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl hover:shadow-lg"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">

      {/* Header */}
      <div className="fixed top-0 left-0 right-0 z-50 border-b shadow-sm backdrop-blur-md bg-white/70 border-white/20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center h-16 gap-4">
            <button
              onClick={onBack}
              className="flex items-center gap-2 text-gray-700 transition-colors hover:text-cyan-600"
            >
              <ChevronLeft className="w-5 h-5" />
              <span>Back</span>
            </button>
            <h1 className="text-lg font-semibold text-gray-900">Book Appointment</h1>
          </div>
        </div>
      </div>

      <div className="px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">

          {/* Doctor Info */}
          <div className="flex items-center gap-4 p-6 mb-6 border shadow-xl backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
            <div className="flex items-center justify-center flex-shrink-0 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500">
              <User className="w-8 h-8 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-900">Dr. Ariyan Jawad</h3>
              <p className="text-cyan-600">MBBS, PGT</p>
              <p className="text-sm text-gray-500">General Medicine • Paediatrics • Diabetes</p>
            </div>
          </div>

          {/* Date Selection */}
          <div className="p-6 mb-6 border shadow-xl backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl">
                <Calendar className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Select Date</h3>
            </div>
            <input
              type="date"
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              min={new Date().toISOString().split("T")[0]}
              className="w-full p-4 text-gray-700 border border-gray-200 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>

          {/* Time Selection */}
          <div className="p-6 mb-6 border shadow-xl backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl">
                <Clock className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Select Time</h3>
            </div>
            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
              {timeSlots.map((time) => (
                <button
                  key={time}
                  onClick={() => setSelectedTime(time)}
                  className={`py-3 px-2 rounded-xl text-sm font-medium border transition-all ${
                    selectedTime === time
                      ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-transparent shadow-lg"
                      : "bg-white text-gray-700 border-gray-200 hover:border-cyan-300 hover:bg-cyan-50"
                  }`}
                >
                  {time}
                </button>
              ))}
            </div>
          </div>

          {/* Patient Info */}
          <div className="p-6 mb-6 border shadow-xl backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
            <div className="flex items-center gap-3 mb-4">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl">
                <User className="w-5 h-5 text-cyan-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900">Patient Information</h3>
            </div>
            <div className="space-y-4">
              <input
                type="text"
                placeholder="Full Name *"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full p-4 text-gray-700 border border-gray-200 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <input
                type="tel"
                placeholder="Phone Number *"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full p-4 text-gray-700 border border-gray-200 rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
              <textarea
                placeholder="Reason for visit (optional)"
                value={reason}
                onChange={(e) => setReason(e.target.value)}
                rows={3}
                className="w-full p-4 text-gray-700 border border-gray-200 resize-none rounded-xl bg-white/80 focus:outline-none focus:ring-2 focus:ring-cyan-400"
              />
            </div>
          </div>

          {/* Summary */}
          {selectedDate && selectedTime && (
            <div className="p-6 mb-6 border backdrop-blur-md bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl border-cyan-200">
              <h3 className="mb-3 font-semibold text-gray-900">Appointment Summary</h3>
              <div className="space-y-2 text-sm text-gray-600">
                <div className="flex justify-between">
                  <span>Doctor</span>
                  <span className="font-medium text-gray-900">Dr. Ariyan Jawad</span>
                </div>
                <div className="flex justify-between">
                  <span>Date</span>
                  <span className="font-medium text-gray-900">{selectedDate}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time</span>
                  <span className="font-medium text-gray-900">{selectedTime}</span>
                </div>
              </div>
            </div>
          )}

          {/* Confirm Button */}
          <button
            onClick={handleSubmit}
            className="w-full py-4 text-lg font-semibold text-white transition-all bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl hover:shadow-xl"
          >
            Confirm Appointment
          </button>

        </div>
      </div>
    </div>
  );
}
