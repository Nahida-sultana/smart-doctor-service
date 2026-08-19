import { useState, useRef } from "react"
import {
  Plus, X, Upload, Image as ImageIcon, FileText, 
  ChevronRight, Eye, Trash2, Video, Lightbulb, Newspaper,
   Clock, User,
} from "lucide-react"

const UPLOAD_TYPES = [
  { id: "article",     label: "Article",     icon: Newspaper, color: "from-cyan-100 to-blue-100",    iconColor: "text-cyan-600",   tag: "bg-cyan-100 text-cyan-700",    desc: "Write a detailed health article" },
  { id: "video",       label: "Video Link",  icon: Video,     color: "from-red-100 to-pink-100",     iconColor: "text-red-500",    tag: "bg-red-100 text-red-700",      desc: "Share a YouTube/video link" },
  { id: "tips",        label: "Health Tips", icon: Lightbulb, color: "from-yellow-100 to-orange-100",iconColor: "text-yellow-600", tag: "bg-yellow-100 text-yellow-700", desc: "Quick tips and advice" },
  { id: "infographic", label: "Infographic", icon: ImageIcon, color: "from-teal-100 to-green-100",   iconColor: "text-teal-600",   tag: "bg-teal-100 text-teal-700",    desc: "Upload an image/infographic" },
]

const CATEGORIES = ["General Medicine","Paediatrics","Diabetes","Skin Care","Rheumatic","Mental Health","Nutrition","Seasonal"]

const TYPE_CONFIG = {
  article:     { icon: Newspaper, label: "Article",     color: "from-cyan-100 to-blue-100",     iconColor: "text-cyan-600",   tag: "bg-cyan-100 text-cyan-700"     },
  video:       { icon: Video,     label: "Video",       color: "from-red-100 to-pink-100",      iconColor: "text-red-500",    tag: "bg-red-100 text-red-700"       },
  tips:        { icon: Lightbulb, label: "Tips",        color: "from-yellow-100 to-orange-100", iconColor: "text-yellow-600", tag: "bg-yellow-100 text-yellow-700" },
  infographic: { icon: ImageIcon, label: "Infographic", color: "from-teal-100 to-green-100",    iconColor: "text-teal-600",   tag: "bg-teal-100 text-teal-700"     },
}

const DEFAULT_BULLETINS = [
  { id:1, type:"article",     title:"Seasonal Flu Prevention Guide 2026",       excerpt:"This flu season, protect yourself and your family with these evidence-based prevention strategies. Early vaccination, proper hygiene, and staying warm are key.", category:"General Medicine", imageUrl:"https://images.unsplash.com/photo-1584515933487-779824d29309?w=500&q=80", date:"June 28, 2026", readTime:"5 min read", author:"Dr. Ariyan Jawad" },
  { id:2, type:"tips",        title:"10 Daily Habits for Heart Health",          excerpt:"Small daily changes can have a huge impact on your cardiovascular health. Here are 10 simple habits to start today for a healthier heart.", category:"General Medicine", imageUrl:"https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=500&q=80", tips:["Walk 30 minutes daily","Eat more fruits & vegetables","Reduce salt intake","Quit smoking","Manage stress"], date:"June 25, 2026", readTime:"3 min read", author:"Dr. Ariyan Jawad" },
  { id:3, type:"article",     title:"Understanding Diabetes: Type 1 vs Type 2", excerpt:"Diabetes affects millions worldwide. Understanding the difference between Type 1 and Type 2 can help you take better control of your health and treatment.", category:"Diabetes",         imageUrl:"https://images.unsplash.com/photo-1579154204601-01588f351e67?w=500&q=80", date:"June 20, 2026", readTime:"7 min read", author:"Dr. Ariyan Jawad" },
  { id:4, type:"infographic", title:"Skin Care Routine for All Ages",            excerpt:"A comprehensive visual guide to building a daily skin care routine suitable for every age group — from teens to seniors.", category:"Skin Care",         imageUrl:"https://images.unsplash.com/photo-1616394584738-fc6e612e71b9?w=500&q=80", date:"June 15, 2026", readTime:"2 min read", author:"Dr. Ariyan Jawad" },
  { id:5, type:"video",       title:"Child Immunization — What Parents Need to Know", excerpt:"Watch this informative video on childhood immunization schedules, common vaccine myths, and how to prepare your child for vaccination visits.", category:"Paediatrics", imageUrl:"https://images.unsplash.com/photo-1471864190281-a93a3070b6de?w=500&q=80", videoUrl:"https://www.youtube.com/watch?v=example", date:"June 10, 2026", readTime:"12 min watch", author:"Dr. Ariyan Jawad" },
  { id:6, type:"tips",        title:"Rheumatic Disease — Managing Joint Pain",   excerpt:"Living with rheumatic diseases requires consistent care. These proven management tips can help reduce flare-ups and improve your quality of life.", category:"Rheumatic", imageUrl:"https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=500&q=80", tips:["Stay physically active","Apply hot/cold therapy","Follow medication schedule","Rest when needed"], date:"June 5, 2026", readTime:"4 min read", author:"Dr. Ariyan Jawad" },
]

