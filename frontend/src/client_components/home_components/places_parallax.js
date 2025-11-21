"use client"

import React, { use, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Places = ({data}) => {
    
    let past_events=use(data);
    console.log(past_events);
    
    const demoData = [
        [
            { city_name: 'Seoul', name: 'Gyeongbokgung', description: 'Historic palace with scenic gardens and cultural performances.' },
            { city_name: 'Seoul', name: 'Bukchon Hanok', description: 'Traditional village showcasing classic Korean architecture.' },
            { city_name: 'Seoul', name: 'Myeongdong', description: 'Vibrant shopping district with street food and nightlife.' }
        ],
        [
            { city_name: 'Paris', name: 'Louvre', description: 'World-famous museum housing thousands of artworks.' },
            { city_name: 'Paris', name: 'Eiffel Tower', description: 'Iconic iron tower with city views and restaurants.' },
            { city_name: 'Paris', name: 'Montmartre', description: 'Artist district with charming streets and views.' }
        ],
        [
            { city_name: 'Tokyo', name: 'Shibuya', description: 'Bustling crossing, shops, and late-night eats.' },
            { city_name: 'Tokyo', name: 'Asakusa', description: 'Historic temple area with traditional shopping street.' },
            { city_name: 'Tokyo', name: 'Akihabara', description: 'Electronics and pop-culture hub with themed cafés.' }
        ]
    ];

    let get = { data: demoData };

    const [isMobile, setIsMobile] = useState(false);
    const [w, setW] = useState(1);
    const w_ref = useRef(1);
    const [isClient, setClient] = useState(false);

    useEffect(() => {
        setClient(true);
    }, []);

    useEffect(() => {
        const mq = window.matchMedia('(max-width: 640px)');
        const handler = () => setIsMobile(mq.matches);
        handler();
        if (mq.addEventListener) mq.addEventListener('change', handler);
        else mq.addListener(handler);
        return () => {
            if (mq.removeEventListener) mq.removeEventListener('change', handler);
            else mq.removeListener(handler);
        }
    }, []);

    useEffect(() => {
        if (isClient) {
            w_ref.current = window.innerWidth;
            setW(window.innerWidth);
            
            const handleResize = () => {
                w_ref.current = window.innerWidth;
                setW(window.innerWidth);
            };
            
            window.addEventListener('resize', handleResize);
            return () => window.removeEventListener('resize', handleResize);
        }
    }, [isClient]);

    let ref = useRef(null);
    let scroll = useScroll({ target: ref, offset: ["start center", "end start"] });

    const MobileRow = ({ items, rowIndex }) => {
        const [rand, setRand] = useState(1);
        const rand_ref = useRef(1);

        useEffect(() => {
            if (isClient) {
                // Generate random multiplier for this row (similar to desktop's h * rand)
                rand_ref.current = Math.random() * (.6 - .1) +.4;
                setRand(rand_ref.current);
            }
        }, [isClient]);

        // Alternate direction: row 0 -> right to left, row 1 -> left to right, row 2 -> right to left
        const direction = rowIndex === 1 ? -2 : -1;
        
        // Calculate horizontal transform using innerWidth (similar to desktop's innerHeight approach)
        // Keep movement within bounds so cards don't all disappear
        const x = useTransform(
            scroll.scrollYProgress,
            [0, 1],
            [0, direction * w * rand]
        );

        return (
            <motion.div
                style={{ x, willChange: 'transform' }}
                className="w-full overflow-visible mb-6"
            >
                <div className="flex gap-4 px-2">
                    {items.map((item, idx) => (
                        <div key={idx} className="w-[65vw] sm:w-[35vw] flex-shrink-0">
                            <div className="group border border-amber-200 relative h-52 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-pointer">
                                <div className='absolute z-10 inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 transition-all duration-500' />
                                <div className="absolute inset-0 rounded-2xl border-2 border-amber-400/0 group-hover:border-amber-400/30 transition-all duration-500"></div>
                                <div className='absolute bottom-0 left-0 right-0 p-6 text-white z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
                                    <div className="inline-flex items-center gap-2 bg-amber-300/20 border border-amber-400/30 px-3 py-1 rounded-full text-xs font-medium text-amber-300 mb-2">
                                        <span className="w-2 h-2 bg-amber-200 rounded-full"></span>
                                        {item.city_name}
                                    </div>
                                    <h3 className='text-xl font-bold mb-2 text-white drop-shadow-[2px_2px_4px_rgba(0,0,0,0.8)] group-hover:text-amber-100 transition-colors duration-300'>
                                        {item.name}
                                    </h3>
                                    <p className='text-sm text-gray-300 line-clamp-3 group-hover:text-white transition-colors duration-300 leading-relaxed'>
                                        {item.description}
                                    </p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </motion.div>
        );
    };

    return (
        <div ref={ref} className='relative rounded-xl bg-gradient-to-br from-gray-900/90 via-black/80 to-gray-800/90 border-2 border-amber-500 overflow-hidden min-h-[600px]'>
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400/3 via-transparent to-amber-400/3"></div>
            
            <div className="absolute top-10 left-20 w-1 h-1 bg-amber-400/40 rounded-full"></div>
            <div className="absolute bottom-40 right-24 w-1 h-1 bg-white/30 rounded-full"></div>
            <div className="absolute top-1/3 left-1/4 w-1 h-1 bg-amber-300/30 rounded-full"></div>

            <div className="relative pt-8 pb-8 shadow-[inset_2px_5px_15px_5px_rgba(0,0,0,.8)] scrollbar-hide scroll-smooth px-2">
                {!isMobile && (
                    <div className="flex h-full relative overflow-x-auto md:overflow-x-hidden overflow-y-hidden justify-between">
                        {get?.data.map((x, i) => {
                            const colTransform = 'translateY(-30%)';
                            return (
                                <div className='w-[84vw] sm:w-[66vw] md:w-1/3 flex-shrink-0 px-2 md:px-4' style={{ transform: colTransform, willChange: "transform" }} key={i}>
                                    <PlacesCards x={x} scroll={scroll.scrollYProgress} i={i} />
                                </div>
                            )
                        })}
                    </div>
                )}

                {isMobile && (
                    <div className="flex flex-col overflow-hidden">
                        {[0, 1, 2].map(rowIndex => {
                            const rowItems = get.data.map(col => col[rowIndex]).filter(Boolean);
                            return <MobileRow key={rowIndex} items={rowItems} rowIndex={rowIndex} />
                        })}
                    </div>
                )}
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
        if (isClient) {
            rand_ref.current = Math.random() * (2 - 1) + 1;
            h_ref.current = window.innerHeight;
            setRand(Math.random() * (2 - 1) + 1)
            setH(window.innerHeight);
        }
    }, [isClient]);

    let y = useTransform(scroll, [0, 1], [0, h * rand]);

    return (
        <motion.div
            style={{ y, willChange: "transform" }}
            className='ml-6'
        >
            <div className="space-y-6 space-x-2">
                {x.map((item, index) => (
                    <div
                        key={index}
                        className="group border border-amber-200 relative h-44 sm:h-64 lg:h-96 rounded-2xl overflow-hidden shadow-xl hover:shadow-2xl transition-shadow duration-500 cursor-pointer"
                    >
                        <div className='absolute z-10 inset-0 rounded-2xl bg-gradient-to-t from-black/80 via-black/40 to-black/20 group-hover:from-black/70 transition-all duration-500' />
                        <div className="absolute inset-0 rounded-2xl border-2 border-amber-400/0 group-hover:border-amber-400/30 transition-all duration-500"></div>
                        <div className='absolute bottom-0 left-0 right-0 p-8 text-white z-20 transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300'>
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
                        </div>
                    </div>
                ))}
            </div>
        </motion.div>
    );
}

export default Places;