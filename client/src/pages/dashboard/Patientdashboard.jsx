import { useState } from "react"
import { Stethoscope, Calendar, MessageSquare, Bell, LogOut, Menu, X, User, Clock, ChevronRight, BookOpen, Home, Settings, ChevronDown, FileText, Plus, Heart } from "lucide-react"

const MY_APPOINTMENTS = [
  { id:1, date:"Aug 5, 2026",  time:"10:00 AM", type:"online",    status:"upcoming",  reason:"Diabetes follow-up" },
  { id:2, date:"Aug 10, 2026", time:"11:30 AM", type:"in-person", status:"upcoming",  reason:"General checkup"    },
  { id:3, date:"Jul 28, 2026", time:"09:00 AM", type:"in-person", status:"completed", reason:"Fever & cold"       },
  { id:4, date:"Jul 20, 2026", time:"02:00 PM", type:"online",    status:"completed", reason:"Skin rash consult"  },
]

const BULLETINS = [
  { id:1, title:"Seasonal Flu Prevention Guide", category:"General",    date:"Jun 28", tag:"bg-cyan-100 text-cyan-700"   },
  { id:2, title:"10 Daily Habits for Heart Health", category:"Cardiology", date:"Jun 25", tag:"bg-red-100 text-red-700"     },
  { id:3, title:"Diabetes Management Tips",       category:"Diabetes",  date:"Jun 20", tag:"bg-orange-100 text-orange-700" },
]

const CHAT_MSGS = [
  { from:"doctor",  text:"How are you feeling after the last prescription?",               time:"09:30 AM" },
  { from:"patient", text:"Much better doctor! The fever is gone.",                         time:"09:45 AM" },
  { from:"doctor",  text:"Great! Continue the medicine for 2 more days. Stay hydrated.",   time:"09:47 AM" },
  { from:"patient", text:"Sure, I will. Thank you doctor!",                                time:"09:50 AM" },
]

const NAV_ITEMS = [
  { id:"overview",     label:"Overview",        icon:Home          },
  { id:"appointments", label:"My Appointments", icon:Calendar      },
  { id:"messages",     label:"Messages",        icon:MessageSquare },
  { id:"bulletins",    label:"Health Bulletin", icon:BookOpen      },
  { id:"settings",     label:"Settings",        icon:Settings      },
]

