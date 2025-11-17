"use client"

import useData from '@/client_hooks/useData';
import React, { useEffect } from 'react';
import UnsplashPics from '../general_comps/unsplash_pics';


const Gallery = ({city}) => {

console.log(city);


let {query,abort_ref}=useData("gallery",city);
let {data,isLoading,error,isPending}=query;



 if(isLoading){ return <div className='min-w-[100vw] flex items-center justify-center min-h-[100vh] m-auto '><p className='text-2xl text-white font-bold'>Loading...</p></div>};

            if(error){console.log("in here");
            return <div className='min-w-[100vw] flex items-center justify-center min-h-[100vh] m-auto '><p className='text-2xl text-white font-bold'>{error.message}</p></div>};

    return (
        <div className='w-[100vw] '>
        <UnsplashPics data={data}/>
        </div>
    );
}

export default Gallery;
