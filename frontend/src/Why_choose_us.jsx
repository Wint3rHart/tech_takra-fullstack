import React from 'react';
import { motion,useTransform,useScroll } from 'framer-motion';
const WhyChooseUs = ({opacityVar}) => {

let text1="At Wandering Hart, we believe every journey should be more than just a trip — it should be a story you’ll want to tell again and again. From the charming streets of Paris to the bustling energy of Tokyo, the vibrant culture of Istanbul, the timeless beauty of London, and the modern elegance of Seoul, we connect you with the world’s most captivating destinations."

let text2="We go beyond basic bookings. Our platform is designed to offer personalized experiences, trusted recommendations, and seamless reservations so you can travel with complete peace of mind. Whether you’re seeking iconic landmarks, hidden gems, or unforgettable cultural encounters, we ensure your adventure is crafted with care, precision, and passion."


let text3="With Wandering Hart, your travel dreams aren’t just possible — they’re easy, inspiring, and unforgettable.";





    return (
        <div  className='text-white font-raleway  h-[100vh] '>
           
            <div className='text-lg w-[50vw]  mx-auto '>
                <motion.div className='flex  h-[30vh] flex-wrap w-[50vw] max-w-[50vw]' variants={opacityVar} initial="initial" whileInView="animate" viewport={{amount:1,once:false}}>{
               text1
                }</motion.div>
                <motion.div className='flex  h-[30vh] flex-wrap w-[50vw] max-w-[50vw]' variants={opacityVar} initial="initial" whileInView="animate" viewport={{amount:1,once:false}}>{
               text2
                }</motion.div>
                <motion.div className='flex h-[30vh]  flex-wrap w-[50vw] max-w-[50vw]' variants={opacityVar} initial="initial" whileInView="animate" viewport={{amount:1,once:false}}>{
               text3
                }</motion.div>
                
            </div>
        </div>
    );
}

export default WhyChooseUs;
