import { useState } from 'react'
import HomePage from './pages/HomePage'
import LoginPage from './pages/authentication/LoginPage'
import RegisterPage from './pages/authentication/RegisterPage'
import AppointmentPage from './pages/AppointmentPage'
import DoctorDashboard from './pages/dashboard/Doctordashboard'
import PatientDashboard from './pages/dashboard/Patientdashboard'

export default function App() {
  const [page, setPage] = useState('home')

  if (page === 'login') return (
    <LoginPage
      onLogin={(role) => setPage(role === 'doctor' ? 'doctor-dashboard' : 'patient-dashboard')}
      onGoRegister={() => setPage('register')}
      onBack={() => setPage('home')}
    />
  )
  if (page === 'register') return (
    <RegisterPage
      onRegister={(role) => setPage(role === 'doctor' ? 'doctor-dashboard' : 'patient-dashboard')}
      onGoLogin={() => setPage('login')}
      onBack={() => setPage('home')}
    />
  )
  if (page === 'booking') return (
    <AppointmentPage onBack={() => setPage('home')} />
  )
  if (page === 'doctor-dashboard') return (
    <DoctorDashboard onLogout={() => setPage('home')} />
  )
  if (page === 'patient-dashboard') return (
    <PatientDashboard
      onLogout={() => setPage('home')}
      onBookAppointment={() => setPage('booking')}
    />
  )

  return (
    <HomePage
      onLogin={() => setPage('login')}
      onRegister={() => setPage('register')}
      onBooking={() => setPage('booking')}
    />
  )
}