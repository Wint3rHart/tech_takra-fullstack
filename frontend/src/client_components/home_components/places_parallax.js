"use client"

import React, { use, useEffect, useMemo, useRef, useState, useTransition } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { get_fetch } from '@/server_fetch_fncs/fetch_fnx';
import { invalidate_tag } from '@/server_fetch_fncs/invalidate_fnx';

export const Places = ({data}) => {
    console.log("places rendered");

    let get = use(data);
    console.log(get);

    let [isPending, startTrans] = useTransition()
    let ref = useRef(null);
    let scroll = useScroll({target: ref, offset: ["start center", "end start"]});
    let router = useRouter();

    return (
        <div ref={ref} className=' sm:h-[210vh] lg:h-[210vh] relative rounded-xl bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 border-2 border-amber-500 overflow-hidden'>
            {/* Minimal ambient lighting - only one effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/3 via-transparent to-amber-400/3"></div>
            
            {/* Reduced particles - only 3 instead of 5 */}
            <div className="absolute top-10 left-20 w-1 h-1 bg-amber-400/40 rounded-full"></div>
            <div className="absolute bottom-40 right-24 w-1 h-1 bg-white/30 rounded-full"></div>
            <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-amber-300/30 rounded-full"></div>

            <div className="flex h-full relative pt-8 shadow-[inset_2px_5px_15px_5px_rgba(0,0,0,.8)] scrollbar-hide overflow-y-hidden scroll-smooth">
                {get?.data.map((x, i) => {
                    return (
                        <div className='' style={{width: "20vw", transform: "translateY(-30%)", willChange: "transform"}} key={i}> 
                            <PlacesCards x={x} scroll={scroll.scrollYProgress} i={i} /> 
                        </div>
                    )
                })}
            </div>
        </div>
    );
}

const PlacesCards = ({ x, scroll, i }) => {

    let [h, setH] = useState(1); 
    let h_ref = useRef(1);
    let [rand, setRand] = useState(1); 
    let rand_ref = useRef(1);
    let [isClient, setClient] = useState(false);
    
    useEffect(() => {
        setClient(true)
    }, []);
    
    useEffect(() => {
        if(isClient) {
            rand_ref.current = Math.random() * (2 - 1) + 1;
            h_ref.current = window.innerHeight;
            setRand(Math.random() * (2 - 1) + 1)
            setH(window.innerHeight);
        }
    }, [isClient]);

    let y = useTransform(scroll, [0, 1], [0, h * rand]);

    return (
        <motion.div 
            style={{ y, willChange: "transform"}} 
            className='ml-6'
        >
            <div className="space-y-6 space-x-2">
                {x.map((item, index) => (
                    <div
                        key={index}
                        className="group border border-amber-200 relative h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-pointer "
                        style={{
                            backgroundImage: `url('https://picsum.photos/600/400?random=${i * 100 + index}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center'
                        }}
                    >
                        {/* Simple overlay - no blur for performance */}
                        <div className='absolute z-10 inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 transition-all duration-500' />
                        
                        {/* Single hover effect - no shimmer animations */}
                        <div className="absolute inset-0 rounded-2xl border-2 border-amber-400/0 group-hover:border-amber-400/30 transition-all duration-500"></div>
                        
                        {/* Content */}
                        <div className='absolute bottom-0 left-0 right-0 p-8 text-white z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                            {/* Simple location badge - no pulsing */}
                            <div className="inline-flex items-center gap-2 bg-amber-300/20 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-medium text-amber-300 mb-4">
                                <span className="w-2 h-2 bg-amber-200 rounded-full"></span>
                                {item.city_name}
                            </div>
                            
                            <h3 className='text-2xl font-bold mb-3 text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] group-hover:text-amber-100 transition-colors duration-300'>
                                {item.name}
                            </h3>
                            
                            <p className='text-sm text-gray-300 mb-6 line-clamp-3 group-hover:text-white transition-colors duration-300 leading-relaxed'>
                                {item.description}
                            </p>
                            
                            {/* Simplified CTA Button - no complex animations */}
                            {/* <button className='group/btn bg-gradient-to-r from-amber-400/50 to-amber-500/50 hover:from-amber-200/50 hover:to-amber-500/50 border border-amber-400/30 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105'>
                                <span className="flex items-center gap-2">
                                  
                                    <span>Explore Now</span>
                                    <span className="transform group-hover/btn:translate-x-1 transition-transform duration-300">→</span>
                                </span>
                            </button> */}
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
};