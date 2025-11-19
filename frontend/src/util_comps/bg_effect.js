import React from 'react';

const BgEffect = () => {
    return (
        <div>
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
          
          {/* Larger Pulsing Lights */}
          <div className="absolute top-24 right-40 w-3 h-3 bg-amber-400/50 rounded-full animate-pulse shadow-xl shadow-amber-400/70 blur-sm"></div>
          <div className="absolute bottom-24 left-32 w-4 h-4 bg-white/30 rounded-full animate-pulse delay-900 shadow-xl shadow-white/50 blur-sm"></div>
          <div className="absolute top-1/2 left-20 w-2.5 h-2.5 bg-amber-300/40 rounded-full animate-pulse delay-200 shadow-lg shadow-amber-300/60 blur-sm"></div>
          
          {/* Twinkling Stars */}
          <div className="absolute top-16 right-16 w-0.5 h-0.5 bg-white/90 rounded-full animate-ping delay-100 shadow-sm shadow-white/70"></div>
          <div className="absolute top-28 left-1/2 w-0.5 h-0.5 bg-white/80 rounded-full animate-ping delay-1500 shadow-sm shadow-white/60"></div>
          <div className="absolute bottom-20 left-1/3 w-0.5 h-0.5 bg-white/70 rounded-full animate-ping delay-2000 shadow-sm shadow-white/50"></div>
          <div className="absolute top-36 right-1/5 w-0.5 h-0.5 bg-white/85 rounded-full animate-ping delay-1800 shadow-sm shadow-white/65"></div>
          
          {/* Floating Orbs */}
          <div className="absolute top-1/6 right-1/6 w-6 h-6 bg-amber-400/20 rounded-full animate-pulse shadow-2xl shadow-amber-400/40 blur-md"></div>
          <div className="absolute bottom-1/6 left-1/6 w-5 h-5 bg-white/15 rounded-full animate-pulse delay-1100 shadow-2xl shadow-white/30 blur-md"></div>
          
          {/* Moving Light Trails */}
          <div className="absolute top-1/3 left-1/2 w-1 h-8 bg-gradient-to-b from-amber-400/60 to-transparent rounded-full animate-pulse delay-300 shadow-lg shadow-amber-400/50 transform rotate-45"></div>
          <div className="absolute bottom-1/3 right-1/2 w-0.5 h-6 bg-gradient-to-t from-white/50 to-transparent rounded-full animate-pulse delay-700 shadow-md shadow-white/40 transform -rotate-45"></div>
          
          {/* Corner Accent Lights */}
          <div className="absolute top-8 left-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse shadow-lg shadow-amber-400/60"></div>
          <div className="absolute top-8 right-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-400 shadow-lg shadow-amber-400/60"></div>
          <div className="absolute bottom-8 left-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-800 shadow-lg shadow-amber-400/60"></div>
          <div className="absolute bottom-8 right-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-1200 shadow-lg shadow-amber-400/60"></div>
          
          {/* Glowing Particles */}
          <div className="absolute top-12 left-1/4 w-1 h-1 bg-amber-200/80 rounded-full animate-ping delay-250 shadow-md shadow-amber-200/60"></div>
          <div className="absolute bottom-16 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-ping delay-750 shadow-sm shadow-white/50"></div>
          <div className="absolute top-44 right-1/4 w-1 h-1 bg-amber-300/70 rounded-full animate-ping delay-1350 shadow-md shadow-amber-300/50"></div></div>
    );
}

export default BgEffect;
