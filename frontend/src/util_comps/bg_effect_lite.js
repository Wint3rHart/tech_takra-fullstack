"use client"

import React from 'react';

const BgEffectLite = () => {
  return (
    <div className="pointer-events-none">
      {/* Minimal decorative orbs, low blur and fewer elements for performance */}
      <div className="absolute top-12 left-8 w-2 h-2 bg-amber-400/60 rounded-full animate-pulse shadow-md"></div>
      <div className="absolute top-16 right-12 w-1 h-1 bg-white/70 rounded-full animate-ping"></div>
      <div className="absolute bottom-16 left-10 w-2.5 h-2.5 bg-amber-300/40 rounded-full animate-pulse"></div>
    </div>
  );
};

export default BgEffectLite;
