import React, { useEffect, useRef,lazy } from 'react';

import { useNavigate } from 'react-router-dom';
import { animate, easeIn, motion,useMotionTemplate,useScroll,useTransform } from 'framer-motion';
import HeaderCards from './Header_cards';
import Intersection_wrapper from './Intersection_wrapper';
import WordsSplitter from './Words_splitter';
import TopHotels from './Top_hotels';
import WhyChooseUs from './Why_choose_us';
import FAQs from './FAQ';
import Footer from './Footer';
import UseVariants from './useVariants';
import TextStaggerComp from './Text_stagger_comp';
import useData from './useData';

 let Cities=lazy(()=>import ('./Cities_Ad')); 
let Places=lazy(x=>import("./Places"))



const Home = () => {

let {parentVar,opacityVar,grandChildVar}=UseVariants()

let nav=useNavigate();


const text2="Why";
const text3="Choose";
const text4="Us";


const ref=useRef(null);
const place_ref=useRef(null);
const hart_ref=useRef(null);
const top_hotels_ref=useRef(null);

let {query}=useData("trial")
let {data}=query;

let place_scroll=useScroll({target:place_ref,offset:["start start","end center"]});
let hart_scroll=useScroll({target:hart_ref,offset:["start center","center start"]});
let top_hotles_scroll=useScroll({target:top_hotels_ref,offset:["start start","end center"]});



let opacity=useTransform(top_hotles_scroll.scrollYProgress,[0,.5,.6,1],[1,4,0,0]);







    return (
   <div className='w-[99vw] scrollbar-hide '>

  <div    className="min-h-screen overflow-hidden h-[100vh] w-[99vw] bg-gray-900  relative bg-[url('uk2.jpg')]  bg-blend-color-dodge  bg-no-repeat bg-cover bg-top flex  [mask-image:linear-gradient(180deg,rgb(0,0,0,.1),rgb(0,0,0,.4),black,black,rgb(0,0,0,.8),rgb(0,0,0,.8),transparent)]">

<TextStaggerComp refer={ref} text1="THE" text2="WANDERING" text3="HART" />


   <div ref={ref} className='relative  ml-24 sm:h-[800px] overflow-hidden mt-36 ' style={{transformStyle:"preserve-3d",perspective:"800px"}}>
   

    </div> 
</div>





  <motion.div   className='text-white  mt-64 relative sm:h-[60vh] w-[98vw] flex flex-col items-center justify-center'>
<div className='z-10'>
<motion.h1 className='text-6xl font-semibold font-cinzel ' initial={{opacity:0,x:-20}}
whileInView={{x:0,opacity:1}} transition={{duration:.2,ease:"easeIn",delay:.3}} viewport={{amount:.8,once:false,offset:"start start"}}>WHO ARE WE <span>?</span> </motion.h1>


<motion.div  className="text-lg flex justify-center items-evenly  flex-wrap w-[60vw] mt-12">
<motion.p variants={opacityVar} initial="initial" whileInView="animate" viewport={{amount:1,once:false}}
className='font-raleway' > At Wandering Hart,we believe that every journey should be as unique as the traveler. We are passionate about connecting you with unforgettable experiences in some of the world’s most iconic destinations — London, Tokyo, Paris, Seoul, and Istanbul. From bustling city streets to serene cultural hideaways, we curate bookings that go beyond just travel plans, offering you handpicked stays, tours, and activities that let you truly experience the heart of each city.</motion.p>

 <motion.p variants={opacityVar} initial="initial" whileInView="animate"  viewport={{amount:1,once:false}}className='mt-16 font-raleway'>
Whether you’re seeking the timeless charm of Paris, the vibrant energy of Tokyo, the historic streets of Istanbul, the modern elegance of London, or the dynamic culture of Seoul, our mission is to make your trip seamless, inspiring, and memorable. With Traveling We, you’re not just booking a trip — you’re unlocking a journey filled with stories, adventures, and moments you’ll cherish forever.</motion.p>
</motion.div>


</div>

  
  </motion.div>
  
  
  

  
  <div ref={place_ref} className='relative mt-64 bg-cover overflow-hidden 
             bg-gray-900/70 bg-blend-color-dodge bg-no-repeat bg-center 
             h-[200vh] w-[98vw]'>
 
      <Places scroll={place_scroll.scrollYProgress} />
    



</div>

<div className='h-full  relative w-[98vw]'>

<motion.div ref={hart_ref} 

  className="h-[100vh]    w-full"
>
  <Cities scroll={hart_scroll.scrollYProgress}/>
</motion.div>
</div>

<div ref={top_hotels_ref} className='h-[230vh] w-[99vw]  mt-44 text-white '>
<motion.div className='bg-gray-900 h-[100vh] w-[99vw] z-20 sticky top-0 overflow-hidden left-0' style={{opacity}}> 

<TopHotels scroll={top_hotles_scroll.scrollYProgress}/>
  </motion.div>
</div>


<motion.div  className='max-h-[300vh] h-full  flex flex-col items-center relative w-[98vw]  text-6xl text-white w-screen '>
  <div style={{top:"-100vh"} } className='h-[100vh] w-full absolute  flex flex-col justify-center items-center'> <h1 className='text-6xl text-white font-semibold font-playfair'>
               
                {
                  <motion.div variants={parentVar} initial="initial" whileInView="animate" viewport={{amount:.9}} className='flex flex-col items-evenly h-full '>
                  <WordsSplitter para={text2} grandChildVar={grandChildVar}/>
                  <WordsSplitter para={text3} grandChildVar={grandChildVar} />
                  <WordsSplitter para={text4} grandChildVar={grandChildVar} />
                  
                  </motion.div>
                }
            </h1></div>

  <div style={{transform:"translateY(-5vh)"}}  className=' w-[98vw]  '>
<WhyChooseUs opacityVar={opacityVar}/>
</div>
</motion.div>

<FAQs/>
<Footer/>

</div>
    );
}

export default Home;
