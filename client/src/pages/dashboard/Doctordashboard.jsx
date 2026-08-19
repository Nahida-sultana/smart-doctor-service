import { useState } from "react"
import { Stethoscope, Calendar, MessageSquare, Bell, LogOut, Menu, X, User, Clock, Check, ChevronRight, BookOpen, Activity, Plus, FileText, Home, Settings, ChevronDown } from "lucide-react"

const TODAY_APPOINTMENTS = [
  { id:1, name:"Rafi Hossain",  age:34, time:"09:00 AM", type:"in-person", status:"completed", reason:"Fever & headache"     },
  { id:2, name:"Nadia Islam",   age:27, time:"10:00 AM", type:"online",    status:"completed", reason:"Diabetes follow-up"   },
  { id:3, name:"Karim Uddin",   age:52, time:"11:30 AM", type:"in-person", status:"confirmed", reason:"Joint pain"           },
  { id:4, name:"Tania Begum",   age:19, time:"02:00 PM", type:"online",    status:"confirmed", reason:"Skin rash"            },
  { id:5, name:"Sumon Ahmed",   age:45, time:"03:30 PM", type:"in-person", status:"pending",   reason:"General checkup"      },
]

const MESSAGES = [
  { id:1, name:"Rafi Hossain", msg:"Doctor, should I take the medicine before or after food?",  time:"10:15 AM", unread:true  },
  { id:2, name:"Nadia Islam",  msg:"My sugar level is 8.2 this morning. Is that okay?",          time:"09:40 AM", unread:true  },
  { id:3, name:"Tania Begum",  msg:"The rash has improved a lot! Thank you doctor.",             time:"Yesterday", unread:false },
  { id:4, name:"Karim Uddin",  msg:"Can I reschedule my appointment to next week?",              time:"Yesterday", unread:false },
]

const NAV_ITEMS = [
  { id:"overview",     label:"Overview",        icon:Home         },
  { id:"appointments", label:"Appointments",    icon:Calendar     },
  { id:"messages",     label:"Messages",        icon:MessageSquare },
  { id:"bulletins",    label:"Health Bulletin", icon:BookOpen     },
  { id:"awareness",    label:"Awareness",       icon:Activity     },
  { id:"settings",     label:"Settings",        icon:Settings     },
]

