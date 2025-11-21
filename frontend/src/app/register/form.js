"use client";
import React, { useEffect, useState } from "react";

import Link from "next/link";
import { useForm } from "react-hook-form";
import BgEffect from "@/util_comps/bg_effect";
import { serverAction } from "@/server_actions/signUp_fnx";

// name, email, phone, department, rollNo, semester 

export const Form = () => {
  const { register, control, handleSubmit, formState: { errors, isSubmitting } } = useForm();
  const [success, setSuccess] = useState({ status: undefined, msg: undefined });

  const form_submit_fnx = async (data) => {
    try {
      const res = await serverAction("registration", "POST", data);
      setSuccess({ status: true, msg: res?.msg || 'Registration successful' });
    } catch (err) {
      setSuccess({ status: false, msg: err?.message || 'Something went wrong' });
    }
  };

  useEffect(() => {
    if (success.status !== undefined) {
      const t = setTimeout(() => setSuccess({ status: undefined, msg: undefined }), 5000);
      return () => clearTimeout(t);
    }
  }, [success]);

  return (
    <div className="min-h-[70vh] flex items-center justify-center py-10 px-4 sm:px-6 lg:px-8 bg-gray-900 relative">
      <BgEffect />

      <div className="relative z-10 w-full max-w-4xl">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-br from-gray-800/80 to-gray-900/80 backdrop-blur-md border border-amber-400/10 rounded-2xl shadow-2xl overflow-hidden">

          {/* Left: Heading / info */}
          <div className="p-8 lg:p-12 bg-gradient-to-b from-amber-600/8 to-transparent">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight mb-3">
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-amber-300 to-amber-500">Student Registration</span>
            </h2>
            <p className="text-sm sm:text-base text-amber-200/80 mb-6">Join our community — fill out the form to register for campus services and events. We’ll keep your details secure.</p>

            <ul className="text-amber-200/70 space-y-2 text-sm">
              <li>• Secure & private</li>
              <li>• Fast verification</li>
              <li>• Access to student features</li>
            </ul>
          </div>

          {/* Right: Form */}
          <div className="p-6 sm:p-8">
            {success.status !== undefined && (
              <div className={`mb-4 rounded-md p-3 text-sm font-medium ${success.status ? 'bg-emerald-700/20 text-emerald-200 border border-emerald-500/20' : 'bg-rose-800/20 text-rose-200 border border-rose-600/20'}`}>
                {success.msg}
              </div>
            )}

            <form onSubmit={handleSubmit(form_submit_fnx)} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="name" className="block text-amber-300 text-xs font-semibold mb-1">Full name</label>
                  <input
                    {...register('name', { required: 'Name is required', minLength: { value: 3, message: 'At least 3 characters' } })}
                    id="name"
                    className="w-full px-3 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Jane Doe"
                  />
                  {errors?.name && <p className="mt-1 text-amber-300 text-xs">{errors.name.message}</p>}
                </div>

                <div>
                  <label htmlFor="email" className="block text-amber-300 text-xs font-semibold mb-1">Email</label>
                  <input
                    {...register('email', { required: 'Email is required', pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: 'Invalid email' } })}
                    id="email"
                    type="email"
                    className="w-full px-3 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="you@example.com"
                  />
                  {errors?.email && <p className="mt-1 text-amber-300 text-xs">{errors.email.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="roll_no" className="block text-amber-300 text-xs font-semibold mb-1">Roll No</label>
                  <input
                    {...register('rollNo', { required: 'Roll no is required' })}
                    id="roll_no"
                    className="w-full px-3 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="e.g. 21SW-123"
                  />
                  {errors?.rollNo && <p className="mt-1 text-amber-300 text-xs">{errors.rollNo.message}</p>}
                </div>

                <div>
                  <label htmlFor="department" className="block text-amber-300 text-xs font-semibold mb-1">Department</label>
                  <input
                    {...register('department', { required: 'Department is required' })}
                    id="department"
                    className="w-full px-3 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="Software Engineering"
                  />
                  {errors?.department && <p className="mt-1 text-amber-300 text-xs">{errors.department.message}</p>}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label htmlFor="semester" className="block text-amber-300 text-xs font-semibold mb-1">Semester</label>
                  <input
                    {...register('semester', { required: 'Semester is required', min: { value: 1, message: 'Min 1' }, max: { value: 8, message: 'Max 8' } })}
                    id="semester"
                    type="number"
                    min={1}
                    max={8}
                    className="w-full px-3 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="1"
                  />
                  {errors?.semester && <p className="mt-1 text-amber-300 text-xs">{errors.semester.message}</p>}
                </div>

                <div>
                  <label htmlFor="phone" className="block text-amber-300 text-xs font-semibold mb-1">Phone</label>
                  <input
                    {...register('phone', { required: 'Phone is required', pattern: { value: /^03[0-9]{9}$/, message: 'Invalid phone' } })}
                    id="phone"
                    className="w-full px-3 py-2 rounded-lg bg-gray-900/60 border border-gray-700 text-white placeholder-gray-400 placeholder:text-xs sm:placeholder:text-sm focus:outline-none focus:ring-2 focus:ring-amber-400"
                    placeholder="03001234567"
                  />
                  {errors?.phone && <p className="mt-1 text-amber-300 text-xs">{errors.phone.message}</p>}
                </div>
              </div>

              <div className="flex items-center justify-between gap-3">
                <Link href="#" className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-semibold text-amber-200 bg-amber-700/10 border border-amber-400/10 hover:bg-amber-700/15">Back</Link>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  aria-busy={isSubmitting}
                  className={`inline-flex items-center justify-center gap-3 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold px-6 py-3 rounded-full shadow-xl transform transition-all duration-200 ${isSubmitting ? 'opacity-70 cursor-wait scale-95' : 'hover:scale-105 hover:shadow-2xl'}`}
                >
                  {isSubmitting ? (
                    <>
                      <svg className="animate-spin h-4 w-4 text-gray-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"></path>
                      </svg>
                      <span className="text-sm font-semibold">Submitting...</span>
                    </>
                  ) : (
                    <span className="text-sm font-semibold">Submit</span>
                  )}
                </button>
              </div>

            </form>

            <div className="mt-4">{/* DevTool shown only when included in dev */}
             
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
