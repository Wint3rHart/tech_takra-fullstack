"use client"

import useData from '@/client_hooks/useData';
import React, { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import BgEffect from '@/util_comps/bg_effect';
import TeamCards from './cards';
import { TeamForm } from './form';

export const Team = ({role,access}) => {
  console.log("in team management");
  let search = useSearchParams();

  let [create, setCreate] = useState(false);

  const { query, abort_ref } = useData("team");
  const { data, isSuccess, error, isPending } = query;

  useEffect(() => {
    console.log(data);
  }, [data, isSuccess])

  useEffect(() => {
    console.log("i re rendered, team members comp");
  })

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-amber-600/20">
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
            Loading Team Members...
          </p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div>
        <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden'>
          
          {/* Ambient Background Effects */}
          <BgEffect/>
          
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
        </div>
      </div>
    )
  }

  return (
    <div className='w-full min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 relative'>
      <BgEffect />
      
      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className='font-inter text-[#d4af37] text-4xl sm:text-5xl lg:text-6xl font-bold mb-4
                          drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]'>
            Team Management
          </h1>
          <div className='w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full mx-auto mb-6'></div>
          <p className="text-gray-400 text-lg">Manage your society team members</p>
        </div>

        {/* Navigation Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12'>
          <button
            onClick={() => { setCreate(false) }}
            type="button"
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold font-inter text-sm sm:text-base
                       transition-all duration-500 relative overflow-hidden group
                       ${!create 
                         ? 'bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 shadow-lg shadow-amber-400/30 hover:shadow-2xl hover:shadow-amber-400/50 scale-105' 
                         : 'bg-gray-800 text-gray-400 border border-amber-600/20 hover:border-amber-500/40 hover:text-amber-400'
                       }`}
          >
            <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                            -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl'></div>
            <span className="relative z-10 flex items-center gap-2">
              Update or Delete Members 
              <span className="text-xl">→</span>
            </span>
          </button>
          
          <button
            onClick={() => { setCreate(true) }}
            type="button"
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold font-inter text-sm sm:text-base
                       transition-all duration-500 relative overflow-hidden group
                       ${create 
                         ? 'bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 shadow-lg shadow-amber-400/30 hover:shadow-2xl hover:shadow-amber-400/50 scale-105' 
                         : 'bg-gray-800 text-gray-400 border border-amber-600/20 hover:border-amber-500/40 hover:text-amber-400'
                       }`}
          >
            <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                            -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl'></div>
            <span className="relative z-10 flex items-center gap-2">
              Add New Member 
              <span className="text-xl">+</span>
            </span>
          </button>
        </div>
        
        {/* Content Section */}
        <div className="w-full">
          {create ? (
            <TeamForm access={access}/>
          ) : (
            <div className="space-y-6">
              {data && data.length > 0 ? (
                data.map((x, i) => (
                  <TeamCards key={x._id} data={x} i={i} role={role} access={access}/>
                ))
              ) : (
                <div className="text-center py-16 bg-gray-800/50 rounded-2xl border border-amber-600/20">
                  <p className="text-xl text-gray-400 font-inter">No team members found</p>
                  <p className="text-sm text-gray-500 mt-2">Click "Add New Member" to get started</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