export default function PatientDashboard({ onLogout, onBookAppointment }) {
  const [activeNav, setActiveNav]   = useState("overview")
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [chatInput, setChatInput]   = useState("")
  const [messages, setMessages]     = useState(CHAT_MSGS)

  const upcoming = MY_APPOINTMENTS.filter(a => a.status === "upcoming").length

  const sendMsg = () => {
    if (!chatInput.trim()) return
    setMessages(prev => [...prev, { from:"patient", text:chatInput, time:"Now" }])
    setChatInput("")
    setTimeout(() => {
      setMessages(prev => [...prev, { from:"doctor", text:"Thank you for the update. I'll review and get back to you shortly.", time:"Now" }])
    }, 1500)
  }

  const statusColor = (s) =>
    s === "upcoming"  ? "bg-cyan-100 text-cyan-700"   :
    s === "completed" ? "bg-green-100 text-green-700" :
                        "bg-red-100 text-red-700"

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className={`fixed inset-y-0 left-0 z-40 w-64 bg-gradient-to-b from-gray-900 to-gray-800 text-white flex flex-col transition-transform duration-300 ${sidebarOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0 lg:static lg:flex`}>
        <div className="flex items-center justify-between p-5 border-b border-white/10">
          <div className="flex items-center gap-2.5">
            <div className="flex items-center justify-center w-9 h-9 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-xl">
              <Stethoscope className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-bold leading-none">Smart Doctor</p>
              <p className="text-xs text-gray-400">Patient Panel</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg lg:hidden hover:bg-white/10"><X className="w-4 h-4" /></button>
        </div>
        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <div className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400">
              <User className="w-5 h-5 text-white" />
            </div>
            <div>
              <p className="text-sm font-semibold">John Patient</p>
              <p className="text-xs text-gray-400">Patient Account</p>
            </div>
          </div>
        </div>
        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setActiveNav(id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeNav === id ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg" : "text-gray-400 hover:bg-white/10 hover:text-white"}`}>
              <Icon className="w-4 h-4 shrink-0" /> {label}
            </button>
          ))}
        </nav>
        <div className="p-4 border-t border-white/10">
          <button onClick={onLogout} className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-gray-400 hover:bg-red-500/20 hover:text-red-400 transition-all">
            <LogOut className="w-4 h-4" /> Logout
          </button>
        </div>
      </aside>

      {sidebarOpen && <div className="fixed inset-0 z-30 bg-black/40 lg:hidden" onClick={() => setSidebarOpen(false)} />}

      <div className="flex flex-col flex-1 min-w-0">
        <header className="sticky top-0 z-20 flex items-center justify-between h-16 px-4 bg-white border-b border-gray-200 shadow-sm sm:px-6">
          <div className="flex items-center gap-4">
            <button onClick={() => setSidebarOpen(true)} className="p-2 rounded-lg lg:hidden hover:bg-gray-100"><Menu className="w-5 h-5 text-gray-600" /></button>
            <div>
              <h1 className="text-base font-bold text-gray-900 capitalize">{activeNav === "overview" ? "Dashboard" : activeNav === "bulletins" ? "Health Bulletin" : activeNav}</h1>
              <p className="hidden text-xs text-gray-500 sm:block">Monday, August 3, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="p-2 transition-all rounded-xl hover:bg-gray-100"><Bell className="w-5 h-5 text-gray-600" /></button>
            <div className="flex items-center gap-2 cursor-pointer">
              <div className="flex items-center justify-center w-8 h-8 rounded-full bg-gradient-to-br from-cyan-400 to-teal-400"><User className="w-4 h-4 text-white" /></div>
              <span className="hidden text-sm font-semibold text-gray-700 sm:block">John</span>
              <ChevronDown className="hidden w-4 h-4 text-gray-400 sm:block" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto sm:p-6">

          {activeNav === "overview" && (
            <div className="max-w-5xl mx-auto space-y-6">
              <div className="flex flex-col items-start justify-between gap-4 p-6 text-white bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl sm:flex-row sm:items-center">
                <div>
                  <p className="mb-1 text-sm text-cyan-100">Welcome back,</p>
                  <h2 className="text-2xl font-bold">John Patient</h2>
                  <p className="mt-1 text-sm text-cyan-100">You have <span className="font-bold text-white">{upcoming}</span> upcoming appointment{upcoming !== 1 ? "s" : ""}</p>
                </div>
                <button onClick={onBookAppointment} className="flex items-center gap-2 px-5 py-3 text-sm font-bold transition-all bg-white text-cyan-600 rounded-xl hover:shadow-lg">
                  <Plus className="w-4 h-4" /> Book Appointment
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-3">
                {[
                  { label:"Upcoming",  val:upcoming,                                               color:"from-cyan-50 to-blue-50",   border:"border-cyan-200",   text:"text-cyan-700"   },
                  { label:"Completed", val:MY_APPOINTMENTS.filter(a=>a.status==="completed").length, color:"from-green-50 to-teal-50",  border:"border-green-200",  text:"text-green-700"  },
                  { label:"Bulletins", val:BULLETINS.length,                                        color:"from-purple-50 to-pink-50", border:"border-purple-200", text:"text-purple-700" },
                ].map(({ label, val, color, border, text }) => (
                  <div key={label} className={`bg-gradient-to-br ${color} border ${border} rounded-2xl p-5`}>
                    <p className={`text-3xl font-bold ${text}`}>{val}</p>
                    <p className="mt-1 text-sm text-gray-600">{label}</p>
                  </div>
                ))}
              </div>

              <div className="flex flex-col items-start gap-5 p-5 bg-white border border-gray-200 shadow-sm rounded-2xl sm:flex-row sm:items-center">
                <img src="/doctor.jpeg" alt="Dr." className="object-cover w-16 h-16 border-2 rounded-2xl border-cyan-200" />
                <div className="flex-1">
                  <p className="text-xs text-gray-500 mb-0.5">Your Doctor</p>
                  <h3 className="font-bold text-gray-900">Dr. Ariyan Jawad</h3>
                  <p className="text-sm font-medium text-cyan-600">MBBS, PGT</p>
                  <p className="mt-1 text-xs text-gray-500">General Medicine · Paediatrics · Diabetes · Skin Care</p>
                </div>
                <div className="flex w-full gap-2 sm:w-auto">
                  <button onClick={() => setActiveNav("messages")} className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-cyan-50 border border-cyan-200 text-cyan-700 rounded-xl text-sm font-semibold hover:bg-cyan-100 transition-all">
                    <MessageSquare className="w-4 h-4" /> Chat
                  </button>
                  <button onClick={onBookAppointment} className="flex-1 sm:flex-none flex items-center justify-center gap-1.5 px-4 py-2.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
                    <Calendar className="w-4 h-4" /> Book
                  </button>
                </div>
              </div>

              <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">Upcoming Appointments</h3>
                  <button onClick={() => setActiveNav("appointments")} className="text-sm font-medium text-cyan-600 hover:text-cyan-700">View all</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {MY_APPOINTMENTS.filter(a => a.status === "upcoming").map(apt => (
                    <div key={apt.id} className="flex flex-col justify-between gap-2 px-6 py-4 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-3">
                        <img src="/doctor.jpeg" alt="Dr." className="flex-shrink-0 object-cover w-9 h-9 rounded-xl" />
                        <div>
                          <p className="text-sm font-semibold text-gray-900">Dr. Ariyan Jawad</p>
                          <p className="text-xs text-gray-500">{apt.reason}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 ml-12 sm:ml-0">
                        <span className="flex items-center gap-1 text-xs text-gray-500"><Calendar className="w-3.5 h-3.5" /> {apt.date}</span>
                        <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3.5 h-3.5" /> {apt.time}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${apt.type === "online" ? "bg-blue-100 text-blue-700" : "bg-teal-100 text-teal-700"}`}>{apt.type === "online" ? "Online" : "In-Person"}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">Latest Health Bulletins</h3>
                  <button onClick={() => setActiveNav("bulletins")} className="text-sm font-medium text-cyan-600 hover:text-cyan-700">View all</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {BULLETINS.map(b => (
                    <div key={b.id} className="flex items-center justify-between gap-3 px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl">
                          <Heart className="w-4 h-4 text-cyan-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{b.title}</p>
                          <div className="flex items-center gap-2 mt-0.5">
                            <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${b.tag}`}>{b.category}</span>
                            <span className="text-xs text-gray-400">{b.date}</span>
                          </div>
                        </div>
                      </div>
                      <ChevronRight className="flex-shrink-0 w-4 h-4 text-gray-400" />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeNav === "appointments" && (
            <div className="max-w-3xl mx-auto space-y-4">
              <div className="flex items-center justify-between mb-2">
                <h2 className="text-lg font-bold text-gray-900">My Appointments</h2>
                <button onClick={onBookAppointment} className="flex items-center gap-1.5 px-4 py-2 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl text-sm font-semibold hover:shadow-lg transition-all">
                  <Plus className="w-4 h-4" /> New Booking
                </button>
              </div>
              {MY_APPOINTMENTS.map(apt => (
                <div key={apt.id} className="flex flex-col justify-between gap-4 p-5 bg-white border border-gray-200 shadow-sm rounded-2xl sm:flex-row sm:items-center">
                  <div className="flex items-center gap-4">
                    <img src="/doctor.jpeg" alt="Dr." className="object-cover w-12 h-12 border rounded-2xl border-cyan-200" />
                    <div>
                      <p className="font-bold text-gray-900">Dr. Ariyan Jawad</p>
                      <p className="text-sm text-gray-500">{apt.reason}</p>
                    </div>
                  </div>
                  <div className="flex flex-wrap items-center gap-2 ml-16 sm:ml-0">
                    <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5"><Calendar className="w-3.5 h-3.5 text-gray-400" /> {apt.date}</span>
                    <span className="text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg flex items-center gap-1.5"><Clock className="w-3.5 h-3.5 text-gray-400" /> {apt.time}</span>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${apt.type === "online" ? "bg-blue-100 text-blue-700" : "bg-teal-100 text-teal-700"}`}>{apt.type === "online" ? "Online" : "In-Person"}</span>
                    <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${statusColor(apt.status)}`}>{apt.status}</span>
                  </div>
                </div>
              ))}
            </div>
          )}

          {activeNav === "messages" && (
            <div className="max-w-2xl mx-auto">
              <div className="flex flex-col overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl" style={{height:"calc(100vh - 180px)"}}>
                <div className="flex items-center gap-3 px-5 py-4 border-b border-gray-100 bg-gradient-to-r from-cyan-500 to-teal-500">
                  <img src="/doctor.jpg" alt="Dr." className="object-cover w-10 h-10 border-2 rounded-full border-white/60" />
                  <div>
                    <p className="text-sm font-bold text-white">Dr. Ariyan Jawad</p>
                    <p className="flex items-center gap-1 text-xs text-cyan-100"><span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Online</p>
                  </div>
                </div>
                <div className="flex-1 p-5 space-y-4 overflow-y-auto bg-gray-50/50">
                  {messages.map((m, i) => (
                    <div key={i} className={`flex gap-3 ${m.from === "patient" ? "flex-row-reverse" : ""}`}>
                      {m.from === "doctor"
                        ? <img src="/doctor.jpeg" alt="Dr." className="flex-shrink-0 object-cover w-8 h-8 rounded-full" />
                        : <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-xs font-bold text-white rounded-full bg-gradient-to-br from-cyan-400 to-teal-400">P</div>
                      }
                      <div className={`max-w-xs ${m.from === "patient" ? "items-end" : "items-start"} flex flex-col`}>
                        <div className={`px-4 py-2.5 rounded-2xl text-sm ${m.from === "doctor" ? "bg-white border border-gray-100 text-gray-700 rounded-tl-none" : "bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-tr-none"}`}>
                          {m.text}
                        </div>
                        <p className="px-1 mt-1 text-xs text-gray-400">{m.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex gap-3 p-4 bg-white border-t border-gray-100">
                  <input type="text" placeholder="Type your message..." value={chatInput}
                    onChange={e => setChatInput(e.target.value)} onKeyDown={e => e.key === "Enter" && sendMsg()}
                    className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-gray-50 text-sm text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  />
                  <button onClick={sendMsg} className="flex items-center justify-center w-10 h-10 transition-all shadow-md bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl hover:shadow-lg">
                    <ChevronRight className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {activeNav === "bulletins" && (
            <div className="max-w-3xl mx-auto space-y-4">
              <h2 className="mb-2 text-lg font-bold text-gray-900">Health Bulletins from Dr. Ariyan Jawad</h2>
              {[...BULLETINS, { id:4, title:"Vaccine Schedule for Children 2026", category:"Paediatrics", date:"Jun 15", tag:"bg-pink-100 text-pink-700" }, { id:5, title:"Managing Joint Pain at Home", category:"Rheumatic", date:"Jun 10", tag:"bg-teal-100 text-teal-700" }].map(b => (
                <div key={b.id} className="flex items-center justify-between gap-4 p-5 transition-all bg-white border border-gray-200 shadow-sm cursor-pointer rounded-2xl hover:shadow-md">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center flex-shrink-0 w-11 h-11 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl">
                      <FileText className="w-5 h-5 text-cyan-600" />
                    </div>
                    <div>
                      <p className="text-sm font-bold text-gray-900">{b.title}</p>
                      <div className="flex items-center gap-2 mt-1">
                        <span className={`px-2.5 py-0.5 rounded-full text-xs font-semibold ${b.tag}`}>{b.category}</span>
                        <span className="text-xs text-gray-400">{b.date}</span>
                      </div>
                    </div>
                  </div>
                  <ChevronRight className="flex-shrink-0 w-5 h-5 text-gray-400" />
                </div>
              ))}
            </div>
          )}

          {activeNav === "settings" && (
            <div className="max-w-2xl mx-auto">
              <div className="p-8 text-center bg-white border border-gray-200 shadow-sm rounded-2xl">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-2xl">
                  <Settings className="w-8 h-8 text-cyan-600" />
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900">Settings</h3>
                <p className="mb-6 text-sm text-gray-500">Manage your account, notifications, and preferences.</p>
                <button className="px-6 py-3 font-semibold text-white transition-all bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl hover:shadow-lg">Edit Profile</button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
