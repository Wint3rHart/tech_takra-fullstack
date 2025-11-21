"use client"

import usePost from '@/client_hooks/usePost';
import React from 'react';

const Cards = React.memo(({ data, i ,access}) => {
  const { abort_ref, post, msg } = usePost("delete_form", "DELETE",access);
  const { mutate, error, isSuccess } = post;

  const del_fnx = (data_id) => {
    console.log(data_id);
    mutate({ data_id: data_id });

   
  };

  return (
    <div className="space-y-8">
      {data && (
        <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                        rounded-3xl shadow-2xl p-6 sm:p-8 border border-amber-600/20
                        hover:shadow-3xl hover:shadow-amber-400/10 transition-all duration-500
                        relative group overflow-hidden">

          {/* Ambient Light Effect */}
          <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent 
                          -translate-x-full group-hover:translate-x-full transition-transform duration-2000 rounded-3xl" />

          {/* Floating Particles */}
          <div className="absolute top-8 right-12 w-1 h-1 bg-amber-400/80 rounded-full animate-ping shadow-lg shadow-amber-400/60"></div>
          <div className="absolute top-20 left-20 w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse shadow-md shadow-amber-300/50"></div>
          <div className="absolute bottom-16 right-24 w-0.5 h-0.5 bg-white/60 rounded-full animate-ping delay-700 shadow-sm shadow-white/40"></div>

          {/* Back Button */}
          <div className="mb-6 relative z-10">
            <a
              href="/user"
              className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-stone-900 font-bold text-sm
                         bg-gradient-to-r from-[#d4af37] to-amber-500
                         hover:from-amber-500 hover:to-[#d4af37]
                         transition-all duration-500 shadow-lg
                         hover:scale-105 hover:shadow-xl hover:shadow-amber-400/30
                         border border-amber-600/30
                         group/back relative overflow-hidden font-cinzel"
            >
              <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                              -translate-x-full group-hover/back:translate-x-full transition-transform duration-1000 rounded-xl'></div>
              <span className="relative z-10 transition-transform group-hover/back:-translate-x-1 duration-300">←</span>
              <span className="relative z-10">Back</span>
            </a>
          </div>

          {/* Header with Index Badge */}
          <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-amber-600/20 relative z-10">
            <div className="px-6 py-3 bg-gradient-to-br from-[#d4af37] via-amber-500 to-amber-600 
                            rounded-2xl flex items-center justify-center shadow-lg shadow-amber-400/30
                            border border-amber-600/30 relative overflow-hidden group/icon">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              -translate-x-full group-hover/icon:translate-x-full transition-transform duration-1000" />
              <h2 className="text-xl font-black text-gray-900 relative z-10 font-cinzel">
                #{i}
              </h2>
            </div>
            <div>
              <p className="text-xs text-amber-400/60 uppercase tracking-wider font-cinzel">Registration</p>
              <h3 className="text-2xl font-bold text-transparent bg-clip-text 
                             bg-gradient-to-r from-[#d4af37] to-amber-300 font-cinzel"
                  style={{ textShadow: '2px 2px 4px rgba(212,175,55,0.3)' }}>
                Application Details
              </h3>
            </div>
          </div>

          {/* Main Content Card */}
          <div className="group/card bg-gradient-to-br from-gray-800 via-gray-900 to-black
                          rounded-2xl p-6 border border-amber-600/20
                          hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-400/10
                          transition-all duration-500 relative overflow-hidden">

            {/* Card Shimmer */}
            <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent 
                            -translate-x-full group-hover/card:translate-x-full transition-transform duration-2000 rounded-2xl" />

            {/* Applicant Info */}
            <div className="mb-6 relative z-10">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] to-amber-500 
                                flex items-center justify-center shadow-lg shadow-amber-400/20">
                  <span className="text-2xl">👤</span>
                </div>
                <div>
                  <h3 className="text-2xl font-black text-transparent bg-clip-text 
                                 bg-gradient-to-r from-[#d4af37] to-amber-300 font-cinzel"
                      style={{ textShadow: '1px 1px 2px rgba(212,175,55,0.3)' }}>
                    {data.name}
                  </h3>
                  <p className="text-sm text-gray-400 font-playfair">{data.department}</p>
                </div>
              </div>
            </div>

            {/* Decorative Divider */}
            <div className="flex justify-center items-center gap-3 my-5 relative z-10">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-amber-400/50"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-amber-400/50"></div>
            </div>

            {/* Package & Roll No */}
            <div className="mb-5 relative z-10">
              <label className="text-xs font-semibold text-amber-400/70 mb-2 block uppercase tracking-wider font-cinzel">
                Package
              </label>
              <h4 className="text-xl font-bold text-gray-100 mb-3 font-playfair
                             group-hover/card:text-amber-300 transition-colors duration-300">
                {data.package}
              </h4>
              <label className="text-xs font-semibold text-amber-400/70 mb-1 block uppercase tracking-wider font-cinzel">
                Roll Number
              </label>
              <p className="text-base text-gray-300 font-playfair">{data.rollNo}</p>
            </div>

            {/* Contact Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 relative z-10">
              {/* Phone */}
              <div className="bg-gray-800/50 rounded-xl p-4 border border-amber-600/20
                              hover:border-amber-500/40 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider font-cinzel">Contact</span>
                </div>
                <p className="text-lg font-bold text-amber-300 font-playfair">{data.phone}</p>
              </div>

              {/* Email */}
              <div className="bg-gray-800/50 rounded-xl p-4 border border-amber-600/20
                              hover:border-amber-500/40 transition-all duration-300">
                <div className="flex items-center gap-2 mb-2">
                  <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider font-cinzel">Email</span>
                </div>
                <p className="text-base font-bold text-amber-300 font-playfair break-all">{data.email}</p>
              </div>
            </div>

            {/* Applied On */}
            <div className="mb-5 p-4 bg-gray-800/30 rounded-xl border border-amber-600/10 relative z-10">
              <p className="text-xs text-amber-400/70 font-semibold mb-1 uppercase tracking-wider font-cinzel">Applied On</p>
              <p className="text-base text-gray-300 font-playfair">{data.createdAt}</p>
            </div>

            {/* Delete Button */}
            <button
              onClick={() => { del_fnx(data._id) }}
              className="w-full px-6 py-3 rounded-xl font-bold font-cinzel text-gray-900
                         bg-gradient-to-r from-red-500 to-red-700
                         hover:from-red-600 hover:to-red-800
                         shadow-lg hover:shadow-2xl hover:shadow-red-400/30
                         hover:scale-[1.02] transition-all duration-500
                         border border-red-600/30
                         relative overflow-hidden group/btn z-10 cursor-pointer"
            >
              <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                              -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 rounded-xl'></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                Cancel Registration
                <span className="transition-transform group-hover/btn:translate-x-1 duration-300">→</span>
              </span>
            </button>

            {/* Message Display */}
            {msg && (
              <div className="mt-4 p-4 rounded-xl border border-amber-600/20 bg-gray-800/50 relative z-10">
                <p className="text-sm text-gray-300 font-playfair">{msg}</p>
              </div>
            )}

            {/* Registration ID */}
            <div className="mt-4 text-right relative z-10">
              <p className="text-xs text-gray-500 font-mono">
                ID: {data._id?.slice(0, 12)}...
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
});

export default Cards;