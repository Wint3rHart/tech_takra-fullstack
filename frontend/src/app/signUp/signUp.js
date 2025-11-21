"use client"


import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { signUp_serverAction } from './sign_serverAction';
import Link from 'next/link';
import BgEffectLite from "@/util_comps/bg_effect_lite";

const SignUp = () => {
  let ref = useRef(null);
  let [logStatus, setLog] = useState({ status: false, msg: "" });
  const { register, formState, handleSubmit, control, reset } = useForm();
  let { errors } = formState;

  const form_fnx = async (data) => {
    try {
      let logIn = await signUp_serverAction(data, true);
      setLog({ status: true, msg: logIn.msg });
    } catch (error) {
      console.log("from client ", error.message);
      setLog({ status: false, msg: error.message });
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 py-20 px-4 relative flex items-center justify-center">
      
      {/* Subtle decorative particles */}
      <BgEffectLite />

      <div className="w-full max-w-md relative z-10">
        
        {/* Back button */}
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold mb-8 transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>

        {/* Form card */}
        <div className="bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-gray-800/80 rounded-2xl border border-amber-600/20 shadow-xl backdrop-blur-sm overflow-hidden">
          
          {/* Header */}
          <div className="text-center pt-10 pb-6 px-6">
            <h1 className="text-4xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 tracking-wide uppercase drop-shadow-[2px_4px_4px_rgba(0,0,0,0.25),0_0_8px_rgba(212,175,55,0.45)] font-inter">
              Login
            </h1>
            <div className="w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full mx-auto mt-4" />
            <p className="mt-4 text-gray-400 font-poppins">
              Welcome back to our community
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(form_fnx)} className="px-6 sm:px-8 pb-10 space-y-6">
            
            {/* Email field */}
            <div>
              <label htmlFor="email" className="block text-amber-300 font-semibold mb-2 text-sm tracking-wide">
                Email
              </label>
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Please enter a valid email"
                  }
                })}
                type="email"
                id="email"
                className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500/50 transition-all duration-300"
                placeholder="Enter your email"
              />
              {errors?.email && (
                <p className="mt-2 text-amber-400 text-sm font-medium">{errors.email.message}</p>
              )}
            </div>

            {/* Password field */}
            <div>
              <label htmlFor="password" className="block text-amber-300 font-semibold mb-2 text-sm tracking-wide">
                Password
              </label>
              <input
                {...register("password", { required: "Password is required" })}
                ref={(e) => { ref.current = e; register("password").ref(e); }}
                type="password"
                id="password"
                className="w-full px-4 py-3 bg-gray-900/60 border border-gray-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400/50 focus:border-amber-500/50 transition-all duration-300"
                placeholder="Enter your password"
              />
              {errors?.password && (
                <p className="mt-2 text-amber-400 text-sm font-medium">{errors.password.message}</p>
              )}
            </div>

            {/* Status message */}
            {logStatus.msg && (
              <div className={`p-4 rounded-xl border ${logStatus.status 
                ? 'bg-green-900/30 border-green-500/30 text-green-300' 
                : 'bg-red-900/30 border-red-500/30 text-red-300'}`}>
                <p className="text-sm font-medium">{logStatus.msg}</p>
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full mt-4 bg-gradient-to-r from-amber-500 to-amber-600 text-gray-900 font-bold py-3.5 px-6 rounded-xl hover:from-amber-400 hover:to-amber-500 transition-all duration-300 shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40 hover:-translate-y-0.5 active:translate-y-0"
            >
              Sign In
            </button>

            {/* Decorative line */}
            <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mt-6" />

            {/* Register link */}
            <p className="text-center text-gray-400 text-sm">
              Don't have an account?{' '}
              <Link href="/register" className="text-amber-400 hover:text-amber-300 font-semibold transition-colors">
                Register here
              </Link>
            </p>
          </form>

          {/* Corner accents */}
          <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400/40 rounded-full" />
          <div className="absolute bottom-4 left-4 w-2 h-2 bg-amber-400/40 rounded-full" />
        </div>
      </div>

    </div>
  );
};

export default SignUp;