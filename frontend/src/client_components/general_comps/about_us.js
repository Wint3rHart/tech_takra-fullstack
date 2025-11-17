"use client"

import UseVariants from '@/client_hooks/useVariants';
import React from 'react';
import { motion } from 'framer-motion';
const AboutUs = () => {

let {opacityVar}=UseVariants();

    return (
        
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
  
    );
}

export default AboutUs;
