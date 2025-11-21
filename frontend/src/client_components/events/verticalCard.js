"use client"

import React, { useState } from 'react';

const VerticalCard = ({ data, index }) => {
  const images = Array.isArray(data?.images) ? data.images : [];
  const [imgIndex, setImgIndex] = useState(0);
  const total = images.length;

  const prev = (e) => { e.stopPropagation(); e.preventDefault(); setImgIndex((p) => (p - 1 + total) % total); };
  const next = (e) => { e.stopPropagation(); e.preventDefault(); setImgIndex((p) => (p + 1) % total); };

  const bgUrl = images[imgIndex]?.url || images[imgIndex]?.src || images[imgIndex] || '';
  const formattedDate = data?.date ? new Date(data.date).toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }) : data?.date || '';

  return (
    <div
      style={{ willChange: 'transform' }}
      className="group w-full shadow-xl rounded-2xl overflow-hidden border border-amber-600/20 transition-all duration-500 bg-gray-800/40 relative mt-6 text-white"
    >
      {/* Image container */}
      <div className="relative h-64 sm:h-72 lg:h-80 overflow-hidden bg-gray-700">
        <div
          style={{
            backgroundImage: `url('${bgUrl}')`,
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
          className="absolute inset-0 w-full h-full brightness-90 group-hover:brightness-100 group-hover:scale-[1.02] transition-transform duration-700"
        />

        <div className="absolute inset-0 bg-gradient-to-b from-[rgba(0,0,0,0.18)] via-[rgba(0,0,0,0.45)] to-[rgba(0,0,0,0.75)]" />

        {/* Prev/Next buttons - single set inside image area */}
        {total > 1 && (
          <>
            <button onClick={prev} aria-label="Previous image" className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/40 backdrop-blur-sm text-amber-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </button>

            <button onClick={next} aria-label="Next image" className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2 rounded-full bg-black/30 hover:bg-black/40 backdrop-blur-sm text-amber-200 transition">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </button>
          </>
        )}

        {/* Decorative particles */}
        <div className="absolute top-6 left-8 w-1 h-1 bg-amber-400/70 rounded-full animate-ping opacity-60" />
        <div className="absolute bottom-10 right-12 w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse opacity-70" />
        <div className="absolute top-14 right-10 w-0.5 h-16 bg-gradient-to-b from-transparent via-amber-400/20 to-transparent opacity-60 rounded" />

        {/* Date badge */}
        <div className="absolute top-4 right-4 z-20">
          <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 backdrop-blur-sm">
            <p className="text-xs font-semibold text-amber-300 font-inter">
              {formattedDate}
            </p>
          </div>
        </div>
      </div>

      <div className="relative flex flex-col justify-start p-4 sm:p-6 pb-6 sm:pb-8 bg-gradient-to-t from-transparent to-[rgba(0,0,0,0.2)]">

        {/* Title */}
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-300 drop-shadow-lg tracking-wide leading-tight line-clamp-2">
          {data.title}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-yellow-300 line-clamp-1">
            {data.location}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm lg:text-base text-gray-200 mb-4 sm:mb-6 leading-relaxed line-clamp-3">
          {data.description}
        </p>

        {/* Featured Section */}
        {data.isFeatured && (
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-center gap-2">
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
              </svg>
              <p className="text-sm sm:text-base lg:text-lg text-amber-300 font-semibold">Featured Amenities</p>
            </div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pl-6 sm:pl-7">
              {Array.isArray(data.featured) ? (
                data.featured.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-400 rounded-full flex-shrink-0"></span>
                    <p className="text-xs sm:text-sm text-amber-200 font-medium truncate">
                      {item}
                    </p>
                  </div>
                ))
              ) : (
                <div className="flex items-center gap-1.5">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-400 rounded-full flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-amber-200 font-medium">
                    {data.featured}
                  </p>
                </div>
              )}
            </div>
          </div>
        )}
        
        {/* Decorative underline */}
        <div className="w-20 h-1 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full opacity-60 mt-4" />

        {/* Corner accent */}
        <div className="absolute top-4 left-4 w-2 h-2 bg-amber-400/60 rounded-full opacity-60 transition-opacity duration-300" />
      </div>
    </div>
  );
};

export default VerticalCard;