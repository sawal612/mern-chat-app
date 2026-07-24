import React from 'react'
import { useState } from 'react'
import { Mail, MessageSquare, User, LockIcon, Lock,EyeOff,Eye, Loader2 } from 'lucide-react'
import { useAuthStore } from '../store/useAuthStore'
import { Link, useNavigate } from 'react-router-dom'
import AuthImagePattern from '../components/AuthImagePattern'
import toast from 'react-hot-toast'

const SignupPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
  })
  const {signup , isSigningUp} = useAuthStore();
  
  const validateForm = () => {
    if (!formData.fullName.trim()) return toast.error("Full name is required");
    if (!formData.email.trim()) return toast.error("Email is required");
    if (!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid email format");
    if (!formData.password) return toast.error("Password is required");
    if (formData.password.length < 6) return toast.error("Password must be at least 6 characters");

    return true;
   }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const sucess = validateForm();
    if(sucess) {
      const created = await signup(formData);
      if (created) {
        navigate('/');
      }
      // we are using signup function from useAuthStore to signup the user and it will handle the rest
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
              <h1 className='text-2xl font-bold mt-2 text-gray-700'>Create Account</h1>
              <p className=' text-base-content/60'>get started</p>
            </div>
          </div>
          {/* FORM */}
          <form onSubmit={handleSubmit} className='space-y-6'>
            <div className='form-control'>
              <label className='label'>
                <span className='label-text font-medium'>Full Name</span>
              </label>
              <div className='relative'>
                <div className='absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none'>
                  <User className='size-5 text-primary' />
                </div>
                <input type='text' className={`input input-bordered w-full pl-10`} placeholder='john Doe' value={formData.fullName} onChange={(e) => setFormData({...formData, fullName: e.target.value})}>
                </input>
              </div>
            </div>
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
            <button type='submit' className='btn btn-primary w-full disabled={isSigningUp}'>
              {isSigningUp ? (
                <>
                <Loader2 className='size-5 mr-2 animate-spin' />
                Signing Up...
                </>
              ) : (
                "Create Account"
              )
              }
            </button>
          </form>
          <div className='text-center'>
            <p className='text-base-content/60'>
              Already have an account?{" "}
              <Link to='/login' className='text-primary font-medium hover:underline'>
                Login
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

export default SignupPage