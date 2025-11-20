"use client";
import React, { useEffect, useState } from "react";
import { DevTool } from "@hookform/devtools";
import Link from "next/link";
import { useForm } from "react-hook-form";
import BgEffect from "@/util_comps/bg_effect";
import { serverAction } from "@/server_actions/signUp_fnx";

// name, email, phone, department, rollNo, semester 

export const Form = () => {

  const { register, control, formState: { errors },handleSubmit } = useForm();
let [success,setSuccess]=useState({status:undefined,msg:undefined});

const form_submit_fnx=async(data)=>{

try {
  console.log(data);
  let get=await serverAction("registration","POST",data);
  console.log(get);
  setSuccess(x=>{return {...x,status:true,msg:get.msg}});
} catch (error) {
  console.log(error.message);
    setSuccess(x=>{return {...x,status:false,msg:error.message}});
}

}

useEffect(()=>{let timer=setTimeout(() => {
  setSuccess(x=>{return {...x,status:undefined,msg:undefined}});
  

}, 6000);return ()=>{clearTimeout(timer)};},[success])



  return (
    <div className="flex items-center justify-center mt-12 h-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gray-900 relative ">
      <BgEffect />

      <form onSubmit={handleSubmit(form_submit_fnx)} className="w-full max-w-sm sm:max-w-md lg:max-w-lg px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-400/20 relative group z-10">
        
        {/* Back button */}
        <div className="mb-4 sm:mb-6">
          <button
            type="button"
            className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] relative z-10"
          >
            Back
          </button>
        </div>

        {/* Name */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label htmlFor="name" className="block text-amber-300 font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm tracking-wide font-playfair">
            Name
          </label>
          <input
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "Must be at least 3 characters" },
              pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters allowed" }
            })}
            type="text"
            id="name"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 
            text-sm sm:text-base bg-gray-900/50 border border-gray-700 rounded-lg 
            text-white placeholder-gray-500 placeholder:font-inter font-inter
            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent 
            transition-all duration-300"
            placeholder="Enter your full name"
          />
          {errors?.name?.message && (
            <p className="mt-1.5 text-amber-300 font-medium text-xs sm:text-sm font-inter">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label htmlFor="email" className="block text-amber-300 font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm tracking-wide font-playfair">
            Email
          </label>
          <input
            {...register("email", {
              required: "Email is required",
              pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: "Invalid email address" }
            })}
            type="email"
            id="email"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 
            text-sm sm:text-base bg-gray-900/50 border border-gray-700 rounded-lg 
            text-white placeholder-gray-500 placeholder:font-inter font-inter
            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent 
            transition-all duration-300"
            placeholder="Enter your email"
          />
          {errors?.email?.message && (
            <p className="mt-1.5 text-amber-300 font-medium text-xs sm:text-sm font-inter">{errors.email.message}</p>
          )}
        </div>

        {/* Roll No */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label htmlFor="roll_no" className="block text-amber-300 font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm tracking-wide font-playfair">
            Roll No
          </label>
          <input
            {...register("rollNo", {
              required: "Roll no is required",
              pattern: { value: /^[A-Za-z0-9\-\/]+$/, message: "Only letters, numbers, /, - allowed" }
            })}
            type="text"
            id="roll_no"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 
            text-sm sm:text-base bg-gray-900/50 border border-gray-700 rounded-lg 
            text-white placeholder-gray-500 placeholder:font-inter font-inter
            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent 
            transition-all duration-300"
            placeholder="e.g. 21SW-123"
          />
          {errors?.roll_no?.message && (
            <p className="mt-1.5 text-amber-300 font-medium text-xs sm:text-sm font-inter">{errors.roll_no.message}</p>
          )}
        </div>

        {/* Department */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label htmlFor="department" className="block text-amber-300 font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm tracking-wide font-playfair">
            Department
          </label>
          <input
            {...register("department", {
              required: "Department is required",
              pattern: { value: /^[A-Za-z\s]+$/, message: "Only alphabets allowed" }
            })}
            type="text"
            id="department"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 
            text-sm sm:text-base bg-gray-900/50 border border-gray-700 rounded-lg 
            text-white placeholder-gray-500 placeholder:font-inter font-inter
            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent 
            transition-all duration-300"
            placeholder="e.g. Software Engineering"
          />
          {errors?.department?.message && (
            <p className="mt-1.5 text-amber-300 font-medium text-xs sm:text-sm font-inter">{errors.department.message}</p>
          )}
        </div>

        {/* Semester */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label htmlFor="semester" className="block text-amber-300 font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm tracking-wide font-playfair">
            Semester
          </label>
          <input
            type="number"
            min={1}
            max={8}
            {...register("semester", {
              required: "Semester is required",
              min: { value: 1, message: "Min semester is 1" },
              max: { value: 8, message: "Max semester is 8" }
            })}
            id="semester"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 
            text-sm sm:text-base bg-gray-900/50 border border-gray-700 rounded-lg 
            text-white placeholder-gray-500 placeholder:font-inter font-inter
            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent 
            transition-all duration-300"
            placeholder="Enter semester (1–8)"
          />
          {errors?.semester?.message && (
            <p className="mt-1.5 text-amber-300 font-medium text-xs sm:text-sm font-inter">{errors.semester.message}</p>
          )}
        </div>

        {/* Phone */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label htmlFor="phone" className="block text-amber-300 font-semibold mb-1.5 sm:mb-2 text-xs sm:text-sm tracking-wide font-playfair">
            Phone No
          </label>
          <input
            type="text"
            {...register("phone", {
              required: "Phone number is required",
              pattern: {
                value: /^03[0-9]{9}$/,
                message: "Must be a valid Pakistani number (0300xxxxxxx)"
              }
            })}
            id="phone"
            className="w-full px-3 sm:px-4 py-2.5 sm:py-3 
            text-sm sm:text-base bg-gray-900/50 border border-gray-700 rounded-lg 
            text-white placeholder-gray-500 placeholder:font-inter font-inter
            focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent 
            transition-all duration-300"
            placeholder="03001234567"
          />
          {errors?.phone?.message && (
            <p className="mt-1.5 text-amber-300 font-medium text-xs sm:text-sm font-inter">{errors.phone.message}</p>
          )}
        </div>
 <p className="mt-1.5 text-amber-300 font-bold text-lg  sm:text-sm font-inter">{success.msg}</p>
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
};
