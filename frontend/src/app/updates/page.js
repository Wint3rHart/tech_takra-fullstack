export const dynamic='force-dynamic'
import React from 'react';
import UpdatesGallery from './gallery';
import { get_fetch } from '@/server_fetch_fncs/fetch_fnx';
import BgEffect from '@/util_comps/bg_effect';

const Page = async () => {
  try {
    const announcements = await get_fetch("announcement");
    console.log(announcements);

    // Ensure data is an array and sort by date (newest first)
    const sortedAnnouncements = Array.isArray(announcements) 
      ? [...announcements].sort((a, b) => {
          const dateA = new Date(a.createdAt || a.updatedAt || 0);
          const dateB = new Date(b.createdAt || b.updatedAt || 0);
          return dateB - dateA; // Newest first
        })
      : [];

    return (
      <div className='min-h-screen bg-gray-900 relative'>
        <BgEffect />
        <UpdatesGallery announcements={sortedAnnouncements} />
      </div>
    );
  } catch (error) {
    console.log(error.message);
    return (
      <div role="alert" className="flex items-center justify-center h-screen bg-gray-900 p-4 overflow-auto">
        <div className="text-center p-8 bg-red-800/60 backdrop-blur-sm rounded-xl border border-red-700 shadow-lg max-w-lg mx-auto">
          <p className="text-xl font-semibold text-red-300 mb-2">Oops! Something went wrong.</p>
          <p className="text-gray-200 mb-4">We couldn't load the announcements.</p>
          <pre className="text-sm text-red-200 overflow-auto max-h-40 bg-red-900/40 p-3 rounded">{error.message}</pre>
        </div>
      </div>
    );
  }
}

export default Page;
