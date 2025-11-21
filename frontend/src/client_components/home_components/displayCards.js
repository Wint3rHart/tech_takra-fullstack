"use client"

import React from 'react';
import { motion, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DisplayCards = ({ scroll, ind, x, nav_url, isMobile }) => {

  let router = useRouter();

  const math_memo = Math.random() * (100 - 50) + 50;

  // DESKTOP animation (unchanged)
  let transX = useTransform(
    scroll,
    [0, 0.3, 0.9],
    [
      `translate3d(${ind * -15}vw,0,0) rotateY(35deg)`,
      `translate3d(0vw,0,0) rotateY(0deg)`,
      `translate3d(0vw,${math_memo}px,0) rotateY(0deg)`
    ]
  );
  // Build elements directly from the provided `x` object (no memoization)
  const title = x?.title || x?.name || 'Untitled';
  const location = x?.location || x?.place || '';
  const formattedDate = x?.date ? new Date(x.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : '';

  // Attempt to get a usable image URL from x.images if available
  const firstImage = x?.images && x.images.length ? x.images[0] : null;

  const resolveImage = (img) => {
    if (!img) return null;
    if (typeof img === 'string') return img;
    return img.url || img.src || img.path || img.secure_url || img.publicUrl || img.public_url || img.thumb || null;
  };

  const firstImageUrl = resolveImage(firstImage);
  const bgStyle = firstImageUrl
    ? { backgroundImage: `url(${firstImageUrl})`, backgroundSize: 'cover', backgroundPosition: 'center' }
    : {};


  /* -----------------------------------------
     MOBILE VERSION
  ------------------------------------------ */
  if (isMobile) {
    return (
      <div  className={`
          w-full
          max-w-md
          mx-auto
          mb-4
          shadow-lg
          min-h-[50vh]
          cursor-pointer
          rounded-2xl 
          border
          border-amber-400/80
          relative 
          text-white 
          bg-no-repeat
          bg-[100%] 
          overflow-hidden
          backdrop-blur-sm
        `}>
            <div className="rounded-xl h-full w-full absolute bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.3)] inset-0" />
            <div className="rounded-2xl h-full w-full absolute bg-gradient-to-b from-[rgba(255,255,255,0.03)] via-[rgba(0,0,0,0.12)] to-[rgba(0,0,0,0.36)] inset-0" />
        
        <div className="absolute top-4 right-4 w-1 h-1 bg-amber-400/60 rounded-full"></div>
        <div className="absolute top-8 right-8 w-0.5 h-0.5 bg-white/50 rounded-full"></div>
        <div className="absolute top-6 right-12 w-1.5 h-1.5 bg-amber-300/40 rounded-full"></div>
        
        <div className="relative flex flex-col items-center text-center p-4" style={bgStyle}>
          <h3 className="text-2xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 to-amber-500 mb-2">{title}</h3>
          <p className="text-sm text-amber-200/90 font-medium mb-1">{location}</p>
          <p className="text-xs text-amber-300/80 mb-3">{formattedDate}</p>
          <Link href={nav_url} className="mt-2 inline-block text-sm text-amber-300 font-bold px-4 py-2 rounded-lg bg-amber-900/20 hover:bg-amber-900/30">View Details</Link>
        </div>
      </div>
    );
  }


  /* -----------------------------------------
     DESKTOP VERSION (ORIGINAL EXACT)
  ------------------------------------------ */
  return (
    <motion.div
      key={ind}
      style={{ transform: transX, willChange: "transform", ...bgStyle }}
      className={`group 
        w-[25vw] 
        ml-6
        shadow-[-12px_6px_20px_4px_rgba(0,0,0,0.8)]
        hover:shadow-[-15px_8px_10px_6px_rgba(0,0,0,0.9)]
        h-[70vh]
        mb-2
        cursor-pointer
        rounded-2xl 
        border
        border-amber-400/80
        hover:border-amber-300/90
        relative 
        text-white 
        bg-no-repeat
        bg-[100%] 
        z-20
        overflow-hidden
        backdrop-blur-sm
      `}
    > <div className="rounded-xl h-full w-full absolute bg-gradient-to-b from-[rgba(0,0,0,0.6)] to-[rgba(0,0,0,0.3)] inset-0" />
      <div className="rounded-2xl h-full w-full absolute bg-gradient-to-b from-[rgba(255,255,255,0.03)] via-[rgba(0,0,0,0.12)] to-[rgba(0,0,0,0.36)] inset-0" />
        
        <div className="absolute top-4 right-4 w-1 h-1 bg-amber-400/60 rounded-full"></div>
        <div className="absolute top-8 right-8 w-0.5 h-0.5 bg-white/50 rounded-full"></div>
        <div className="absolute top-6 right-12 w-1.5 h-1.5 bg-amber-300/40 rounded-full"></div>
        
      <div className="relative p-6">
        <div className="mb-4">
          <h2 className="text-3xl lg:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-600">{title}</h2>
        </div>

        <div className="flex items-center gap-4 mt-3 mb-4">
          <svg className="w-5 h-5 text-amber-300" fill="currentColor" viewBox="0 0 20 20"><path d="M10 2a6 6 0 100 12A6 6 0 0010 2z"/></svg>
          <p className="text-sm text-amber-200 font-semibold">{location}</p>
          <span className="mx-2 text-amber-400">•</span>
          <p className="text-sm text-amber-300">{formattedDate}</p>
        </div>

        <Link href={nav_url} className="inline-block mt-6 text-lg text-[#d4af37] font-bold hover:underline">View More</Link>
      </div>
    </motion.div>
  );
};

export default React.memo(DisplayCards);
