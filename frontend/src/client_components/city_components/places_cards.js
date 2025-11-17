"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';

// Sample data with Unsplash images
const samplePlaces = [
  {
    name: "Tokyo Skyline",
    description: "Experience the vibrant energy of Tokyo's modern cityscape, where neon lights illuminate towering skyscrapers and traditional culture meets cutting-edge innovation in perfect harmony.",
    places_image: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?w=800&h=600&fit=crop&auto=format",
    id: 1
  },
  {
    name: "Swiss Alps",
    description: "Breathtaking mountain peaks covered in pristine snow, offering spectacular views and world-class skiing experiences in one of Europe's most stunning natural landscapes.",
    places_image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&h=600&fit=crop&auto=format",
    id: 2
  },
  {
    name: "Tropical Paradise",
    description: "Crystal clear turquoise waters lap against white sandy beaches, surrounded by swaying palm trees and vibrant coral reefs teeming with marine life.",
    places_image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=800&h=600&fit=crop&auto=format",
    id: 3
  },
  {
    name: "Ancient Rome",
    description: "Walk through millennia of history among magnificent ruins, grand architecture, and timeless art that tells the story of one of civilization's greatest empires.",
    places_image: "https://images.unsplash.com/photo-1515542622106-78bda8ba0e5b?w=400&h=300&fit=crop&auto=format",
    id: 4
  }
];

const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.1
    }
  }
};

const cardVariants = {
  initial: { 
    opacity: 0, 
    y: 50,
    scale: 0.9
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    y: -5,
    transition: {
      duration: 0.2,
      ease: "easeOut"
    }
  },
  tap: {
    scale: 0.95,
    transition: {
      duration: 0.1
    }
  }
};

const imageVariants = {
  initial: { scale: 1.2, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.1,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const textVariants = {
  initial: { opacity: 0, x: -20 },
  animate: { 
    opacity: 1, 
    x: 0,
    transition: {
      duration: 0.6,
      delay: 0.2,
      ease: "easeOut"
    }
  }
};

export const Places_cards_parent = ({ x = samplePlaces, i }) => {
  // console.log(x);
  
  let refer = useRef(null);
  let { scrollYProgress } = useScroll({ 
    target: refer, 
    offset: ["start center", "end start"] 
  });

  let [ind, setInd] = useState(0);
  let ind_fnx = useCallback((i) => { 
    console.log("i got made");
    setInd(x => x = i);
  }, []);

  // Parallax transforms
  
  return (
    <motion.div 
      ref={refer} 
      className='h-[100vh] relative w-[100vw] flex justify-around py-6 '
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
     
    >
      {/* Main Image Container */}
      <motion.div 
        className='relative h-[70vh] w-[50vw] border-2 border-[#d4af37] cursor-pointer overflow-hidden rounded-2xl shadow-2xl'
      
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={x[ind].id}
            src={samplePlaces[ind].places_image}
            alt={x[ind].name}
            className='h-full w-full object-cover'
            variants={imageVariants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, scale:1}}
            transition={{ duration: 0.5 }}
          />
        </AnimatePresence>
        
        {/* Gradient overlay */}
        {/* <div className='absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent' /> */}
        
       
      </motion.div>

      {/* Text Content */}
      <motion.div 
        className='text-center max-w-[20vw] flex flex-col items-center justify-center text-white' >
        <AnimatePresence mode="wait">
          <motion.div
            key={x[ind].id}
            variants={textVariants}
            initial="initial"
            animate="animate"
            exit={{ opacity: 0, x: 20 }}
            className='space-y-6'
          >
            <motion.h1 
              className='font-bold text-4xl bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent'
              animate={{ 
                backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
              }}
              transition={{ 
                duration: 3, 
                repeat: Infinity, 
                ease: "easeInOut" 
              }}
            >
              {x[ind].name}
            </motion.h1>
            
            <motion.p 
              className='font-medium text-sm leading-relaxed text-gray-200'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {x[ind].description}
            </motion.p>
            
            {/* Decorative line */}
            <motion.div 
              className='w-16 h-1 bg-gradient-to-r from-[#d4af37] to-gray-200 rounded-full mx-auto'
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            />
          </motion.div>
        </AnimatePresence>
      </motion.div>

      {/* Cards Container */}
      <motion.div 
        className='flex justify-around flex-wrap absolute left-[5vw] top-[80vh] w-[70vw] h-[20vh] gap-4'
       
        variants={containerVariants}
      >
        {x.map((place, i) => (
          <Places_cards 
            key={place.id}
            ind_fnx={ind_fnx}
            scroll={scrollYProgress}
            i={i}
            data={place}
            isSelected={i === ind}
          />
        ))}
      </motion.div>

      {/* Background particles */}
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          className='absolute w-1 h-1 bg-[#d4af37] rounded-full'
          style={{
            left: `${i* 100}%`,
            top: `${i * 100}%`,
          }}
          animate={{
            y: [0, -100, 0],
            opacity: [0, 1, 0],
          }}
          transition={{
            duration: 3 + Math.random() * 2,
            repeat: Infinity,
            delay: Math.random() * 2,
            ease: "easeInOut"
          }}
        />
      ))}
    </motion.div>
  );
};

const Places_cards = React.memo(({ i, data, scroll, ind_fnx, isSelected }) => {
  const cardY = useTransform(scroll, [0, 1], [0, -50]);

  
  return (
    <motion.div
      className={`relative cursor-pointer group ${isSelected ? 'z-10' : 'z-0'}`}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      whileTap="tap"
      onClick={() => {
        ind_fnx(i);
        console.log("clicked");
      }}
      style={{ y: cardY }}
      layout
    >
      <motion.div 
        className={`relative h-[15vh] w-[15vw] rounded-xl overflow-hidden shadow-lg transition-all duration-300 `}
        whileHover={{ 
          boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
        }}
      >
        <motion.img 
          src={samplePlaces[i].places_image} 
          alt={data.name}
          className='h-full w-full object-cover transition-transform duration-300'
          variants={imageVariants}
          whileHover="hover"
        />
        
        {/* Overlay */}
        <motion.div 
          className='absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300'
        />
        
        {/* Selected indicator */}
        <AnimatePresence>
          {isSelected && (
            <motion.div
              className='absolute top-2 right-2 w-6 h-6 bg-amber-400 rounded-full flex items-center justify-center'
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              exit={{ scale: 0, rotate: 180 }}
              transition={{ duration: 0.3 }}
            >
              <motion.div 
                className='w-2 h-2 bg-white rounded-full'
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 1, repeat: Infinity }}
              />
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Title overlay on hover */}
        <motion.div 
          className='absolute bottom-2 left-2 right-2 text-white text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-300'
          initial={{ y: 10 }}
          animate={{ y: 0 }}
        >
          {data.name}
        </motion.div>
      </motion.div>
    </motion.div>
  );
});

