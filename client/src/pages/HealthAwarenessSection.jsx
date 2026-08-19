import { useState, useRef } from "react"
import { BookOpen, Activity, Baby, Syringe, Heart, Brain, Plus, X, Upload,  ChevronRight, Eye, Trash2 } from "lucide-react"

const CATEGORY_OPTIONS = [
  { label: "General Health",      icon: BookOpen, color: "from-blue-100 to-cyan-100",     iconColor: "text-cyan-600",   tag: "bg-cyan-100 text-cyan-700"   },
  { label: "Infectious Diseases", icon: Activity, color: "from-red-100 to-pink-100",      iconColor: "text-red-500",    tag: "bg-red-100 text-red-700"     },
  { label: "Children Health",     icon: Baby,     color: "from-pink-100 to-purple-100",   iconColor: "text-pink-500",   tag: "bg-pink-100 text-pink-700"   },
  { label: "Vaccine Info",        icon: Syringe,  color: "from-teal-100 to-green-100",    iconColor: "text-teal-600",   tag: "bg-teal-100 text-teal-700"   },
  { label: "Heart Health",        icon: Heart,    color: "from-rose-100 to-red-100",      iconColor: "text-rose-500",   tag: "bg-rose-100 text-rose-700"   },
  { label: "Mental Wellness",     icon: Brain,    color: "from-violet-100 to-purple-100", iconColor: "text-violet-500", tag: "bg-violet-100 text-violet-700" },
]

