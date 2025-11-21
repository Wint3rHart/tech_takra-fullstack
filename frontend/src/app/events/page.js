import { get_fetch } from "@/server_fetch_fncs/fetch_fnx";
import BgEffectLite from "@/util_comps/bg_effect_lite";
import VerticalCard from '@/client_components/events/verticalCard';

export default async function HotelPage({ searchParams }) {
  const { type } = searchParams || {};

  try {
    const events = await get_fetch('events', type);

    return (
      <div className="bg-gray-900 min-h-screen py-20 px-4 relative">

        {/* Subtle decorative particles */}
        <BgEffectLite />

        {/* Page header - styled like team/updates pages */}
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <h1 className='text-4xl sm:text-5xl lg:text-6xl m-auto max-w-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 tracking-wide uppercase drop-shadow-[2px_4px_4px_rgba(0,0,0,0.25),0_0_8px_rgba(212,175,55,0.45)] font-cinzel'>
            {((type || '').toString().toUpperCase() === 'UPCOMING') ? 'Upcoming Events' : 'Past Events'}
          </h1>

          <div className='w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full mx-auto mt-4' />
          <p className="mt-6 text-lg sm:text-xl text-gray-400 font-playfair">
            Browse our curated events — beautiful venues, thoughtful experiences.
          </p>
        </div>

        {/* Cards container - mirror the visual style of team/updates cards */}
        <div className="max-w-7xl mx-auto mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
          {Array.isArray(events) && events.map((ev, i) => (
            <VerticalCard key={ev._id || i} data={ev} index={i} />
          ))}
        </div>

      </div>
    );
  } catch (error) {
    console.error(error);
    return (
      <div role="alert" className="flex items-center justify-center h-screen bg-gray-900 p-4 overflow-auto">
        <div className="text-center p-8 bg-red-800/60 backdrop-blur-sm rounded-xl border border-red-700 shadow-lg max-w-lg mx-auto">
          <p className="text-xl font-semibold text-red-300 mb-2">Oops! Something went wrong.</p>
          <p className="text-gray-200 mb-4">We couldn't load the information.</p>
          <pre className="text-sm text-red-200 overflow-auto max-h-40 bg-red-900/40 p-3 rounded">{error?.message || String(error)}</pre>
        </div>
      </div>
    );
  }
}
