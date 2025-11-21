"use client"

import React, { useContext, useEffect ,useMemo, useRef,useState,use} from 'react';
import {useScroll,useTransform } from 'framer-motion';
import DisplayCards from './displayCards';


const City_Ref_wrapper=({data})=>{
let get=use(data);
console.log(get);

    let ref=useRef(null);
let {scrollYProgress}=useScroll({target:ref,offset:["start center","center start"]});

return (


<div ref={ref} style={{perspective:"1800px"}} className='px-4 w-full h-auto lg:h-[120vh]'>
<CitiesAd scroll={scrollYProgress} data={get} />
</div>

)};




const CitiesAd = ({ scroll, data }) => {
  const cards = data?.data ?? [];

  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const check = () => setIsMobile(window.innerWidth < 1024);
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  // DESKTOP → keep EXACT original version
  const desktopCards = useMemo(() => {
    return cards.map((x, i) => (
      <div style={{ transformStyle: "preserve-3d" }} key={i}>
        <DisplayCards
          scroll={scroll}
          ind={i}
          x={x}
          nav_url={`/events?type=upcoming`}
          isMobile={false}
        />
      </div>
    ));
  }, [cards]);

  // MOBILE version (your "CardsContainer")
  const MOBILE_INITIAL = 2;
  const [showAll, setShowAll] = useState(false);

  const visibleMobileCards =
    !showAll ? cards.slice(0, MOBILE_INITIAL) : cards;

  return (
    <>
      {/* MOBILE VIEW */}
      {isMobile && (
        <div className="flex flex-col items-center px-4 py-6 gap-4">
          {visibleMobileCards.map((card, ind) => (
            <DisplayCards
              key={ind}
              scroll={scroll}
              ind={ind}
              x={card}
              nav_url={`/city?city=${card.city_name}`}
              isMobile={true}
            />
          ))}

          {!showAll && cards.length > MOBILE_INITIAL && (
            <button
              onClick={() => setShowAll(true)}
              className="mt-4 mb-6 px-8 py-3 bg-amber-600 text-white font-bold text-lg rounded-xl border border-amber-400/50 shadow-lg transition-all duration-300 active:scale-95"
            >
              Show More ({cards.length - MOBILE_INITIAL} more)
            </button>
          )}

          {showAll && cards.length > MOBILE_INITIAL && (
            <button
              onClick={() => setShowAll(false)}
              className="mt-4 mb-6 px-8 py-3 bg-gray-700 text-amber-200 font-bold text-lg rounded-xl border border-amber-400/30 shadow-lg transition-all duration-300 active:scale-95"
            >
              Show Less
            </button>
          )}
        </div>
      )}

      {/* DESKTOP VIEW (ABSOLUTELY UNCHANGED) */}
      {!isMobile && (
        <div
          className="flex justify-start px-4 items-center overflow-x-auto scrollbar-hide overflow-y-visible h-full relative hide-scrollbar"
          style={{ transformStyle: "preserve-3d", perspective: "1000px" }}
        >
          {desktopCards}
        </div>
      )}
    </>
  );
};


export default City_Ref_wrapper;













