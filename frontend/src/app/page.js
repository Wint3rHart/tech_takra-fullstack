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
import BgEffect from "@/util_comps/bg_effect";
import BgEffectLite from "@/util_comps/bg_effect_lite";
import Link from "next/link";
import { Suspense } from "react";



export default async function Home() {
  console.log("home rendering");
  
  // Components use use() hook which expects promises, so we always return promises
  // Wrap in catch to handle errors gracefully during build
  let past_events = get_fetch("events", "past");
  
  let upcoming_events = get_fetch("events", "upcoming");
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
<BgEffectLite/>
        <TextAppear styling={` text-4xl sm:text-5xl lg:text-6xl m-auto max-w-4xl text-center font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-300 tracking-wide uppercase drop-shadow-[2px_4px_4px_rgba(0,0,0,0.25),0_0_8px_rgba(212,175,55,0.45)] font-inter`}>
        
            WHO ARE WE <span className="text-stone-300">?</span>
          </TextAppear>
          <TextAppear_para  styling={`font-inter mt-8 sm:mt-12 text-base sm:text-lg text-gray-300`}>
           <p>The Computer Science Society at Government College University is dedicated to fostering a vibrant environment where innovation, curiosity, and learning thrive. We believe that every student’s journey into technology should be unique, inspiring, and empowering. From coding to creativity, from research to real-world applications, the CSS brings together individuals who are passionate about exploring the limitless possibilities of the digital world.</p>
           <p>Whether you’re intrigued by software development, fascinated by artificial intelligence, motivated by cybersecurity, or inspired by interactive design and modern web technologies, our society offers opportunities to grow, collaborate, and experiment. Through workshops, competitions, seminars, and hands-on projects, the CSS aims to enrich your academic experience while bridging the gap between theory and practical skill. Our mission is to equip students with confidence, clarity, and the tools needed to excel in an ever-evolving tech landscape.</p>
           <p>At the Computer Science Society, you’re not just joining a club — you’re joining a community. A community built on collaboration, creativity, and ambition. Together, we strive to create experiences that spark innovation, shape perspectives, and help students discover their true potential. Whether you're taking your first step into programming or preparing for advanced tech challenges, the CSS is here to guide your journey every step of the way.</p>
          </TextAppear_para>
       
      </section>

 <section className="w-full h-full mt-36 md:mt-44 relative rounded-lg  shadow-sm">
   <div className="mb-12"><TextAppear_3>
      <p className="font-poppins text-stone-300 text-3xl sm:text-6xl m-auto [text-shadow:2px_4px_5px_rgba(0,0,0,0.6)]">
       Past Events </p>
        <BgEffectLite/>
     </TextAppear_3></div>
    
          <Suspense fallback={ <div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-amber-600/20">
        <div className="text-center">
          {/* Elegant Loading Spinner */}
          <div className="w-16 h-16 border-4 border-amber-600/30 border-t-[#d4af37] 
                          rounded-full animate-spin mx-auto mb-4 shadow-lg shadow-amber-400/20"></div>
          
          {/* Floating Dots */}
          <div className="flex gap-2 justify-center mb-4">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-200"></div>
          </div>
          
          <p className={`font-inter text-[#d4af37] text-2xl font-bold 
                          drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]`}>
            Loading
          </p>
        </div>
      </div>}>
    
      <ErrorBoundary FallbackComponent={MyErrorFallback}>
        <BgEffectLite/>
        
        <Places data={past_events}/>
      </ErrorBoundary>
      </Suspense>
    </section>
    <section className="min-h-screen  h-full w-[100vw] relative w-full hide-scrollbar mt-20 md:mt-36">
      <BgEffectLite/>
      <Suspense fallback={<div className="flex items-center justify-center h-64 bg-gradient-to-br from-gray-900 to-gray-800 rounded-3xl border border-amber-600/20">
        <div className="text-center">
          {/* Elegant Loading Spinner */}
          <div className="w-16 h-16 border-4 border-amber-600/30 border-t-[#d4af37] 
                          rounded-full animate-spin mx-auto mb-4 shadow-lg shadow-amber-400/20"></div>
          
          {/* Floating Dots */}
          <div className="flex gap-2 justify-center mb-4">
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-100"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-bounce delay-200"></div>
          </div>
          
          <p className={`font-inter text-[#d4af37] text-2xl font-bold 
                          drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]`}>
            Loading
          </p>
        </div>
      </div>}>
      <ErrorBoundary FallbackComponent={MyErrorFallback}>
         <TextAppear_3>
      <p className="font-poppins text-stone-300 text-3xl sm:text-6xl m-auto [text-shadow:2px_4px_5px_rgba(0,0,0,0.6)]">
       Upcoming Events </p>
        <BgEffectLite/>
     </TextAppear_3>
      <City_Ref_wrapper data={upcoming_events}/>
      </ErrorBoundary>
      </Suspense>
     </section>



<section className="overflow-hidden  rounded-xl group relative w-full h-[70vh] sm:h-[80vh] md:h-[100vh] text-white font-black text-4xl sm:text-6xl lg:text-7xl bg-gray-900 bg-[url('/ravil-1024x683-1.jpeg')] bg-blend-overlay bg-no-repeat bg-cover bg-bottom [mask-image:linear-gradient(180deg,black,black,rgb(0,0,0,7),black,black,rgb(0,0,0,.8),rgb(0,0,0,.4),transparent)] border-2 border-amber-400/45">
  <BgEffectLite/>
  {/* subtle dark blur overlay to make BG image pop while keeping detail */}
  <div className="absolute inset-0 rounded-xl bg-black/40 backdrop-blur-sm pointer-events-none z-10" />
  <ErrorBoundary FallbackComponent={MyErrorFallback}>
<div  className={`h-[80vh] text-center w-full    flex flex-col justify-center items-center font-inter relative z-20 `}> 
  {/* <BgEffect/> */}
    <TextAppear_2>
      <p className="font-inter text-6xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-400 to-yellow-200 drop-shadow-[0_12px_40px_rgba(212,175,55,0.45)] [text-shadow:0_8px_40px_rgba(212,175,55,0.28)]">Join</p>
      <p className="font-inter text-6xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-300 to-amber-400 drop-shadow-[0_14px_48px_rgba(212,175,55,0.6)] [text-shadow:0_10px_50px_rgba(212,175,55,0.36)]">Us</p>
      <p className="font-poppins text-6xl lg:text-8xl text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-amber-350 to-amber-300 drop-shadow-[0_10px_36px_rgba(212,175,55,0.42)] [text-shadow:0_8px_44px_rgba(212,175,55,0.3)]">Now</p>

    </TextAppear_2>
        <BgEffect/>
    </div> 

  </ErrorBoundary>
</section>

<section className="flex flex-col justify-center items-center mt-20 md:mt-36 relative justify-center text-center px-4 sm:px-6">
  <BgEffectLite/>
  
  <Footer/>
</section>
</div>
    </div>
  );
}
