"use client"

import useData from '@/client_hooks/useData';
import React, { useEffect } from 'react';
import { Cinzel, Work_Sans } from 'next/font/google';
import Link from 'next/link';
import Cards from './cards';


const tangerine = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const cormotant = Work_Sans({ subsets: ["latin"], weight: ["400", "700"] });



const UserBookings = ({id}) => {

    const {query,abort_ref}=useData("user_data",id)
    const {data,isSuccess,error,isPending}=query;

useEffect(()=>{console.log(data);
},[data,isSuccess])
useEffect(()=>{console.log("i re rendered,user bookings comp");
})


    if(isPending){return <div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-amber-600/20">
          <div className="text-center">
            {/* Elegant Loading Spinner */}
            <div className="w-16 h-16 border-4 border-amber-600/30 border-t-[#d4af37] 
                          rounded-full animate-spin mx-auto mb-4 shadow-lg shadow-amber-400/20"></div>
            
            {/* Floating Dots */}
            <div className="flex gap-2 justify-center mb-4">
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-200"></div>
            </div>
            
            <p className={`${tangerine.className} text-[#d4af37] text-2xl font-bold 
                          drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]`}>
              Loading Your Journey...
            </p>
          </div>
        </div>}
    if(error){return <div>  <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden'>
      
      {/* Ambient Background Effects - Fireflies/Stars */}
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
      
      {/* Larger Glowing Orbs */}
      <div className="absolute top-24 right-40 w-3 h-3 bg-amber-400/50 rounded-full animate-pulse shadow-xl shadow-amber-400/70 blur-sm"></div>
      <div className="absolute bottom-24 left-32 w-4 h-4 bg-white/30 rounded-full animate-pulse delay-900 shadow-xl shadow-white/50 blur-sm"></div>
      
      {/* Back Button - Top Left */}
      {/*  */}
      {/* Error Card - Center */}
      <div className="text-center p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                    rounded-3xl shadow-2xl border border-amber-600/20 
                    max-w-2xl relative group
                    hover:shadow-3xl hover:shadow-amber-400/10 transition-all duration-500">
        
        {/* Shimmer on Card */}
        <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000 rounded-3xl'></div>
        
        {/* Icon with Glow */}
        <div className="relative inline-block mb-6">
          <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full animate-pulse"></div>
          <div className="text-7xl relative z-10 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
            ⚠️
          </div>
        </div>
        
        {/* Error Title */}
        <h1 className={`${tangerine.className} text-5xl font-black mb-4
                      text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-300
                      drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]`}>
          Oops! Something Went Wrong
        </h1>
        
        {/* Error Message */}
        <div className={`${cormotant.className} text-xl text-gray-300 mb-8 font-semibold
                       bg-gray-800/50 p-6 rounded-2xl border border-amber-600/10`}>
          <p className="leading-relaxed">{error.message}</p>
        </div>
        
        {/* Decorative Line */}
        <div className="flex items-center justify-center gap-3 mb-6">
          <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-amber-400/50"></div>
          <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
          <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-amber-400/50"></div>
        </div>
        
        {/* Helpful Message */}
        <p className={`${cormotant.className} text-gray-400 text-sm`}>
          Don't worry, your journey continues. Let's get you back on track.
        </p>
      </div>
      
      {/* Corner Accent Lights */}
      <div className="absolute top-8 left-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse shadow-lg shadow-amber-400/60"></div>
      <div className="absolute top-8 right-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-400 shadow-lg shadow-amber-400/60"></div>
      <div className="absolute bottom-8 left-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-800 shadow-lg shadow-amber-400/60"></div>
      <div className="absolute bottom-8 right-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-1200 shadow-lg shadow-amber-400/60"></div>
    </div></div>}

    return (
        <div>
            {data.map((x,i)=>{
                return <div className='mt-3' key={x.id}><Cards booking={x} i={i}/></div>
            })}
        </div>
    );
}

export default UserBookings;
