import React from 'react'
import { useAuthStore } from '../store/useAuthStore.js'
import { useState } from 'react';
import { Mail, MessageSquare, User, LockIcon, Lock,EyeOff,Eye, Loader2 } from 'lucide-react'
import { Link, useNavigate } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern.jsx'

const LoginPage = () => {
    const { authUser} = useAuthStore();
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    })
    const navigate = useNavigate();
    const {login, isLoggingIn} = useAuthStore();
    const handleSubmit = async (e) => {
        e.preventDefault();
        // login(formData); 
        
        // we are using login function from useAuthStore to login the user and it will handle the rest
        const success = await login(formData);
        if (success) {
            navigate('/');
        }
    }

  return (
    <div className='min-h-screen grid lg:grid-cols-2 '>
    {/* left side */}
    <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
      <div className='w-full max-w-md space-y-8'>
        {/* LOGO */}
        <div className='text-center mb-8'>
          <div className='flex flex-col items-center gap-2'>
            <div className='size-12 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300'>
              <MessageSquare className='size-6 text-primary' />
            </div>
            <h1 className='text-2xl font-bold mt-2 text-gray-700'>Login</h1>
            <p className=' text-base-content/60'>Welcome back! Please enter your details</p>
          </div>
        </div>
        {/* FORM */}
        <form onSubmit={handleSubmit} className='space-y-6'>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium'>Email</span>
            </label>
            <div className='relative '>
              <div className='absolute left-3 pl-3 flex items-center pointer-events-none'>
                <Mail className='size-5 text-base-content/40' />
              </div>
              <input type='email' className={`input input-bordered w-full pl-10`} placeholder='john.doe@example.com' value={formData.email} onChange={(e) => setFormData({...formData, email: e.target.value})}>
              </input>
            </div>
          </div>
          <div className='form-control'>
            <label className='label'>
              <span className='label-text font-medium'>Password</span>
            </label>
            <div className='relative'>
              <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                <LockIcon className='size-5 text-base-content/40' />
              </div>
              <input type={showPassword ? 'text' : 'password'} className={`input input-bordered w-full pl-10`} placeholder='Password' value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})}>
              </input>
              <button type='button' className='absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors duration-300' onClick={() => setShowPassword(!showPassword)}>
                {showPassword ? (<EyeOff className='size-5' />) : (<Eye className='size-5' />)}
              </button>
            </div>
          </div>
          <button type='submit' className='btn btn-primary w-full disabled={isLoggingIn}'>
            {isLoggingIn ? (
              <>
              <Loader2 className='size-5 mr-2 animate-spin' />
              Logging In...
              </>
            ) : (
              "Login"
            )
            }
          </button>
        </form>
        <div className='text-center'>
          <p className='text-base-content/60'>
            Don't have an account?{" "}
            <Link to='/signup' className='text-primary font-medium hover:underline'>
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
    {/* right side */}
    <AuthImagePattern
    title='join our community'
    subtitle='Connect with like-minded individuals, share your thoughts, and be part of a vibrant community. Sign up today and start your journey with us!'

    />
  </div>
  )
}

export default LoginPage