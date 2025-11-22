"use client"

import React, { useMemo } from 'react';
import { motion } from 'framer-motion';
import BgEffect from '@/util_comps/bg_effect';
import Link from 'next/link';

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
    scale: 0.95
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
    y: -8,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const imageVariants = {
  initial: { scale: 1.1, opacity: 0 },
  animate: { 
    scale: 1, 
    opacity: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    scale: 1.05,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const Gallery = ({ x }) => {
  // Ensure x is an array and has data, and sort by order field (ascending)
  const teamMembers = useMemo(() => {
    if (!x || !Array.isArray(x)) return [];
    const filtered = x.filter(member => member && member.name);
    // Sort by order field (lower numbers first), then by createdAt as fallback
    return filtered.sort((a, b) => {
      const orderA = a.order !== undefined && a.order !== null ? a.order : 999;
      const orderB = b.order !== undefined && b.order !== null ? b.order : 999;
      if (orderA !== orderB) {
        return orderA - orderB;
      }
      // If order is the same, sort by creation date
      const dateA = new Date(a.createdAt || 0);
      const dateB = new Date(b.createdAt || 0);
      return dateA - dateB;
    });
  }, [x]);

  if (!teamMembers || teamMembers.length === 0) {
    return (
      <div className='min-h-screen bg-gray-900 flex items-center justify-center pt-32 pb-16 px-4'>
        <div className="text-center p-8 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-amber-700/30 shadow-lg max-w-lg mx-auto">
          <p className="text-xl font-semibold text-amber-300 mb-2">No Team Members Found</p>
          <p className="text-gray-300">The team directory is currently empty.</p>
        </div>
      </div>
    );
  }

  return (
    <div className='min-h-screen bg-gray-900 pt-32 pb-16 px-4 sm:px-6 lg:px-8 relative'>
      <BgEffect />
         <div className="mt-6 flex justify-start">
  <Link
          href="/"
          className="inline-flex items-center gap-2 text-amber-400 hover:text-amber-300 font-semibold mb-8 transition-colors duration-300"
        >
          <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
          Back to Home
        </Link>
</div>
      {/* Page Header */}
      <motion.div 
        className="text-center mb-12 relative z-10 mt-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <motion.h1 
          className="font-bold text-4xl sm:text-5xl lg:text-6xl mb-4 bg-gradient-to-r from-white via-amber-100 to-white bg-clip-text text-transparent"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          Our Team
        </motion.h1>
        <motion.div 
          className='w-24 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full mx-auto'
          initial={{ width: 0 }}
          animate={{ width: 96 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        />
        <motion.p 
          className="mt-6 text-xl sm:text-2xl font-medium 
             text-transparent bg-clip-text 
             bg-gradient-to-r from-[#d4af37] to-amber-300"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.6 }}
        >
          Meet the dedicated members of our society
        </motion.p>
      </motion.div>

      {/* Team Members Grid */}
      <motion.div 
        className="max-w-7xl mx-auto relative z-10"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8">
          {teamMembers.map((member, index) => (
            <TeamMemberCard 
              key={member._id || member.id || index} 
              member={member} 
              index={index}
            />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

const TeamMemberCard = ({ member, index }) => {
  // Handle different possible image structures
  const imageUrl = member.image?.url || member.image || null;
  const memberName = member.name || 'Team Member';
  const memberPosition = member.position || 'Member';
  const memberDescription = member.description || '';

  return (
    <motion.div
      className="group relative"
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
    >
      <div className="relative h-full bg-gradient-to-br from-gray-800/80 via-gray-900/90 to-gray-800/80 
                      rounded-2xl overflow-hidden border border-amber-600/20 
                      shadow-xl hover:shadow-2xl hover:shadow-amber-400/20 
                      transition-all duration-500 backdrop-blur-sm">
        
        {/* Ambient glow effect on hover */}
        <div className="absolute inset-0 bg-gradient-to-br from-amber-400/0 via-transparent to-amber-400/0 
                        opacity-0 group-hover:opacity-10 transition-opacity duration-500 rounded-2xl" />

        {/* Image Container */}
        <div className="relative h-64 sm:h-72 overflow-hidden bg-gray-800">
          {imageUrl ? (
            <motion.img
              src={imageUrl}
              alt={memberName}
              className="w-full h-full object-cover"
              variants={imageVariants}
              initial="initial"
              animate="animate"
              whileHover="hover"
              loading="lazy"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-700 to-gray-800">
              <div className="w-24 h-24 rounded-full bg-gradient-to-br from-amber-500/30 to-amber-700/30 
                              flex items-center justify-center border-2 border-amber-500/50">
                <span className="text-4xl font-bold text-amber-400/70">
                  {memberName.charAt(0).toUpperCase()}
                </span>
              </div>
            </div>
          )}
          
          {/* Gradient overlay at bottom of image */}
          <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 via-gray-900/20 to-transparent" />
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-3 relative z-10">
          {/* Name */}
          <motion.h3 
            className="font-bold text-xl sm:text-2xl text-transparent bg-clip-text 
                       bg-gradient-to-r from-[#d4af37] to-amber-300 line-clamp-2"
            style={{ textShadow: '2px 2px 4px rgba(212,175,55,0.3)' }}
          >
            {memberName}
          </motion.h3>
          
          {/* Position */}
          <motion.div 
            className="flex items-center gap-2"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 + index * 0.05, duration: 0.4 }}
          >
            <div className="w-1 h-6 bg-gradient-to-b from-[#d4af37] to-amber-500 rounded-full" />
            <p 
            className="font-semibold text-sm sm:text-base uppercase tracking-wide 
                      text-transparent bg-clip-text 
                      bg-gradient-to-r from-[#d4af37] to-amber-300"
             >
            {memberPosition}
          </p>

          </motion.div>

          {/* Description */}
          {memberDescription && (
            <motion.p 
              className="text-gray-400 text-sm leading-relaxed line-clamp-3 pt-2"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 + index * 0.05, duration: 0.4 }}
            >
              {memberDescription}
            </motion.p>
          )}

          {/* Decorative line */}
          <motion.div 
            className="w-full h-px bg-gradient-to-r from-transparent via-amber-600/30 to-transparent mt-4"
            initial={{ width: 0 }}
            animate={{ width: '100%' }}
            transition={{ delay: 0.4 + index * 0.05, duration: 0.5 }}
          />
        </div>

        {/* Corner accent */}
        <div className="absolute top-4 right-4 w-2 h-2 bg-amber-400/60 rounded-full opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

export default Gallery;
