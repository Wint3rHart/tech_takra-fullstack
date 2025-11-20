"use client"

// This is the redesigned component with the luxury Wandering Hart theme
// Copy this code into your actual project file where you have react-hook-form installed

import { DevTool } from '@hookform/devtools';
import React, { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import {signUp_serverAction} from './sign_serverAction'
import Link from 'next/link';

const SignUp = () => {

let ref=useRef(null);
let [logStatus,setLog]=useState({status:false,msg:"not logged in"});
const {register,formState,handleSubmit,control,reset}=useForm()
let {errors}=formState;
let [reg,setReg]=useState(true);

useEffect(()=>{console.log(errors);
},[errors])

const form_fnx=async(data)=>{

try {

 let logIn= await signUp_serverAction(data,reg);
 setLog(x=>{return {...x,status:true,msg:logIn.msg}})
console.log(logIn);


} catch (error) {

  console.log("from client ",error.message);
  setLog(x=>{return {...x,status:false,msg:error.message}})
}


}

    return (
   <div className="flex items-center justify-center mt-16 py-12 h-[140vh] bg-gray-900 relative overflow-hidden">
    
      {/* Animated background particles */}
      <div className="absolute top-20 left-20 w-1 h-1 bg-amber-400/80 rounded-full animate-ping shadow-lg shadow-amber-400/60"></div>
      <div className="absolute top-32 right-24 w-2 h-2 bg-white/70 rounded-full animate-pulse shadow-md shadow-white/50"></div>
      <div className="absolute bottom-40 left-16 w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse delay-700 shadow-lg shadow-amber-300/50"></div>
      <div className="absolute top-1/3 right-32 w-0.5 h-0.5 bg-white/60 rounded-full animate-ping delay-1000 shadow-sm shadow-white/40"></div>
      <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-amber-500/70 rounded-full animate-pulse delay-500 shadow-md shadow-amber-500/50"></div>
      <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping delay-300 shadow-md shadow-white/40"></div>
      <div className="absolute bottom-1/4 right-20 w-1 h-1 bg-amber-200/80 rounded-full animate-pulse delay-1200 shadow-sm shadow-amber-200/60"></div>
      <div className="absolute top-40 left-1/3 w-0.5 h-0.5 bg-white/70 rounded-full animate-ping delay-800 shadow-sm shadow-white/50"></div>
      <div className="absolute bottom-32 right-1/4 w-2 h-2 bg-amber-400/60 rounded-full animate-pulse delay-400 shadow-lg shadow-amber-400/40"></div>
      <div className="absolute top-1/5 left-40 w-1 h-1 bg-white/40 rounded-full animate-ping delay-600 shadow-sm shadow-white/30"></div>
      
      {/* Larger Pulsing Lights */}
      <div className="absolute top-24 right-40 w-3 h-3 bg-amber-400/50 rounded-full animate-pulse shadow-xl shadow-amber-400/70 blur-sm"></div>
      <div className="absolute bottom-24 left-32 w-4 h-4 bg-white/30 rounded-full animate-pulse delay-900 shadow-xl shadow-white/50 blur-sm"></div>

      <form onSubmit={handleSubmit(form_fnx)} className="w-full mt-12 max-w-md py-16 px-6 bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-400/20 relative group z-10">
    <div className='mb-6'> <Link
        href='/'
          className="w-full bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold py-3 px-4 rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] relative z-10"
        >Back
        </Link></div> 
        {/* Shimmer effect */}
        {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-2xl"></div> */}

        <div className="flex gap-4 mb-8 relative z-10">
          <h2 
          className="font-cinzel text-[#d4af37] text-4xl sm:text-6xl  font-bold mt-6 lg:mt-16
                          drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]"
          >
            Login
          </h2>
        
        </div>

    
        {/* Email field */}
        <div className="mb-6 relative z-10">
          <label htmlFor="email" className="block text-amber-300 font-semibold mb-2 text-sm tracking-wide">Email</label>
          <input {...register("email",{required:"must be present",pattern:/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/})}
            type="email"
            id="email"
            name="email"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
            placeholder="Enter your email"
          /><p className=" text-amber-300 font-bold text-lg z-20 drop-shadow-lg ">{errors?.email?.message}</p>
        </div>

        {/* Profile pic field (register only) */}
       

        {/* Password field */}
        <div className="mb-6 relative z-10">
          <label htmlFor="password" className="block text-amber-300 font-semibold mb-2 text-sm tracking-wide">Password</label>
          <input {...register("password",{required:"must be present"})}
            ref={(e) => {ref.current=e; register("password").ref(e)}}
            type="password"
            id="password"
            name="password"
            className="w-full px-4 py-3 bg-gray-900/50 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:border-transparent transition-all duration-300"
            placeholder="Enter your password"
          /><p className="absolute  text-amber-300 font-bold text-xl z-20 drop-shadow-lg ">{errors?.password?.message}</p>
        </div>

        {/* Confirm password field (register only) */}
        

        {/* Submit button */}
        <button
          type="submit"
          className="w-full/2 mt-12 bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold py-3 px-4 rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] relative z-10"
        >
          {'LogIn'}
        </button>
         <p className="absolute left-60 bottom-10 text-amber-300 font-bold text-xl z-20 drop-shadow-lg ">{logStatus.msg}</p>
      </form>

      <DevTool control={control}/>
      
      {/* Status message */}
     
    </div>
    );
}

export default SignUp;