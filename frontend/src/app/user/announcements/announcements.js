"use client";

import React, { useEffect, useState } from "react";
import useData from "@/client_hooks/useData";
import BgEffect from "@/util_comps/bg_effect";
import Cards from "./cards";
import { Form } from "./form";

export const Announcements = ({user,access}) => {
  console.log("in notifications");
  const [create, setCreate] = useState(false);

  const { query, abort_ref } = useData("notice");
  const { data, isSuccess, error, isPending } = query;

  useEffect(() => {
    console.log("notifications data:", data);
  }, [data, isSuccess]);

  useEffect(() => {
    console.log("notifications page re-rendered");
  });

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

          <p className="font-cinzel text-[#d4af37] text-2xl font-bold 
                          drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]">
            Loading Notifications...
          </p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div>
        <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden">
          {/* Ambient Background Effects */}
          <BgEffect />

          {/* Error Card */}
          <div className="text-center p-12 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                    rounded-3xl shadow-2xl border border-amber-600/20 
                    max-w-2xl relative group
                    hover:shadow-3xl hover:shadow-amber-400/10 transition-all duration-500">
            {/* Shimmer on Card */}
            <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000 rounded-3xl"></div>

            {/* Icon with Glow */}
            <div className="relative inline-block mb-6">
              <div className="absolute inset-0 bg-amber-400/20 blur-xl rounded-full animate-pulse"></div>
              <div className="text-7xl relative z-10 filter drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">
                ⚠️
              </div>
            </div>

            {/* Error Title */}
            <h1 className="font-cinzel text-5xl font-black mb-4
                      text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-300
                      drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]">
              Oops! Something Went Wrong
            </h1>

            {/* Error Message */}
            <div className="font-playfair text-xl text-gray-300 mb-8 font-semibold
                       bg-gray-800/50 p-6 rounded-2xl border border-amber-600/10">
              <p className="leading-relaxed">{error.message}</p>
            </div>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-3 mb-6">
              <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-amber-400/50"></div>
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
              <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-amber-400/50"></div>
            </div>

            {/* Helpful Message */}
            <p className="font-playfair text-gray-400 text-sm">
              Don&apos;t worry, your journey continues. Let&apos;s get you back
              on track.
            </p>
          </div>

          {/* Corner Accent Lights */}
          <div className="absolute top-8 left-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse shadow-lg shadow-amber-400/60"></div>
          <div className="absolute top-8 right-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-400 shadow-lg shadow-amber-400/60"></div>
          <div className="absolute bottom-8 left-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-800 shadow-lg shadow-amber-400/60"></div>
          <div className="absolute bottom-8 right-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-1200 shadow-lg shadow-amber-400/60"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[97vw] ml-2 mt-22 lg:mt-36 bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                              rounded-3xl flex flex-col items-center justify-center shadow-2xl p-8 border border-amber-600/20
                              hover:shadow-3xl hover:shadow-amber-400/10 transition-all duration-500
                              relative group overflow-hidden">
      <div className="w-[50vw] flex justify-between">
        <button
          onClick={() => {
            setCreate(false);
          }}
          type="button"
          className="w-[20vw] cursor-pointer mt-6 px-6 py-3 rounded-xl mt-12 font-bold text-gray-900
                   bg-gradient-to-r from-[#d4af37] to-amber-500 hover:scale-102 transition-all duration-500"
        >
          Update or Delete Notifications →
        </button>
        <button
          onClick={() => {
            setCreate(true);
          }}
          type="button"
          className="w-[20vw] cursor-pointer mt-6 px-6 py-3 rounded-xl mt-12 font-bold text-gray-900
                   bg-gradient-to-r from-[#d4af37] to-amber-500 hover:scale-102 transition-all duration-500"
        >
          Create New Notification →
        </button>
      </div>

      <h1 className="font-cinzel text-[#d4af37] text-4xl sm:text-6xl  font-bold mt-6 lg:mt-16
                          drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]">
        Notifications
      </h1>

      {create ? (
        <Form user={user} access={access}/>
      ) : (
        data &&
        data.map((x, i) => (
          <div className="mt-3 w-full max-w-3xl" key={x._id || i}>
            <Cards data={x} i={i} user={user} access={access}/>
          </div>
        ))
      )}
    </div>
  );
};

