import { get_fetch } from "@/server_fetch_fncs/fetch_fnx";
import BgEffect from "@/util_comps/bg_effect";
import VerticalCard from '@/client_components/events/verticalCard';

export default async function HotelPage({ searchParams }) {
  const { type } = searchParams || {};

  try {
    const events = await get_fetch('events', type);

    return (
      <div className="bg-gray-900 py-20 px-4 relative bg-[url('/gcu.jpg.jpg')] bg-blend-overlay bg-no-repeat bg-cover bg-bottom [mask-image:linear-gradient(180deg,black,black,rgb(0,0,0,7),black,black,rgb(0,0,0,.8),rgb(0,0,0,.7),rgb(0,0,0,.4))] bg-fixed h-full mt-6 pb-16 px-4 sm:px-8 w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black">

        <h1 className='text-4xl sm:text-6xl lg:text-8xl m-auto max-w-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-500 to-amber-300 tracking-wide uppercase drop-shadow-[2px_4px_4px_rgba(0,0,0,0.25),0_0_8px_rgba(212,175,55,0.45)] w-[100vw] font-cinzel'>
          {((type || '').toString().toUpperCase() === 'UPCOMING') ? 'Upcoming Events' : 'Past Events'}
          <div className='h-1 w-full bg-gradient-to-r from-amber-500 to-transparent mt-2 rounded-full'></div>
        </h1>

        <div className="flex h-full relative flex-wrap justify-center gap-6 mt-8">
          <BgEffect />
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
