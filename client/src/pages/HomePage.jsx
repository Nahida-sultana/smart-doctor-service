import { useState } from 'react'
import {
  Menu, X, Stethoscope, Calendar, MessageSquare,
  Phone, Mail, MapPin,
   Clock, User, ChevronRight, Heart,
} from 'lucide-react'
import TelemedicineSection from './TelemedicineSection'
import HealthAwarenessSection from './HealthAwarenessSection'
import HealthBulletinSection from './HealthBulletinSection'

const DOCTOR_IMAGE = '/doctor.jpeg'

export default function HomePage({ onLogin, onRegister, onBooking }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">

      {/* NAVBAR */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b shadow-sm backdrop-blur-md bg-white/70 border-white/30">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl">
                <Stethoscope className="w-5 h-5 text-white" />
              </div>
              <div>
                <p className="text-sm font-bold leading-none text-gray-900">Smart Doctor</p>
                <p className="text-xs text-gray-500">Service</p>
              </div>
            </div>

            <div className="items-center hidden md:flex gap-7">
              {[['#home','Home'],['#services','Services'],['#telemedicine','Telemedicine'],['#health-info','Health Info'],['#bulletin','Bulletin'],['#contact','Contact']].map(([href, label]) => (
                <a key={href} href={href} className="text-sm text-gray-600 transition-colors hover:text-cyan-600">{label}</a>
              ))}
            </div>

            <div className="items-center hidden gap-3 md:flex">
              <button onClick={onBooking} className="px-4 py-2 text-sm font-semibold transition-all rounded-lg text-cyan-600 hover:bg-cyan-50">Book Now</button>
              <button onClick={onRegister} className="px-4 py-2 text-sm font-semibold text-gray-600 transition-all rounded-lg hover:bg-gray-100">Register</button>
              <button onClick={onLogin} className="px-5 py-2 text-sm font-semibold text-white transition-all bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl hover:shadow-lg">Login</button>
            </div>

            <button className="p-2 rounded-lg md:hidden hover:bg-gray-100" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>

          {isMenuOpen && (
            <div className="py-3 space-y-1 border-t md:hidden border-white/40">
              {[['#home','Home'],['#services','Services'],['#telemedicine','Telemedicine'],['#health-info','Health Info'],['#bulletin','Bulletin'],['#contact','Contact']].map(([href, label]) => (
                <a key={href} href={href} onClick={() => setIsMenuOpen(false)} className="block px-3 py-2.5 text-gray-700 hover:text-cyan-600 hover:bg-cyan-50 rounded-xl transition-all text-sm">{label}</a>
              ))}
              <div className="grid grid-cols-3 gap-2 pt-2">
                <button onClick={() => { setIsMenuOpen(false); onBooking() }} className="py-2.5 border border-cyan-500 text-cyan-600 rounded-xl text-xs font-semibold">Book Now</button>
                <button onClick={() => { setIsMenuOpen(false); onRegister() }} className="py-2.5 border border-gray-300 text-gray-600 rounded-xl text-xs font-semibold">Register</button>
                <button onClick={() => { setIsMenuOpen(false); onLogin() }} className="py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl text-xs font-semibold">Login</button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* HERO */}
      <section id="home" className="px-4 pb-20 pt-28 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 border rounded-full bg-white/60 backdrop-blur-sm border-white/40">
                <span className="text-sm text-cyan-600">Connecting Patients with Trusted Healthcare</span>
              </div>
              <h1 className="text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
                Your Health, <br />
                <span className="text-transparent bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text">Our Priority</span>
              </h1>
              <p className="text-lg leading-relaxed text-gray-500">
                Access quality healthcare from the comfort of your home. Connect with Dr. Ariyan Jawad for consultations and comprehensive health services.
              </p>
              <div className="flex flex-wrap gap-4">
                <button onClick={onBooking} className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center gap-2">
                  Book Appointment <ChevronRight className="w-5 h-5" />
                </button>
                <a href="#telemedicine" className="px-8 py-4 font-semibold text-gray-700 transition-all border bg-white/70 backdrop-blur-md rounded-2xl border-white/60 hover:shadow-md">
                  Consult Online
                </a>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/20 to-teal-300/20 rounded-3xl blur-3xl" />
              <div className="relative p-6 border shadow-2xl backdrop-blur-sm bg-white/40 rounded-3xl border-white/60">
                <img src={DOCTOR_IMAGE} alt="Dr. Ariyan Jawad" className="object-cover w-full h-96 rounded-2xl" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* DOCTOR PROFILE */}
      <section className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-white/60 to-cyan-50/60">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-2 text-4xl font-bold text-gray-900">Meet Our Doctor</h2>
            <p className="text-gray-500">Experienced healthcare professional ready to serve you</p>
          </div>
          <div className="grid items-start gap-8 lg:grid-cols-3">
            <div className="p-8 text-center border shadow-lg backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
              <div className="w-32 h-32 mx-auto mb-5 overflow-hidden border-4 rounded-full border-cyan-300">
                <img src={DOCTOR_IMAGE} alt="Dr. Ariyan Jawad" className="object-cover w-full h-full" />
              </div>
              <h3 className="text-xl font-bold text-gray-900">Dr. Ariyan Jawad</h3>
              <p className="mt-1 mb-6 font-medium text-cyan-600">MBBS, PGT</p>
              <button onClick={onBooking} className="w-full py-3 font-semibold text-white transition-all bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl hover:shadow-lg">
                Book Appointment
              </button>
            </div>

            <div className="space-y-3">
              <h3 className="mb-4 text-lg font-bold text-gray-900">Specializations</h3>
              {[
                { label: 'General Medicine',    color: 'from-cyan-100 to-blue-100',     iconColor: 'text-cyan-600'   },
                { label: 'Paediatrics',         color: 'from-pink-100 to-purple-100',   iconColor: 'text-pink-500'   },
                { label: 'Diabetes Management', color: 'from-orange-100 to-yellow-100', iconColor: 'text-orange-500' },
                { label: 'Rheumatic Diseases',  color: 'from-teal-100 to-green-100',    iconColor: 'text-teal-600'   },
                { label: 'Skin Care',           color: 'from-violet-100 to-pink-100',   iconColor: 'text-violet-500' },
              ].map(({ label, color, iconColor }) => (
                <div key={label} className="flex items-center gap-3 p-3.5 bg-white/50 backdrop-blur-sm rounded-xl border border-white/60">
                  <div className={`w-9 h-9 bg-gradient-to-br ${color} rounded-lg flex items-center justify-center flex-shrink-0`}>
                    <Heart className={`w-4 h-4 ${iconColor}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-800">{label}</span>
                </div>
              ))}
            </div>

            <div className="space-y-4">
              <div className="p-6 border shadow-lg backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
                <h3 className="mb-4 font-bold text-gray-900">Chamber Info</h3>
                <div className="space-y-3">
                  {[
                    { Icon: MapPin, val: 'Smart Doctor Clinic, Dhaka' },
                    { Icon: Clock,  val: 'Sat–Thu: 9AM–12PM & 2PM–5PM' },
                    { Icon: Phone,  val: '+880 1234-567890' },
                    { Icon: Mail,   val: 'dr.ariyan@smartdoctor.com' },
                  ].map(({ Icon, val }) => (
                    <div key={val} className="flex items-center gap-3 text-sm text-gray-600">
                      <Icon className="flex-shrink-0 w-4 h-4 text-cyan-500" />
                      <span>{val}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="p-5 border shadow-lg backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
                <h3 className="flex items-center gap-2 mb-3 text-sm font-bold text-gray-900">
                  <MessageSquare className="w-4 h-4 text-cyan-500" /> Follow-up Chat
                </h3>
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <img src={DOCTOR_IMAGE} alt="Dr." className="flex-shrink-0 object-cover rounded-full w-7 h-7" />
                    <div className="p-3 border rounded-tl-none bg-cyan-50 rounded-2xl border-cyan-100">
                      <p className="text-xs text-gray-700">How are you feeling today?</p>
                    </div>
                  </div>
                  <div className="flex flex-row-reverse gap-2">
                    <div className="flex items-center justify-center flex-shrink-0 bg-gray-200 rounded-full w-7 h-7">
                      <User className="w-4 h-4 text-gray-500" />
                    </div>
                    <div className="p-3 bg-white border border-gray-100 rounded-tr-none rounded-2xl">
                      <p className="text-xs text-gray-700">Much better, thank you!</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <img src={DOCTOR_IMAGE} alt="Dr." className="flex-shrink-0 object-cover rounded-full w-7 h-7" />
                    <div className="p-3 border rounded-tl-none bg-cyan-50 rounded-2xl border-cyan-100">
                      <p className="text-xs text-gray-700">Great! Continue for 3 more days.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* APPOINTMENT SECTION */}
      <section id="services" className="px-4 py-20 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-5">
              <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full bg-white/60 backdrop-blur-sm border-white/40">
                <Calendar className="w-4 h-4 text-cyan-600" />
                <span className="text-sm text-cyan-600">Easy Scheduling</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Book Your Appointment</h2>
              <p className="leading-relaxed text-gray-500">Schedule your consultation at your convenience. Choose your preferred date, time, and consultation type.</p>
              <ul className="space-y-2.5">
                {['In-person or online chat available', 'Morning & afternoon slots', 'Instant confirmation'].map(item => (
                  <li key={item} className="flex items-center gap-2.5 text-sm text-gray-600">
                    <div className="flex items-center justify-center flex-shrink-0 w-5 h-5 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500">
                      <ChevronRight className="w-3 h-3 text-white" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
              <button onClick={onBooking} className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-2xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all">
                Book Now
              </button>
            </div>

            <div className="p-6 space-y-4 border shadow-lg backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
              <div className="p-4 border bg-cyan-50 rounded-xl border-cyan-100">
                <div className="flex items-center gap-2 mb-3">
                  <Calendar className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm font-medium text-gray-700">Select Date</span>
                </div>
                <div className="grid grid-cols-7 gap-1">
                  {['S','M','T','W','T','F','S'].map((d, i) => (
                    <div key={i} className={`text-center text-xs font-semibold py-1 ${i === 5 ? 'text-red-400' : 'text-gray-400'}`}>{d}</div>
                  ))}
                  {[null,null,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20].map((d, i) => (
                    <div key={i} className={`h-8 rounded-lg text-xs flex items-center justify-center font-medium ${
                      d === null ? '' :
                      d === 15  ? 'bg-gradient-to-br from-cyan-500 to-teal-500 text-white' :
                      [5,12,19].includes(d) ? 'text-red-300' :
                      'text-gray-600 hover:bg-cyan-100 cursor-pointer'
                    }`}>{d}</div>
                  ))}
                </div>
              </div>
              <div className="p-4 border bg-cyan-50 rounded-xl border-cyan-100">
                <div className="flex items-center gap-2 mb-3">
                  <Clock className="w-4 h-4 text-cyan-600" />
                  <span className="text-sm font-medium text-gray-700">Time Slots</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {['09:00 AM','10:00 AM','11:30 AM','02:00 PM','03:30 PM','04:00 PM'].map((t, i) => (
                    <div key={t} className={`py-2 rounded-xl text-xs font-medium text-center ${
                      i === 2 ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white' : 'bg-white text-gray-600 border border-gray-200'
                    }`}>{t}</div>
                  ))}
                </div>
              </div>
              <button onClick={onBooking} className="w-full py-3 text-sm font-semibold text-white transition-all bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl hover:shadow-lg">
                Open Booking Form →
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* SECTIONS */}
      <div id="telemedicine" className="bg-gradient-to-br from-white/50 to-cyan-50/50">
        <TelemedicineSection />
      </div>
      <div id="health-info">
        <HealthAwarenessSection />
      </div>
      <div id="bulletin" className="bg-gradient-to-br from-white/40 to-blue-50/40">
        <HealthBulletinSection />
      </div>

      {/* FOOTER */}
      <footer id="contact" className="px-4 text-white bg-gradient-to-br from-gray-900 to-gray-800 py-14 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 mb-10 md:grid-cols-4">
            <div className="space-y-4">
              <div className="flex items-center gap-2.5">
                <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl">
                  <Stethoscope className="w-5 h-5 text-white" />
                </div>
                <div>
                  <p className="text-sm font-bold">Smart Doctor</p>
                  <p className="text-xs text-gray-400">Service</p>
                </div>
              </div>
              <p className="text-sm leading-relaxed text-gray-400">Connecting patients with trusted healthcare professionals in Bangladesh.</p>
              <div className="flex gap-2">
               
                
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold">Quick Links</h4>
              <div className="space-y-2 text-sm">
                {[['#home','Home'],['#services','Appointment'],['#telemedicine','Telemedicine'],['#health-info','Health Info'],['#bulletin','Bulletin']].map(([href, label]) => (
                  <a key={href} href={href} className="block text-gray-400 transition-colors hover:text-cyan-400">{label}</a>
                ))}
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold">Services</h4>
              <div className="space-y-2 text-sm text-gray-400">
                {['General Medicine','Paediatrics','Diabetes Management','Rheumatic Diseases','Skin Care'].map(s => <p key={s}>{s}</p>)}
              </div>
            </div>
            <div>
              <h4 className="mb-4 text-sm font-bold">Contact</h4>
              <div className="space-y-3 text-sm text-gray-400">
                {[
                  { Icon: Phone,  val: '+880 1234-567890' },
                  { Icon: Mail,   val: 'dr.ariyan@smartdoctor.com' },
                  { Icon: MapPin, val: 'Smart Doctor Clinic, Dhaka' },
                  { Icon: Clock,  val: 'Sat–Thu: 9AM–5PM' },
                ].map(({ Icon, val }) => (
                  <div key={val} className="flex items-center gap-2">
                    <Icon className="w-4 h-4 shrink-0 text-cyan-500" />
                    <span>{val}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          <div className="pt-6 text-sm text-center text-gray-500 border-t border-gray-700">
            <p>&copy; 2026 Smart Doctor Service. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  ) }