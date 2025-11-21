"use client"

import useData from '@/client_hooks/useData';
import { useSearchParams } from 'next/navigation';
import React, { useEffect, Suspense } from 'react';

const RoomsContent = () => {
  const search = useSearchParams();
  console.log(search);

  const {query, abort_ref} = useData("rooms", search.get("hotel_id"));

  const {data, isSuccess, error, isPending} = query;

  useEffect(() => {
    console.log(data);
  }, [data]);

  if(error){
    return <div role="alert" className="flex items-center justify-center h-screen bg-gray-900 p-4 overflow-auto">
                <div className="text-center p-8 bg-red-800/60 backdrop-blur-sm rounded-xl border border-red-700 shadow-lg max-w-lg mx-auto">
                    <p className="text-xl font-semibold text-red-300 mb-2">Oops! Something went wrong.</p>
                    <p className="text-gray-200 mb-4">We couldn't load the information.</p>
                    <pre className="text-sm text-red-200 overflow-auto max-h-40 bg-red-900/40 p-3 rounded">{error.message}</pre>
                </div>
            </div>
  }

  return (
    <div className='border-2 border-white min-h-screen min-w-[98vw] mt-24'>
      
    </div>
  );
}

const Page = () => {
  return (
    <Suspense fallback={
      <div className='border-2 border-white min-h-screen min-w-[98vw] mt-24 flex items-center justify-center'>
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-amber-600/30 border-t-[#d4af37] rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-400">Loading rooms...</p>
        </div>
      </div>
    }>
      <RoomsContent />
    </Suspense>
  );
}

export default Page;
