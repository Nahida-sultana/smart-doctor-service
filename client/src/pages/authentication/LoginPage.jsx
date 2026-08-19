import { useState } from 'react'
import { Stethoscope, Mail, Lock, Eye, EyeOff, User, ArrowLeft, ChevronRight } from 'lucide-react'

export default function LoginPage({ onLogin, onGoRegister, onBack }) {
  const [role, setRole]         = useState('patient')
  
  const [password, setPassword] = useState('')
  const [showPass, setShowPass] = useState(false)
  const [errors, setErrors]     = useState({})
  const [loading, setLoading]   = useState(false)

  const validate = () => {
    const e = {}
  
    if (!password.trim()) e.password = 'Password is required'
    else if (password.length < 6) e.password = 'Minimum 6 characters'
    setErrors(e)
    return Object.keys(e).length === 0
  }

  const handleSubmit = async () => {
    if (!validate()) return
    setLoading(true)
    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ password }),
      })
      const data = await res.json()

      if (!res.ok) {
        setErrors({ password: data.message || 'Login failed' })
        return
      }

      localStorage.setItem('token', data.token)
      localStorage.setItem('user', JSON.stringify(data))

      onLogin(data.role) // backend theke asha role diye dashboard e pathay
    } catch (err) {
      console.error(err)
      setErrors({ password: 'Server error, try again later' })
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen px-4 py-12 bg-gradient-to-br from-cyan-50 via-blue-50 to-teal-50">
      <button onClick={onBack} className="fixed top-6 left-6 flex items-center gap-1.5 text-sm text-gray-500 hover:text-cyan-600 transition-colors">
        <ArrowLeft className="w-4 h-4" /> Back to Home
      </button>

      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <div className="flex items-center justify-center mx-auto mb-4 shadow-lg w-14 h-14 bg-gradient-to-br from-cyan-500 to-teal-500 rounded-2xl">
            <Stethoscope className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Welcome Back</h1>
          <p className="mt-1 text-sm text-gray-500">Sign in to your Smart Doctor account</p>
        </div>

        <div className="p-8 border shadow-2xl backdrop-blur-md bg-white/70 rounded-3xl border-white/60">
          {/* Role Toggle */}
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
              <label className="block text-sm font-semibold text-gray-700 mb-1.5">Password</label>
              <div className="relative">
                <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                <input type={showPass ? 'text' : 'password'} placeholder="Enter password" value={password}
                  onChange={e => { setPassword(e.target.value); setErrors(v => ({...v, password: ''})) }}
                  className={`w-full pl-10 pr-12 py-3 rounded-xl border bg-white/80 text-gray-800 placeholder-gray-400 outline-none focus:ring-2 focus:ring-cyan-400 transition-all ${errors.password ? 'border-red-400' : 'border-gray-200 focus:border-cyan-400'}`}
                />
                <button onClick={() => setShowPass(!showPass)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-gray-400">
                  {showPass ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
              {errors.password && <p className="mt-1 text-xs text-red-500">{errors.password}</p>}
            </div>

            <div className="flex justify-end">
              <button className="text-xs font-medium text-cyan-600">Forgot password?</button>
            </div>

            <button onClick={handleSubmit} disabled={loading}
              className="w-full py-3.5 bg-gradient-to-r from-cyan-500 to-teal-500 text-white rounded-xl font-bold shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed disabled:translate-y-0">
              {loading
                ? <span className="flex items-center gap-2"><span className="w-4 h-4 border-2 rounded-full border-white/40 border-t-white animate-spin" />Signing in...</span>
                : <><span>Sign In as {role === 'doctor' ? 'Doctor' : 'Patient'}</span><ChevronRight className="w-4 h-4" /></>
              }
            </button>
          </div>

          <div className="mt-6 text-center">
            <p className="text-sm text-gray-500">
              Don't have an account?{' '}
              <button onClick={onGoRegister} className="font-semibold text-cyan-600 hover:text-cyan-700">Register here</button>
            </p>
          </div>
        </div>

        <div className="p-3 mt-4 text-center border bg-white/50 backdrop-blur-sm rounded-xl border-white/60">
          <p className="text-xs text-gray-500">Demo: any email & password (min 6 chars) will work</p>
        </div>
      </div>
    </div>
  )
}