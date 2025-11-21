"use client"

import React, { useMemo } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';

const containerVariants = {
  initial: { opacity: 0 },
  animate: { 
    opacity: 1,
    transition: {
      duration: 0.6,
      staggerChildren: 0.15
    }
  }
};

const cardVariants = {
  initial: { 
    opacity: 0, 
    y: 60,
    scale: 0.95
  },
  animate: { 
    opacity: 1, 
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      ease: "easeOut"
    }
  },
  hover: {
    y: -5,
    scale: 1.02,
    transition: {
      duration: 0.3,
      ease: "easeOut"
    }
  }
};

const formatDate = (dateString) => {
  if (!dateString) return 'Date not available';
  const date = new Date(dateString);
  const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  return date.toLocaleDateString('en-US', options);
};

const AnnouncementCard = ({ announcement, index }) => {
  const cardRef = useRef(null);

  // Individual card scroll progress
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ["start end", "start start"]
  });

  // Fade and scale effects
  const opacity = useTransform(scrollYProgress, [0, 0.6, 1], [0, 1, 1]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.9, 1, 1]);

  const announcementTitle = announcement.title || 'Announcement';
  const announcementDescription = announcement.description || '';
  const announcementDate = announcement.createdAt || announcement.updatedAt || null;

  return (
    <motion.div
      ref={cardRef}
      variants={cardVariants}
      initial="initial"
      animate="animate"
      whileHover="hover"
      style={{ opacity, scale }}
      className="relative mb-8"
    >
      <div className="max-w-4xl mx-auto w-full p-6 sm:p-8 lg:p-10 rounded-3xl
                      bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 
                      border border-amber-600/20 shadow-2xl
                      hover:shadow-amber-400/20 hover:border-amber-500/40
                      transition-all duration-500 backdrop-blur-sm
                      group relative overflow-hidden">
           
        {/* Ambient Light Effect */}
        <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent 
                        -translate-x-full group-hover:translate-x-full transition-transform duration-2000 rounded-3xl" />

        {/* Background Particles */}
        <div className="absolute top-6 left-8 w-1 h-1 bg-amber-400/80 rounded-full animate-ping" />
        <div className="absolute bottom-8 right-12 w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse" />

        {/* Date Badge */}
        {announcementDate && (
          <div className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10">
            <div className="px-3 py-1.5 rounded-full bg-gradient-to-r from-amber-500/20 to-amber-600/20 
                          border border-amber-500/30 backdrop-blur-sm">
              <p className="text-xs font-semibold text-amber-300 font-inter">
                {formatDate(announcementDate)}
              </p>
            </div>
          </div>
        )}

        {/* Content */}
        <div className="relative z-10">
          {/* Title */}
          <motion.h3 
            className="text-2xl sm:text-3xl lg:text-4xl font-bold font-inter 
                       text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-300
                       mb-4 pr-24 sm:pr-32 leading-tight
                       drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]"
            style={{ textShadow: '2px 2px 4px rgba(212,175,55,0.3)' }}
          >
            {announcementTitle}
          </motion.h3>

          {/* Decorative Line */}
          <div className="w-20 h-1 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full mb-6"></div>

          {/* Description */}
          <motion.p 
            className="text-base sm:text-lg lg:text-xl text-gray-300 leading-relaxed 
                       font-poppins whitespace-pre-wrap"
          >
            {announcementDescription}
          </motion.p>
        </div>

        {/* Corner accent */}
        <div className="absolute bottom-4 right-4 w-2 h-2 bg-amber-400/60 rounded-full opacity-0 
                        group-hover:opacity-100 transition-opacity duration-300" />
      </div>
    </motion.div>
  );
};

const UpdatesGallery = ({ announcements }) => {
  const containerRef = useRef(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const y = useTransform(scrollYProgress, [0, 0.1], [0, -200]);

  // Ensure announcements is an array
  const sortedAnnouncements = useMemo(() => {
    if (!announcements || !Array.isArray(announcements)) return [];
    return [...announcements].sort((a, b) => {
      const dateA = new Date(a.createdAt || a.updatedAt || 0);
      const dateB = new Date(b.createdAt || b.updatedAt || 0);
      return dateB - dateA; // Newest first
    });
  }, [announcements]);

  if (!sortedAnnouncements || sortedAnnouncements.length === 0) {
    return (
      <div className='min-h-screen flex items-center justify-center pt-32 pb-16 px-4'>
        <div className="text-center p-8 bg-gray-800/60 backdrop-blur-sm rounded-xl border border-amber-700/30 shadow-lg max-w-lg mx-auto">
          <p className="text-xl font-semibold text-amber-300 mb-2 font-inter">No Announcements Found</p>
          <p className="text-gray-300 font-poppins">There are no updates available at this time.</p>
        </div>
      </div>
    );
  }

  return (
    <section
      ref={containerRef}
      className="min-h-screen py-20 px-4 sm:px-6 lg:px-8 relative pt-32"
    > <div className="mt-6 flex justify-center">
  <Link
    href="/"
    className="inline-flex items-center gap-2 rounded-md px-4 py-2 text-sm font-medium 
               text-amber-200 bg-amber-700/10 border border-amber-400/10
               hover:bg-amber-700/20 transition"
  >
    Back
  </Link>
</div>
      {/* Header Section */}
      <div className="max-w-4xl mx-auto mb-16 mt-12 text-center relative z-10">
        <motion.h1 
          style={{ y }}
          className="text-4xl sm:text-5xl lg:text-6xl font-bold font-inter mb-6
                     text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] via-amber-200 to-[#d4af37]
                     drop-shadow-[2px_4px_4px_rgba(0,0,0,0.25),0_0_8px_rgba(212,175,55,0.45)]"
          animate={{ 
            backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"]
          }}
          transition={{ 
            duration: 3, 
            repeat: Infinity, 
            ease: "easeInOut" 
          }}
        >
          Updates & Notifications
        </motion.h1>

        <motion.div 
          className='w-32 h-1 bg-gradient-to-r from-transparent via-[#d4af37] to-transparent rounded-full mx-auto mb-6'
          initial={{ width: 0 }}
          animate={{ width: 128 }}
          transition={{ delay: 0.3, duration: 0.6 }}
        />

        <motion.p 
          className="text-gray-400 text-lg sm:text-xl font-poppins"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5, duration: 0.6 }}
        >
          Stay informed with our latest announcements
        </motion.p>
      </div>

      {/* Announcements List */}
      <motion.div 
        className="relative max-w-5xl mx-auto"
        variants={containerVariants}
        initial="initial"
        animate="animate"
      >
        {sortedAnnouncements.map((announcement, index) => (
          <AnnouncementCard
            key={announcement._id || announcement.id || index}
            announcement={announcement}
            index={index}
          />
        ))}
      </motion.div>

      {/* Bottom spacing */}
      <div className="h-[20vh]" />
    </section>
  );
};

export default UpdatesGallery;

