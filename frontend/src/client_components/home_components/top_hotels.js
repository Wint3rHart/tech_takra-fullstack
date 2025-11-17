"use client"

import React, { useEffect, useMemo, useRef, use } from 'react';
import { useTransform, motion, useScroll } from 'framer-motion';

export const Wrap = ({data}) => {
    let ref = useRef(null)
    return (
        <div ref={ref} className='h-[230vh]  mt-44 w-full'>
            <div className='bg-gray-900 h-[100vh] w-[99vw] -z-20 sticky top-0 left-0'>
                <TopHotels data={data} refer={ref} />
            </div>
        </div>
    )
}

export const TopHotels = ({data, refer}) => {
    let get = use(data);
    console.log(get);
    
    // EXACT SAME SCROLL LOGIC
    let {scrollYProgress} = useScroll({target: refer, offset: ["start start", "end start"]})
    let big_scale = useTransform(scrollYProgress, [0, .5, 1], [1, 3, 3]);
    let opacity = useTransform(scrollYProgress, [0, .5, .6, 1], [1, .3, 0, 0]);

    // EXACT SAME ARRAY MEMO
    let arry_memo = useMemo(() => {
        return [
            { t: 37, l: -110 },
            { t: -40, l: 10 }, 
            { t: 28, l: 140 }, 
            { t: 160, l: 128 }, 
            { t: 158, l: -115 }
        ]
    }, []);

    return (
        <motion.div className='relative  flex justify-center items-center h-[100vh] w-[100vw] -z-10'>
           
            {get?.data?.map((x, i) => {   
                return (
                    <Top_hotel_cards key={i} l={arry_memo[i].l} t={arry_memo[i].t} x={x} scroll={scrollYProgress} i={i} />
                )
            })}

            {/* Simplified center element - removed heavy bg-[url] class */}
            <motion.div
                style={{ 
                    scale: big_scale, 
                    opacity, 
                    transformOrigin: "center",
                    backgroundImage: "url('https://picsum.photos/600/400?random=10')",
                    backgroundRepeat: "no-repeat",
                    backgroundSize: "cover"
                }}
                className='h-[35vh] text-white w-[25%] border-2 border-amber-400 rounded-lg z-90'
            />
        </motion.div>
    );
}

const Top_hotel_cards = ({scroll, x, l, t, i}) => {
    // EXACT SAME MATH LOGIC
    let math_memo = useMemo(() => Math.random() * ((15 - 5) + 10), []);
    let scale = useTransform(scroll, [0, 1], [1, math_memo]);
    let opacity = useTransform(scroll, [0, .5, 1], [1, 0, 0]);
    
    return (
        <motion.div 
            className='h-100 w-100 absolute top-0 rounded-lg ' 
            style={{
                willChange: "transform",
                transformOrigin: "center",
                scale,
                opacity
            }}
        > 
            <motion.div
                key={i}
                className="text-white  border-2 border-amber-400 hover:border-gray-400 rounded-lg overflow-hidden w-[25vw] h-[35vh] transition-colors duration-300"
                style={{
                    y: `${t}%`,
                    x: `${l}%`,
                }}
            >
                {/* Simplified overlay */}
                <div className='bg-black/30 h-full w-full absolute top-0 z-10'/>
                
                {/* Optimized image - using img tag for better performance */}
                <img 
                    src={`https://picsum.photos/600/400?random=${i * 100}`} 
                    alt="Hotel"
                    className='h-full w-full object-cover'
                    loading="lazy"
                />
                
                {/* Simple content overlay - only shows on hover for performance */}
                <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/60 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300 z-20">
                    <h3 className="text-white text-lg font-semibold drop-shadow-lg">
                        {x?.name || 'Luxury Hotel'}
                    </h3>
                    <p className="text-gray-300 text-sm">
                        {x?.city || 'Premium Location'}
                    </p>
                </div>
            </motion.div>
        </motion.div>
    )
};