import React from 'react';
import { motion } from 'framer-motion';
const WordsSplitter = ({para,grandChildVar}) => {
    return (
        <div className='flex justify-center flex-wrap w-[60vw]'>
            
              {para.split(" ").map((word, wi) => (
                <span key={wi} className="mr-1">
                    {word.split("").map((char, ci) => (
                    <motion.span variants={grandChildVar} key={ci}>{char}</motion.span>
                  ))}
                </span>))}
          
        </div>
    );
}

export default WordsSplitter;
