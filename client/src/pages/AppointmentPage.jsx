import { useState } from "react"
import { Calendar, Clock, User, Phone, Mail, ChevronRight, ChevronLeft, Check, Stethoscope, MessageSquare, MapPin, ArrowLeft, Shield, Star, BadgeCheck, FileText, AlertCircle } from "lucide-react"

const DOCTOR = {
  name: "Dr. Ariyan Jawad", credentials: "MBBS, PGT", image: "/doctor.jpg",
  specializations: ["General Medicine","Paediatrics","Diabetes Management","Rheumatic Diseases","Skin Care"],
  fee: { "in-person": 800, online: 500 },
  chamber: "Smart Doctor Clinic, Dhaka", rating: 4.9, patients: "2,000+",
}

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const DAYS   = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"]
const MORNING_SLOTS   = ["09:00 AM","09:30 AM","10:00 AM","10:30 AM","11:00 AM","11:30 AM"]
const AFTERNOON_SLOTS = ["02:00 PM","02:30 PM","03:00 PM","03:30 PM","04:00 PM","04:30 PM"]
const BOOKED_SLOTS    = ["09:30 AM","11:00 AM","03:00 PM"]
const STEP_LABELS     = ["Date & Time","Patient Info","Review & Pay"]

function daysInMonth(y, m)  { return new Date(y, m + 1, 0).getDate() }
function firstDay(y, m)     { return new Date(y, m, 1).getDay() }
function formatDate(d)      { if (!d) return ""; return `${MONTHS[d.month]} ${d.day}, ${d.year}` }
function getDayName(d)      { return DAYS[new Date(d.year, d.month, d.day).getDay()] }

