import React from 'react';
import Gallery from './gallery';
import { get_fetch } from '@/server_fetch_fncs/fetch_fnx';

const Page = async () => {
  try {
    let get = await get_fetch("team");
    console.log(get);

    // Check if data exists and is an array
    const teamMembers = Array.isArray(get) ? get : [];

    return (
      <div className='bg-gray-900 min-h-screen'>
        <Gallery x={teamMembers} />
      </div>
    );
  } catch (error) {
    console.log(error.message);
    return (
      <div role="alert" className="flex items-center justify-center h-screen bg-gray-900 p-4 overflow-auto">
        <div className="text-center p-8 bg-red-800/60 backdrop-blur-sm rounded-xl border border-red-700 shadow-lg max-w-lg mx-auto">
          <p className="text-xl font-semibold text-red-300 mb-2">Oops! Something went wrong.</p>
          <p className="text-gray-200 mb-4">We couldn't load the information.</p>
          <pre className="text-sm text-red-200 overflow-auto max-h-40 bg-red-900/40 p-3 rounded">{error.message}</pre>
        </div>
      </div>
    );
  }
}

export default Page;
 