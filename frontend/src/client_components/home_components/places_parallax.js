"use client"

import React, { use, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

export const Places = ({ data }) => {
    
    let past_events = use(data);
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
                rand_ref.current = Math.random() * (.6 - .1) + .4;
                setRand(rand_ref.current);
            }
        }, [isClient]);

        const direction = rowIndex === 1 ? -2 : -1;
        
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
                        <PlaceCard key={idx} item={item} size="mobile" />
                    ))}
                </div>
            </motion.div>
        );
    };

    return (
        <div ref={ref} className="relative rounded-2xl bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-gray-800/80 border border-amber-600/20 overflow-hidden min-h-[600px] backdrop-blur-sm">
            
            {/* Subtle ambient glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-amber-400/5 opacity-50" />

            {/* Corner accents */}
            <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400/40 rounded-full" />
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-amber-400/40 rounded-full" />

            <div className="relative pt-8 pb-8 shadow-[inset_0_4px_20px_rgba(0,0,0,0.4)] scrollbar-hide scroll-smooth px-2">
                {!isMobile && (
                    <div className="flex h-full relative overflow-x-auto md:overflow-x-hidden overflow-y-hidden justify-between">
                        {get?.data.map((x, i) => {
                            const colTransform = 'translateY(-30%)';
                            return (
                                <div className="w-[84vw] sm:w-[66vw] md:w-1/3 flex-shrink-0 px-2 md:px-4" style={{ transform: colTransform, willChange: "transform" }} key={i}>
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

const PlaceCard = ({ item, size = "desktop" }) => {
    const isMobile = size === "mobile";
    
    return (
        <div className={`${isMobile ? 'w-[65vw] sm:w-[35vw]' : ''} flex-shrink-0`}>
            <div className={`group relative ${isMobile ? 'h-52' : 'h-44 sm:h-64 lg:h-96'} rounded-2xl overflow-hidden 
                           bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-gray-800/80
                           border border-amber-600/20 hover:border-amber-500/40
                           shadow-xl hover:shadow-2xl hover:shadow-amber-400/10 
                           transition-all duration-500 cursor-pointer`}>
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/90 via-gray-900/50 to-gray-900/30 group-hover:from-gray-900/80 transition-all duration-500" />
                
                {/* Ambient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-transparent to-amber-400/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                {/* Content */}
                <div className={`absolute bottom-0 left-0 right-0 ${isMobile ? 'p-5' : 'p-6 sm:p-8'} text-white z-20 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300`}>
                    
                    {/* City badge */}
                    <div className={`inline-block ${isMobile ? 'mb-2' : 'mb-3 sm:mb-4'}`}>
                        <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-amber-400 rounded-full" />
                                <p className="text-xs font-semibold text-amber-300 font-inter">{item.city_name}</p>
                            </div>
                        </div>
                    </div>

                    {/* Name */}
                    <h3 className={`${isMobile ? 'text-xl mb-2' : 'text-xl sm:text-2xl mb-2 sm:mb-3'} font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-300 group-hover:to-amber-200 transition-colors duration-300`}
                        style={{ textShadow: '2px 2px 4px rgba(212,175,55,0.3)' }}>
                        {item.name}
                    </h3>

                    {/* Description */}
                    <p className={`${isMobile ? 'text-sm' : 'text-sm sm:text-base'} text-gray-400 line-clamp-3 group-hover:text-gray-300 transition-colors duration-300 leading-relaxed`}>
                        {item.description}
                    </p>

                    {/* Decorative line */}
                    <div className="w-16 h-px bg-gradient-to-r from-[#d4af37] to-transparent rounded-full opacity-60 mt-3 sm:mt-4" />
                </div>

                {/* Corner accent */}
                <div className="absolute top-3 right-3 w-2 h-2 bg-amber-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
        </div>
    );
};

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
            className="ml-4 sm:ml-6"
        >
            <div className="space-y-5 sm:space-y-6">
                {x.map((item, index) => (
                    <PlaceCard key={index} item={item} size="desktop" />
                ))}
            </div>
        </motion.div>
    );
}

export default Places;