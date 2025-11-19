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
<div className=" overflow-hidden group  relative h-[100vh] text-white font-black text-6xl w-[98vw] bg-gray-900 overflow-hidden relative bg-[url('/gcu.jpg.jpg')] bg-blend-overlay bg-no-repeat bg-cover bg-bottom  [mask-image:linear-gradient(180deg,black,black,rgb(0,0,0,7),black,black,rgb(0,0,0,.8),rgb(0,0,0,.3),transparent)]  ">

<div> <Ref_wrapper>  
    <p>G</p>
    <p>C</p>
    <p>U</p>
  </Ref_wrapper></div> 
  
 

  <div className='absolute w-[97vw] h-[100vh]  inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-[97vw] group-hover:translate-x-50 transition-transform duration-1500'></div>

  {/* Fireflies/Stars Effect */}
  <div className="absolute top-20 left-20 w-1 h-1 bg-amber-400/80 rounded-full animate-ping shadow-lg shadow-amber-400/60"></div>
  <div className="absolute top-32 right-24 w-2 h-2 bg-white/70 rounded-full animate-pulse shadow-md shadow-white/50"></div>
  <div className="absolute bottom-40 left-16 w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse delay-700 shadow-lg shadow-amber-300/50"></div>
  <div className="absolute top-1/3 right-32 w-0.5 h-0.5 bg-white/60 rounded-full animate-ping delay-1000 shadow-sm shadow-white/40"></div>
  <div className="absolute bottom-1/3 left-1/4 w-1 h-1 bg-amber-500/70 rounded-full animate-pulse delay-500 shadow-md shadow-amber-500/50"></div>
  <div className="absolute top-1/4 right-1/3 w-1.5 h-1.5 bg-white/50 rounded-full animate-ping delay-300 shadow-md shadow-white/40"></div>
  <div className="absolute bottom-1/4 right-20 w-1 h-1 bg-amber-200/80 rounded-full animate-pulse delay-1200 shadow-sm shadow-amber-200/60"></div>
  <div className="absolute top-40 left-1/3 w-0.5 h-0.5 bg-white/70 rounded-full animate-ping delay-800 shadow-sm shadow-white/50"></div>
  <div className="absolute bottom-32 right-1/4 w-2 h-2 bg-amber-400/60 rounded-full animate-pulse delay-400 shadow-lg shadow-amber-400/40"></div>
  <div className="absolute top-1/5 left-40 w-1 h-1 bg-white/40 rounded-full animate-ping delay-600 shadow-sm shadow-white/30"></div>
  
  {/* Larger Pulsing Lights */}
  <div className="absolute top-24 right-40 w-3 h-3 bg-amber-400/50 rounded-full animate-pulse shadow-xl shadow-amber-400/70 blur-sm"></div>
  <div className="absolute bottom-24 left-32 w-4 h-4 bg-white/30 rounded-full animate-pulse delay-900 shadow-xl shadow-white/50 blur-sm"></div>
  <div className="absolute top-1/2 left-20 w-2.5 h-2.5 bg-amber-300/40 rounded-full animate-pulse delay-200 shadow-lg shadow-amber-300/60 blur-sm"></div>
  
  {/* Twinkling Stars */}
  <div className="absolute top-16 right-16 w-0.5 h-0.5 bg-white/90 rounded-full animate-ping delay-100 shadow-sm shadow-white/70"></div>
  <div className="absolute top-28 left-1/2 w-0.5 h-0.5 bg-white/80 rounded-full animate-ping delay-1500 shadow-sm shadow-white/60"></div>
  <div className="absolute bottom-20 left-1/3 w-0.5 h-0.5 bg-white/70 rounded-full animate-ping delay-2000 shadow-sm shadow-white/50"></div>
  <div className="absolute top-36 right-1/5 w-0.5 h-0.5 bg-white/85 rounded-full animate-ping delay-1800 shadow-sm shadow-white/65"></div>
  
  {/* Floating Orbs */}
  <div className="absolute top-1/6 right-1/6 w-6 h-6 bg-amber-400/20 rounded-full animate-pulse shadow-2xl shadow-amber-400/40 blur-md"></div>
  <div className="absolute bottom-1/6 left-1/6 w-5 h-5 bg-white/15 rounded-full animate-pulse delay-1100 shadow-2xl shadow-white/30 blur-md"></div>
  
  {/* Moving Light Trails */}
  <div className="absolute top-1/3 left-1/2 w-1 h-8 bg-gradient-to-b from-amber-400/60 to-transparent rounded-full animate-pulse delay-300 shadow-lg shadow-amber-400/50 transform rotate-45"></div>
  <div className="absolute bottom-1/3 right-1/2 w-0.5 h-6 bg-gradient-to-t from-white/50 to-transparent rounded-full animate-pulse delay-700 shadow-md shadow-white/40 transform -rotate-45"></div>
  
  {/* Corner Accent Lights */}
  <div className="absolute top-8 left-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse shadow-lg shadow-amber-400/60"></div>
  <div className="absolute top-8 right-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-400 shadow-lg shadow-amber-400/60"></div>
  <div className="absolute bottom-8 left-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-800 shadow-lg shadow-amber-400/60"></div>
  <div className="absolute bottom-8 right-8 w-2 h-2 bg-amber-400/70 rounded-full animate-pulse delay-1200 shadow-lg shadow-amber-400/60"></div>
  
  {/* Glowing Particles */}
  <div className="absolute top-12 left-1/4 w-1 h-1 bg-amber-200/80 rounded-full animate-ping delay-250 shadow-md shadow-amber-200/60"></div>
  <div className="absolute bottom-16 right-1/3 w-1 h-1 bg-white/60 rounded-full animate-ping delay-750 shadow-sm shadow-white/50"></div>
  <div className="absolute top-44 right-1/4 w-1 h-1 bg-amber-300/70 rounded-full animate-ping delay-1350 shadow-md shadow-amber-300/50"></div>
  
  
  
</div>

      
     
      {/* About Us Section - SEO content rendered on server */}
      <section className="text-center flex flex-col items-center justify-center items-evenly  h-[100vh] text-white mt-36">

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

 <section className="w-[98vw]  h-[full] mt-36  rounded-lg bg-gray-700">{
      // <Suspense fallback={<p className="text-white font-black">Loading...</p>}>
      

        <ErrorBoundary FallbackComponent={MyErrorFallback} >
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

<section className="flex flex-col items-center mt-36  justify-center text-center">
  <FAQs/>
  <Footer/>
</section>

    </div>
  );
}
