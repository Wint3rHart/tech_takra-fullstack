"use client"

import React, { useMemo,useState } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const DisplayCards = ({ scroll, ind, x, nav_url, isMobile }) => {

  let router = useRouter();

  let math_memo = useMemo(() => Math.random() * (100 - 50) + 50, []);

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
  let reduce_memo = useMemo(() => {
    let vals = Object.keys(x);
    let arry = vals.reduce((acc, val, i) => {
      if (val.includes("name") || val.includes("title")) {
        acc.push({
          priority: 1,
          element: (
            <div className="mb-2" key={i}>
              <h1 className="text-2xl sm:text-3xl lg:text-5xl font-black mt-4 tracking-wide leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 drop-shadow-2xl">
                {x[val]}
              </h1>
              <div className='h-1 sm:h-1.5 w-20 sm:w-32 bg-gradient-to-r from-amber-500 to-transparent mt-2 rounded-full'></div>
            </div>
          )
        });
      } else if (val.includes("country")) {
        acc.push({
          priority: 2,
          element: (
            <div className="flex items-center gap-2 sm:gap-3 mt-2" key={i}>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
              </svg>
              <p className="text-base sm:text-lg lg:text-xl text-amber-200 font-bold tracking-wide uppercase">
                {x[val]}
              </p>
            </div>
          )
        });
      } else if (val.includes("tagline")) {
        acc.push({
          priority: 3,
          element: (
            <div className="mt-3 border-l-4 border-amber-500 pl-3 sm:pl-4 py-2 bg-gradient-to-r from-amber-900/20 to-transparent" key={i}>
              <p className="text-sm sm:text-base lg:text-xl text-amber-300 font-semibold italic leading-relaxed">
                "{x[val]}"
              </p>
            </div>
          )
        });
      } else if (val.includes("description")) {
        acc.push({
          priority: 5,
          element: (
            <div className="mt-4 sm:mt-6" key={i}>
              <p className="text-sm sm:text-base lg:text-lg text-gray-200 font-normal tracking-wide">
                {x[val]}
              </p>
            </div>
          )
        });
      } else if (val.includes("season")) {
        acc.push({
          priority: 6,
          element: (
            <div className="mt-4 sm:mt-6 inline-flex items-center gap-2 sm:gap-3 px-3 sm:px-5 py-2 sm:py-3 bg-gradient-to-r from-amber-900/40 to-amber-800/20 border border-amber-600/40 rounded-xl backdrop-blur-sm" key={i}>
              <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
              </svg>
              <p className="text-xs sm:text-sm lg:text-base text-gray-200 font-medium">
                <span className='text-amber-400 font-bold uppercase tracking-wider'>Best Season:</span>
                <span className='ml-2 text-amber-200 font-semibold'>{x[val]}</span>
              </p>
            </div>
          )
        });
      } else {
        return acc;
      }
      return acc;
    }, []);
    return arry.sort((x, y) => x.priority - y.priority);
  }, [x]);


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
            <div className="rounded-xl h-full w-full absolute bg-gradient-to-b from-[rgba(0,0,0,1)] to-[rgba(0,0,0,0.7)] inset-0" />
        <div className="rounded-2xl h-full w-full absolute bg-gradient-to-b from-[rgba(255,0,0,0.1)] via-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.85)] inset-0" />
        
        <div className="absolute top-4 right-4 w-1 h-1 bg-amber-400/60 rounded-full"></div>
        <div className="absolute top-8 right-8 w-0.5 h-0.5 bg-white/50 rounded-full"></div>
        <div className="absolute top-6 right-12 w-1.5 h-1.5 bg-amber-300/40 rounded-full"></div>
        
        <div className="relative flex flex-col items-center text-center p-4">
          {reduce_memo.map((x, i) => x.element)}
          <Link href={nav_url} className="text-xl mt-4 text-amber-300 font-bold">View Details</Link>
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
      style={{ transform: transX, willChange: "transform" }}
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
    > <div className="rounded-xl h-full w-full absolute bg-gradient-to-b from-[rgba(0,0,0,1)] to-[rgba(0,0,0,0.7)] inset-0" />
        <div className="rounded-2xl h-full w-full absolute bg-gradient-to-b from-[rgba(255,0,0,0.1)] via-[rgba(0,0,0,0.3)] to-[rgba(0,0,0,0.85)] inset-0" />
        
        <div className="absolute top-4 right-4 w-1 h-1 bg-amber-400/60 rounded-full"></div>
        <div className="absolute top-8 right-8 w-0.5 h-0.5 bg-white/50 rounded-full"></div>
        <div className="absolute top-6 right-12 w-1.5 h-1.5 bg-amber-300/40 rounded-full"></div>
        
      <div className="relative p-4">
        {reduce_memo.map((x, i) => x.element)}
        <Link href={nav_url} className="text-xl mt-6 text-[#d4af37] font-bold">View More</Link>
      </div>
    </motion.div>
  );
};

export default React.memo(DisplayCards);
