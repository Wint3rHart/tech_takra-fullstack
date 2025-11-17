import { get_fetch } from '@/server_fetch_fncs/fetch_fnx';
import React from 'react';

const Page = async() => {

try {
let get=await get_fetch("all_hotels")
 console.log("hotels",get);
const players=Object.entries(get);
console.log(players);

      return (
          <div className='min-h-screen mt-32 pb-16 px-8 w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black'>
            <h1 className='text-8xl m-auto w-[30vw]  font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-300 tracking-wide uppercase'>HOTELS
            <div className='h-1 w-full bg-gradient-to-r from-amber-500 to-transparent mt-2 rounded-full'></div></h1>
            {players.map((x,i)=>{
              return (
                <div key={i} className='mb-16'>
                  {/* City Name on Top */}
                  <div className='mb-8 px-3'>
                    <h2 className='text-4xl  font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-600 tracking-wide uppercase'>
                      {x[0]}
                    </h2>
                    <div className='h-1 w-24 bg-gradient-to-r from-amber-500 to-transparent mt-2 rounded-full'></div>
                  </div>
                  
                  {/* Hotel Cards in Horizontal Row */}
                  <div className='flex  overflow-x-auto overflow-y-visible gap-8 py-6 px-3 scrollbar-thin scrollbar-thumb-amber-600 scrollbar-track-gray-800'>
                    {x[1].map((y,j)=>{
                      return <Vertical_cards key={j} y={y} ind={j} city_name={x[0]}/>
                    })}
                  </div>
                </div>
              )
            })}
        </div>
    );
} catch (error) {
    return  <div role="alert" className="flex items-center justify-center h-screen bg-gray-900 p-4 overflow-auto">
                <div className="text-center p-8 bg-red-800/60 backdrop-blur-sm rounded-xl border border-red-700 shadow-lg max-w-lg mx-auto">
                    <p className="text-xl font-semibold text-red-300 mb-2">Oops! Something went wrong.</p>
                    <p className="text-gray-200 mb-4">We couldn't load the information.</p>
                    <pre className="text-sm text-red-200 overflow-auto max-h-40 bg-red-900/40 p-3 rounded">{error.message}</pre>
                </div>
            </div>
}



  
}

export default Page;






import Link from "next/link";






export const Vertical_cards =({y,ind,city_name})=>{

// console.log("her is : ",data);

console.log(y);

return     <div style={{willChange:"transform"}}
      key={ind}
    
      className={` group 
        w-[28vw] 
        min-w-[340px]
      flex-shrink-0
      shadow-[0_10px_40px_rgba(0,0,0,0.8)]
       h-[75vh]
        rounded-2xl 
        border-2
       border-amber-500/30
       hover:border-amber-400
    cursor-pointer
    hover:scale-101
    transition-all duration-500
        relative 
        text-white 
        bg-no-repeat
        bg-[100%] 
     bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.7)]
         group
       overflow-hidden
      `}
    >
      <div
        style={{
          backgroundImage: `url('https://picsum.photos/600/400?random=${ind * 100 }')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="rounded-2xl brightness-90 group-hover:brightness-100 group-hover:scale-103
       absolute inset-0 w-full h-full transition-all duration-700"
      >

     </div>
     
     <div className="rounded-2xl absolute bg-gradient-to-b from-[rgba(0,0,0,0.2)] via-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.95)]
 inset-0 " />

      <div className="relative h-full flex flex-col justify-end p-6 pb-8">
      
        <h3 className="text-3xl font-bold mb-3 text-amber-50 drop-shadow-lg tracking-wide">
          {y.name}
        </h3>
        
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-5 h-5 text-amber-400" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 2a8 8 0 100 16 8 8 0 000-16zm1 11H9v-2h2v2zm0-4H9V5h2v4z"/>
          </svg>
          <p className="text-lg text-amber-300 font-medium">{y.city_name}</p>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-2xl text-yellow-400">★</span>
          <p className="text-xl font-semibold text-yellow-300">{y.rating}</p>
        </div>
        
        <p className="text-base text-gray-200 mb-6 line-clamp-2 leading-relaxed">
          {y.description}
        </p>

        {/* <Link 
          href={`/hotels/rooms?hotel_id=${y.hotel_id}`} 
          className="mt-2 opacity-0 group-hover:opacity-100 inline-flex items-center gap-2 text-amber-400 font-bold text-xl hover:text-amber-300 cursor-pointer transition-all duration-300 hover:gap-3" 
        >
          View Rooms 
          <span className="text-2xl">→</span>
        </Link> */}
        
      </div>
    </div>




}