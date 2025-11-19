// export const dynamic="force-dynamic"


import Ref_wrapper from "@/client_components/general_comps/text_stagger";
import {TextAppear,TextAppear_2, TextAppear_para} from "@/client_components/general_comps/text_appear_heading";
import { Places } from "@/client_components/home_components/places_parallax";
import { get_fetch } from "@/server_fetch_fncs/fetch_fnx";
import { ErrorBoundary } from "react-error-boundary";
import { MyErrorFallback } from "@/client_components/general_comps/ErrorBoundary";
import City_Ref_wrapper from "@/client_components/home_components/cities_ads";
import  { TopHotels, Wrap } from "@/client_components/home_components/top_hotels";
import WhyChooseUs from "@/client_components/general_comps/why_choose_us";
import FAQs from "@/client_components/general_comps/faq";
import Footer from "@/client_components/general_comps/footer";
import { Cinzel, Work_Sans } from "next/font/google";
import BgEffect from "@/util_comps/bg_effect";

// import Places from "@/client_components/places_parallax";
const tangerine=Cinzel({subsets: ["latin"],
  weight: ["400", "700"],})
const cormotant=Work_Sans({subsets: ["latin"],
  weight: ["400", "700"],})

export default async function Home() {
  console.log("home rendering");
  
let   places_parallax= get_fetch("places_parallax");
  let  cities_details= get_fetch("cities_cards");
  // let top_hotels=get_fetch("top_hotels");


  return (
     <div className="font-sans flex flex-col   max-w-[100vw]  min-h-screen pb-20">

    {/* Hero Section */}
<div className=" overflow-hidden group  relative h-[100vh] text-white font-black text-6xl w-[98vw] bg-gray-900 overflow-hidden relative bg-[url('/gcu.jpg.jpg')] bg-blend-overlay bg-no-repeat bg-cover bg-bottom  [mask-image:linear-gradient(180deg,black,black,rgb(0,0,0,7),black,black,rgb(0,0,0,.8),rgb(0,0,0,.3),transparent)]  ">{/* Lightweight Glassy Background */}


<div> <Ref_wrapper>  
    <p>G</p>
    <p>C</p>
    <p>U</p>
  </Ref_wrapper></div> 
  
 

  <div className='absolute w-[97vw] h-[100vh]  inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[97vw] group-hover:translate-x-50 transition-transform duration-1500'></div>

  {/* Fireflies/Stars Effect */}
 <BgEffect/>
  
  
  
</div>

      
     <div className="h-full ">
      
      {/* About Us Section - SEO content rendered on server */}
      <section className="text-center relative flex flex-col items-center justify-center items-evenly  h-[100vh] text-white mt-36">
<BgEffect/>
        <TextAppear styling={` font-playfair drop-shadow-[2px_2px_2px_rgba(255,255,255,0.1)]  text-6xl text-[#d4af37] font-semibold `}>
        
            WHO ARE WE <span className="text-stone-300">?</span>
          </TextAppear>
          <TextAppear_para  styling={`font-inter mt-12 text-lg text-gray-300`}>
            <p>At Wandering Hart,we believe that every journey should be as unique as the traveler. We are passionate about connecting you with unforgettable experiences in some of the world’s most iconic destinations — London, Tokyo, Paris, Seoul, and Istanbul. From bustling city streets to serene cultural hideaways, we curate bookings that go beyond just travel plans, offering you handpicked stays, tours, and activities that let you truly experience the heart of each city.</p>
             <p>Whether you’re seeking the timeless charm of Paris, the vibrant energy of Tokyo, the historic streets of Istanbul, the modern elegance of London, or the dynamic culture of Seoul, our mission is to make your trip seamless, inspiring, and memorable. With Traveling We, you’re not just booking a trip — you’re unlocking a journey filled with stories, adventures, and moments you’ll cherish forever.</p>
            <p >Whether you're seeking the timeless charm of Paris, the vibrant energy of Tokyo, 
              the historic streets of Istanbul, the modern elegance of London, or the dynamic 
              culture of Seoul, our mission is to make your trip seamless, inspiring, and memorable.
            </p>
          </TextAppear_para>
       
      </section>

 <section className="w-[98vw]  h-[full] mt-36 relative rounded-lg bg-gray-700">{
      // <Suspense fallback={<p className="text-white font-black">Loading...</p>}>
      

        <ErrorBoundary FallbackComponent={MyErrorFallback} >
          <BgEffect/>
    <Places data={places_parallax}/>
    </ErrorBoundary>
    
 
      //  </Suspense>
}

    </section>
     <section className="h-[100vh]   relative w-[98vw] hide-scrollbar mt-36">
      
      <ErrorBoundary FallbackComponent={MyErrorFallback}>
         <TextAppear_2>
      <p className="text-stone-300 text-6xl  m-auto    [text-shadow:2px_4px_5px_rgba(0,0,0,0.6)]">
        OFFERED CITIES </p>
        <BgEffect/>
     </TextAppear_2>
      <City_Ref_wrapper data={cities_details}/>
      </ErrorBoundary>
     </section>


{/* 
<section className="max-h-[100vh] h-full custom-grid-background flex flex-col items-center justify-center relative w-[98vw]  text-4xl text-white w-screen">
  <ErrorBoundary FallbackComponent={MyErrorFallback}>
<div style={{top:"-60vh"}} className={`"h-[100vh] text-center w-full absolute  flex flex-col justify-center items-center ${tangerine.className} "`}> 
    <TextAppear_2>
      <p className="text-stone-300 text-8xl [text-shadow:2px_4px_5px_rgba(0,0,0,0.6)]">Why</p>
       <p className="text-[#d4af37] text-8xl drop-shadow-[2px_2px_2px_rgba(255,255,255,0.2)]">Choose</p>
       <p className="text-stone-300 text-8xl [text-shadow:2px_4px_5px_rgba(0,0,0,0.6)]">Us ?</p>
        </TextAppear_2>
    </div> 

<WhyChooseUs   />

  </ErrorBoundary>
</section> */}

<section className="flex flex-col items-center mt-36 relative  justify-center text-center">
  <BgEffect/>
  <FAQs/>
  <Footer/>
</section>
</div>
    </div>
  );
}
