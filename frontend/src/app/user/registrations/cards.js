"use client"

import usePost from '@/client_hooks/usePost';
import React from 'react';

const Cards = React.memo(({data,i}) => {
    const {abort_ref,post,msg}=usePost("delete_form","DELETE");
const {mutate,error,isSuccess}=post;


    


    const del_fnx=(data_id)=>{
console.log(data_id);
mutate({data_id:data_id});

    };


    return (
        <div className="space-y-8">
            {data&& (
                <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                              rounded-3xl shadow-2xl p-8 border border-amber-600/20
                              hover:shadow-3xl hover:shadow-amber-400/10 transition-all duration-500
                              relative group overflow-hidden">
                    
                    {/* Ambient Light Effect */}
                 
                    
                    {/* Floating Particles */}
                    <div className="absolute top-8 right-12 w-1 h-1 bg-amber-400/80 rounded-full animate-ping shadow-lg shadow-amber-400/60"></div>
                    <div className="absolute top-20 left-20 w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse shadow-md shadow-amber-300/50"></div>
                    <div className="absolute bottom-16 right-24 w-0.5 h-0.5 bg-white/60 rounded-full animate-ping delay-700 shadow-sm shadow-white/40"></div>
                    
                    {/* Header */}
                    <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-amber-600/20 relative z-10">
                        <div className="h-full w-[30vw]  bg-gradient-to-br from-[#d4af37] via-amber-500 to-amber-600 
                                      rounded-2xl flex items-center justify-center text-3xl shadow-lg shadow-amber-400/30
                                      border border-amber-600/30 relative overflow-hidden group/icon">
                         
                            
                            <h2 className="text-xl font-black text-transparent bg-clip-text 
                                         bg-gradient-to-r from-white to-amber-300/90
                                         drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]">
                             {i}
                            </h2>
                           
                        </div>
                    </div>

                    {/* Cards Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 relative z-10">
                       
                            <div 
                                 className="group/card bg-gradient-to-br from-gray-800 via-gray-900 to-black
                                          rounded-2xl p-6 border-2 border-amber-600/30
                                          hover:border-amber-500/60 hover:shadow-xl hover:shadow-amber-400/20
                                          transition-all duration-500 hover:scale-[1.02]
                                          relative overflow-hidden">
                                
                              
                                
                                
                                {/* City & Hotel Header */}
                                <div className="mb-4 relative z-10">
                                    <div className="flex items-center gap-2 mb-2">
                                        <span className="text-2xl">🏙️</span>
                                        <h3 className="text-2xl font-black text-transparent bg-clip-text 
                                                     bg-gradient-to-r from-[#d4af37] to-amber-300
                                                     drop-shadow-[1px_1px_2px_rgba(212,175,55,0.3)]">
                                            {data.name}
                                        </h3>
                                    </div>
                                    
                                    <div className="flex items-center gap-2 text-gray-300 ml-8">
                                        <span className="text-sm">🏨</span>
                                        <span className="font-semibold text-sm">{data.department}</span>
                                    </div>
                                </div>

                                {/* Decorative Divider */}
                                <div className="flex justify-center items-center gap-2 my-4 relative z-10">
                                    <div className="h-0.5 w-full bg-gradient-to-r from-transparent via-amber-400/30 to-transparent rounded-full"></div>
                                </div>

                                {/* Package Info */}
                               
                                    <div className="mb-4 relative z-10">
                                        <h4 className="text-lg font-bold text-gray-100 mb-2
                                                     group-hover/card:text-amber-300 transition-colors duration-300">
                                            {data.package}
                                        </h4>
                                        <p className="text-sm text-gray-400 leading-relaxed">
                                            {data.rollNo}
                                        </p>
                                    </div>
                              

                                {/* Details Grid */}
                                <div className="grid grid-cols-2 gap-3 mb-5 relative z-10">
                                    {/* Duration */}
                                    <div className="bg-gray-800/50 rounded-xl p-3 border border-amber-600/20
                                                  hover:border-amber-500/40 transition-all duration-300">
                                        <div className="flex items-center gap-2 mb-1">
                                            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                      d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-xs text-gray-400 font-semibold">Contact</span>
                                        </div>
                                        <p className="text-lg font-bold text-amber-300">{data.phone} </p>
                                    </div>

                                    {/* Price */}
                                    <div className="bg-gray-800/50 rounded-xl p-3 border border-amber-600/20
                                                  hover:border-amber-500/40 transition-all duration-300">
                                        <div className="flex items-center gap-2 mb-1">
                                            <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                                                      d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                            </svg>
                                            <span className="text-xs text-gray-400 font-semibold">Email</span>
                                        </div>
                                        <p className="text-lg font-bold text-amber-300">
                                           {data.email}
                                        </p>
                                    </div>
                                </div>

                                {/* Special Requests */}
                                
                                    <div className="mb-4 p-3 bg-gray-800/30 rounded-xl border border-amber-600/10 relative z-10">
                                        <p className="text-xs text-gray-400 font-semibold mb-1">Applied On :</p>
                                        <p className="text-sm text-gray-300">{ data.createdAt}</p>
                                    </div>
                               

                               
                                <button onClick={()=>{del_fnx(data._id)}} className="w-full mt-4 px-6 py-3 rounded-xl font-bold text-gray-900
                                                 bg-gradient-to-r from-[#d4af37] to-amber-500
                                                 hover:from-amber-500 hover:to-[#d4af37]
                                                 shadow-lg hover:shadow-2xl hover:shadow-amber-400/30
                                                 hover:scale-105 transition-all duration-500
                                                 border border-amber-600/30
                                                 relative overflow-hidden group/btn z-10">
                                    {/* Button Shimmer */}
                                    <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 cursor-pointer'></div>
                             <span className="relative z-10 flex items-center justify-center gap-2">
                                                                            Cancel Data
                                        <span className="transition-transform group-hover/btn:translate-x-1 duration-300">→</span>
                                    </span>
                                </button>
 <div className="mb-4 p-3  rounded-xl border border-amber-600/10 relative z-10">
                                        <p className="text-xs text-gray-400 font-semibold mb-1"></p>
                                        <p className="text-sm text-gray-300">{ msg}</p>
                                    </div>
                                {/* Booking ID - Bottom Right */}
                                <div className="mt-3 text-right relative z-10">
                                    <p className="text-xs text-gray-500 font-mono">
                                        ID: {data.id?.slice(0, 8)}...
                                    </p>
                                </div>
                            </div>
                       
                    </div>
                </div>
            )}
        </div>
    );
}
)
export default Cards;