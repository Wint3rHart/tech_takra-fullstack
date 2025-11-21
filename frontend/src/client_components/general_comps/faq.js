import React from 'react';

const FAQs = () => {
  return (
    <section className="py-10 z-90">
      <div className="container mx-auto px-[15px] lg:px-[35px] max-w-4xl">
        <h6 className="cursor-pointer w-full text-[#C5B358] font-orbitron sm:text-[40px] font-semibold leading-[38px] sm:leading-[32px] md:leading-[40px] lg:leading-[48px]">
          Frequently Asked Questions 
        </h6>

        <div className="overflow-y-auto max-h-[500px] space-y-4 mt-12 pr-2 scrollbar-thin scrollbar-thumb-gray-300 hover:scrollbar-thumb-gray-400 scrollbar-track-transparent">

          <details className="bg-blue-800/25 shadow rounded-lg p-4">
            <summary className="cursor-pointer w-full font-poppins text-[#C5B358] sm:text-[20px] leading-[38px] sm:leading-[32px] md:leading-[40px] text-lg sm:text-xl lg:leading-[48px]">
              How do I book a trip on Wandering Hart?
            </summary>
            <p className="mt-2 font-raleway text-lg font-normal text-white">
              Simply search for your destination, choose your travel dates, and select from our list of top-rated hotels, flights, and experiences. You can complete your booking directly on our secure platform.
            </p>
          </details>

          <details className="bg-blue-800/25 shadow rounded-lg p-4">
            <summary className="cursor-pointer w-full font-poppins text-[#C5B358] sm:text-[20px] leading-[38px] sm:leading-[32px] md:leading-[40px] text-lg sm:text-xl lg:leading-[48px]">
              Do you offer travel packages?
            </summary>
            <p className="mt-2 font-raleway text-lg font-normal text-white">
              Yes, we offer curated travel packages that include accommodation, activities, and guided tours for popular destinations like London, Tokyo, Paris, Seoul, and Istanbul.
            </p>
          </details>

          <details className="bg-blue-800/25 shadow rounded-lg p-4">
            <summary className="cursor-pointer w-full font-poppins text-[#C5B358] sm:text-[20px] leading-[38px] sm:leading-[32px] md:leading-[40px] text-lg sm:text-xl lg:leading-[48px]">
              Can I cancel or change my booking?
            </summary>
            <p className="mt-2 font-raleway text-lg font-normal text-white">
              Most bookings can be canceled or modified depending on the hotel's or airline’s policy. Check your booking confirmation for specific terms before making changes.
            </p>
          </details>

          <details className="bg-blue-800/25 shadow rounded-lg p-4">
            <summary className="cursor-pointer w-full font-poppins text-[#C5B358] sm:text-[20px] leading-[38px] sm:leading-[32px] md:leading-[40px] text-lg sm:text-xl lg:leading-[48px]">
              Do you provide travel insurance?
            </summary>
            <p className="mt-2 font-raleway text-lg font-normal text-white">
              Yes, you can add travel insurance to your booking for coverage on trip cancellations, medical emergencies, and lost luggage.
            </p>
          </details>

          <details className="bg-blue-800/25 shadow rounded-lg p-4">
            <summary className="cursor-pointer w-full font-poppins text-[#C5B358] sm:text-[20px] leading-[38px] sm:leading-[32px] md:leading-[40px] text-lg sm:text-xl lg:leading-[48px]">
              How can I find the best travel deals?
            </summary>
            <p className="mt-2 font-raleway text-lg font-normal text-white">
              Use our search filters to compare prices and subscribe to our newsletter for exclusive seasonal offers and last-minute deals.
            </p>
          </details>

        </div>
      </div>
    </section>
  );
};

export default FAQs;
