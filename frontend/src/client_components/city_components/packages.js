import { get_fetch } from '@/server_fetch_fncs/fetch_fnx';
import React from 'react';
import { TextAppear } from '../general_comps/text_appear_heading';
import Button from '@/ui_components/button';
import Link from 'next/link';

const Packages = async({city}) => {

    let data={packages:null,error:undefined};

    try {
         let get=await get_fetch("packages",city);
        //  console.log(get);
         
data.packages=get.data;
data.error=undefined;
    } catch (error) {
        // console.log("In packages Catch block = ",error.message);
        data.packages=undefined;
        data.error=error.message
    }


if(data.error){console.log(data);
;return (
    <div className='w-[100vw] flex items-center justify-center h-[100vh] m-auto bg-gradient-to-br from-red-900 via-red-800 to-red-700'>
        <div className='bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20 shadow-2xl'>
            <div className='text-center '>
                <div className='w-16 h-16 mx-auto mb-4   bg-red-500/20 rounded-full flex items-center justify-center'>
                    <svg className='w-8 h-8 text-red-300' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                        <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 15.5c-.77.833.192 2.5 1.732 2.5z' />
                    </svg>
                </div>
                <h2 className='text-2xl font-bold text-white mb-2'>Something went wrong</h2>
                <p className='text-red-200 text-lg'>{data.error}</p>
            </div>
        </div>
    </div>
)}

    return (
        <div className='h-full bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900'>
            {/* Header Section */}
            <div className='pt-8 pb-6 px-6'>
                <div className='text-center mb-8'>
                    <h1 className='text-4xl md:text-5xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent'>
                        Travel Packages
                    </h1>
                    <p className='text-xl text-gray-300 max-w-2xl mx-auto'>
                        Discover amazing destinations in {city}
                    </p>
                </div>
            </div>

            {/* Packages Grid */}
            <div className='px-6 pb-8'>
                <div className='flex  overflow-x-auto gap-6  pb-4' >
                    {/* <Button /> */}
                    {data?.packages?.map((x,i)=>{return  <TextAppear key={i}> <Package_cards key={x.id} x={x} i={i} /></TextAppear>})}
                </div>
            </div>
        </div>
    );
}

export default Packages;

const Package_cards=React.memo(({x,i})=>{

    // console.log("2 comp rendering");
    
 
return (
<div  
    style={{
        backgroundImage: `url('https://picsum.photos/600/400?random=${i * 100 }')`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        scrollSnapAlign: 'start'
    }} 
    className='relative group ml-6 first:ml-0 rounded-2xl h-[70vh] w-[85vw] md:w-[40vw] lg:w-[35vw] flex-shrink-0 overflow-hidden shadow-2xl hover:shadow-3xl transition-all duration-500 hover:scale-[1.02] cursor-pointer border border-white/10'
>
    {/* Gradient Overlay */}
    <div className='absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent group-hover:from-black/95 transition-all duration-300'></div>
    
    {/* Shimmer Effect */}
    <div className='absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000'></div>

    {/* Content */}
    <div className='relative z-10 p-8 h-full flex flex-col justify-end'>
        {/* Badge */}
        <div className='absolute top-6 right-6'>
            <div className='bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-full text-sm font-semibold shadow-lg'>
                Featured
            </div>
        </div>

        {/* Main Content */}
        <div className='space-y-4'>
            <h1 className='text-3xl md:text-4xl font-bold text-white leading-tight group-hover:text-blue-300 transition-colors duration-300'>
                {x.title}
            </h1>

            <div className='flex items-center space-x-2 text-blue-300'>
                <svg className='w-5 h-5' fill='currentColor' viewBox='0 0 20 20'>
                    <path fillRule='evenodd' d='M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z' clipRule='evenodd' />
                </svg>
                <p className='text-lg font-medium'>{x.city}</p>
            </div>

            <p className='text-gray-200 text-lg leading-relaxed line-clamp-3'>
                {x.description}
            </p>

            <div className='flex items-center justify-between pt-4'>
                <div className='space-y-2'>
                    <div className='flex items-center space-x-2 text-gray-300'>
                        <svg className='w-5 h-5' fill='none' stroke='currentColor' viewBox='0 0 24 24'>
                            <path strokeLinecap='round' strokeLinejoin='round' strokeWidth={2} d='M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z' />
                        </svg>
                        <span className='text-base'>{x.duration}</span>
                    </div>
                    <div className='text-3xl font-bold text-white'>
                        <span className='text-green-400'>${x.price}</span>
                    </div>
                </div>
                <Link className=' text-3xl font-bold text-amber-400 mr-14 mt-8' href={{pathname:`/booking`,query:{city:x.city,type:"package",package_id:x.id}}}>Book</Link>
{/* <Button x={x}/> */}
                {/* <button className='bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white px-8 py-3 rounded-xl font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300 active:scale-95'>
                    Book Now
                </button> */}
            </div>
        </div>
    </div>
</div>)

})