export default function AppointmentPage({ onBack }) {
  const today = new Date()
  const [step, setStep]               = useState(1)
  const [calMonth, setCalMonth]       = useState(today.getMonth())
  const [calYear, setCalYear]         = useState(today.getFullYear())
  const [selectedDate, setSelectedDate] = useState(null)
  const [selectedTime, setSelectedTime] = useState(null)
  const [consultType, setConsultType] = useState("in-person")
  const [errors, setErrors]           = useState({})
  const [submitted, setSubmitted]     = useState(false)
  const [form, setForm] = useState({ name:"", age:"", gender:"", phone:"", email:"", address:"", notes:"" })

  const prevMonth = () => { if (calMonth === 0) { setCalMonth(11); setCalYear(y => y-1) } else setCalMonth(m => m-1) }
  const nextMonth = () => { if (calMonth === 11) { setCalMonth(0); setCalYear(y => y+1) } else setCalMonth(m => m+1) }
  const isPast    = (d) => { const dt = new Date(calYear, calMonth, d); const t = new Date(); t.setHours(0,0,0,0); return dt < t }
  const isFriday  = (d) => new Date(calYear, calMonth, d).getDay() === 5
  const disabled  = (d) => isPast(d) || isFriday(d)
  const isSelected = (d) => selectedDate?.day === d && selectedDate?.month === calMonth && selectedDate?.year === calYear
  const isToday    = (d) => d === today.getDate() && calMonth === today.getMonth() && calYear === today.getFullYear()

  const validate = () => {
    const e = {}
    if (!form.name.trim())  e.name   = "Full name is required"
    if (!form.age.trim())   e.age    = "Age is required"
    else if (isNaN(+form.age) || +form.age < 1 || +form.age > 120) e.age = "Enter a valid age"
    if (!form.gender)       e.gender = "Please select gender"
    if (!form.phone.trim()) e.phone  = "Phone number is required"
    else if (!/^[0-9+\-\s]{10,15}$/.test(form.phone)) e.phone = "Invalid phone number"
    if (!form.email.trim()) e.email  = "Email is required"
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Invalid email address"
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const updateForm = (field, val) => {
    setForm(f => ({...f, [field]: val}))
    setErrors(e => ({...e, [field]: undefined}))
  }

  const fee = DOCTOR.fee[consultType]

  if (submitted) {
    const bookingId = "SD-" + Math.random().toString(36).slice(2,8).toUpperCase()
    return (
      <div className="flex items-center justify-center min-h-screen px-4 py-16 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
        <div className="w-full max-w-lg">
          <div className="p-10 text-center border shadow-2xl backdrop-blur-md bg-white/70 rounded-3xl border-white/60">
            <div className="relative w-24 h-24 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400 opacity-20 animate-ping" />
              <div className="relative flex items-center justify-center w-24 h-24 rounded-full shadow-xl bg-gradient-to-br from-cyan-500 to-teal-500">
                <Check className="w-12 h-12 text-white" />
              </div>
            </div>
            <h2 className="mb-1 text-3xl font-bold text-gray-900">Booking Confirmed!</h2>
            <p className="mb-2 text-gray-500">Your appointment has been successfully scheduled.</p>
            <div className="inline-block px-4 py-1.5 bg-cyan-50 border border-cyan-200 rounded-full text-sm text-cyan-700 font-mono mb-8">Booking ID: {bookingId}</div>
            <div className="p-6 mb-6 space-y-3 text-left border bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl border-cyan-100">
              {[
                { icon:User,        label:"Patient", val:form.name },
                { icon:Stethoscope, label:"Doctor",  val:DOCTOR.name },
                { icon:Calendar,    label:"Date",    val:formatDate(selectedDate) + (selectedDate ? ` (${getDayName(selectedDate)})` : "") },
                { icon:Clock,       label:"Time",    val:selectedTime ?? "" },
                { icon:MapPin,      label:"Type",    val:consultType === "in-person" ? "In-Person — " + DOCTOR.chamber : "Online Chat Consultation" },
              ].map(({ icon: Icon, label, val }) => (
                <div key={label} className="flex items-start gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 bg-white rounded-lg shadow-sm"><Icon className="w-4 h-4 text-cyan-600" /></div>
                  <div><p className="text-xs text-gray-500">{label}</p><p className="text-sm font-semibold text-gray-800">{val}</p></div>
                </div>
              ))}
            </div>
            <p className="mb-6 text-sm text-gray-500">Confirmation sent to <span className="font-semibold text-cyan-600">{form.email}</span></p>
            <div className="grid grid-cols-2 gap-3">
              <button onClick={() => { setSubmitted(false); setStep(1); setSelectedDate(null); setSelectedTime(null); setForm({ name:"",age:"",gender:"",phone:"",email:"",address:"",notes:"" }) }}
                className="py-3 font-semibold transition-all border-2 rounded-xl border-cyan-200 text-cyan-700 hover:bg-cyan-50">New Booking</button>
              <button onClick={onBack} className="py-3 font-semibold text-white transition-all rounded-xl bg-gradient-to-r from-cyan-500 to-teal-500 hover:shadow-lg">Back to Home</button>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      <nav className="fixed inset-x-0 top-0 z-50 border-b shadow-sm backdrop-blur-md bg-white/70 border-white/30">
        <div className="flex items-center justify-between h-16 px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl"><Stethoscope className="w-6 h-6 text-white" /></div>
            <div><p className="font-bold leading-none text-gray-900">Smart Doctor</p><p className="text-xs text-gray-500">Service</p></div>
          </div>
          {onBack && (
            <button onClick={onBack} className="flex items-center gap-1.5 text-sm text-gray-600 hover:text-cyan-600 transition-colors">
              <ArrowLeft className="w-4 h-4" /> Back to Home
            </button>
          )}
        </div>
      </nav>

      <div className="px-4 pt-24 pb-20 sm:px-6 lg:px-8">
        <div className="max-w-6xl mx-auto">
          <div className="mb-10 text-center">
            <span className="inline-block px-4 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-white/50 text-sm text-cyan-600 mb-4">Quick & Easy Scheduling</span>
            <h1 className="mb-2 text-4xl font-bold text-gray-900 md:text-5xl">Book an Appointment</h1>
            <p className="text-gray-500">3 simple steps to schedule your consultation</p>
          </div>

          {/* Step Progress */}
          <div className="flex items-center justify-center max-w-md gap-0 mx-auto mb-12">
            {STEP_LABELS.map((label, i) => {
              const s = i + 1
              const done   = step > s
              const active = step === s
              return (
                <div key={s} className="flex items-center flex-1">
                  <div className="flex flex-col items-center flex-shrink-0 gap-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${
                      done   ? "bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-lg" :
                      active ? "bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-lg ring-4 ring-cyan-200" :
                               "bg-white/70 text-gray-400 border-2 border-white/60"
                    }`}>
                      {done ? <Check className="w-5 h-5" /> : s}
                    </div>
                    <span className={`text-xs font-medium whitespace-nowrap ${active ? "text-cyan-600" : done ? "text-teal-600" : "text-gray-400"}`}>{label}</span>
                  </div>
                  {i < STEP_LABELS.length - 1 && (
                    <div className={`flex-1 h-0.5 mx-2 mb-4 rounded-full transition-all duration-500 ${done ? "bg-gradient-to-r from-cyan-400 to-teal-400" : "bg-gray-200"}`} />
                  )}
                </div>
              )
            })}
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            <div className="space-y-6 lg:col-span-2">

              {/* STEP 1 */}
              {step === 1 && (
                <div className="space-y-6">
                  {/* Consultation Type */}
                  <section className="p-6 border shadow-lg backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
                    <h2 className="flex items-center gap-2 mb-4 text-lg font-bold text-gray-900">
                      <MessageSquare className="w-5 h-5 text-cyan-500" /> Choose Consultation Type
                    </h2>
                    <div className="grid grid-cols-2 gap-4">
                      {["in-person","online"].map(type => {
                        const active = consultType === type
                        return (
                          <button key={type} onClick={() => setConsultType(type)}
                            className={`p-5 rounded-2xl border-2 text-left transition-all duration-200 ${active ? "border-cyan-500 bg-gradient-to-br from-cyan-50 to-teal-50 shadow-md" : "border-gray-200 bg-white/50 hover:border-cyan-300 hover:bg-cyan-50/30"}`}>
                            <div className={`w-10 h-10 rounded-xl flex items-center justify-center mb-3 ${active ? "bg-gradient-to-br from-cyan-500 to-teal-500" : "bg-gray-100"}`}>
                              {type === "in-person" ? <MapPin className={`w-5 h-5 ${active ? "text-white" : "text-gray-400"}`} /> : <MessageSquare className={`w-5 h-5 ${active ? "text-white" : "text-gray-400"}`} />}
                            </div>
                            <p className={`font-bold ${active ? "text-cyan-700" : "text-gray-700"}`}>{type === "in-person" ? "In-Person Visit" : "Online Chat"}</p>
                            <p className="text-xs text-gray-500 mt-0.5">{type === "in-person" ? DOCTOR.chamber : "Chat from your home"}</p>
                            <p className={`text-sm font-semibold mt-2 ${active ? "text-teal-600" : "text-gray-400"}`}>৳ {DOCTOR.fee[type]}</p>
                          </button>
                        )
                      })}
                    </div>
                  </section>

                  {/* Calendar */}
                  <section className="p-6 border shadow-lg backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
                    <h2 className="flex items-center gap-2 mb-5 text-lg font-bold text-gray-900">
                      <Calendar className="w-5 h-5 text-cyan-500" /> Select Date
                      <span className="flex items-center gap-1 ml-auto text-xs font-normal text-red-400"><AlertCircle className="w-3 h-3" /> Friday closed</span>
                    </h2>
                    <div className="flex items-center justify-between mb-5">
                      <button onClick={prevMonth} className="flex items-center justify-center transition-all bg-white border border-gray-200 w-9 h-9 rounded-xl hover:bg-cyan-50 hover:border-cyan-300"><ChevronLeft className="w-4 h-4 text-gray-600" /></button>
                      <h3 className="text-base font-bold text-gray-800">{MONTHS[calMonth]} {calYear}</h3>
                      <button onClick={nextMonth} className="flex items-center justify-center transition-all bg-white border border-gray-200 w-9 h-9 rounded-xl hover:bg-cyan-50 hover:border-cyan-300"><ChevronRight className="w-4 h-4 text-gray-600" /></button>
                    </div>
                    <div className="grid grid-cols-7 mb-2">
                      {DAYS.map(d => <div key={d} className={`text-center py-1 text-xs font-bold ${d === "Fri" ? "text-red-400" : "text-gray-400"}`}>{d}</div>)}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array(firstDay(calYear, calMonth)).fill(null).map((_, i) => <div key={`b${i}`} />)}
                      {Array(daysInMonth(calYear, calMonth)).fill(null).map((_, i) => {
                        const day = i + 1
                        const dis = disabled(day), sel = isSelected(day), tod = isToday(day)
                        return (
                          <button key={day} disabled={dis} onClick={() => { setSelectedDate({ day, month: calMonth, year: calYear }); setSelectedTime(null) }}
                            className={`h-10 rounded-xl text-sm font-medium transition-all duration-150 ${
                              dis ? "text-gray-200 cursor-not-allowed" :
                              sel ? "bg-gradient-to-br from-cyan-500 to-teal-500 text-white shadow-lg scale-105" :
                              tod ? "ring-2 ring-cyan-400 text-cyan-600 font-bold bg-cyan-50" :
                                    "text-gray-700 hover:bg-gradient-to-br hover:from-cyan-50 hover:to-teal-50 hover:text-cyan-700"
                            }`}>
                            {day}
                          </button>
                        )
                      })}
                    </div>
                    {selectedDate && (
                      <div className="mt-4 px-4 py-2.5 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl border border-cyan-100 text-sm text-cyan-700 font-medium flex items-center gap-2">
                        <Check className="w-4 h-4" /> Selected: {getDayName(selectedDate)}, {formatDate(selectedDate)}
                      </div>
                    )}
                  </section>

                  {/* Time Slots */}
                  <section className="p-6 border shadow-lg backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
                    <h2 className="flex items-center gap-2 mb-5 text-lg font-bold text-gray-900">
                      <Clock className="w-5 h-5 text-cyan-500" /> Select Time Slot
                      {!selectedDate && <span className="ml-auto text-xs font-normal text-gray-400">Pick a date first</span>}
                    </h2>
                    {["Morning", "Afternoon"].map(period => {
                      const slots = period === "Morning" ? MORNING_SLOTS : AFTERNOON_SLOTS
                      return (
                        <div key={period} className="mb-5">
                          <p className="mb-3 text-xs font-semibold tracking-wider text-gray-400 uppercase">{period}</p>
                          <div className="grid grid-cols-3 gap-2 sm:grid-cols-6">
                            {slots.map(time => {
                              const booked = BOOKED_SLOTS.includes(time)
                              const sel    = selectedTime === time
                              const dis    = booked || !selectedDate
                              return (
                                <button key={time} disabled={dis} onClick={() => setSelectedTime(time)}
                                  className={`py-2.5 rounded-xl text-xs font-semibold transition-all border ${
                                    booked ? "bg-red-50 text-red-300 border-red-100 cursor-not-allowed" :
                                    !selectedDate ? "bg-gray-50 text-gray-300 border-gray-100 cursor-not-allowed" :
                                    sel ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-transparent shadow-md" :
                                          "bg-white text-gray-700 border-gray-200 hover:border-cyan-400 hover:text-cyan-600 hover:bg-cyan-50"
                                  }`}>
                                  {time}
                                  {booked && <span className="block text-red-300" style={{fontSize:"9px"}}>Booked</span>}
                                </button>
                              )
                            })}
                          </div>
                        </div>
                      )
                    })}
                  </section>

                  <button onClick={() => { if (selectedDate && selectedTime) setStep(2) }} disabled={!selectedDate || !selectedTime}
                    className={`w-full py-4 rounded-2xl font-bold text-base transition-all duration-200 flex items-center justify-center gap-2 ${selectedDate && selectedTime ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-xl hover:shadow-2xl hover:-translate-y-0.5" : "bg-gray-200 text-gray-400 cursor-not-allowed"}`}>
                    Continue to Patient Info <ChevronRight className="w-5 h-5" />
                  </button>
                </div>
              )}

              {/* STEP 2 */}
              {step === 2 && (
                <section className="p-8 space-y-6 border shadow-lg backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
                  <h2 className="flex items-center gap-2 text-xl font-bold text-gray-900"><User className="w-6 h-6 text-cyan-500" /> Patient Information</h2>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
                      <div className="relative">
                        <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="text" placeholder="Enter full name" value={form.name}
                          onChange={e => updateForm("name", e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white/80 text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-cyan-400 ${errors.name ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-cyan-400"}`}
                        />
                      </div>
                      {errors.name && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3"/>{errors.name}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Age *</label>
                      <input type="number" placeholder="e.g. 30" value={form.age}
                        onChange={e => updateForm("age", e.target.value)}
                        className={`w-full px-4 py-3 rounded-xl border bg-white/80 text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-cyan-400 ${errors.age ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-cyan-400"}`}
                      />
                      {errors.age && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3"/>{errors.age}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block mb-2 text-sm font-semibold text-gray-700">Gender *</label>
                    <div className="flex gap-3">
                      {["Male","Female","Other"].map(g => (
                        <button key={g} onClick={() => updateForm("gender", g)}
                          className={`flex-1 py-2.5 rounded-xl border-2 text-sm font-semibold transition-all ${form.gender === g ? "border-cyan-500 bg-gradient-to-r from-cyan-50 to-teal-50 text-cyan-700" : "border-gray-200 bg-white/70 text-gray-500 hover:border-cyan-300"}`}>
                          {g}
                        </button>
                      ))}
                    </div>
                    {errors.gender && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3"/>{errors.gender}</p>}
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone Number *</label>
                      <div className="relative">
                        <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="tel" placeholder="+880 01XXXXXXXXX" value={form.phone}
                          onChange={e => updateForm("phone", e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white/80 text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-cyan-400 ${errors.phone ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-cyan-400"}`}
                        />
                      </div>
                      {errors.phone && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3"/>{errors.phone}</p>}
                    </div>
                    <div>
                      <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email Address *</label>
                      <div className="relative">
                        <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <input type="email" placeholder="your@email.com" value={form.email}
                          onChange={e => updateForm("email", e.target.value)}
                          className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white/80 text-gray-800 placeholder-gray-400 outline-none transition-all focus:ring-2 focus:ring-cyan-400 ${errors.email ? "border-red-400 bg-red-50/30" : "border-gray-200 focus:border-cyan-400"}`}
                        />
                      </div>
                      {errors.email && <p className="flex items-center gap-1 mt-1 text-xs text-red-500"><AlertCircle className="w-3 h-3"/>{errors.email}</p>}
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address <span className="font-normal text-gray-400">(optional)</span></label>
                    <div className="relative">
                      <MapPin className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                      <input type="text" placeholder="Your address" value={form.address}
                        onChange={e => updateForm("address", e.target.value)}
                        className="w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 border border-gray-200 outline-none rounded-xl bg-white/80 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Symptoms / Reason <span className="font-normal text-gray-400">(optional)</span></label>
                    <div className="relative">
                      <FileText className="absolute left-3.5 top-3.5 w-4 h-4 text-gray-400" />
                      <textarea rows={4} placeholder="Describe your symptoms..." value={form.notes}
                        onChange={e => updateForm("notes", e.target.value)}
                        className="w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 border border-gray-200 outline-none resize-none rounded-xl bg-white/80 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                      />
                    </div>
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button onClick={() => setStep(1)} className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-white hover:border-gray-300 transition-all flex items-center justify-center gap-2">
                      <ChevronLeft className="w-4 h-4" /> Back
                    </button>
                    <button onClick={() => { if (validate()) setStep(3) }} className="flex-[2] py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                      Review Booking <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                </section>
              )}

              {/* STEP 3 */}
              {step === 3 && (
                <section className="p-8 border shadow-lg backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
                  <h2 className="flex items-center gap-2 mb-6 text-xl font-bold text-gray-900"><BadgeCheck className="w-6 h-6 text-cyan-500" /> Review Your Booking</h2>
                  <div className="mb-6">
                    <p className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">Appointment Details</p>
                    <div className="p-5 space-y-3 border bg-gradient-to-br from-cyan-50 to-teal-50 rounded-2xl border-cyan-100">
                      {[
                        { icon:Calendar,    label:"Date",   val:`${getDayName(selectedDate)}, ${formatDate(selectedDate)}` },
                        { icon:Clock,       label:"Time",   val:selectedTime ?? "" },
                        { icon:MapPin,      label:"Type",   val:consultType === "in-person" ? "In-Person Visit" : "Online Chat" },
                        { icon:Stethoscope, label:"Doctor", val:DOCTOR.name + " (" + DOCTOR.credentials + ")" },
                      ].map(({ icon: Icon, label, val }) => (
                        <div key={label} className="flex items-center justify-between">
                          <span className="flex items-center gap-2 text-sm text-gray-500"><Icon className="w-4 h-4 text-cyan-500" /> {label}</span>
                          <span className="text-sm font-semibold text-gray-800">{val}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="mb-6">
                    <p className="mb-3 text-xs font-bold tracking-widest text-gray-400 uppercase">Patient Details</p>
                    <div className="p-5 space-y-3 border border-gray-100 bg-white/80 rounded-2xl">
                      {[
                        { label:"Name",   val:form.name },
                        { label:"Age",    val:form.age + " years" },
                        { label:"Gender", val:form.gender },
                        { label:"Phone",  val:form.phone },
                        { label:"Email",  val:form.email },
                        ...(form.address ? [{ label:"Address", val:form.address }] : []),
                      ].map(({ label, val }) => (
                        <div key={label} className="flex items-center justify-between">
                          <span className="text-sm text-gray-500">{label}</span>
                          <span className="text-sm font-semibold text-gray-800">{val}</span>
                        </div>
                      ))}
                      {form.notes && (
                        <div>
                          <p className="mb-1 text-sm text-gray-500">Symptoms</p>
                          <p className="p-3 text-sm text-gray-700 border border-gray-100 bg-gray-50 rounded-xl">{form.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center justify-between p-5 mb-6 bg-gradient-to-r from-gray-900 to-gray-800 rounded-2xl">
                    <div>
                      <p className="text-sm text-gray-400">Consultation Fee</p>
                      <p className="text-2xl font-bold text-white">৳ {fee}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-gray-400">Payment at</p>
                      <p className="text-sm font-semibold text-white">{consultType === "in-person" ? "Chamber" : "Online"}</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button onClick={() => setStep(2)} className="flex-1 py-3.5 rounded-xl border-2 border-gray-200 text-gray-600 font-semibold hover:bg-white transition-all flex items-center justify-center gap-2">
                      <ChevronLeft className="w-4 h-4" /> Edit
                    </button>
                    <button onClick={() => setSubmitted(true)} className="flex-[2] py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                      <Check className="w-5 h-5" /> Confirm Appointment
                    </button>
                  </div>
                </section>
              )}
            </div>

            {/* Sidebar */}
            <div className="space-y-5">
              <div className="p-6 border shadow-lg backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
                <img src={DOCTOR.image} alt={DOCTOR.name} className="object-cover w-full mb-4 h-44 rounded-xl" />
                <h3 className="text-lg font-bold text-gray-900">{DOCTOR.name}</h3>
                <p className="mb-3 text-sm font-semibold text-cyan-600">{DOCTOR.credentials}</p>
                <div className="flex gap-3 mb-4">
                  <div className="flex-1 bg-cyan-50 rounded-xl p-2.5 text-center">
                    <p className="text-lg font-bold text-cyan-600">{DOCTOR.rating}</p>
                    <p className="text-xs text-gray-500 flex items-center justify-center gap-0.5"><Star className="w-3 h-3 text-yellow-400 fill-yellow-400" /> Rating</p>
                  </div>
                  <div className="flex-1 bg-teal-50 rounded-xl p-2.5 text-center">
                    <p className="text-lg font-bold text-teal-600">{DOCTOR.patients}</p>
                    <p className="text-xs text-gray-500">Patients</p>
                  </div>
                </div>
                <div className="space-y-1.5 mb-4">
                  {DOCTOR.specializations.map((s, i) => (
                    <div key={s} className="flex items-center gap-2">
                      <span className={`w-2 h-2 rounded-full flex-shrink-0 ${["bg-cyan-500","bg-teal-500","bg-cyan-400","bg-teal-400","bg-cyan-300"][i]}`} />
                      <span className="text-sm text-gray-600">{s}</span>
                    </div>
                  ))}
                </div>
                <div className="flex items-center gap-2 pt-3 border-t border-white/60">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                  <span className="text-xs font-semibold text-green-600">Available Today</span>
                </div>
              </div>

              {(selectedDate || selectedTime) && (
                <div className="p-5 border shadow-lg backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
                  <h4 className="mb-4 text-sm font-bold tracking-wider text-gray-800 uppercase">Your Selection</h4>
                  <div className="space-y-3">
                    {[
                      { icon: consultType === "in-person" ? MapPin : MessageSquare, label:"Type", val: consultType === "in-person" ? "In-Person" : "Online Chat", bg:"bg-cyan-100", color:"text-cyan-600" },
                      ...(selectedDate ? [{ icon:Calendar, label:"Date", val:`${getDayName(selectedDate)}, ${formatDate(selectedDate)}`, bg:"bg-cyan-100", color:"text-cyan-600" }] : []),
                      ...(selectedTime ? [{ icon:Clock, label:"Time", val:selectedTime, bg:"bg-teal-100", color:"text-teal-600" }] : []),
                    ].map(({ icon: Icon, label, val, bg, color }) => (
                      <div key={label} className="flex items-center gap-3">
                        <div className={`w-9 h-9 ${bg} rounded-xl flex items-center justify-center flex-shrink-0`}>
                          <Icon className={`w-4 h-4 ${color}`} />
                        </div>
                        <div><p className="text-xs text-gray-400">{label}</p><p className="text-sm font-semibold text-gray-800">{val}</p></div>
                      </div>
                    ))}
                    <div className="flex items-center justify-between pt-2 border-t border-gray-100">
                      <span className="text-sm text-gray-500">Consultation Fee</span>
                      <span className="font-bold text-gray-900">tk{fee}</span>
                    </div>
                  </div>
                </div>
              )}

              <div className="p-5 border bg-gradient-to-br from-cyan-500/10 to-teal-500/10 rounded-2xl border-cyan-200/50">
                <div className="flex items-center gap-2 mb-3">
                  <Shield className="w-4 h-4 text-cyan-600" />
                  <h4 className="text-sm font-bold text-cyan-800">Important Notes</h4>
                </div>
                <ul className="space-y-2">
                  {["Arrive 10 mins early for in-person visits","Bring anrevious prescriptions","Chat link will be sent to your email","Reschedule 24hrs before appointment","Friday is the weekly holiday"].map(info => (
                    <li key={info} className="flex items-start gap-2 text-xs text-gray-600">
                      <Check className="w-3 h-3 text-cyan-500 mt-0.5 shrink-0" /> {info}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
