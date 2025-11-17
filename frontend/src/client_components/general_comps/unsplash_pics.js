"use client"

import React, { useEffect, useReducer, useRef, useState, useCallback } from 'react';
import { Blurhash } from "react-blurhash";
import { useAnimate, AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';


function imageReducer(state, action) {
    switch (action.type) {
        case "LOAD_IMAGE":
            return { ...state, [action.payload]: true };
        case "RESET":
            return {};
        default:
            return state;
    }
}

const UnsplashPics = ({ data }) => {
// console.log("unsplash rendered");


let [mounted,setMounted]=useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [loadedImages, dispatch] = useReducer(imageReducer, {});
    const [scope, animate] = useAnimate();
    const [isTransitioning, setIsTransitioning] = useState(false);
    const timeoutRef = useRef(null);
useEffect(()=>{
setMounted((x)=>{return true});

},[]);

    // Preload images
    useEffect(() => {
        if (!data?.data.length) return;

        data?.data.forEach((pic) => {
            const image = new Image();
            image.src = pic.urls.regular;
            image.onload = () => {
                dispatch({ type: "LOAD_IMAGE", payload: pic.urls.regular });
            };
        });

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [data]);

    // Enhanced slide transition animation
    const handleSlideTransition = useCallback(async (direction = 'next') => {
        if (isTransitioning || !data?.data?.length) return;
        
        setIsTransitioning(true);
        
        const currentSlide = `.slide-${currentIndex}`;
        const nextIndex = direction === 'next' 
            ? (currentIndex + 1) % data?.data?.length 
            : (currentIndex - 1 + data?.data?.length) % data?.data?.length;
        const nextSlide = `.slide-${nextIndex}`;

        // Animate current slide out with sophisticated mask
        await animate(currentSlide, {
            clipPath: direction === 'next' 
                ? ["polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", "polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)"]
                : ["polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)", "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"],
            scale: [1, 1.05],
            filter: ["blur(0px)", "blur(2px)"]
        }, { 
            duration: 0.8, 
            ease: [0.4, 0.0, 0.2, 1] 
        });

        // Update index
        setCurrentIndex(nextIndex);

        // Animate next slide in
        await animate(nextSlide, {
            clipPath: direction === 'next'
                ? ["polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)", "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"]
                : ["polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)", "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"],
            scale: [1.05, 1],
            filter: ["blur(2px)", "blur(0px)"]
        }, { 
            duration: 0.8, 
            ease: [0.4, 0.0, 0.2, 1] 
        });

        setIsTransitioning(false);
    }, [currentIndex, data, animate, isTransitioning]);

    // Auto-play functionality
    useEffect(() => {
        if (data?.data.length > 1) {
            timeoutRef.current = setTimeout(() => {
                handleSlideTransition('next');
            }, 5000);
        }

        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, [currentIndex, handleSlideTransition, data]);
if(!mounted){return (
            <div className='min-w-[100vw] flex items-center justify-center min-h-[100vh] m-auto '><p className='text-2xl text-white font-bold'>Loading Images</p></div>
        );}
      
    if (!data?.data.length) {
        return (
            <div className='h-screen w-full flex items-center justify-center bg-gray-900'>
                <p className='text-2xl text-white font-light'>No images to display</p>
            </div>
        );
    }

    return (
        <div ref={scope} className='relative h-screen w-full overflow-hidden bg-black w-[100vw] '>
            {/* Navigation Controls */}
            <div className="absolute inset-0 z-30 flex items-center justify-between p-8">
                <motion.button
                    whileHover={{ scale: 1.1, x: -5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300"
                    onClick={() => handleSlideTransition('prev')}
                    disabled={isTransitioning}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                </motion.button>

                <motion.button
                    whileHover={{ scale: 1.1, x: 5 }}
                    whileTap={{ scale: 0.9 }}
                    className="p-4 rounded-full bg-white/20 backdrop-blur-sm text-white border border-white/30 hover:bg-white/30 transition-all duration-300"
                    onClick={() => handleSlideTransition('next')}
                    disabled={isTransitioning}
                >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </motion.button>
            </div>

            {/* Slides Container */}
            <div className="relative h-full w-full">
                {data?.data.map((pic, index) => {
                    const isActive = index === currentIndex;
                    const zIndex = isActive ? 20 : 10 - Math.abs(index - currentIndex);
                    
                    return (
                        <motion.div
                            key={pic.id || index}
                            className={`slide-${index} absolute inset-0 w-full h-full`}
                            style={{ zIndex }}
                            initial={{
                                clipPath: index === 0 
                                    ? "polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)"
                                    : "polygon(100% 0%, 100% 0%, 100% 100%, 100% 100%)"
                            }}
                        >
                            {/* Background Image */}
                            <div className="relative h-full w-full">
                                {loadedImages[pic.urls.regular] ? (
                                    <motion.img
                                        src={pic.urls.regular}
                                        alt={pic.description || pic.city_name}
                                        className="h-full w-full object-contain"
                                        initial={{ scale: 1.1 }}
                                        animate={{ scale: isActive ? 1 : 1.05 }}
                                        transition={{ duration: 8, ease: "linear" }}
                                    />
                                ) : (
                                    <Blurhash
                                        hash={pic.blur_hash}
                                        width="100%"
                                        height="100%"
                                        resolutionX={32}
                                        resolutionY={32}
                                        punch={1}
                                        className="h-full w-full"
                                    />
                                )}
                                
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                                
                                {/* Content Overlay */}
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.div
                                            initial={{ opacity: 0, y: 50 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -50 }}
                                            transition={{ delay: 0.3, duration: 0.8 }}
                                            className="absolute bottom-16 left-8 right-8 text-white z-10"
                                        >
                                            <motion.h2 
                                                className="text-4xl md:text-5xl font-bold mb-2"
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.5, duration: 0.6 }}
                                            >
                                                {pic.city_name}
                                            </motion.h2>
                                            
                                            <motion.p 
                                                className="text-xl md:text-2xl font-light mb-3 text-gray-200"
                                                initial={{ opacity: 0, x: -50 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                transition={{ delay: 0.6, duration: 0.6 }}
                                            >
                                                {pic.country}
                                            </motion.p>
                                            
                                            {pic.tagline && (
                                                <motion.p 
                                                    className="text-lg font-medium mb-2 text-yellow-300"
                                                    initial={{ opacity: 0, x: -50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.7, duration: 0.6 }}
                                                >
                                                    {pic.tagline}
                                                </motion.p>
                                            )}
                                            
                                            {pic.description && (
                                                <motion.p 
                                                    className="text-base text-gray-300 max-w-2xl leading-relaxed"
                                                    initial={{ opacity: 0, x: -50 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: 0.8, duration: 0.6 }}
                                                >
                                                    {pic.description}
                                                </motion.p>
                                            )}
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </motion.div>
                    );
                })}
            </div>

            {/* Progress Indicators */}
            <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 z-30">
                {data?.data.map((_, index) => (
                    <motion.button
                        key={index}
                        className={`h-2 rounded-full transition-all duration-300 ${
                            index === currentIndex 
                                ? 'bg-white w-8' 
                                : 'bg-white/40 w-2 hover:bg-white/60'
                        }`}
                     
                        whileHover={{ scale: 1.2 }}
                        whileTap={{ scale: 0.8 }}
                    />
                ))}
            </div>

            {/* Loading Indicator */}
            <AnimatePresence>
                {isTransitioning && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute top-8 right-8 z-30"
                    >
                        <div className="w-6 h-6 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default UnsplashPics;