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

  const formattedDate = data?.createdAt ? new Date(data.createdAt).toLocaleString("en-GB",{
    day:"2-digit",
    month:"short",
    year:"numeric",
    hour:"2-digit",
    minute:"2-digit"
  }) : "Not available";

  const shortId = data?._id ? `${data._id.slice(0, 12)}...` : "N/A";

  return (
    <article className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl border border-amber-600/20 shadow-2xl shadow-black/40 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>

      <div className="relative z-10 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-start gap-6 justify-between border-b border-amber-600/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 rounded-2xl font-cinzel font-black shadow-lg shadow-amber-400/30 border border-amber-600/40">
              #{String(i).padStart(2,"0")}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold">Registrant</p>
              <h3 className="text-2xl font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-200 drop-shadow-[1px_1px_2px_rgba(212,175,55,0.3)]">
                {data?.name}
              </h3>
              <p className="text-sm text-gray-400 font-playfair">{data?.department}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold">Submitted</p>
            <p className="text-base text-amber-200 font-semibold">{formattedDate}</p>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/60 border border-amber-600/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Roll Number</p>
            <p className="text-lg text-gray-200 font-mono">{data?.rollNo}</p>
          </div>
          <div className="bg-gray-800/60 border border-amber-600/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Department</p>
            <p className="text-lg text-gray-200 font-playfair">{data?.department}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-1">Phone</p>
            <p className="text-lg text-amber-200 font-playfair">{data?.phone}</p>
          </div>
          <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-1">Email</p>
            <p className="text-base text-gray-100 font-playfair break-all">{data?.email}</p>
          </div>
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-amber-600/20 pt-6">
          <p className="text-xs text-gray-500 font-mono">ID: {shortId}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {msg && (
              <div className="px-4 py-2 rounded-xl border border-amber-600/20 bg-gray-800/60 text-sm text-gray-200">
                {msg}
              </div>
            )}
            <button
              onClick={() => { del_fnx(data._id) }}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold font-cinzel text-gray-900
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
          </div>
        </div>
      </div>
    </article>
  );
});

export default Cards;