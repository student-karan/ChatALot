import React, { useState } from 'react';
import { AuthStore } from '../store/AuthStore.js';
import { MessageSquare, Eye, EyeOff, Mail, Lock, LoaderCircle } from "lucide-react";
import { useFormik } from 'formik';
import validate from '../lib/validateLogin.js';
import { Link } from 'react-router-dom';
import AuthImagePattern from "../components/AuthImagePattern.jsx"
// import console from 'console';


const LoginPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { login, isLoggingUp } = AuthStore();

  const formik = useFormik({
    initialValues: {email: "", password: "" },
    validate,
    onSubmit: (values) => {
      login(values);
    },
  });
  function ShowPassword() {
    setShowPassword(!showPassword);
  }
  return (
    <div className='min-h-screen lg:max-h-screen lg:overflow-hidden grid lg:grid-cols-2'>
      {/* left side */}
      <div className='flex flex-col items-center justify-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8 relative'>
          {/* LOGO */}
          <div className="mb-8">
            <div className='flex flex-col items-center gap-2'>
              <div className='h-10 w-10 bg-primary grid place-items-center rounded-lg transition-colors'>
                <MessageSquare className='size-6 font-semibold text-base-200' />
              </div>
              <h1 className='text-xl font-bold mt-2'>Welcome Back</h1>
              <p className='text-md font-semibold'>Login to your account</p>
            </div>
          </div>
          {/* FORM */}
          <form onSubmit={formik.handleSubmit} className='w-full mx-2 flex flex-col items-center'>
            {/* Email */}
            <div className='w-3/4 flex flex-col gap-2 my-2'>
              <label htmlFor="email" className='font-medium'>Email</label>
              <div className='relative'>
                <input type="email" id='email' name='email' value={formik.values.email} placeholder="type your email" onInput={formik.handleChange} className="input input-bordered focus:border-1 focus:border-gray-100 pl-10 w-full" style={{ outline: 'none' }} />
                <Mail className='absolute top-3 left-3' style={{ color: 'gray', fontSize: 30 }} />
              </div>
              {formik.errors.email && <p style={{ color: 'red' }}>{formik.errors.email}</p>}
            </div>
            {/* Password */}
            <div className='w-3/4 flex flex-col gap-2 my-2'>
              <label htmlFor="password" className='font-medium'>Password</label>
              <div className='relative'>
                <input type={showPassword ? "text" : "password"} id='password' name='password'
                  value={formik.values.password} placeholder={showPassword ? "type your password" : "*********"}
                  onInput={formik.handleChange} className="input  input-bordered focus:border-1 focus:border-gray-100 px-10 w-full mb-1"
                  style={{ outline: 'none' }} />
                <Lock className='absolute top-3 left-2' style={{ color: 'gray', fontSize: 30 }} />
                {showPassword ?
                  <EyeOff className='absolute top-3 right-3 cursor-pointer' style={{ color: 'gray', fontSize: 30 }} onClick={ShowPassword} />
                  : <Eye className='absolute top-3 right-3 cursor-pointer' style={{ color: 'gray', fontSize: 30 }} onClick={ShowPassword} />}
                {formik.errors.password && <p style={{ color: 'red' }}>{formik.errors.password}</p>}
              </div>
            </div>
            {/* Button */}
            <div className='w-3/4 flex flex-col gap-2 mt-2'>
              <button type='submit' className="btn btn-primary" disabled={isLoggingUp}>
                {isLoggingUp ? <LoaderCircle className='size-10 animate-spin' /> : <p> Login </p>}
              </button>
            </div>
          </form>
          <div className='text-center text-md text-gray-400'>
            Don't have an account?&nbsp;
            <Link to="/signup" className='text-sky-500 underline'>Sign up</Link>
          </div>
        </div>
      </div>
      {/* right side */}
      <AuthImagePattern
        title="Join our community"
        subtitle="Connect with friends, share moments, and stay in touch with your loved ones."
      />
    </div>
  )
}

export default LoginPage