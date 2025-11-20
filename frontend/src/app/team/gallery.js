"use client"

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import BgEffect from '@/util_comps/bg_effect';






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
    scale: 0.9,
   
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

 const Gallery = ({ x, i }) => {
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
console.log(x[ind].image.url);

  // Parallax transforms
  
  return (
    <motion.div 
      ref={refer} 
      className='h-full bg-transparent relative w-[100vw] mt-44 flex justify-around py-6 '
      variants={containerVariants}
      initial="initial"
      whileInView="animate"
     
    >
        <BgEffect/>
      {/* Main Image Container */}
      <motion.div 
        className='relative h-[70vh] w-[50vw] border-2 border-[#d4af37] cursor-pointer overflow-hidden rounded-2xl shadow-2xl'
      
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.3 }}
      >
        <AnimatePresence mode="wait">
          <motion.img
            key={x[ind].id}
            src={x[ind].image.url}
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
              className='font-medium text-lg leading-relaxed text-gray-200'
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
            >
              {x[ind].position}
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
        className='flex justify-around flex-wrap absolute left-[5vw] top-[80vh] max-w-[70vw] h-[20vh] gap-4'
       
        variants={containerVariants}
      >
        {x.map((place, i) => {
        
       return    <Places_cards 
            key={i}
            ind_fnx={ind_fnx}
            scroll={scrollYProgress}
            i={i}
            data={place}
            isSelected={i === ind}
          />
        })}
      </motion.div>

      {/* Background particles */}
     
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
        className={`relative  h-[15vh] w-[15vw] rounded-xl overflow-hidden shadow-lg transition-all duration-300 `}
        whileHover={{ 
          boxShadow: "0 20px 40px rgba(139, 92, 246, 0.3)",
        }}
      >
        <motion.img 
          src={data.places_image} 
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

export default Gallery