export default function HealthBulletinSection() {
  const [bulletins, setBulletins]   = useState(DEFAULT_BULLETINS)
  const [showModal, setShowModal]   = useState(false)
  const [preview, setPreview]       = useState(null)
  const [activeType, setActiveType] = useState("article")
  const [filterType, setFilterType] = useState("All")
  const [imgPreview, setImgPreview] = useState("")
  const [tipInput, setTipInput]     = useState("")
  const [tips, setTips]             = useState([])
  const [formError, setFormError]   = useState("")
  const fileRef = useRef(null)
  const [form, setForm] = useState({ title:"", category:CATEGORIES[0], excerpt:"", imageUrl:"", videoUrl:"", readTime:"" })

  const handleImageFile = (e) => {
    const file = e.target.files?.[0]
    if (!file) return
    const reader = new FileReader()
    reader.onload = (ev) => {
      const url = ev.target.result
      setImgPreview(url)
      setForm(f => ({...f, imageUrl: url}))
    }
    reader.readAsDataURL(file)
  }

  const handleSubmit = () => {
    if (!form.title.trim())  { setFormError("Title is required"); return }
    if (!form.excerpt.trim()) { setFormError("Description is required"); return }
    if (activeType === "video" && !form.videoUrl.trim()) { setFormError("Video URL is required"); return }
    const newItem = {
      id: Date.now(), type: activeType,
      title: form.title, excerpt: form.excerpt, category: form.category,
      imageUrl: form.imageUrl || "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&q=80",
      videoUrl: activeType === "video" ? form.videoUrl : undefined,
      tips: activeType === "tips" ? tips : undefined,
      date: new Date().toLocaleDateString("en-US", { year:"numeric", month:"long", day:"numeric" }),
      readTime: form.readTime || (activeType === "video" ? "5 min watch" : "3 min read"),
      author: "Dr. Ariyan Jawad",
    }
    setBulletins(prev => [newItem, ...prev])
    setShowModal(false)
    setForm({ title:"", category:CATEGORIES[0], excerpt:"", imageUrl:"", videoUrl:"", readTime:"" })
    setImgPreview(""); setTips([]); setTipInput(""); setFormError(""); setActiveType("article")
  }

  const addTip = () => {
    if (tipInput.trim()) { setTips(prev => [...prev, tipInput.trim()]); setTipInput("") }
  }

  const filtered = filterType === "All" ? bulletins : bulletins.filter(b => b.type === filterType.toLowerCase())

  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-col justify-between gap-6 mb-10 md:flex-row md:items-end">
          <div>
            <span className="inline-block px-4 py-1.5 bg-white/60 backdrop-blur-sm rounded-full border border-white/50 text-sm text-cyan-600 mb-3">Doctor's Updates</span>
            <h2 className="text-4xl font-bold text-gray-900 md:text-5xl">Health <span className="text-transparent bg-gradient-to-r from-cyan-500 to-teal-500 bg-clip-text">Bulletin</span></h2>
            <p className="mt-2 text-gray-500">Latest health news and updates from Dr. Ariyan Jawad</p>
          </div>
          <button onClick={() => setShowModal(true)} className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex-shrink-0">
            <Plus className="w-5 h-5" /> Upload Bulletin
          </button>
        </div>

        <div className="flex flex-wrap gap-2 mb-8">
          {["All","Article","Video","Tips","Infographic"].map(f => (
            <button key={f} onClick={() => setFilterType(f)}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all border ${filterType === f ? "bg-gradient-to-r from-cyan-500 to-teal-500 text-white border-transparent shadow-md" : "bg-white/70 text-gray-600 border-gray-200 hover:border-cyan-300 hover:text-cyan-600"}`}>
              {f}
            </button>
          ))}
        </div>

        {filtered.length > 0 && (
          <div className="space-y-6">
            {/* Featured Card */}
            <div className="overflow-hidden transition-all border shadow-xl group backdrop-blur-md bg-white/60 rounded-3xl border-white/60 hover:shadow-2xl">
              <div className="grid md:grid-cols-2">
                <div className="relative h-64 overflow-hidden md:h-auto">
                  <img src={filtered[0].imageUrl} alt={filtered[0].title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                  <div className="absolute inset-0 bg-gradient-to-r from-black/30 to-transparent" />
                  {(() => {
                    const cfg = TYPE_CONFIG[filtered[0].type] ?? TYPE_CONFIG.article
                    const Icon = cfg.icon
                    return (
                      <div className="absolute top-4 left-4">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${cfg.tag} flex items-center gap-1`}>
                          <Icon className="w-3 h-3" /> {cfg.label}
                        </span>
                      </div>
                    )
                  })()}
                </div>
                <div className="flex flex-col justify-between p-8">
                  <div>
                    <span className="px-3 py-1 text-xs font-semibold rounded-full text-cyan-600 bg-cyan-50">{filtered[0].category}</span>
                    <h3 className="mt-3 mb-3 text-2xl font-bold text-gray-900">{filtered[0].title}</h3>
                    <p className="mb-4 leading-relaxed text-gray-600">{filtered[0].excerpt}</p>
                    {filtered[0].tips && (
                      <ul className="mb-4 space-y-1">
                        {filtered[0].tips.slice(0,3).map(t => (
                          <li key={t} className="flex items-center gap-2 text-sm text-gray-600">
                            <span className="w-1.5 h-1.5 bg-cyan-500 rounded-full" /> {t}
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3 text-sm text-gray-500">
                      <span className="flex items-center gap-1"><User className="w-3.5 h-3.5" /> {filtered[0].author}</span>
                      <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {filtered[0].readTime}</span>
                    </div>
                    <div className="flex gap-2">
                      <button onClick={() => setPreview(filtered[0])} className="p-2 transition-all bg-cyan-50 rounded-xl hover:bg-cyan-100"><Eye className="w-4 h-4 text-cyan-600" /></button>
                      <button onClick={() => setBulletins(prev => prev.filter(b => b.id !== filtered[0].id))} className="p-2 transition-all bg-red-50 rounded-xl hover:bg-red-100"><Trash2 className="w-4 h-4 text-red-500" /></button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.slice(1).map(item => {
                const cfg = TYPE_CONFIG[item.type] ?? TYPE_CONFIG.article
                const Icon = cfg.icon
                return (
                  <div key={item.id} className="overflow-hidden transition-all border shadow-lg group backdrop-blur-md bg-white/60 rounded-2xl border-white/60 hover:shadow-2xl hover:-translate-y-1">
                    <div className="relative overflow-hidden h-44">
                      <img src={item.imageUrl} alt={item.title} className="object-cover w-full h-full transition-transform duration-500 group-hover:scale-105" />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent" />
                      <div className="absolute top-3 left-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-bold ${cfg.tag} flex items-center gap-1`}>
                          <Icon className="w-3 h-3" /> {cfg.label}
                        </span>
                      </div>
                      <div className="absolute top-3 right-3 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button onClick={() => setPreview(item)} className="flex items-center justify-center rounded-lg w-7 h-7 bg-white/90 hover:bg-cyan-50"><Eye className="w-3.5 h-3.5 text-gray-700" /></button>
                        <button onClick={() => setBulletins(prev => prev.filter(b => b.id !== item.id))} className="flex items-center justify-center rounded-lg w-7 h-7 bg-white/90 hover:bg-red-50"><Trash2 className="w-3.5 h-3.5 text-red-500" /></button>
                      </div>
                      {item.type === "video" && (
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className="flex items-center justify-center w-12 h-12 rounded-full shadow-lg bg-white/90">
                            <Video className="w-5 h-5 text-red-500" />
                          </div>
                        </div>
                      )}
                    </div>
                    <div className="p-5">
                      <span className="text-xs font-semibold text-cyan-600">{item.category}</span>
                      <h3 className="font-bold text-gray-900 mt-1.5 mb-2 line-clamp-2">{item.title}</h3>
                      <p className="mb-3 text-xs leading-relaxed text-gray-500 line-clamp-2">{item.excerpt}</p>
                      {item.tips && (
                        <ul className="mb-3 space-y-1">
                          {item.tips.slice(0,2).map(t => (
                            <li key={t} className="flex items-center gap-1.5 text-xs text-gray-600">
                              <span className="w-1.5 h-1.5 bg-yellow-400 rounded-full" /> {t}
                            </li>
                          ))}
                        </ul>
                      )}
                      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
                        <div className="flex items-center gap-2 text-xs text-gray-400"><Clock className="w-3 h-3" /> {item.readTime}</div>
                        <button className="text-cyan-600 text-xs font-semibold flex items-center gap-0.5 hover:text-cyan-700">
                          {item.type === "video" ? "Watch" : "Read"} <ChevronRight className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          </div>
        )}

        {filtered.length === 0 && (
          <div className="py-20 text-center text-gray-400">
            <FileText className="w-16 h-16 mx-auto mb-3 opacity-30" />
            <p className="text-lg">No bulletins in this category yet.</p>
          </div>
        )}
      </div>

      {/* Upload Modal */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setShowModal(false)} />
          <div className="relative w-full max-w-2xl max-h-[92vh] overflow-y-auto backdrop-blur-xl bg-white/95 rounded-3xl border border-white/60 shadow-2xl">
            <div className="sticky top-0 z-10 flex items-center justify-between px-6 py-5 bg-gradient-to-r from-cyan-500 to-teal-500 rounded-t-3xl">
              <div>
                <h3 className="text-xl font-bold text-white">Upload Health Bulletin</h3>
                <p className="text-sm text-cyan-100">Choose a type and fill in the details</p>
              </div>
              <button onClick={() => setShowModal(false)} className="flex items-center justify-center transition-all w-9 h-9 bg-white/20 rounded-xl hover:bg-white/30">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6 space-y-6">
              {formError && (
                <div className="flex items-center gap-2 px-4 py-3 text-sm text-red-600 border border-red-200 bg-red-50 rounded-xl">
                  <X className="flex-shrink-0 w-4 h-4" /> {formError}
                </div>
              )}

              {/* Type Selector */}
              <div>
                <label className="block mb-3 text-sm font-bold text-gray-700">Select Upload Type *</label>
                <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
                  {UPLOAD_TYPES.map(ut => {
                    const Icon = ut.icon
                    const active = activeType === ut.id
                    return (
                      <button key={ut.id} onClick={() => { setActiveType(ut.id); setFormError("") }}
                        className={`p-4 rounded-2xl border-2 text-center transition-all ${active ? "border-cyan-500 bg-gradient-to-br from-cyan-50 to-teal-50 shadow-md" : "border-gray-200 bg-white/60 hover:border-cyan-300"}`}>
                        <div className={`w-10 h-10 bg-gradient-to-br ${ut.color} rounded-xl flex items-center justify-center mx-auto mb-2`}>
                          <Icon className={`w-5 h-5 ${ut.iconColor}`} />
                        </div>
                        <p className={`text-xs font-bold ${active ? "text-cyan-700" : "text-gray-600"}`}>{ut.label}</p>
                      </button>
                    )
                  })}
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Title *</label>
                <input type="text" placeholder="Enter bulletin title..." value={form.title}
                  onChange={e => { setForm(f => ({...f, title: e.target.value})); setFormError("") }}
                  className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 border border-gray-200 outline-none rounded-xl bg-white/80 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Category</label>
                  <select value={form.category} onChange={e => setForm(f => ({...f, category: e.target.value}))}
                    className="w-full px-4 py-3 text-gray-800 border border-gray-200 outline-none rounded-xl bg-white/80 focus:ring-2 focus:ring-cyan-400">
                    {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">{activeType === "video" ? "Watch Duration" : "Read Time"}</label>
                  <input type="text" placeholder={activeType === "video" ? "e.g. 10 min watch" : "e.g. 5 min read"}
                    value={form.readTime} onChange={e => setForm(f => ({...f, readTime: e.target.value}))}
                    className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 border border-gray-200 outline-none rounded-xl bg-white/80 focus:ring-2 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{activeType === "tips" ? "Overview / Intro" : "Description"} *</label>
                <textarea rows={4} placeholder={activeType === "tips" ? "Brief overview of the tips..." : "Write a summary or the full content..."} value={form.excerpt}
                  onChange={e => { setForm(f => ({...f, excerpt: e.target.value})); setFormError("") }}
                  className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 border border-gray-200 outline-none resize-none rounded-xl bg-white/80 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                />
              </div>

              {activeType === "tips" && (
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">Add Tips</label>
                  <div className="flex gap-2 mb-3">
                    <input type="text" placeholder="Type a tip and press Add..." value={tipInput}
                      onChange={e => setTipInput(e.target.value)} onKeyDown={e => e.key === "Enter" && addTip()}
                      className="flex-1 px-4 py-2.5 rounded-xl border border-gray-200 bg-white/80 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400"
                    />
                    <button onClick={addTip} className="px-4 py-2.5 bg-cyan-500 text-white rounded-xl font-semibold hover:bg-cyan-600 transition-all">Add</button>
                  </div>
                  {tips.length > 0 && (
                    <ul className="space-y-2">
                      {tips.map((t, i) => (
                        <li key={i} className="flex items-center gap-2 px-4 py-2 border border-yellow-200 bg-yellow-50 rounded-xl">
                          <Lightbulb className="w-3.5 h-3.5 text-yellow-500 flex-shrink-0" />
                          <span className="flex-1 text-sm text-gray-700">{t}</span>
                          <button onClick={() => setTips(prev => prev.filter((_, j) => j !== i))}>
                            <X className="w-3.5 h-3.5 text-gray-400 hover:text-red-500" />
                          </button>
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              {activeType === "video" && (
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Video URL *</label>
                  <input type="url" placeholder="https://youtube.com/watch?v=..." value={form.videoUrl}
                    onChange={e => { setForm(f => ({...f, videoUrl: e.target.value})); setFormError("") }}
                    className="w-full px-4 py-3 text-gray-800 placeholder-gray-400 border border-gray-200 outline-none rounded-xl bg-white/80 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                  />
                </div>
              )}

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">{activeType === "infographic" ? "Upload Infographic *" : "Cover Image (optional)"}</label>
                <input ref={fileRef} type="file" accept="image/*" className="hidden" onChange={handleImageFile} />
                {imgPreview ? (
                  <div className="relative overflow-hidden rounded-xl h-44">
                    <img src={imgPreview} alt="preview" className="object-cover w-full h-full" />
                    <button onClick={() => { setImgPreview(""); setForm(f => ({...f, imageUrl: ""})) }}
                      className="absolute flex items-center justify-center w-8 h-8 transition-all rounded-lg top-2 right-2 bg-black/50 hover:bg-red-500">
                      <X className="w-4 h-4 text-white" />
                    </button>
                  </div>
                ) : (
                  <button onClick={() => fileRef.current?.click()}
                    className="flex flex-col items-center justify-center w-full gap-2 transition-all border-2 border-dashed h-36 border-cyan-300 rounded-xl hover:bg-cyan-50 hover:border-cyan-400 group">
                    <div className="flex items-center justify-center w-12 h-12 transition-transform bg-cyan-100 rounded-xl group-hover:scale-110">
                      <Upload className="w-6 h-6 text-cyan-600" />
                    </div>
                    <p className="text-sm font-medium text-gray-500">Click to upload image</p>
                    <p className="text-xs text-gray-400">PNG, JPG, GIF up to 10MB</p>
                  </button>
                )}
              </div>

              <button onClick={handleSubmit} className="w-full py-4 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-2xl font-bold shadow-xl hover:shadow-2xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 text-base">
                <Upload className="w-5 h-5" /> Publish Bulletin
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Preview Modal */}
      {preview && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setPreview(null)} />
          <div className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto backdrop-blur-xl bg-white/95 rounded-3xl border border-white/60 shadow-2xl">
            <div className="relative h-56 overflow-hidden rounded-t-3xl">
              <img src={preview.imageUrl} alt={preview.title} className="object-cover w-full h-full" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              {(() => {
                const cfg = TYPE_CONFIG[preview.type] ?? TYPE_CONFIG.article
                const Icon = cfg.icon
                return (
                  <div className="absolute bottom-4 left-4">
                    <span className={`px-3 py-1 rounded-full text-xs font-bold ${cfg.tag} flex items-center gap-1`}>
                      <Icon className="w-3 h-3" /> {cfg.label}
                    </span>
                  </div>
                )
              })()}
              <button onClick={() => setPreview(null)} className="absolute flex items-center justify-center transition-all top-4 right-4 w-9 h-9 bg-black/40 rounded-xl hover:bg-black/60">
                <X className="w-5 h-5 text-white" />
              </button>
            </div>
            <div className="p-6">
              <span className="px-3 py-1 text-xs font-bold rounded-full text-cyan-600 bg-cyan-50">{preview.category}</span>
              <h3 className="mt-3 mb-3 text-xl font-bold text-gray-900">{preview.title}</h3>
              <p className="mb-4 text-sm leading-relaxed text-gray-600">{preview.excerpt}</p>
              {preview.tips && preview.tips.length > 0 && (
                <div className="p-4 mb-4 border border-yellow-200 bg-yellow-50 rounded-xl">
                  <p className="text-sm font-bold text-yellow-700 mb-2 flex items-center gap-1.5"><Lightbulb className="w-4 h-4" /> Key Tips</p>
                  <ul className="space-y-1.5">
                    {preview.tips.map(t => (
                      <li key={t} className="flex items-center gap-2 text-sm text-gray-700">
                        <span className="w-1.5 h-1.5 bg-yellow-500 rounded-full" /> {t}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {preview.videoUrl && (
                <a href={preview.videoUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-3 mb-4 text-sm font-semibold text-red-600 transition-all border border-red-200 bg-red-50 rounded-xl hover:bg-red-100">
                  <Video className="w-4 h-4" /> Watch Video
                </a>
              )}
              <div className="flex items-center justify-between pt-4 text-xs text-gray-400 border-t border-gray-100">
                <span className="flex items-center gap-1.5"><User className="w-3.5 h-3.5" /> {preview.author}</span>
                <span className="flex items-center gap-1.5"><Clock className="w-3.5 h-3.5" /> {preview.readTime} · {preview.date}</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
