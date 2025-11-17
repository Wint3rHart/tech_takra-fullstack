import { cookies } from 'next/headers';
import React, { Suspense } from 'react';
import CryptoJS from 'crypto-js';
import { Cinzel, Work_Sans } from 'next/font/google';
import Link from 'next/link';
import UserBookings from './user_bookings';


const tangerine = Cinzel({ subsets: ["latin"], weight: ["400", "700"] });
const cormotant = Work_Sans({ subsets: ["latin"], weight: ["400", "700"] });

const Page =async () => {




    try {
     
        const cookieStore=await cookies();

        const user=cookieStore.get('User-data')?.value;
        if(user){
const decrypt=CryptoJS.AES.decrypt(user,'125xyzabc').toString(CryptoJS.enc.Utf8);
const parsed=JSON.parse(decrypt);
if(parsed){

    if(new Date(parsed.expiry)>new Date()){
return (
    <div className="min-h-screen relative  py-8 px-4">
         <User_header decrypt={parsed} tangerine={tangerine}  cormotant={cormotant}/>
          </div>
)
}else{
    throw new Error("User data not available. Please login again.")}
        }else {console.log("NO XXXX");
        
    throw new Error("User Not Authorized. Please login again.")}
       
        
    }else {console.log("NO XXXX");
        
    throw new Error("User Not Authorized. Please login again.")}
    } catch (error) {
        console.log(error.message);
        
        return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden'>
      
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
      <div className='mt-44 max-w-[150px] absolute top-0 left-0 z-50'>
        <Link
          href={'/'}
          className="w-28 h-[44px] text-base font-bold hover:scale-105 cursor-pointer transition-all duration-500 
                   text-stone-900 ml-12 bg-gradient-to-r from-[#d4af37] to-amber-500
                   hover:from-amber-500 hover:to-[#d4af37]
                   rounded-full flex items-center justify-center gap-2
                   shadow-lg hover:shadow-2xl hover:shadow-amber-400/30
                   border border-amber-600/30
                   group relative overflow-hidden"
        >
          {/* Shimmer Effect */}
          <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full'></div>
          
          <span className="relative z-10 transition-transform group-hover:-translate-x-1 duration-300">←</span>
          <span className="relative z-10">Back</span>
        </Link>
      </div>
      
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
    </div>

        );
    }
    
}

export default Page;


const User_header=({decrypt,tangerine,cormotant})=>{


    
    return   <div className="max-w-7xl mt-12 mx-auto relative">
      {/* Back Button - Elegant Gold Theme */}
      <div className="absolute top-28= left-16 z-60">
        <Link
          href='/'
          className="mt-6 px-6 p-3 rounded-xl text-stone-900 font-bold
                   bg-gradient-to-r from-[#d4af37] to-amber-500
                   hover:from-amber-500 hover:to-[#d4af37]
                   transition-all duration-500 shadow-lg
                   hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/30
                   flex items-center gap-2 border border-amber-600/30
                   group relative overflow-hidden"
        >
          {/* Shimmer Effect */}
          <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>
          
          <span className="relative z-10 transition-transform group-hover:-translate-x-1 duration-300">←</span>
          <span className="relative z-10">Back</span>
        </Link>
      </div>

      {/* Profile Card - Dark Elegant Theme */}
      <div className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl shadow-2xl overflow-hidden mb-8 
                    border border-amber-600/20 hover:shadow-3xl hover:shadow-amber-400/10 transition-all duration-500
                    relative group">
        
        {/* Ambient Light Effect */}
        <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000'></div>

        {/* Header Background - Elegant Dark with Golden Accents */}
        <div className="h-48 bg-gradient-to-br from-gray-800 via-gray-900 to-black relative overflow-hidden">
          {/* Subtle Pattern */}
          <div className="absolute inset-0 opacity-10" 
               style={{
                 backgroundImage: 'radial-gradient(circle, rgba(212,175,55,0.3) 1px, transparent 1px)',
                 backgroundSize: '30px 30px'
               }}>
          </div>
          
          {/* Floating Particles */}
          <div className="absolute top-8 left-12 w-1 h-1 bg-amber-400/80 rounded-full animate-ping shadow-lg shadow-amber-400/60"></div>
          <div className="absolute top-16 right-20 w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse shadow-md shadow-amber-300/50"></div>
          <div className="absolute bottom-12 left-24 w-0.5 h-0.5 bg-white/60 rounded-full animate-ping delay-700 shadow-sm shadow-white/40"></div>
          <div className="absolute top-20 right-32 w-1 h-1 bg-amber-500/70 rounded-full animate-pulse delay-500 shadow-md shadow-amber-500/50"></div>
          <div className="absolute bottom-16 right-16 w-2 h-2 bg-amber-400/50 rounded-full animate-pulse shadow-xl shadow-amber-400/70 blur-sm"></div>
          
          {/* Gradient Overlay */}
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-gray-900/80"></div>
        </div>
        
        {/* Profile Info */}
        <div className="px-8 pb-8 -mt-20 relative z-10">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between">
            <div className="flex flex-col md:flex-row md:items-end gap-6">
              {/* Avatar - Golden Gradient */}
              <div className="w-32 h-32 rounded-3xl bg-gradient-to-br from-[#d4af37] via-amber-500 to-amber-600
                            shadow-2xl shadow-amber-400/30 border-4 border-gray-800 
                            flex items-center justify-center
                            relative overflow-hidden group/avatar">
                {/* Shimmer on Avatar */}
                <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/avatar:translate-x-full transition-transform duration-1000'></div>
                
                <span className={`${tangerine.className} text-5xl font-black text-gray-900 relative z-10 drop-shadow-lg`}>
                  {decrypt?.name?.charAt(0).toUpperCase()}
                </span>
              </div>
              
              {/* Name & Email */}
              <div className="mb-2">
                <h1 className={`${tangerine.className} text-5xl font-black text-transparent bg-clip-text 
                              bg-gradient-to-r from-[#d4af37] to-amber-300 mb-2
                              drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]`}>
                  {decrypt?.name}
                </h1>
                <div className={`${cormotant.className} flex items-center gap-2 text-gray-300`}>
                  <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} 
                          d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                  <span className="font-semibold">{decrypt?.email}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Engagements & Projects */}
      
        <UserBookings id={"169d0e6b-0ad6-47f9-a919-d3b6b9ad736c"} />
    
    </div>
}