export default function DoctorDashboard({ onLogout }) {
  const [activeNav, setActiveNav]       = useState("overview")
  const [sidebarOpen, setSidebarOpen]   = useState(false)
  const [appointments, setAppointments] = useState(TODAY_APPOINTMENTS)

  const confirmed = appointments.filter(a => a.status === "confirmed").length
  const pending   = appointments.filter(a => a.status === "pending").length
  const completed = appointments.filter(a => a.status === "completed").length
  const unread    = MESSAGES.filter(m => m.unread).length

  const markDone = (id) => setAppointments(prev => prev.map(a => a.id === id ? {...a, status:"completed"} : a))

  const statusColor = (s) =>
    s === "completed" ? "bg-green-100 text-green-700" :
    s === "confirmed" ? "bg-cyan-100 text-cyan-700"   :
                        "bg-yellow-100 text-yellow-700"

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
              <p className="text-xs text-gray-400">Doctor Panel</p>
            </div>
          </div>
          <button onClick={() => setSidebarOpen(false)} className="p-1 rounded-lg lg:hidden hover:bg-white/10"><X className="w-4 h-4" /></button>
        </div>

        <div className="p-4 border-b border-white/10">
          <div className="flex items-center gap-3">
            <img src="/doctor.jpeg" alt="Dr." className="object-cover w-10 h-10 border-2 rounded-full border-cyan-400" />
            <div>
              <p className="text-sm font-semibold">Dr. Ariyan Jawad</p>
              <p className="text-xs text-gray-400">MBBS, PGT</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => { setActiveNav(id); setSidebarOpen(false) }}
              className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${activeNav === id ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-lg" : "text-gray-400 hover:bg-white/10 hover:text-white"}`}>
              <Icon className="w-4 h-4 -shrink-0" /> {label}
              {id === "messages" && unread > 0 && <span className="flex items-center justify-center w-5 h-5 ml-auto text-xs text-white bg-red-500 rounded-full">{unread}</span>}
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
              <h1 className="text-base font-bold text-gray-900 capitalize">{activeNav === "overview" ? "Dashboard" : activeNav}</h1>
              <p className="hidden text-xs text-gray-500 sm:block">Monday, August 3, 2026</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button className="relative p-2 transition-all rounded-xl hover:bg-gray-100">
              <Bell className="w-5 h-5 text-gray-600" />
              {unread > 0 && <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-red-500 rounded-full" />}
            </button>
            <div className="flex items-center gap-2 cursor-pointer">
              <img src="/doctor.jpeg" alt="Dr." className="object-cover w-8 h-8 rounded-full" />
              <span className="hidden text-sm font-semibold text-gray-700 sm:block">Dr. Ariyan</span>
              <ChevronDown className="hidden w-4 h-4 text-gray-400 sm:block" />
            </div>
          </div>
        </header>

        <main className="flex-1 p-4 overflow-y-auto sm:p-6">

          {activeNav === "overview" && (
            <div className="max-w-6xl mx-auto space-y-6">
              <div className="flex flex-col items-start justify-between gap-4 p-6 text-white bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl sm:flex-row sm:items-center">
                <div>
                  <p className="mb-1 text-sm text-cyan-100">Good morning,</p>
                  <h2 className="text-2xl font-bold">Dr. Ariyan Jawad</h2>
                  <p className="mt-1 text-sm text-cyan-100">You have <span className="font-bold text-white">{confirmed}</span> upcoming appointments today</p>
                </div>
                <button onClick={() => setActiveNav("appointments")} className="flex items-center gap-2 px-4 py-2.5 bg-white/20 hover:bg-white/30 rounded-xl text-sm font-semibold transition-all">
                  View Schedule <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
                {[
                  { label:"Today's Confirmed", val:confirmed, color:"from-cyan-50 to-blue-50",   border:"border-cyan-200",   text:"text-cyan-700"   },
                  { label:"Pending",           val:pending,   color:"from-yellow-50 to-orange-50",border:"border-yellow-200", text:"text-yellow-700" },
                  { label:"Completed Today",   val:completed, color:"from-green-50 to-teal-50",  border:"border-green-200",  text:"text-green-700"  },
                  { label:"Unread Messages",   val:unread,    color:"from-purple-50 to-pink-50", border:"border-purple-200", text:"text-purple-700" },
                ].map(({ label, val, color, border, text }) => (
                  <div key={label} className={`bg-gradient-to-br ${color} border ${border} rounded-2xl p-5`}>
                    <p className={`text-3xl font-bold ${text}`}>{val}</p>
                    <p className="mt-1 text-sm text-gray-600">{label}</p>
                  </div>
                ))}
              </div>

              <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
                <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
                  <h3 className="font-bold text-gray-900">Today's Appointments</h3>
                  <button onClick={() => setActiveNav("appointments")} className="text-sm font-medium text-cyan-600 hover:text-cyan-700">View all</button>
                </div>
                <div className="divide-y divide-gray-50">
                  {appointments.slice(0,4).map(apt => (
                    <div key={apt.id} className="flex flex-col justify-between gap-3 px-6 py-4 sm:flex-row sm:items-center sm:gap-0">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center flex-shrink-0 w-9 h-9 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl">
                          <User className="w-4 h-4 text-cyan-600" />
                        </div>
                        <div>
                          <p className="text-sm font-semibold text-gray-900">{apt.name}</p>
                          <p className="text-xs text-gray-500">{apt.reason} · Age {apt.age}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3 ml-12 sm:ml-0">
                        <span className="flex items-center gap-1 text-xs text-gray-500"><Clock className="w-3.5 h-3.5" /> {apt.time}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${apt.type === "online" ? "bg-blue-100 text-blue-700" : "bg-teal-100 text-teal-700"}`}>{apt.type === "online" ? "Online" : "In-Person"}</span>
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${statusColor(apt.status)}`}>{apt.status}</span>
                        {apt.status !== "completed" && (
                          <button onClick={() => markDone(apt.id)} className="p-1.5 bg-green-100 hover:bg-green-200 rounded-lg transition-all">
                            <Check className="w-3.5 h-3.5 text-green-600" />
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="p-5 bg-white border border-gray-200 shadow-sm rounded-2xl">
                  <h3 className="mb-4 font-bold text-gray-900">Quick Actions</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {[
                      { icon:Plus,          label:"Upload Bulletin",  action:() => setActiveNav("bulletins"),    color:"from-cyan-500 to-teal-500" },
                      { icon:Activity,      label:"Upload Awareness", action:() => setActiveNav("awareness"),    color:"from-teal-500 to-green-500" },
                      { icon:Calendar,      label:"Appointments",     action:() => setActiveNav("appointments"), color:"from-blue-500 to-cyan-500" },
                      { icon:MessageSquare, label:"Messages",         action:() => setActiveNav("messages"),     color:"from-purple-500 to-pink-500" },
                    ].map(({ icon: Icon, label, action, color }) => (
                      <button key={label} onClick={action} className={`bg-gradient-to-br ${color} text-white p-4 rounded-xl font-semibold text-sm flex flex-col items-center gap-2 hover:shadow-md hover:-translate-y-0.5 transition-all`}>
                        <Icon className="w-5 h-5" /> {label}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
                  <div className="flex items-center justify-between px-5 py-4 border-b border-gray-100">
                    <h3 className="font-bold text-gray-900">Recent Messages</h3>
                    <button onClick={() => setActiveNav("messages")} className="text-sm font-medium text-cyan-600 hover:text-cyan-700">View all</button>
                  </div>
                  <div className="divide-y divide-gray-50">
                    {MESSAGES.slice(0,3).map(m => (
                      <div key={m.id} className={`px-5 py-3.5 flex gap-3 ${m.unread ? "bg-cyan-50/50" : ""}`}>
                        <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 rounded-full bg-gradient-to-br from-cyan-100 to-teal-100">
                          <User className="w-4 h-4 text-cyan-600" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between">
                            <p className="text-sm font-semibold text-gray-900">{m.name}</p>
                            <p className="text-xs text-gray-400">{m.time}</p>
                          </div>
                          <p className="text-xs text-gray-500 truncate mt-0.5">{m.msg}</p>
                        </div>
                        {m.unread && <div className="flex-shrink-0 w-2 h-2 mt-2 rounded-full bg-cyan-500" />}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeNav === "appointments" && (
            <div className="max-w-4xl mx-auto">
              <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
                <div className="flex flex-wrap items-center justify-between gap-3 px-6 py-5 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">All Appointments — Today</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {appointments.map(apt => (
                    <div key={apt.id} className="flex flex-col justify-between gap-3 px-6 py-4 sm:flex-row sm:items-center">
                      <div className="flex items-center gap-4">
                        <div className="flex items-center justify-center flex-shrink-0 w-10 h-10 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-xl">
                          <User className="w-5 h-5 text-cyan-600" />
                        </div>
                        <div>
                          <p className="font-bold text-gray-900">{apt.name}</p>
                          <p className="text-sm text-gray-500">{apt.reason} · Age {apt.age}</p>
                        </div>
                      </div>
                      <div className="flex flex-wrap items-center gap-2 ml-14 sm:ml-0">
                        <span className="flex items-center gap-1 text-sm text-gray-600 bg-gray-50 px-3 py-1.5 rounded-lg"><Clock className="w-3.5 h-3.5 text-gray-400" /> {apt.time}</span>
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${apt.type === "online" ? "bg-blue-100 text-blue-700" : "bg-teal-100 text-teal-700"}`}>{apt.type === "online" ? "Online" : "In-Person"}</span>
                        <span className={`px-3 py-1.5 rounded-lg text-xs font-bold ${statusColor(apt.status)}`}>{apt.status}</span>
                        {apt.status !== "completed" && (
                          <button onClick={() => markDone(apt.id)} className="flex items-center gap-1 px-3 py-1.5 bg-green-100 hover:bg-green-200 text-green-700 text-xs font-bold rounded-lg transition-all">
                            <Check className="w-3.5 h-3.5" /> Mark Done
                          </button>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeNav === "messages" && (
            <div className="max-w-2xl mx-auto">
              <div className="overflow-hidden bg-white border border-gray-200 shadow-sm rounded-2xl">
                <div className="px-6 py-5 border-b border-gray-100">
                  <h3 className="text-lg font-bold text-gray-900">Patient Messages</h3>
                </div>
                <div className="divide-y divide-gray-100">
                  {MESSAGES.map(m => (
                    <div key={m.id} className={`px-6 py-4 flex gap-4 hover:bg-gray-50 cursor-pointer transition-all ${m.unread ? "bg-cyan-50/40" : ""}`}>
                      <div className="flex items-center justify-center flex-shrink-0 rounded-full w-11 h-11 bg-gradient-to-br from-cyan-100 to-teal-100">
                        <User className="w-5 h-5 text-cyan-600" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <p className="font-bold text-gray-900">{m.name}</p>
                          <div className="flex items-center gap-2">
                            <p className="text-xs text-gray-400">{m.time}</p>
                            {m.unread && <div className="w-2.5 h-2.5 bg-cyan-500 rounded-full" />}
                          </div>
                        </div>
                        <p className="text-sm text-gray-500">{m.msg}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {["bulletins","awareness","settings"].includes(activeNav) && (
            <div className="max-w-2xl mx-auto">
              <div className="p-12 text-center bg-white border border-gray-200 shadow-sm rounded-2xl">
                <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-cyan-100 to-teal-100 rounded-2xl">
                  {activeNav === "bulletins" && <FileText className="w-8 h-8 text-cyan-600" />}
                  {activeNav === "awareness" && <Activity className="w-8 h-8 text-teal-600" />}
                  {activeNav === "settings"  && <Settings className="w-8 h-8 text-gray-500" />}
                </div>
                <h3 className="mb-2 text-xl font-bold text-gray-900 capitalize">{activeNav}</h3>
                <p className="mb-6 text-sm text-gray-500">
                  {activeNav === "bulletins" && "Upload and manage health bulletins for patients."}
                  {activeNav === "awareness" && "Share health awareness content with patients."}
                  {activeNav === "settings"  && "Manage your account, profile, and preferences."}
                </p>
                <button className="inline-flex items-center gap-2 px-6 py-3 font-semibold text-white transition-all bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl hover:shadow-lg">
                  <Plus className="w-4 h-4" />
                  {activeNav === "settings" ? "Edit Profile" : `Upload ${activeNav === "bulletins" ? "Bulletin" : "Awareness"}`}
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  )
}
