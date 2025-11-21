// export const dynamic="force-dynamic"


import Ref_wrapper from "@/client_components/general_comps/text_stagger";
import {TextAppear,TextAppear_2,TextAppear_3, TextAppear_para} from "@/client_components/general_comps/text_appear_heading";
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
import Link from "next/link";

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
      <div className="font-sans flex w-[99vw] flex-col w-full min-h-screen pb-20">

    {/* Hero Section */}
<div className="overflow-hidden group relative w-full h-[70vh] sm:h-[80vh] md:h-[100vh] text-white font-black text-4xl sm:text-6xl lg:text-7xl bg-gray-900 bg-[url('/gcu.jpg.jpg')] bg-blend-overlay bg-no-repeat bg-cover bg-bottom [mask-image:linear-gradient(180deg,black,black,rgb(0,0,0,7),black,black,rgb(0,0,0,.8),rgb(0,0,0,.6),transparent)]">


<div> <Ref_wrapper>  
    <p>G</p>
    <p>C</p>
    <p>U</p>
  </Ref_wrapper></div> 
  
 

  <div className='absolute inset-0 h-full w-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-50 transition-transform duration-1500'></div>

  {/* Fireflies/Stars Effect */}
 <BgEffect/>
  
  
  
</div>

      
    <div className="h-full w-full px-4 sm:px-6 lg:px-8">
      
      {/* About Us Section - SEO content rendered on server */}
      <section className="text-center relative flex flex-col items-center justify-center items-evenly min-h-screen md:h-[100vh] text-white mt-20 md:mt-36">
<BgEffect/>
        <TextAppear styling={` font-playfair drop-shadow-[2px_2px_2px_rgba(255,255,255,0.1)]  text-6xl text-[#d4af37] font-semibold `}>
        
            WHO ARE WE <span className="text-stone-300">?</span>
          </TextAppear>
          <TextAppear_para  styling={`font-inter mt-8 sm:mt-12 text-base sm:text-lg text-gray-300`}>
            <p>At Wandering Hart,we believe that every journey should be as unique as the traveler. We are passionate about connecting you with unforgettable experiences in some of the world’s most iconic destinations — London, Tokyo, Paris, Seoul, and Istanbul. From bustling city streets to serene cultural hideaways, we curate bookings that go beyond just travel plans, offering you handpicked stays, tours, and activities that let you truly experience the heart of each city.</p>
             <p>Whether you’re seeking the timeless charm of Paris, the vibrant energy of Tokyo, the historic streets of Istanbul, the modern elegance of London, or the dynamic culture of Seoul, our mission is to make your trip seamless, inspiring, and memorable. With Traveling We, you’re not just booking a trip — you’re unlocking a journey filled with stories, adventures, and moments you’ll cherish forever.</p>
            <p >Whether you're seeking the timeless charm of Paris, the vibrant energy of Tokyo, 
              the historic streets of Istanbul, the modern elegance of London, or the dynamic 
              culture of Seoul, our mission is to make your trip seamless, inspiring, and memorable.
            </p>
          </TextAppear_para>
       
      </section>

 <section className="w-full h-full mt-20 md:mt-36 relative rounded-lg bg-gray-700 ">
      {/* Suspense fallback could be used here if needed:
          <Suspense fallback={<p className="text-white font-black">Loading...</p>}>
      */}
      <ErrorBoundary FallbackComponent={MyErrorFallback}>
        <BgEffect/>
        <Places data={places_parallax}/>
      </ErrorBoundary>
    </section>
    <section className="min-h-screen  h-full w-full relative w-full hide-scrollbar mt-20 md:mt-36">
      
      <ErrorBoundary FallbackComponent={MyErrorFallback}>
         <TextAppear_3>
      <p className="text-stone-300 text-3xl sm:text-6xl m-auto [text-shadow:2px_4px_5px_rgba(0,0,0,0.6)]">
        OFFERED CITIES </p>
        <BgEffect/>
     </TextAppear_3>
      <City_Ref_wrapper data={cities_details}/>
      </ErrorBoundary>
     </section>



<section className="max-h-[100vh] h-full mt-24 custom-grid-background flex flex-col items-center justify-center relative w-[98vw]  text-4xl text-white w-screen">
  <ErrorBoundary FallbackComponent={MyErrorFallback}>
<div  className={`h-[100vh] text-center w-full   flex flex-col justify-center items-center font-cinzel `}> 
    <TextAppear_2>
      <p className="text-stone-300 text-8xl [text-shadow:2px_4px_5px_rgba(0,0,0,0.6)]">Join</p>
       <p className="text-[#d4af37] text-8xl drop-shadow-[2px_2px_2px_rgba(255,255,255,0.2)]">Us</p>
       <p className="text-stone-300 text-8xl [text-shadow:2px_4px_5px_rgba(0,0,0,0.6)]">Now</p>

        </TextAppear_2>
    </div> 

  </ErrorBoundary>
</section>

<section className="flex flex-col items-center mt-20 md:mt-36 relative justify-center text-center px-4 sm:px-6">
  <BgEffect/>
  <FAQs/>
  <Footer/>
</section>
</div>
    </div>
  );
}
