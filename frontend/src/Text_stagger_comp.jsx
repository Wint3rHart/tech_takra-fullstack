import React from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';
import UseVariants from './useVariants';

const TextStaggerComp = ({ refer, text1, text2, text3 }) => {
  const { parentVar, grandChildVar, childVar } = UseVariants();
  const { scrollYProgress } = useScroll({
    target: refer,
    offset: ['start center', 'end center'],
  });

  // Parallax translation
  const y0 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  return (
    <motion.div
      style={{ y: y0 }}
      variants={parentVar}
      initial="initial"
      animate="animate"
      className="
        mx-auto mt-40 px-4
        w-full max-w-6xl
        text-center text-white
        flex flex-col items-center
        select-none
      "
      aria-label={`${text1} ${text2} ${text3}`}
    >
      {/* Line 1 */}
      <motion.p
        variants={childVar}
        className="
          font-raleway tracking-wide
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          font-medium
          leading-tight
          drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]
        "
      >
        {text1}
      </motion.p>

      {/* Line 2 (staggered letters) */}
      <motion.div
        variants={childVar}
        className="
          mt-2 sm:mt-2.5 md:mt-3
          font-playfair font-semibold
          flex flex-wrap justify-center
          leading-none
          text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] xl:text-[6.5rem]
          tracking-[0.025em]
          bg-clip-text text-transparent
          bg-gradient-to-b from-white to-white/80
          drop-shadow-[0_4px_12px_rgba(0,0,0,0.35)]
        "
        aria-label={text2}
      >
        {text2.split('').map((ch, i) => (
          <motion.span key={`${ch}-${i}`} variants={grandChildVar} className="inline-block">
            {ch === ' ' ? '\u00A0' : ch}
          </motion.span>
        ))}
      </motion.div>

      {/* Line 3 */}
      <motion.p
        variants={childVar}
        className="
          mt-2 sm:mt-3 md:mt-4
          font-playfair font-semibold
          leading-tight
          text-4xl sm:text-5xl md:text-6xl lg:text-7xl
          tracking-wide
          drop-shadow-[0_2px_8px_rgba(0,0,0,0.35)]
        "
      >
        {text3}
      </motion.p>

      {/* Subtle accent underline on large screens */}
      <motion.div
        variants={childVar}
        className="
          hidden lg:block mt-6 h-[3px] w-40
          rounded-full
          bg-gradient-to-r from-white/70 via-white to-white/70
          opacity-80
          shadow-[0_0_20px_rgba(255,255,255,0.35)]
        "
      />
    </motion.div>
  );
};

export default TextStaggerComp;
