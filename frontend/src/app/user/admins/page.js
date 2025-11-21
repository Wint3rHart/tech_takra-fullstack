import React from 'react';
import { cookies } from 'next/headers';
import{ Suspense } from 'react';
import CryptoJS from 'crypto-js';
import Link from 'next/link';
import BgEffect from '@/util_comps/bg_effect';
import { Admin } from './admin';


const Page = async() => {
    try {
   return <Admin  />
        const cookieStore=await cookies();

        const user=cookieStore.get('User-data')?.value;
        if(user){
const decrypt=CryptoJS.AES.decrypt(user,'125xyzabc').toString(CryptoJS.enc.Utf8);
const parsed=JSON.parse(decrypt);
if(parsed){

    if(new Date(parsed.expiry)>new Date()){


       if( parsed.role.toUpperCase().trim() === "SUPERADMIN" ){return     <div className="min-h-screen relative  py-8 px-4"> <Admin user={parsed} access={parsed.accessToken} /> </div>}
else{  throw new Error("User Not Authorized")}

       

}else{
    throw new Error("User data not available. Please login again.")}
        }else {
        
    throw new Error("User Not Authorized. Please login again.")}
       
        
    }else {console.log("NO XXXX");
        
    throw new Error("User Not Authorized. Please login again.")}
    } catch (error) {
        console.log(error.message);
        
        return (
        <div className='min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-black relative overflow-hidden'>
      
      {/* Ambient Background Effects - Fireflies/Stars */}


<BgEffect/>

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
        <h1 className={`font-cinzel text-5xl font-black mb-4
                      text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-300
                      drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]`}>
          Oops! Something Went Wrong
        </h1>
        
        {/* Error Message */}
        <div className={`font-playfair text-xl text-gray-300 mb-8 font-semibold
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
        <p className={`font-playfair text-gray-400 text-sm`}>
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
