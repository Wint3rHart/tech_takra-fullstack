import { get_fetch } from '@/server_fetch_fncs/fetch_fnx';
import { Vertical_cards } from '../../server_comps/vertical_cards';
import React from 'react';

const Page = async () => {
  try {
    let get = await get_fetch('cities_cards');
    console.log(get);
    
    return (
      <div className='min-h-screen mt-32 pb-16 px-4 w-full'>
        
  {/* Fireflies/Stars Effect */}
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
  <div className="absolute top-44 right-1/4 w-1 h-1 bg-amber-300/70 rounded-full animate-ping delay-1350 shadow-md shadow-amber-300/50"></div>
  
        <div className='flex flex-wrap justify-center gap-8 max-w-[1600px] mx-auto'>
          {get?.data?.map((x, i) => (
            <Caller key={i} x={x} ind={i} />
          ))}
        </div>
      </div>
    );
  } catch (error) {
    console.log(error.message);
  }
};

export default Page;

const Caller = ({ x,ind }) => {
  console.log(x);
  
  let vals = Object.keys(x);
  console.log("reduced array rendered");
  
  let arry = vals.reduce((acc, val, i) => {
    if (val.includes("name") || val.includes("title")) { 
      acc.push({
        priority: 1,
        element: (
          <div className="mb-2">
            <h1 className="text-4xl lg:text-5xl font-black mt-4 tracking-wide leading-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 drop-shadow-2xl">
              {x[val]}
            </h1>
            <div className='h-1.5 w-32 bg-gradient-to-r from-amber-500 to-transparent mt-2 rounded-full'></div>
          </div>
        )
      });
    } else if (val.includes("country")) {
      acc.push({
        priority: 2,
        element: (
          <div className="flex items-center gap-3 mt-2">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
            </svg>
            <p className="text-xl lg:text-xl text-amber-200 font-bold tracking-wide uppercase">
              {x[val]}
            </p>
          </div>
        )
      });
    } else if (val.includes("tagline")) {
      acc.push({
        priority: 3,
        element: (
          <div className="mt-3 border-l-4 border-amber-500 pl-4 py-2 bg-gradient-to-r from-amber-900/20 to-transparent">
            <p className="text-lg lg:text-xl text-amber-300 font-semibold italic leading-relaxed">
              "{x[val]}"
            </p>
          </div>
        )
      });
    } else if (val.includes("description")) {
      acc.push({
        priority: 5,
        element: (
          <div className="mt-6">
            <p className="text-base lg:text-lg text-gray-200 font-normal  tracking-wide">
              {x[val]}
            </p>
          </div>
        )
      });
    } else if (val.includes("season")) {
      acc.push({
        priority: 6,
        element: (    
          <div className="mt-6 inline-flex items-center gap-3 px-5 py-3 bg-gradient-to-r from-amber-900/40 to-amber-800/20 border border-amber-600/40 rounded-xl backdrop-blur-sm">
            <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
            </svg>
            <p className="text-sm lg:text-base text-gray-200 font-medium">
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

  const sorted = arry.sort((x, y) => x.priority - y.priority);
  
  return <Vertical_cards data={sorted} ind={ind} link_info={`/city/${x.city_name}`} />;
};