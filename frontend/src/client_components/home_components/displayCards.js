"use client"

import React from 'react';
import { motion, useTransform } from 'framer-motion';
import Link from 'next/link';

const DisplayCards = ({ scroll, ind, x, nav_url, isMobile }) => {

  const math_memo = Math.random() * (100 - 50) + 50;

  // DESKTOP animation
  let transX = useTransform(
    scroll,
    [0, 0.3, 0.9],
    [
      `translate3d(${ind * -15}vw,0,0) rotateY(35deg)`,
      `translate3d(0vw,0,0) rotateY(0deg)`,
      `translate3d(0vw,${math_memo}px,0) rotateY(0deg)`
    ]
  );

  const title = x?.title || x?.name || 'Untitled';
  const location = x?.location || x?.place || '';
  const formattedDate = x?.date
  ? new Date(x.date).toLocaleDateString('en-GB', { year: 'numeric', month: 'short', day: '2-digit' })
  : '';


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
      <div 
        className="group w-full max-w-md mx-auto mb-6 rounded-2xl overflow-hidden border border-amber-600/20 
                   bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-gray-800/80 
                   shadow-xl hover:shadow-2xl hover:shadow-amber-400/10 
                   transition-all duration-500 backdrop-blur-sm"
      >
        {/* Image container */}
        <div className="relative h-48 overflow-hidden bg-gray-800" style={bgStyle}>
          {!firstImageUrl && (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
              <div className="w-16 h-16 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-700/30 
                              flex items-center justify-center border-2 border-amber-500/50">
                <span className="text-2xl font-bold text-amber-400/70">
                  {title.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}
          
          {/* Gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/40 to-transparent" />
          
          {/* Date badge */}
          {formattedDate && (
            <div className="absolute top-3 right-3 z-10">
              <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 backdrop-blur-sm">
                <p className="text-xs font-semibold text-amber-300 font-inter">{formattedDate}</p>
              </div>
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5 space-y-3">
          <h3 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-300 line-clamp-2"
              style={{ textShadow: '2px 2px 4px rgba(212,175,55,0.3)' }}>
            {title}
          </h3>
          
          {location && (
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <p className="text-sm text-amber-200/80 font-medium line-clamp-1">{location}</p>
            </div>
          )}

          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent" />

          <Link 
            href={nav_url} 
            className="inline-flex items-center gap-2 text-amber-400 font-semibold text-sm hover:text-amber-300 transition-colors duration-300"
          >
            View Details
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>

        {/* Corner accent */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-amber-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    );
  }

  /* -----------------------------------------
     DESKTOP VERSION
  ------------------------------------------ */
  return (
    <motion.div
      key={ind}
      style={{ transform: transX, willChange: "transform" }}
      className="group w-[25vw] ml-6 h-[70vh] mb-2 cursor-pointer rounded-2xl overflow-hidden
                 border border-amber-600/20 hover:border-amber-500/40
                 bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-gray-800/80
                 shadow-[-12px_6px_20px_4px_rgba(0,0,0,0.6)] 
                 hover:shadow-[-15px_8px_25px_6px_rgba(0,0,0,0.7),0_0_30px_rgba(212,175,55,0.1)]
                 relative text-white z-20 backdrop-blur-sm "
    >
      {/* Background image */}
      <div 
        className="absolute inset-0 w-full h-full bg-cover bg-center transition-transform duration-700 group-hover:scale-105"
        style={bgStyle}
      />
      
      {/* Gradient overlays */}
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900/70 via-gray-900/30 to-gray-900/80" />
      <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-transparent to-amber-400/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

      {/* Content */}
      <div className="relative h-full flex flex-col justify-between p-6">
        
        {/* Top section */}
        <div>
          {/* Date badge */}
          {formattedDate && (
            <div className="inline-block mb-4">
              <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 backdrop-blur-sm">
                <p className="text-xs font-semibold text-amber-300 font-inter">{formattedDate}</p>
              </div>
            </div>
          )}

          <h2 className="text-3xl lg:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-300 leading-tight line-clamp-3"
              style={{ textShadow: '2px 2px 4px rgba(212,175,55,0.3)' }}>
            {title}
          </h2>

          {location && (
            <div className="flex items-center gap-2 mt-4">
              <svg className="w-5 h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <p className="text-base text-amber-200/90 font-semibold line-clamp-1">{location}</p>
            </div>
          )}
        </div>

        {/* Bottom section */}
        <div>
          <div className="w-full h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mb-4" />
          
          <Link 
            href={nav_url} 
            className="inline-flex items-center gap-2 text-[#d4af37] font-bold text-lg hover:text-amber-300 transition-all duration-300 group/link"
          >
            View More
            <span className="transform transition-transform duration-300 group-hover/link:translate-x-1">→</span>
          </Link>
        </div>
      </div>

      {/* Corner accents */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      <div className="absolute bottom-4 left-4 w-2 h-2 bg-amber-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
    </motion.div>
  );
};

export default React.memo(DisplayCards);