"use client"

import React, { use, useEffect, useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRouter } from 'next/navigation';

export const Places = ({ data }) => {
    
    let past_events = use(data);
    
    // Transform flat array into [[3], [3], [3]] format
    const transformData = (flatArray) => {
        if (!flatArray || flatArray.length === 0) return [[], [], []];
        
        const result = [[], [], []];
        const itemsPerColumn = 3;
        const totalColumns = 3;
        
        flatArray.forEach((item, index) => {
            const columnIndex = Math.floor(index / itemsPerColumn) % totalColumns;
            if (result[columnIndex].length < itemsPerColumn) {
                result[columnIndex].push(item);
            }
        });
        
        // If we have more than 9 items, distribute remaining evenly
        if (flatArray.length > 9) {
            let extraItems = flatArray.slice(9);
            extraItems.forEach((item, idx) => {
                result[idx % totalColumns].push(item);
            });
        }
        
        return result;
    };

    // Demo data with images for fallback
    const demoData = [
        [
            { title: 'Tech Summit 2025', date: '2025-03-15T00:00:00.000Z', location: 'Convention Center', images: [{ url: 'https://images.unsplash.com/photo-1540575467063-178a50c2df87?w=800' }] },
            { title: 'AI Workshop', date: '2025-04-20T00:00:00.000Z', location: 'Tech Hub', images: [{ url: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=800' }] },
            { title: 'Hackathon', date: '2025-05-10T00:00:00.000Z', location: 'Innovation Lab', images: [{ url: 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=800' }] }
        ],
        [
            { title: 'Design Conference', date: '2025-06-05T00:00:00.000Z', location: 'Art Center', images: [{ url: 'https://images.unsplash.com/photo-1475721027785-f74eccf877e2?w=800' }] },
            { title: 'Startup Meetup', date: '2025-07-12T00:00:00.000Z', location: 'Co-work Space', images: [{ url: 'https://images.unsplash.com/photo-1515187029135-18ee286d815b?w=800' }] },
            { title: 'Code Festival', date: '2025-08-25T00:00:00.000Z', location: 'University Hall', images: [{ url: 'https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=800' }] }
        ],
        [
            { title: 'Cloud Expo', date: '2025-09-18T00:00:00.000Z', location: 'Tech Park', images: [{ url: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=800' }] },
            { title: 'Web Dev Day', date: '2025-10-22T00:00:00.000Z', location: 'Digital Arena', images: [{ url: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=800' }] },
            { title: 'Tech Awards', date: '2025-11-30T00:00:00.000Z', location: 'Grand Hall', images: [{ url: 'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800' }] }
        ]
    ];

    const formattedData = past_events?.length > 0 
        ? transformData(past_events) 
        : demoData;

    let get = { data: formattedData };

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

        useEffect(() => {
            if (isClient) setRand(Math.random() * (.6 - .1) + .4);
        }, [isClient]);

        const direction = rowIndex === 1 ? -2 : -1;
        const x = useTransform(scroll.scrollYProgress, [0, 1], [0, direction * w * rand]);

        return (
            <motion.div style={{ x, willChange: 'transform' }} className="w-full overflow-visible mb-6">
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
            <div className="absolute inset-0 bg-gradient-to-br from-amber-400/5 via-transparent to-amber-400/5 opacity-50" />
            <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400/40 rounded-full" />
            <div className="absolute bottom-4 left-4 w-2 h-2 bg-amber-400/40 rounded-full" />

            <div className="relative pt-8 pb-8 shadow-[inset_0_4px_20px_rgba(0,0,0,0.4)] scrollbar-hide scroll-smooth px-2">
                {!isMobile && (
                    <div className="flex h-full relative overflow-x-auto md:overflow-x-hidden overflow-y-hidden justify-between">
                        {get?.data.map((x, i) => (
                            <div className="w-[84vw] sm:w-[66vw] md:w-1/3 flex-shrink-0 px-2 md:px-4" style={{ transform: 'translateY(-30%)', willChange: "transform" }} key={i}>
                                <PlacesCards x={x} scroll={scroll.scrollYProgress} i={i} />
                            </div>
                        ))}
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
    let router=useRouter();
    // Get first image URL - handle different possible structures
    const imageUrl = item.images?.[0]?.url || item.images?.[0]?.secure_url || item.images?.[0] || null;
    
    // Format date
    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        const date = new Date(dateStr);
        return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' });
    };

    return (
        <div onClick={()=>{router.push('/events?type=past')}}  className={`${isMobile ? 'w-[65vw] sm:w-[35vw]' : ''} flex-shrink-0`}>
            <div className={`group relative ${isMobile ? 'h-52' : 'h-44 sm:h-64 lg:h-96'} rounded-2xl overflow-hidden 
                           bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-gray-800/80
                           border border-amber-600/20 hover:border-amber-500/40
                           shadow-xl hover:shadow-2xl hover:shadow-amber-400/10 
                           transition-all duration-500 cursor-pointer`}>
                
                {/* Background Image */}
                {imageUrl && (
                    <img 
                        src={imageUrl} 
                        alt={item.title}
                        className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                )}
                
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/60 to-gray-900/20 group-hover:from-gray-900/95 transition-all duration-500" />
                
                {/* Ambient glow on hover */}
                <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-transparent to-amber-400/0 opacity-0 group-hover:opacity-10 transition-opacity duration-500" />

                {/* Content */}
                <div className={`absolute bottom-0 left-0 right-0 ${isMobile ? 'p-4' : 'p-5 sm:p-6'} text-white z-20 transform translate-y-1 group-hover:translate-y-0 transition-transform duration-300`}>
                    
                    {/* Date badge */}
                    <div className={`inline-block ${isMobile ? 'mb-2' : 'mb-3'}`}>
                        <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 border border-amber-500/30 backdrop-blur-sm">
                            <div className="flex items-center gap-2">
                                <svg className="w-3 h-3 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <p className="text-xs font-semibold text-amber-300">{formatDate(item.date)}</p>
                            </div>
                        </div>
                    </div>

                    {/* Title */}
                    <h3 className={`${isMobile ? 'text-lg mb-1' : 'text-xl sm:text-2xl mb-2'} font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-300 group-hover:to-amber-200 transition-colors duration-300 line-clamp-2`}
                        style={{ textShadow: '2px 2px 4px rgba(212,175,55,0.3)' }}>
                        {item.title}
                    </h3>

                    {/* Location */}
                    <div className="flex items-center gap-2 text-gray-400 group-hover:text-gray-300 transition-colors duration-300">
                        <svg className="w-4 h-4 text-amber-400/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                        </svg>
                        <p className={`${isMobile ? 'text-xs' : 'text-sm'} line-clamp-1`}>
                            {item.location}
                        </p>
                    </div>

                    {/* Decorative line */}
                    <div className="w-16 h-px bg-gradient-to-r from-[#d4af37] to-transparent rounded-full opacity-60 mt-3" />
                </div>

                {/* Corner accent */}
                <div className="absolute top-3 right-3 w-2 h-2 bg-amber-400/40 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
        </div>
    );
};

const PlacesCards = ({ x, scroll, i }) => {
    let [h, setH] = useState(1);
    let [rand, setRand] = useState(1);
    let [isClient, setClient] = useState(false);

    useEffect(() => { setClient(true) }, []);

    useEffect(() => {
        if (isClient) {
            setRand(Math.random() * (2 - 1) + 1);
            setH(window.innerHeight);
        }
    }, [isClient]);

    let y = useTransform(scroll, [0, 1], [0, h * rand]);

    return (
        <motion.div style={{ y, willChange: "transform" }} className="ml-4 sm:ml-6">
            <div className="space-y-5 sm:space-y-6">
                {x.map((item, index) => (
                    <PlaceCard key={item._id || index} item={item} size="desktop" />
                ))}
            </div>
        </motion.div>
    );
}

export default Places;