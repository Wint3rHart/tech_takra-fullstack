import React from 'react';
import { motion,useTransform,useScroll } from 'framer-motion';
import UseVariants from './useVariants';

const TextStaggerComp = ({refer,text1,text2,text3}) => {

let {parentVar,grandChildVar,childVar}=UseVariants();
let {scrollYProgress}=useScroll({target:refer,offset:["start center","end center"]});
let y0=useTransform(scrollYProgress,[0,1],[0,-250]);

    return (
        
<motion.div style={{y:y0,}} variants={parentVar} initial="initial" animate="animate" className='ml-4 mt-56 px-4 w-[50vw]  text-center flex flex-col items-center text-white '>
 
<motion.p variants={childVar} className='text-6xl font-raleway'>{text1}</motion.p>
<motion.div variants={childVar} className='text-8xl font-semibold flex font-playfair'>{text2.split("").map(x=>{
  return <motion.p variants={grandChildVar} >{x==" "?'\u0020':x}</motion.p>
})}</motion.div>
<motion.p variants={childVar} className='text-8xl font-playfair  font-semibold'>{text3}</motion.p>
</motion.div>
    );
}

export default TextStaggerComp;
