

const upcoming_events = [
  {
    name: "Grand Plaza Hotel",
    location: "GCU Downtown",
    date: "12-2-2025",
    description: "Experience luxury and comfort in the heart of the city with world-class amenities and exceptional service.",
    featured: ["Pool & Spa", "Fine Dining", "Gym & Fitness", "Conference Rooms", "24/7 Room Service"]
  },
  {
    name: "Sunset Resort",
    location: "Beachside Avenue",
    date: "15-3-2025",
    description: "A perfect getaway destination offering stunning ocean views and premium hospitality.",
    featured: ["Private Beach", "Water Sports", "Rooftop Bar", "Kids Club"]
  }
];

export default function HotelPage() {
  return (
    <div className='h-full mt-32 pb-16 px-4 sm:px-8 w-full bg-gradient-to-b from-gray-900 via-gray-800 to-black'>
      <h1 className='text-4xl sm:text-6xl lg:text-8xl m-auto max-w-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-300 tracking-wide uppercase'>
        HOTELS
        <div className='h-1 w-full bg-gradient-to-r from-amber-500 to-transparent mt-2 rounded-full'></div>
      </h1>
      
      <div className="flex h-full  flex-wrap justify-center gap-6 mt-8">
        {upcoming_events.map((x, i) => (
          <VerticalCard key={i} data={x} index={i} />
        ))}
      </div>
    </div>
  );
}

const VerticalCard = ({ data, index }) => {
  return (
    <div
      style={{ willChange: "transform" }}
      className={`group 
        w-full
        sm:w-[45vw]
        lg:w-[40vw] 
        max-w-[600px] 
        min-w-[320px]
        flex-shrink-0
        shadow-[0_10px_40px_rgba(0,0,0,0.8)]
        h-[50vh]
        sm:h-[90vh]
        lg:h-[95vh]
        max-h-[800px]
        
        rounded-2xl 
        border-2
        border-amber-500/30
        hover:border-amber-400
        cursor-pointer
        hover:scale-[1.01]
        transition-all duration-500
        relative 
        mt-6
        sm:mt-12
        text-white 
        bg-no-repeat
        bg-[100%] 
        bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.7)]
        overflow-hidden scrollbar-hidden
      `}
    >
      <div
        style={{
          backgroundImage: `url('https://picsum.photos/600/400?random=${index * 100}')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="rounded-2xl brightness-90 group-hover:brightness-100 group-hover:scale-[1.03]
          absolute inset-0 w-full h-full transition-all duration-700"
      />

      <div className="rounded-2xl absolute bg-gradient-to-b from-[rgba(0,0,0,0.2)] via-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.95)] inset-0" />

      <div className="relative h-full flex flex-col justify-end p-4 sm:p-6 pb-6 sm:pb-8">
        
        {/* Hotel Name */}
        <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-2 sm:mb-3 text-amber-50 drop-shadow-lg tracking-wide leading-tight line-clamp-2">
          {data.name}
        </h3>

        {/* Location */}
        <div className="flex items-center gap-2 mb-2 sm:mb-3">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd"/>
          </svg>
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-yellow-300 line-clamp-1">
            {data.location}
          </p>
        </div>

        {/* Date */}
        <div className="flex items-center gap-2 mb-3 sm:mb-4">
          <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd"/>
          </svg>
          <p className="text-base sm:text-lg lg:text-xl font-semibold text-yellow-300">
            {data.date}
          </p>
        </div>

        {/* Description */}
        <p className="text-xs sm:text-sm lg:text-base text-gray-200 mb-4 sm:mb-6 leading-relaxed line-clamp-3">
          {data.description}
        </p>

        {/* Featured Section */}
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 sm:w-5 sm:h-5 text-amber-400 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
            </svg>
            <p className="text-sm sm:text-base lg:text-lg text-amber-300 font-semibold">Featured Amenities</p>
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1.5 sm:gap-2 pl-6 sm:pl-7">
            {Array.isArray(data.featured) ? (
              data.featured.map((item, idx) => (
                <div key={idx} className="flex items-center gap-1.5">
                  <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-400 rounded-full flex-shrink-0"></span>
                  <p className="text-xs sm:text-sm text-amber-200 font-medium truncate">
                    {item}
                  </p>
                </div>
              ))
            ) : (
              <div className="flex items-center gap-1.5">
                <span className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-amber-400 rounded-full flex-shrink-0"></span>
                <p className="text-xs sm:text-sm text-amber-200 font-medium">
                  {data.featured}
                </p>
              </div>
            )}
          </div>
        </div>

        {/* View Rooms Button - appears on hover */}
        <button 
          className="mt-4 sm:mt-6 opacity-0 group-hover:opacity-100 inline-flex items-center gap-2 text-amber-400 font-bold text-sm sm:text-base lg:text-lg hover:text-amber-300 cursor-pointer transition-all duration-300 hover:gap-3" 
        >
          View Rooms 
          <span className="text-lg sm:text-xl">→</span>
        </button>
      </div>
    </div>
  );
};