const DEFAULT_ITEMS = [
  { id: 1, title: "Hand Hygiene Saves Lives", description: "Washing hands regularly with soap for at least 20 seconds is one of the most effective ways to prevent the spread of infections and diseases.", category: "General Health", imageUrl: "https://images.unsplash.com/photo-1584432810601-6c7f27d2362b?w=400&q=80", iconIdx: 0, postedBy: "Dr. Ariyan Jawad", date: "June 28, 2026", tag: "bg-cyan-100 text-cyan-700" },
  { id: 2, title: "Dengue Fever Prevention", description: "Eliminate standing water around your home, use mosquito repellents, and wear long sleeves to protect yourself from dengue-carrying mosquitoes.", category: "Infectious Diseases", imageUrl: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&q=80", iconIdx: 1, postedBy: "Dr. Ariyan Jawad", date: "June 25, 2026", tag: "bg-red-100 text-red-700" },
  { id: 3, title: "Child Vaccination Schedule", description: "Following the recommended vaccination schedule protects children from serious diseases. Consult your doctor to ensure your child is up to date with all vaccines.", category: "Children Health", imageUrl: "https://images.unsplash.com/photo-1536064479547-7ee40b74b807?w=400&q=80", iconIdx: 2, postedBy: "Dr. Ariyan Jawad", date: "June 20, 2026", tag: "bg-pink-100 text-pink-700" },
  { id: 4, title: "Diabetes Management Tips", description: "Regular blood sugar monitoring, a balanced diet, and consistent exercise are key pillars of effective diabetes management for long-term health.", category: "General Health", imageUrl: "https://images.unsplash.com/photo-1532938911079-1b06ac7ceec7?w=400&q=80", iconIdx: 4, postedBy: "Dr. Ariyan Jawad", date: "June 15, 2026", tag: "bg-cyan-100 text-cyan-700" },
]

function getCategoryStyle(cat) {
  return CATEGORY_OPTIONS.find(c => c.label === cat) ?? CATEGORY_OPTIONS[0]
}

export default function HealthAwarenessSection() {
  const [items, setItems]           = useState(DEFAULT_ITEMS)
  const [showModal, setShowModal]   = useState(false)
  const [preview, setPreview]       = useState(null)
  const [imgPreview, setImgPreview] = useState("")
  const [formError, setFormError]   = useState("")
  const fileRef = useRef(null)

  const [form, setForm] = useState({
    title: "", category: CATEGORY_OPTIONS[0].label, description: "", imageUrl: "",
  })

  const handleImageFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const url = ev.target.result
      setImgPreview(url)
      setForm(f => ({ ...f, imageUrl: url }))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (!form.title.trim())       { setFormError("Title is required"); return }
    if (!form.description.trim()) { setFormError("Description is required"); return }
    const style = getCategoryStyle(form.category)
    const newItem = {
      id: Date.now(),
      title: form.title,
      description: form.description,
      category: form.category,
      imageUrl: form.imageUrl || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=400&q=80",
      iconIdx: CATEGORY_OPTIONS.findIndex(c => c.label === form.category),
      postedBy: "Dr. Ariyan Jawad",
      date: new Date().toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric" }),
      tag: style.tag,
    }
    setItems(prev => [newItem, ...prev])
    setShowModal(false)
    setForm({ title: "", category: CATEGORY_OPTIONS[0].label, description: "", imageUrl: "" })
    setImgPreview("")
    setFormError("")
  }

  const deleteItem = (id) => setItems(prev => prev.filter(i => i.id !== id))

  return (
    <section id="health-info" className="px-4 py-20 sm:px-6 lg:px-8 bg-gradient-to-br from-white/50 to-teal-50/60">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 mb-12 md:flex-row md:items-end">
          <div>
            <span className="inline-block px-4 py-1.5 bg-white/70 backdrop-blur-sm rounded-full border border-white/50 text-sm text-teal-600 mb-3">Stay Informed</span>
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">Health <span className="text-transparent bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text">Awareness</span></h2>
            <p className="mt-2 text-gray-500">Expert health knowledge shared by Dr. Ariyan Jawad</p>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex-shrink-0">
            <Plus className="w-5 h-5" /> Upload Awareness Post
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-10">
          {["All", ...CATEGORY_OPTIONS.map(c => c.label)].map(cat => (
            <span key={cat} className="px-4 py-1.5 bg-white/70 backdrop-blur-sm rounded-full border border-white/60 text-sm text-gray-600 hover:bg-cyan-50 hover:text-cyan-600 hover:border-cyan-200 cursor-pointer transition-all">{cat}</span>
          ))}
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {items.map(item => {
            const style = getCategoryStyle(item.category)
            const Icon = style.icon
            return (
              <div key={item.id} className="overflow-hidden transition-all border shadow-lg group backdrop-blur-md bg-white/60 rounded-2xl border-white/60 hover:shadow-2xl hover:-translate-y-1">
                <div className="relative h-40 overflow-hidden">
                  <img src={item.imageUrl} alt={item.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
                  <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${item.tag}`}>{item.category}</span>
                  <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button onClick={() => setPreview(item)} className="flex items-center justify-center rounded-lg w-7 h-7 bg-white/90 hover:bg-cyan-50">
                      <Eye className="w-3.5 h-3.5 text-gray-600" />
                    </button>
                    <button onClick={() => deleteItem(item.id)} className="flex items-center justify-center rounded-lg w-7 h-7 bg-white/90 hover:bg-red-50">
                      <Trash2 className="w-3.5 h-3.5 text-red-500" />
                    </button>
                  </div>
                </div>
                <div className="p-5">
                  <div className={`w-10 h-10 bg-gradient-to-br ${style.color} rounded-xl flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
                    <Icon className={`w-5 h-5 ${style.iconColor}`} />
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1.5 line-clamp-2">{item.title}</h3>
                  <p className="mb-3 text-xs leading-relaxed text-gray-500 line-clamp-3">{item.description}</p>
                  <div className="flex items-center justify-between">
                    <p className="text-xs text-gray-400">{item.date}</p>
                    <button className="text-cyan-600 hover:text-cyan-700 text-xs font-semibold flex items-center gap-0.5">Read <ChevronRight className="w-3 h-3" /></button>
                  </div>
                </div>
              </div>
            )
          })}
        </div>
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/40 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-xl max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/90 rounded-3xl border border-white/60 shadow-2xl">
            <div className="sticky top-0 flex items-center justify-between px-6 py-5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-t-3xl">
              <div>
                <h3 className="text-xl font-bold text-white">Upload Health Awareness</h3>
                <p className="text-sm text-cyan-100">Share important health information</p>
              </div>
              <button onClick={() => setShowModal(false)} className="flex items-center justify-center transition-all w-9 h-9 bg-white/20 rounded-xl hover:bg-white/30">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6 space-y-5">
              {formError && (
                <div className="flex items-center gap-2 px-4 py-3 text-sm text-red-600 border border-red-200 bg-red-50 rounded-xl">
                  <X className="w-4 h-4" /> {formError}
                </div>
              )}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title *</label>
                <input type="text" placeholder="e.g. Why Hand Hygiene Matters" value={form.title}
                  onChange={e => { setForm(f => ({...f, title: e.target.value})); setFormError("") }}
                  className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 border border-gray-200 outline-none rounded-xl bg-white/80 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">Category *</label>
                <div className="grid grid-cols-2 gap-2">
                  {CATEGORY_OPTIONS.map(opt => (
                    <button key={opt.label} onClick={() => setForm(f => ({...f, category: opt.label}))}
                      className={`px-3 py-2.5 rounded-xl border-2 text-sm font-medium text-left transition-all flex items-center gap-2 ${form.category === opt.label ? "border-cyan-500 bg-cyan-50 text-cyan-700" : "border-gray-200 bg-white/60 text-gray-600 hover:border-cyan-300"}`}>
                      <span className={`text-xs px-2 py-0.5 rounded-full ${opt.tag}`}>{opt.label}</span>
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Description *</label>
                <textarea rows={4} placeholder="Write the health awareness content here..." value={form.description}
                  onChange={e => { setForm(f => ({...f, description: e.target.value})); setFormError("") }}
                  className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 border border-gray-200 outline-none resize-none rounded-xl bg-white/80 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Cover Image (optional)</label>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
                {imgPreview ? (
                  <div className="relative h-40 overflow-hidden rounded-xl">
                    <img src={imgPreview} alt="preview" className="object-cover w-full h-full" />
                    <button onClick={() => { setImgPreview(""); setForm(f => ({...f, imageUrl: ""})) }}
                      className="absolute flex items-center justify-center w-8 h-8 transition-all rounded-lg top-2 right-2 bg-black/50 hover:bg-red-500">
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => fileRef.current?.click()}
                    className="flex flex-col items-center justify-center w-full h-32 gap-2 transition-all border-2 border-dashed border-cyan-300 rounded-xl hover:bg-cyan-50 hover:border-cyan-400 group">
                    <div className="flex items-center justify-center w-10 h-10 transition-transform bg-cyan-100 rounded-xl group-hover:scale-110">
                      <Upload className="w-5 h-5 text-cyan-600" />
                    </div>
                    <p className="text-sm text-gray-500">Click to upload image</p>
                    <p className="text-xs text-gray-400">PNG, JPG up to 5MB</p>
                  </button>
                )}
              </div>
              <button onClick={handleSubmit} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2">
                <Upload className="w-5 h-5" /> Publish Awareness Post
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setPreview(null)} />
          <div className="relative w-full max-w-lg overflow-hidden border shadow-2xl backdrop-blur-xl bg-white/95 rounded-3xl border-white/60">
            <img src={preview.imageUrl} alt={preview.title} className="object-cover w-full h-52" />
            <button onClick={() => setPreview(null)} className="absolute flex items-center justify-center transition-all top-4 right-4 w-9 h-9 bg-black/40 rounded-xl hover:bg-black/60">
              <X className="w-5 h-5 text-white" />
            </button>
            <div className="p-6">
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${preview.tag}`}>{preview.category}</span>
              <h3 className="mt-3 mb-3 text-xl font-bold text-gray-900">{preview.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">{preview.description}</p>
              <div className="flex items-center justify-between pt-4 text-xs text-gray-400 border-t border-gray-100">
                <span>Posted by <span className="font-semibold text-cyan-600">{preview.postedBy}</span></span>
                <span>{preview.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}