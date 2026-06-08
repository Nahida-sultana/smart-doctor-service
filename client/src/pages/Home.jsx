import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Menu,
  X,
  Stethoscope,
  Calendar,
  Video,
  MessageSquare,
  Activity,
  Heart,
  Baby,
  Syringe,
  BookOpen,
  Phone,
  Mail,
  MapPin,
  Clock,
  User,
  ChevronRight,
  Globe,
} from "lucide-react";

const DOCTOR_IMAGE = '/doctor.jpeg';

function Brain({ className }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M9.5 2A2.5 2.5 0 0 1 12 4.5v15a2.5 2.5 0 0 1-4.96.44 2.5 2.5 0 0 1-2.96-3.08 3 3 0 0 1-.34-5.58 2.5 2.5 0 0 1 1.32-4.24 2.5 2.5 0 0 1 1.98-3A2.5 2.5 0 0 1 9.5 2Z" />
      <path d="M14.5 2A2.5 2.5 0 0 0 12 4.5v15a2.5 2.5 0 0 0 4.96.44 2.5 2.5 0 0 0 2.96-3.08 3 3 0 0 0 .34-5.58 2.5 2.5 0 0 0-1.32-4.24 2.5 2.5 0 0 0-1.98-3A2.5 2.5 0 0 0 14.5 2Z" />
    </svg>
  );
}

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">

      {/* ===== NAVBAR ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 border-b shadow-sm backdrop-blur-md bg-white/70 border-white/20">
        <div className="px-4 mx-auto max-w-7xl sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">

            {/* Logo */}
            <div className="flex items-center gap-2">
              <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl">
                <Stethoscope className="w-6 h-6 text-white" />
              </div>
              <div>
                <div className="font-semibold text-gray-900">Smart Doctor</div>
                <div className="text-xs text-gray-600">Service</div>
              </div>
            </div>

            {/* Desktop Nav Links */}
            <div className="items-center hidden gap-8 md:flex">
              <a href="#home" className="text-gray-700 transition-colors hover:text-cyan-600">Home</a>
              <a href="#services" className="text-gray-700 transition-colors hover:text-cyan-600">Services</a>
              <a href="#health-info" className="text-gray-700 transition-colors hover:text-cyan-600">Health Info</a>
              <a href="#contact" className="text-gray-700 transition-colors hover:text-cyan-600">Contact</a>
            </div>

            {/* Login Button */}
            <div className="items-center hidden gap-3 md:flex">
              <Link
                to="/login"
                className="px-4 py-2 text-white transition-all rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500 hover:shadow-lg"
              >
                Login
              </Link>
            </div>

            {/* Mobile Hamburger */}
            <button className="md:hidden" onClick={() => setIsMenuOpen(!isMenuOpen)}>
              {isMenuOpen ? <X /> : <Menu />}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="py-4 space-y-3 border-t md:hidden border-white/30">
              <a href="#home" className="block py-2 text-gray-700 hover:text-cyan-600">Home</a>
              <a href="#services" className="block py-2 text-gray-700 hover:text-cyan-600">Services</a>
              <a href="#health-info" className="block py-2 text-gray-700 hover:text-cyan-600">Health Info</a>
              <a href="#contact" className="block py-2 text-gray-700 hover:text-cyan-600">Contact</a>
              <Link
                to="/login"
                className="block w-full px-4 py-2 text-center text-white rounded-lg bg-gradient-to-r from-cyan-500 to-teal-500"
              >
                Login
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* ===== HERO SECTION ===== */}
      <section id="home" className="px-4 pt-24 pb-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-block px-4 py-2 border rounded-full bg-white/60 backdrop-blur-sm border-white/40">
                <span className="text-sm text-cyan-600">Connecting Patients with Trusted Healthcare</span>
              </div>
              <h1 className="text-5xl font-bold leading-tight text-gray-900 md:text-6xl">
                Your Health, <br />
                <span className="text-transparent bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text">
                  Our Priority
                </span>
              </h1>
              <p className="text-lg leading-relaxed text-gray-600">
                Access quality healthcare from the comfort of your home. Connect with experienced doctors
                for online consultations and comprehensive health services.
              </p>
              <div className="flex flex-wrap gap-4">
                <button className="flex items-center gap-2 px-8 py-4 text-white transition-all shadow-lg bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl hover:shadow-xl">
                  Book Appointment <ChevronRight className="w-5 h-5" />
                </button>
                <button className="px-8 py-4 text-gray-700 transition-all border backdrop-blur-md bg-white/70 rounded-xl border-white/40 hover:shadow-lg">
                  Consult Now
                </button>
              </div>
            </div>

            <div className="relative">
              <div className="absolute inset-0 bg-gradient-to-br from-cyan-300/30 to-teal-300/30 rounded-3xl blur-3xl"></div>
              <div className="relative p-8 border shadow-2xl backdrop-blur-sm bg-white/40 rounded-3xl border-white/60">
                <img
                  src={DOCTOR_IMAGE}
                  alt="Dr. Ariyan Jawad"
                  className="object-cover w-full h-96 rounded-2xl"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== DOCTOR PROFILE SECTION ===== */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Meet Our Expert Doctor</h2>
            <p className="text-gray-600">Experienced healthcare professional ready to serve you</p>
          </div>
          <div className="max-w-md mx-auto">
            <div className="p-8 transition-all border shadow-xl backdrop-blur-md bg-white/60 rounded-2xl border-white/60 hover:shadow-2xl">
              <div className="w-32 h-32 mx-auto mb-6 overflow-hidden border-4 rounded-full border-cyan-400">
                <img
                  src={DOCTOR_IMAGE}
                  alt="Dr. Ariyan Jawad"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="space-y-3 text-center">
                <h3 className="text-2xl font-semibold text-gray-900">Dr. Ariyan Jawad</h3>
                <p className="font-medium text-cyan-600">MBBS, PGT (Medicine), CCD (Birdem)</p>
                <p className="pt-3 text-sm leading-relaxed text-gray-600">
                  Specializations include General Medicine, Paediatrics, Diabetes management,
                  Rheumatic diseases, and Skin care. Dedicated to delivering patient-centered
                  treatment and continuous healthcare support through both in-person and online consultation.
                </p>
                <button className="w-full px-6 py-3 mt-4 text-white transition-all bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl hover:shadow-lg">
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== APPOINTMENT SECTION ===== */}
      <section id="services" className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-white/50 to-cyan-50/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full backdrop-blur-sm bg-white/60 border-white/40">
                <Calendar className="w-5 h-5 text-cyan-600" />
                <span className="text-sm text-cyan-600">Easy Scheduling</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Book Your Appointment</h2>
              <p className="leading-relaxed text-gray-600">
                Schedule your consultation at your convenience. Choose your preferred date, time, and doctor.
                Get instant confirmation and reminders.
              </p>
              <button className="px-8 py-4 text-white transition-all shadow-lg bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl hover:shadow-xl">
                Schedule Now
              </button>
            </div>

            <div className="p-8 border shadow-xl backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
              <div className="space-y-4">
                <div className="p-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Calendar className="w-5 h-5 text-cyan-600" />
                    <span className="text-sm text-gray-600">Select Date</span>
                  </div>
                  <div className="font-medium text-gray-900">April 30, 2026</div>
                </div>
                <div className="p-4 bg-gradient-to-r from-cyan-50 to-teal-50 rounded-xl">
                  <div className="flex items-center gap-3 mb-2">
                    <Clock className="w-5 h-5 text-cyan-600" />
                    <span className="text-sm text-gray-600">Select Time</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {["10:00 AM", "11:00 AM", "2:00 PM", "3:00 PM"].map((time) => (
                      <button key={time} className="px-4 py-2 text-sm transition-colors bg-white border rounded-lg hover:bg-cyan-100 border-cyan-100">
                        {time}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== TELEMEDICINE SECTION ===== */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="overflow-hidden border shadow-xl backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
              <img
                src="https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=800&q=80"
                alt="Telemedicine Consultation"
                className="object-cover w-full h-80"
              />
              <div className="p-6 text-white bg-gradient-to-br from-cyan-500 to-teal-500">
                <div className="flex items-center gap-3">
                  <MessageSquare className="w-6 h-6" />
                  <div>
                    <div className="text-sm opacity-90">Chat Consultation</div>
                    <div className="font-semibold">Available Now</div>
                  </div>
                </div>
              </div>
            </div>

            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full backdrop-blur-sm bg-white/60 border-white/40">
                <Video className="w-5 h-5 text-cyan-600" />
                <span className="text-sm text-cyan-600">Remote Healthcare</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Consult from Home</h2>
              <p className="leading-relaxed text-gray-600">
                Connect with healthcare professionals through secure chat consultations.
                Get expert medical advice without leaving your home.
              </p>
              <div className="space-y-4">
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl">
                    <MessageSquare className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">Chat Support</h3>
                    <p className="text-sm text-gray-600">Instant messaging with your doctor for real-time consultation</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="flex items-center justify-center flex-shrink-0 w-12 h-12 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl">
                    <Clock className="w-6 h-6 text-cyan-600" />
                  </div>
                  <div>
                    <h3 className="mb-1 font-semibold text-gray-900">24/7 Availability</h3>
                    <p className="text-sm text-gray-600">Get medical guidance whenever you need it</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== HEALTH AWARENESS SECTION ===== */}
      <section id="health-info" className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-white/50 to-teal-50/50">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Health Awareness</h2>
            <p className="text-gray-600">Stay informed about important health topics</p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { icon: BookOpen, label: "Health Articles", desc: "Expert insights and latest medical research", bg: "from-blue-100 to-cyan-100", color: "text-cyan-600" },
              { icon: Activity, label: "Infectious Diseases", desc: "Prevention and treatment information", bg: "from-red-100 to-pink-100", color: "text-red-600" },
              { icon: Baby, label: "Children Health", desc: "Pediatric care and development guides", bg: "from-pink-100 to-purple-100", color: "text-pink-600" },
              { icon: Syringe, label: "Vaccine Info", desc: "Vaccination schedules and guidelines", bg: "from-teal-100 to-green-100", color: "text-teal-600" },
            ].map(({ icon: Icon, label, desc, bg, color }) => (
              <div key={label} className="p-6 transition-all border shadow-lg cursor-pointer backdrop-blur-md bg-white/60 rounded-2xl border-white/60 hover:shadow-xl group">
                <div className={`w-16 h-16 bg-gradient-to-br ${bg} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <Icon className={`w-8 h-8 ${color}`} />
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{label}</h3>
                <p className="text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== HEALTH BULLETIN SECTION ===== */}
      <section className="px-4 py-16 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <h2 className="mb-4 text-4xl font-bold text-gray-900">Health Bulletin</h2>
            <p className="text-gray-600">Latest updates from our medical team</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              { title: "Seasonal Flu Prevention", date: "April 28, 2026", excerpt: "Important tips to protect yourself and your family during flu season.", icon: Activity },
              { title: "Heart Health Awareness", date: "April 25, 2026", excerpt: "Learn about maintaining cardiovascular health through lifestyle changes.", icon: Heart },
              { title: "Mental Wellness Tips", date: "April 20, 2026", excerpt: "Strategies for managing stress and improving mental health.", icon: Brain },
            ].map((item, i) => (
              <div key={i} className="p-6 transition-all border shadow-lg backdrop-blur-md bg-white/60 rounded-2xl border-white/60 hover:shadow-xl">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex items-center justify-center w-12 h-12 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl">
                    <item.icon className="w-6 h-6 text-cyan-600" />
                  </div>
                  <span className="text-sm text-gray-500">{item.date}</span>
                </div>
                <h3 className="mb-2 font-semibold text-gray-900">{item.title}</h3>
                <p className="mb-4 text-sm text-gray-600">{item.excerpt}</p>
                <button className="flex items-center gap-1 text-sm text-cyan-600 hover:text-cyan-700">
                  Read More <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOLLOW-UP CHAT SECTION ===== */}
      <section className="px-4 py-16 sm:px-6 lg:px-8 bg-gradient-to-br from-white/50 to-cyan-50/50">
        <div className="mx-auto max-w-7xl">
          <div className="grid items-center gap-12 md:grid-cols-2">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full backdrop-blur-sm bg-white/60 border-white/40">
                <MessageSquare className="w-5 h-5 text-cyan-600" />
                <span className="text-sm text-cyan-600">Continuous Care</span>
              </div>
              <h2 className="text-4xl font-bold text-gray-900">Stay Connected After Consultation</h2>
              <p className="leading-relaxed text-gray-600">
                Our follow-up system ensures you receive continuous support. Share updates, ask questions,
                and get timely responses from your healthcare provider.
              </p>
            </div>

            <div className="p-6 border shadow-xl backdrop-blur-md bg-white/60 rounded-2xl border-white/60">
              <div className="space-y-4">
                <div className="flex gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 p-4 rounded-tl-none bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl">
                    <p className="text-sm text-gray-700">How are you feeling today? Any improvements?</p>
                    <span className="block mt-1 text-xs text-gray-500">Dr. Ariyan Jawad - 10:30 AM</span>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-gray-300 rounded-full">
                    <User className="w-5 h-5 text-gray-600" />
                  </div>
                  <div className="flex-1 p-4 bg-white border border-gray-200 rounded-tr-none rounded-2xl">
                    <p className="text-sm text-gray-700">Much better! The medication is working well.</p>
                    <span className="block mt-1 text-xs text-gray-500">You - 11:15 AM</span>
                  </div>
                </div>
                <div className="flex gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 rounded-full bg-gradient-to-br from-cyan-500 to-teal-500">
                    <User className="w-5 h-5 text-white" />
                  </div>
                  <div className="flex-1 p-4 rounded-tl-none bg-gradient-to-r from-cyan-50 to-teal-50 rounded-2xl">
                    <p className="text-sm text-gray-700">Great to hear! Continue for 3 more days.</p>
                    <span className="block mt-1 text-xs text-gray-500">Dr. Ariyan Jawad - 11:20 AM</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer id="contact" className="px-4 py-12 text-white bg-gradient-to-br from-gray-900 to-gray-800 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 mb-8 md:grid-cols-4">

            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl">
                  <Stethoscope className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-semibold">Smart Doctor</div>
                  <div className="text-sm text-gray-400">Service</div>
                </div>
              </div>
              <p className="text-sm text-gray-400">
                Connecting patients with trusted healthcare professionals for better health outcomes.
              </p>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Quick Links</h4>
              <div className="space-y-2 text-sm">
                {["Home", "Services", "Health Info", "Contact"].map((link) => (
                  <a key={link} href={`#${link.toLowerCase().replace(" ", "-")}`} className="block text-gray-400 transition-colors hover:text-white">
                    {link}
                  </a>
                ))}
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Contact Info</h4>
              <div className="space-y-3 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <Phone className="w-4 h-4" />
                  <span>+880 1834-507590</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  <span>ariyanjawad@gmail.com</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4" />
                  <span>Chittagong, Bangladesh</span>
                </div>
              </div>
            </div>

            <div>
              <h4 className="mb-4 font-semibold">Follow Us</h4>
              <div className="flex gap-3">
                <a href="#" className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-white/10 hover:bg-white/20"><Globe className="w-5 h-5" /></a>
                <a href="#" className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-white/10 hover:bg-white/20"><Globe className="w-5 h-5" /></a>
                <a href="#" className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-white/10 hover:bg-white/20"><Globe className="w-5 h-5" /></a>
                <a href="#" className="flex items-center justify-center w-10 h-10 transition-colors rounded-lg bg-white/10 hover:bg-white/20"><Globe className="w-5 h-5" /></a>
              </div>
            </div>

          </div>

          <div className="pt-8 text-sm text-center text-gray-400 border-t border-gray-700">
            <p>&copy; 2026 Smart Doctor Service. All rights reserved.</p>
          </div>
        </div>
      </footer>

    </div>
  );
}
