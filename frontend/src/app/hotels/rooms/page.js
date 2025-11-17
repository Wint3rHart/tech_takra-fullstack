"use client"

import useData from '@/client_hooks/useData';
import { useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react';

const Page = () => {
let search=useSearchParams();
console.log(search);

let {query,abort_ref}=useData("rooms",search.get("hotel_id"));

let {data,isSuccess,error,isPending}=query;

useEffect(()=>{console.log(data);
},[data]);

if(error){
    return <div role="alert" className="flex items-center justify-center h-screen bg-gray-900 p-4 overflow-auto">
                <div className="text-center p-8 bg-red-800/60 backdrop-blur-sm rounded-xl border border-red-700 shadow-lg max-w-lg mx-auto">
                    <p className="text-xl font-semibold text-red-300 mb-2">Oops! Something went wrong.</p>
                    <p className="text-gray-200 mb-4">We couldn't load the information.</p>
                    <pre className="text-sm text-red-200 overflow-auto max-h-40 bg-red-900/40 p-3 rounded">{error.message}</pre>
                </div>
            </div>
};

    return (
        <div className='border-2 border-white min-h-screen min-w-[98vw] mt-24'>
            
        </div>
    );
}

export default Page;
