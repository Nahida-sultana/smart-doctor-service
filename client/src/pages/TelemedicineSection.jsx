import { MessageSquare, Clock, Shield, Wifi, ChevronRight, Phone } from "lucide-react"

export default function TelemedicineSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="text-center mb-14">
          <span className="inline-block px-4 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-white/50 text-sm text-cyan-600 mb-4">Remote Healthcare</span>
          <h2 className="mb-4 text-4xl font-bold text-gray-900 md:text-5xl">
            Consult from <span className="text-transparent bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text">Anywhere</span>
          </h2>
          <p className="max-w-xl mx-auto text-gray-500">Get expert medical advice from Dr. Ariyan Jawad through secure online chat — no travel needed.</p>
        </div>

        <div className="grid items-center gap-12 mb-16 lg:grid-cols-2">
          <div className="relative">
            <div className="absolute w-64 h-64 rounded-full -top-6 -left-6 bg-cyan-300/20 blur-3xl" />
            <div className="absolute w-64 h-64 rounded-full -bottom-6 -right-6 bg-teal-300/20 blur-3xl" />
            <div className="relative overflow-hidden border shadow-2xl backdrop-blur-md bg-white/60 rounded-3xl border-white/60">
              <div className="flex items-center gap-4 p-5 bg-gradient-to-r from-cyan-500 to-teal-500">
                <div className="relative">
                  <img src="/doctor.jpg" alt="Dr. Ariyan Jawad" className="object-cover w-12 h-12 border-2 rounded-full border-white/60" />
                  <span className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-400 border-2 border-white rounded-full" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-white">Dr. Ariyan Jawad</p>
                  <p className="flex items-center gap-1 text-xs text-cyan-100"><span className="w-1.5 h-1.5 bg-green-400 rounded-full" /> Online Now</p>
                </div>
                <div className="flex items-center justify-center w-9 h-9 bg-white/20 rounded-xl">
                  <Phone className="w-4 h-4 text-white" />
                </div>
              </div>

              <div className="p-5 space-y-4 bg-gradient-to-b from-cyan-50/50 to-white/80 min-h-72">
                <div className="flex gap-3">
                  <img src="/doctor.jpg" alt="Dr." className="flex-shrink-0 object-cover w-8 h-8 rounded-full" />
                  <div className="max-w-xs">
                    <div className="bg-white rounded-2xl rounded-tl-none p-3.5 shadow-sm border border-gray-100">
                      <p className="text-sm text-gray-700">Hello! I'm Dr. Ariyan Jawad. How can I help you today?</p>
                    </div>
                    <p className="mt-1 ml-1 text-xs text-gray-400">10:00 AM</p>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-xs font-bold text-white rounded-full bg-gradient-to-br from-cyan-400 to-teal-400">P</div>
                  <div className="max-w-xs">
                    <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl rounded-tr-none p-3.5 shadow-sm">
                      <p className="text-sm text-white">I've been having headaches and fever for 2 days.</p>
                    </div>
                    <p className="mt-1 mr-1 text-xs text-right text-gray-400">10:02 AM</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <img src="/doctor.jpg" alt="Dr." className="flex-shrink-0 object-cover w-8 h-8 rounded-full" />
                  <div className="max-w-xs">
                    <div className="bg-white rounded-2xl rounded-tl-none p-3.5 shadow-sm border border-gray-100">
                      <p className="text-sm text-gray-700">I see. Can you tell me your temperature reading and any other symptoms?</p>
                    </div>
                    <p className="mt-1 ml-1 text-xs text-gray-400">10:04 AM</p>
                  </div>
                </div>
                <div className="flex flex-row-reverse gap-3">
                  <div className="flex items-center justify-center flex-shrink-0 w-8 h-8 text-xs font-bold text-white rounded-full bg-gradient-to-br from-cyan-400 to-teal-400">P</div>
                  <div className="max-w-xs">
                    <div className="bg-gradient-to-r from-cyan-500 to-teal-500 rounded-2xl rounded-tr-none p-3.5 shadow-sm">
                      <p className="text-sm text-white">Temperature is 101°F, also feeling body aches.</p>
                    </div>
                    <p className="mt-1 mr-1 text-xs text-right text-gray-400">10:05 AM</p>
                  </div>
                </div>
                <div className="flex gap-3">
                  <img src="/doctor.jpg" alt="Dr." className="flex-shrink-0 object-cover w-8 h-8 rounded-full" />
                  <div className="flex items-center gap-1 px-4 py-3 bg-white border border-gray-100 rounded-tl-none shadow-sm rounded-2xl">
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{animationDelay:"0ms"}} />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{animationDelay:"150ms"}} />
                    <span className="w-2 h-2 rounded-full bg-cyan-400 animate-bounce" style={{animationDelay:"300ms"}} />
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3 p-4 bg-white border-t border-gray-100">
                <div className="flex-1 bg-gray-50 rounded-xl px-4 py-2.5 text-sm text-gray-400 border border-gray-100">Type your message...</div>
                <button className="flex items-center justify-center w-10 h-10 shadow-md bg-gradient-to-r from-cyan-500 to-teal-500 rounded-xl">
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-2 border rounded-full backdrop-blur-sm bg-white/60 border-white/40">
              <MessageSquare className="w-4 h-4 text-cyan-600" />
              <span className="text-sm text-cyan-600">Secure & Private</span>
            </div>
            <h3 className="text-4xl font-bold text-gray-900">Healthcare at Your <br /><span className="text-transparent bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text">Fingertips</span></h3>
            <p className="leading-relaxed text-gray-500">Connect instantly with Dr. Ariyan Jawad through our secure chat platform. Share your symptoms, get prescriptions, and receive expert advice — all from home.</p>
            <div className="space-y-4">
              {[
                { icon: MessageSquare, title: "Live Chat Consultation", desc: "Real-time messaging with your doctor for instant medical advice", color: "from-cyan-100 to-teal-100", iconColor: "text-cyan-600" },
                { icon: Clock, title: "Flexible Timing", desc: "Schedule chat sessions at your convenience, morning or afternoon", color: "from-blue-100 to-cyan-100", iconColor: "text-blue-600" },
                { icon: Shield, title: "100% Confidential", desc: "Your health data and conversations are fully encrypted and private", color: "from-teal-100 to-green-100", iconColor: "text-teal-600" },
                { icon: Wifi, title: "Works on Any Device", desc: "Access from mobile, tablet or desktop — no app download needed", color: "from-purple-100 to-pink-100", iconColor: "text-purple-600" },
              ].map(({ icon: Icon, title, desc, color, iconColor }) => (
                <div key={title} className="flex items-start gap-4 p-4 transition-all border backdrop-blur-sm bg-white/50 rounded-2xl border-white/60 hover:shadow-md">
                  <div className={`w-12 h-12 bg-gradient-to-br ${color} rounded-xl flex items-center justify-center flex-shrink-0`}>
                    <Icon className={`w-6 h-6 ${iconColor}`} />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-0.5">{title}</h4>
                    <p className="text-sm text-gray-500">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
            <button className="px-8 py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center gap-2">
              Start Chat Consultation <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
