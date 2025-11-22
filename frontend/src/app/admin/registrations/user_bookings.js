"use client"

import useData from '@/client_hooks/useData';
import React, { useEffect, useMemo } from 'react';
import Link from 'next/link';
import Cards from './cards';
import BgEffect from '@/util_comps/bg_effect';
import { useSearchParams } from 'next/navigation';



const UserBookings = ({access}) => {
console.log("in user");
let search=useSearchParams();


    const {query,abort_ref}=useData("get_forms",!search.get("id")?"All":search.get("id"));
    const {data,isSuccess,error,isPending}=query;

const sortedForms = useMemo(()=>{
  if(!Array.isArray(data)) return [];
  return [...data].sort((a,b)=>{
    const dateA = new Date(a?.createdAt || a?.updatedAt || 0).getTime();
    const dateB = new Date(b?.createdAt || b?.updatedAt || 0).getTime();
    return dateB - dateA;
  });
},[data]);

const latestSubmission = sortedForms[0]?.createdAt ? new Date(sortedForms[0].createdAt).toLocaleString("en-GB",{
  day:"2-digit",
  month:"short",
  year:"numeric",
  hour:"2-digit",
  minute:"2-digit"
}) : "—";

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
            
            <p className={`font-inter text-[#d4af37] text-2xl font-bold 
                          drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]`}>
              Loading Your Journey...
            </p>
          </div>
        </div>}
    if(error){return <div>  <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden'>
      
      {/* Ambient Background Effects - Fireflies/Stars */}
    <BgEffect/>
      
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
        <h1 className={`font-inter text-5xl font-black mb-4
                      text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-300
                      drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]`}>
          Oops! Something Went Wrong
        </h1>
        
        {/* Error Message */}
        <div className={`font-poppins text-xl text-gray-300 mb-8 font-semibold
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
        <p className={`font-poppins text-gray-400 text-sm`}>
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
        <div className='w-full min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 relative'>
          <BgEffect />
          <div className='max-w-7xl mx-auto relative z-10 space-y-8'>
            <div className='flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between'>
              <div>
                <p className='text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2'>Admin Panel</p>
                <h1 className='font-inter text-[#d4af37] text-4xl sm:text-5xl font-bold drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)] mb-3'>Registration Submissions</h1>
                <p className='text-gray-400 text-base max-w-2xl font-inter'>Review every registration with the same premium surface used across Team and Announcements. Latest entries stay on top so you can act quickly.</p>
              </div>
              <div className='flex flex-wrap gap-3'>
                <Link href="/admin" className='px-6 py-3 rounded-xl font-inter font-bold text-sm bg-gray-800 text-gray-200 border border-amber-600/20 hover:border-amber-500/50 hover:text-amber-300 transition-all duration-300'>Back to Admin Home</Link>
                <Link href="/register" className='px-6 py-3 rounded-xl font-inter font-bold text-sm bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 shadow-lg shadow-amber-400/30 hover:shadow-2xl hover:scale-[1.02] transition-all duration-300'>Open Registration Form</Link>
              </div>
            </div>

            <div className='grid grid-cols-1 sm:grid-cols-3 gap-4'>
              <div className='bg-gray-800/60 border border-amber-600/20 rounded-2xl p-5'>
                <p className='text-xs tracking-wide text-amber-400/70 font-semibold uppercase mb-1 font-poppins'>Total submissions</p>
                <p className='text-3xl font-inter font-bold text-white'>{sortedForms.length}</p>
              </div>
              <div className='bg-gray-800/60 border border-amber-600/20 rounded-2xl p-5'>
                <p className='text-xs tracking-wide text-amber-400/70 font-semibold uppercase mb-1 font-poppins'>Latest submission</p>
                <p className='text-lg text-gray-100 font-inter'>{latestSubmission}</p>
              </div>
              <div className='bg-gray-800/60 border border-amber-600/20 rounded-2xl p-5'>
                <p className='text-xs tracking-wide text-amber-400/70 font-semibold uppercase mb-1 font-poppins'>Source</p>
                <p className='text-lg text-gray-100 font-inter'>All Registrations</p>
              </div>
            </div>

            <div className='space-y-6'>
              {sortedForms.length ? sortedForms.map((x,index)=>(
                <Cards key={x._id} data={x} i={index+1} access={access}/>
              )):(
                <div className='text-center py-16 bg-gray-800/50 rounded-2xl border border-amber-600/20'>
                  <p className='text-xl text-gray-400 font-inter font-bold'>No registrations found</p>
                  <p className='text-sm text-gray-500 mt-2 font-inter'>Once applicants submit a form, it will appear here instantly.</p>
                </div>
              )}
            </div>
          </div>
        </div>
    );
}

export default UserBookings;
