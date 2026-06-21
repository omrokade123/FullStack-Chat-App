import React, { useState } from 'react'
import { useAuthStore } from '../store/useAuthStore.js';
import {Eye, EyeOff, Loader2, Lock, Mail, MessageSquare, User} from 'lucide-react';
import { Link } from 'react-router-dom';
import AuthImagePattern from '../components/AuthImagePattern.jsx';
import toast from 'react-hot-toast';

const SignUpPage = () => {
  const [showPassword,setShowPassword] = useState(false);
  const [formData,setFormData] = useState({
    fullName:"",
    email:"",
    password:"",
  });
  const {signup,isSigningUp} = useAuthStore();

  const validateForm = () =>{
    if(!formData.fullName.trim()) return toast.error("Full Name is Required");
    if(!formData.email.trim()) return toast.error("Email is required");
    if(!/\S+@\S+\.\S+/.test(formData.email)) return toast.error("Invalid toast format");
    if(!formData.password) return toast.error("Password is required");

    return true;
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const success = validateForm()

    if(success===true) signup(formData);
  }
  return (
    <div className='min-h-screen grid lg:grid-cols-2'>
      {/* left side */}
      <div className='flex flex-col justify-center items-center p-6 sm:p-12'>
        <div className='w-full max-w-md space-y-8'>
          {/* LOGO */}
          <div className="text-center mb-8">
            <div className="flex flex-col items-center gap-2 group">
              <div
                className="size-14 rounded-2xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center group-hover:shadow-lg group-hover:shadow-primary/30 transition-all duration-300"
              >
                <MessageSquare className="size-7 text-white" />
              </div>
              <h1 className="text-3xl font-bold mt-3 bg-gradient-to-r from-primary to-primary/70 bg-clip-text text-transparent">Create Account</h1>
              <p className="text-base-content/60 text-sm">Get started with your free account</p>
            </div>
          </div>

          <form onSubmit={handleSubmit} className='space-y-5'>
            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Full Name</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <User className="w-5 h-5 text-primary/60" />
                </div>
                <input
                  type="text"
                  className={`input input-bordered input-lg w-full pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-base-200 hover:bg-base-200/80 transition-all duration-300`}
                  placeholder="John Doe"
                  value={formData.fullName}
                  onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                />
              </div>
            </div>

            <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Email</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                   <Mail className="w-5 h-5 text-primary/60"/> 
                </div>
                <input
                  type="email"
                  className={`input input-bordered input-lg w-full pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-base-200 hover:bg-base-200/80 transition-all duration-300`}
                  placeholder="you@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                />
              </div>
            </div>

             <div className="form-control">
              <label className="label">
                <span className="label-text font-semibold">Password</span>
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
                  <Lock className="w-5 h-5 text-primary/60" />
                </div>
                <input
                  type={showPassword ? "text" : "password"}
                  className={`input input-bordered input-lg w-full pl-12 rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/50 bg-base-200 hover:bg-base-200/80 transition-all duration-300`}
                  placeholder="••••••••"
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                />
                <button
                  type="button"
                  className="absolute inset-y-0 right-0 pr-4 flex items-center hover:opacity-70 transition-opacity"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="size-5 text-base-content/50" />
                  ) : (
                    <Eye className="size-5 text-base-content/50" />
                  )}
                </button>
              </div>
            </div>

            <button type="submit" className="btn btn-primary btn-lg w-full rounded-xl font-semibold shadow-lg hover:shadow-primary/30" disabled={isSigningUp}>
              {isSigningUp ? (
                <>
                  <Loader2 className="size-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>

          </form>

          <div className="text-center">
            <p className="text-base-content/60 text-sm">
              Already have an account?{" "}
              <Link to="/login" className="link link-primary font-semibold">
                Sign in
              </Link>
            </p>
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

export default SignUpPage