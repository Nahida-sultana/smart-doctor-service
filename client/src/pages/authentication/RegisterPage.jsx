import { useState } from 'react'
import { Stethoscope, Mail, Lock, Eye, EyeOff, User, Phone, MapPin, ArrowLeft, ChevronRight } from 'lucide-react'

export default function RegisterPage({ onRegister, onGoLogin, onBack }) {
  const [role, setRole]       = useState('patient')
  const [showPass, setShowPass] = useState(false)
  const [loading, setLoading] = useState(false)
  const [errors, setErrors]   = useState({})
  const [form, setForm]       = useState({ name:'', email:'', phone:'', password:'', confirm:'', age:'', gender:'', address:'' })

  const update = (field, val) => {
    setForm(f => ({...f, [field]: val}))
    setErrors(e => ({...e, [field]: ''}))
  }

  const validate = () => {
    const e = {}
    if (!form.name.trim())     e.name     = 'Full name is required'
   
    if (!form.phone.trim())    e.phone    = 'Phone is required'
    if (!form.password)        e.password = 'Password is required'
    else if (form.password.length < 6) e.password = 'Minimum 6 characters'
    if (form.password !== form.confirm) e.confirm = 'Passwords do not match'
    if (role === 'patient') {
      if (!form.age.trim())  e.age    = 'Age is required'
      if (!form.gender)      e.gender = 'Select gender'
    }
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      // Note: backend/models/User.js abhi shudhu name, email, phone, password, role rakhe.
      // age/gender/address pore User model e add korle tokhon backend e pathano jabe.
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: form.phone,
          password: form.password,
          role,
        }),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrors({ email: data.message || 'Registration failed' })
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data))

      onRegister(data.role) // backend theke asha role diye dashboard e pathay
    } catch (err) {
      console.error(err)
      setErrors({ email: 'Server error, try again later' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      <button onClick={onBack} className="fixed top-6 left-6 flex items-center gap-1.5 text-sm text-gray-500 hover:text-cyan-600 z-10 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      <div className="w-full max-w-lg">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mx-auto mb-4 shadow-lg w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Create Account</h1>
          <p className="mt-1 text-sm text-gray-500">Join Smart Doctor Service today</p>
        </div>

        <div className="p-8 border shadow-2xl backdrop-blur-md bg-white/70 rounded-3xl border-white/60">
          <div className="flex p-1 mb-6 bg-gray-100 rounded-2xl">
            {['patient', 'doctor'].map((r) => (
              <button key={r} onClick={() => setRole(r)}
                className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all flex items-center justify-center gap-2 ${
                  role === r ? 'bg-gradient-to-r from-cyan-500 to-teal-500 text-white shadow-md' : 'text-gray-500 hover:text-gray-700'
                }`}>
                {r === 'patient' ? <User className="w-4 h-4" /> : <Stethoscope className="w-4 h-4" />}
                {r === 'patient' ? 'Patient' : 'Doctor'}
              </button>
            ))}
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Full Name *</label>
              <div className="relative">
                <User className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type="text" placeholder="Enter your full name" value={form.name}
                  onChange={e => update('name', e.target.value)}
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white/80 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${errors.name ? 'border-red-400' : 'border-gray-200 focus:border-cyan-400'}`}
                />
              </div>
              {errors.name && <p className="mt-1 text-xs text-red-500">{errors.name}</p>}
            </div>

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="email" placeholder="your@email.com" value={form.email}
                    onChange={e => update('email', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white/80 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${errors.email ? 'border-red-400' : 'border-gray-200 focus:border-cyan-400'}`}
                  />
                </div>
                {errors.email && <p className="mt-1 text-xs text-red-500">{errors.email}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone *</label>
                <div className="relative">
                  <Phone className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type="tel" placeholder="+880 01X-XXXXXXXX" value={form.phone}
                    onChange={e => update('phone', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white/80 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${errors.phone ? 'border-red-400' : 'border-gray-200 focus:border-cyan-400'}`}
                  />
                </div>
                {errors.phone && <p className="mt-1 text-xs text-red-500">{errors.phone}</p>}
              </div>
            </div>

            {role === 'patient' && (
              <>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Age *</label>
                    <input type="number" placeholder="e.g. 30" value={form.age}
                      onChange={e => update('age', e.target.value)}
                      className={`w-full px-4 py-3 rounded-xl border bg-white/80 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${errors.age ? 'border-red-400' : 'border-gray-200 focus:border-cyan-400'}`}
                    />
                    {errors.age && <p className="mt-1 text-xs text-red-500">{errors.age}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Gender *</label>
                    <div className="flex gap-2">
                      {['Male','Female','Other'].map(g => (
                        <button key={g} onClick={() => update('gender', g)}
                          className={`flex-1 py-3 rounded-xl border-2 text-sm font-semibold transition-all ${form.gender === g ? 'border-cyan-500 bg-cyan-50 text-cyan-700' : 'border-gray-200 bg-white/70 text-gray-500 hover:border-cyan-300'}`}>
                          {g}
                        </button>
                      ))}
                    </div>
                    {errors.gender && <p className="mt-1 text-xs text-red-500">{errors.gender}</p>}
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Address <span className="font-normal text-gray-400">(optional)</span></label>
                  <div className="relative">
                    <MapPin className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input type="text" placeholder="Your address" value={form.address}
                      onChange={e => update('address', e.target.value)}
                      className="w-full py-3 pl-10 pr-4 text-gray-800 placeholder-gray-400 border border-gray-200 outline-none rounded-xl bg-white/80 focus:ring-2 focus:ring-cyan-400 focus:border-cyan-400"
                    />
                  </div>
                </div>
              </>
            )}

            {role === 'doctor' && (
              <div className="p-3 text-sm border bg-cyan-50 border-cyan-200 rounded-xl text-cyan-700">
                Doctor accounts require admin verification after registration.
              </div>
            )}

            <div className="grid gap-4 sm:grid-cols-2">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPass ? 'text' : 'password'} placeholder="Min 6 chars" value={form.password}
                    onChange={e => update('password', e.target.value)}
                    className={`w-full pl-10 pr-10 py-3 rounded-xl border bg-white/80 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${errors.password ? 'border-red-400' : 'border-gray-200 focus:border-cyan-400'}`}
                  />
                  <button onClick={() => setShowPass(!showPass)} className="absolute text-gray-400 -translate-y-1/2 right-3 top-1/2">
                    {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
                {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
              </div>
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-1.5">Confirm Password *</label>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                  <input type={showPass ? 'text' : 'password'} placeholder="Re-enter password" value={form.confirm}
                    onChange={e => update('confirm', e.target.value)}
                    className={`w-full pl-10 pr-4 py-3 rounded-xl border bg-white/80 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${errors.confirm ? 'border-red-400' : 'border-gray-200 focus:border-cyan-400'}`}
                  />
                </div>
                {errors.confirm && <p className="mt-1 text-xs text-red-500">{errors.confirm}</p>}
              </div>
            </div>

            <button onClick={handleSubmit} disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0 mt-2">
              {loading
                ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin" />Creating account...</span>
                : <><span>Create {role === 'doctor' ? 'Doctor' : 'Patient'} Account</span><ChevronRight className="w-4 h-4" /></>
              }
            </button>
          </div>

          <div className="mt-5 text-center">
            <p className="text-sm text-gray-500">
              Already have an account?{' '}
              <button onClick={onGoLogin} className="font-semibold text-cyan-600 hover:text-cyan-700">Sign in</button>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}