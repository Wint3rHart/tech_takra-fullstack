"use client"

import React from 'react';
import Lenis from 'lenis';
import { useEffect } from 'react';
const SmoothScroll = ({children}) => {

    
  useEffect(() => {
    const lenis = new Lenis({
      lerp: 0.1,
      smooth: true,
    });

    const raf = (time) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);
    return (
        <div>
            {children}
        </div>
    );
}

export default SmoothScroll;
