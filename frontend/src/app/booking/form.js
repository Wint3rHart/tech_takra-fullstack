
"use client"
import React from "react";
import { DevTool } from "@hookform/devtools";
import Link from "next/link";
import { useForm } from "react-hook-form";
import BgEffect from "@/util_comps/bg_effect";

export const Form=()=>{
const { register, control, formState: { errors } } = useForm();

  return (
    <div className="flex items-center justify-center mt-12 min-h-screen px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gray-900 relative overflow-hidden">
                <BgEffect/>

      <form className="w-full max-w-sm sm:max-w-md lg:max-w-lg px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-400/20 relative group z-10">
        
        {/* Back button */}
        <div className="mb-4 sm:mb-6">
          <button
            type="button"
            className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] relative z-10"
          >
            Back
          </button>
        </div>

        {/* Name field */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label 
            htmlFor="name" 
            className="block text-amber-300 font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm tracking-wide"
          >
            Name
          </label>
          <input 
            {...register("name", {
              required: "Name is required",
              validate: (x) => {
                if (x.length < 6) {
                  return "Must have at least 6 characters";
                }
                return true;
              }
            })}
            type="text"
            id="name"
            name="name"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
            placeholder="Enter your name"
          />
          {errors?.name?.message && (
            <p className="mt-1.5 text-amber-300 font-medium text-xs sm:text-sm">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email field */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label 
            htmlFor="email" 
            className="block text-amber-300 font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm tracking-wide"
          >
            Email
          </label>
          <input 
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: "Invalid email address"
              }
            })}
            type="email"
            id="email"
            name="email"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-sm sm:text-base bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
            placeholder="Enter your email"
          />
          {errors?.email?.message && (
            <p className="mt-1.5 text-amber-300 font-medium text-xs sm:text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Profile pic field */}
        <div className="mb-4 sm:mb-6 relative z-10">
          <label 
            htmlFor="pic" 
            className="block text-amber-300 font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm tracking-wide"
          >
            Profile Pic
          </label>
          <input 
            {...register("pic", { required: "Profile picture is required" })}
            type="file" 
            id="pic"
            name="pic"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm bg-gray-900/50 border border-gray-700 rounded-lg text-gray-400 file:mr-3 sm:file:mr-4 file:py-1.5 sm:file:py-2 file:px-3 sm:file:px-4 file:rounded-lg file:border-0 file:bg-amber-400 file:text-gray-900 file:text-xs sm:file:text-sm file:font-semibold hover:file:bg-amber-500 file:cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-400 transition-all duration-300"
          />
          {errors?.pic?.message && (
            <p className="mt-1.5 text-amber-300 font-medium text-xs sm:text-sm">
              {errors.pic.message}
            </p>
          )}
        </div>

        {/* Submit button */}
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold text-sm sm:text-base py-2.5 sm:py-3 px-4 rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] relative z-10"
        >
          Submit
        </button>
      </form>
    </div>
  );

}
