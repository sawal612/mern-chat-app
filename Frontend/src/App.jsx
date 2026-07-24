import React from 'react'
import Navbar from './components/Navbar.jsx'
import { Routes, Route, Navigate} from 'react-router-dom'
import HomePage from './pages/HomePage.jsx'
import LoginPage from './pages/LoginPage.jsx'
import SignupPage from './pages/SignupPage.jsx'
import SettingsPage from './pages/SettingsPage.jsx'
import ProfilePage from './pages/ProfilePage.jsx'
import { useAuthStore } from './store/useAuthStore.js'
import { useEffect } from 'react'
import {Loader} from 'lucide-react'
import { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom'
import {useThemeStore} from './store/useThemeStore.js'

const App = () => {
  const { authUser , checkAuth, isCheckingAuth, onlineUsers } = useAuthStore();
  const navigate = useNavigate();
  const { theme } = useThemeStore();
  
  console.log("onlineUsers", onlineUsers);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);
  if(isCheckingAuth && !authUser) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader className='animate-spin size-10' />
      </div>
    );
  }
  return (
    <div data-theme={theme} className='min-h-screen bg-base-100'>
      <Toaster />
      <Navbar />
      <Routes>
        <Route path='/' element={authUser ? <HomePage /> : <Navigate to="/login" />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/signup' element={<SignupPage />} />
        <Route path='/settings' element={authUser ? <SettingsPage /> : <Navigate to="/login" />} />
        <Route path='/profile' element={authUser ? <ProfilePage /> : <Navigate to="/login" />} />
      </Routes>
    </div>
  )
}

export default App