"use client";

import React, { useEffect, useState } from "react";
import useData from "@/client_hooks/useData";
import BgEffect from "@/util_comps/bg_effect";
import Cards from "./cards";
import { Form } from "./form";


const mock_data=[{name:"Hassan",email:"test@gmail.com",role:"prime minister"}];

export const Admin = ({role,access,user}) => {
  console.log("in admin page", { access, role, user });

  const [create, setCreate] = useState(false);

  const { query, abort_ref } = useData("admin", access);
  const { data, isSuccess, error, isPending } = query;

  useEffect(() => {
    console.log("admins data:", data);
  }, [data, isSuccess]);

  useEffect(() => {
    console.log("admin page re-rendered");
  });

  if (isPending) {
    return (
      <div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-amber-600/20">
        <div className="text-center">
          {/* Elegant Loading Spinner */}
          <div
            className="w-16 h-16 border-4 border-amber-600/30 border-t-[#d4af37] 
                          rounded-full animate-spin mx-auto mb-4 shadow-lg shadow-amber-400/20"
          ></div>

          {/* Floating Dots */}
          <div className="flex gap-2 justify-center mb-4">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-200"></div>
          </div>

          <p
            className={`font-cinzel text-[#d4af37] text-2xl font-bold 
                          drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]`}
          >
            Loading Admins...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
          <BgEffect />

          <div
            className="text-center p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                    rounded-3xl shadow-2xl border border-amber-600/20 
                    max-w-2xl relative group
                    hover:shadow-3xl hover:shadow-amber-400/10 transition-all duration-500"
          >
            <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000 rounded-3xl"></div>

            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full animate-pulse"></div>
              <div className="text-7xl relative z-10 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                ⚠️
              </div>
            </div>

            <h1
              className={`font-cinzel  text-5xl font-black mb-4
                      text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-300
                      drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]`}
            >
              Oops! Something Went Wrong
            </h1>

            <div
              className={`font-playfair  text-xl text-gray-300 mb-8 font-semibold
                       bg-gray-800/50 p-6 rounded-2xl border border-amber-600/10`}
            >
              <p className="leading-relaxed">{error.message}</p>
            </div>

            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-amber-400/50"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-amber-400/50"></div>
            </div>

            <p className={`font-playfair  text-gray-400 text-sm`}>
              Don't worry, your control panel is safe. Try again in a moment.
            </p>
          </div>

          <div className="absolute top-8 left-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse shadow-lg shadow-amber-400/60"></div>
          <div className="absolute top-8 right-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-400 shadow-lg shadow-amber-400/60"></div>
          <div className="absolute bottom-8 left-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-800 shadow-lg shadow-amber-400/60"></div>
          <div className="absolute bottom-8 right-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-1200 shadow-lg shadow-amber-400/60"></div>
        </div>
      </div>
    );
  }

  return (
    <div className='w-full min-h-screen bg-gray-900 py-8 px-4 sm:px-6 lg:px-8 relative'>
      <BgEffect />
      
      <div className='max-w-7xl mx-auto relative z-10'>
        {/* Header Section */}
        <div className="text-center mb-8 sm:mb-12">
          <h1 className='font-cinzel text-[#d4af37] text-4xl sm:text-5xl lg:text-6xl font-bold mb-4
                          drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]'>
            Admin Management
          </h1>
          <div className='w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full mx-auto mb-6'></div>
          <p className="text-gray-400 text-lg">Manage admin accounts and permissions</p>
        </div>

        {/* Navigation Buttons */}
        <div className='flex flex-col sm:flex-row gap-4 justify-center items-center mb-8 sm:mb-12'>
          <button
            onClick={() => { setCreate(false) }}
            type="button"
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold font-cinzel text-sm sm:text-base
                       transition-all duration-500 relative overflow-hidden group
                       ${!create 
                         ? 'bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 shadow-lg shadow-amber-400/30 hover:shadow-2xl hover:shadow-amber-400/50 scale-105' 
                         : 'bg-gray-800 text-gray-400 border border-amber-600/20 hover:border-amber-500/40 hover:text-amber-400'
                       }`}
          >
            <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                            -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl'></div>
            <span className="relative z-10 flex items-center gap-2">
              View or Delete Admins 
              <span className="text-xl">→</span>
            </span>
          </button>
          
          <button
            onClick={() => { setCreate(true) }}
            type="button"
            className={`w-full sm:w-auto px-8 py-3 rounded-xl font-bold font-cinzel text-sm sm:text-base
                       transition-all duration-500 relative overflow-hidden group
                       ${create 
                         ? 'bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 shadow-lg shadow-amber-400/30 hover:shadow-2xl hover:shadow-amber-400/50 scale-105' 
                         : 'bg-gray-800 text-gray-400 border border-amber-600/20 hover:border-amber-500/40 hover:text-amber-400'
                       }`}
          >
            <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                            -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-xl'></div>
            <span className="relative z-10 flex items-center gap-2">
              Create New Admin 
              <span className="text-xl">+</span>
            </span>
          </button>
        </div>
        
        {/* Content Section */}
        <div className="w-full">
          {create ? (
            <Form access={access}/>
          ) : (
            <div className="space-y-6">
              {data && data.admins && data.admins.length > 0 ? (
                data.admins.map((x, i) => (
                  <Cards key={x._id || i} data={x} i={i} access={access} currentUserId={user?._id || user?.id || user?.userId}/>
                ))
              ) : (
                <div className="text-center py-16 bg-gray-800/50 rounded-2xl border border-amber-600/20">
                  <p className="text-xl text-gray-400 font-cinzel">No admins found</p>
                  <p className="text-sm text-gray-500 mt-2">Click "Create New Admin" to get started</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
