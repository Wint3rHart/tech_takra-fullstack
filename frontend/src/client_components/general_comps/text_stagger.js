

"use client"
import React, { useRef ,useMemo} from 'react';
import { motion,useTransform,useScroll } from 'framer-motion';
import UseVariants from '../../client_hooks/useVariants';
import {Cormorant_Garamond, Cinzel, Playfair_Display,Tangerine, Playfair_Display_SC ,Merriweather,Work_Sans,Lobster_Two,Righteous} from 'next/font/google';

const tangerine=Cinzel({subsets: ["latin"],
  weight: ["400", "700"],})
const cormotant=Work_Sans({subsets: ["latin"],
  weight: ["400", "700"],})
const Ref_wrapper=({children})=>{

// console.log(children);
// console.log(window.innerHeight);

let ref=useRef(null);
// let math_memo=useMemo(()=>(Math.random() * (2 - 1) + 1));
// let {scrollYProgress}=useScroll({target:ref,offset:["start start","end center"]});
// let y=useTransform(scrollYProgress,[0,1],[0,window.innerHeight *math_memo
// ])
return (
<div ref={ref} style={{zIndex:40}} className='h-[100vh] w-screen py-4 '>

<TextStaggerComp  refer={ref}x={children}  />





</div>

)






}


const TextStaggerComp = ({refer,x}) => {


let {parentVar,grandChildVar,childVar,parent_One_after_one,child_one_after_one}=UseVariants();
let {scrollYProgress}=useScroll({target:refer,offset:["center center","end center"]});
let y0=useTransform(scrollYProgress,[0,1],[0,-150]);
let y1=useTransform(scrollYProgress,[0,1],[0,-30]);
let yC=useTransform(scrollYProgress,[0,1],[0,-200]);
let opacityTrans=useTransform(scrollYProgress,[0,.1,1],[1,0,0]);
// console.log(x);


    return (
        <motion.div style={{y:y0}} className='h-full' variants={parent_One_after_one} initial="initial" animate="animate" >

<motion.div  variants={parentVar}  className='mt-56 px-4 w-[95vw]  text-center flex justify-center items-center text-stone-300 '>
 
<motion.p variants={childVar} className={`text-6xl [text-shadow:2px_4px_5px_rgba(0,0,0,0.6)]  font-cinzel`}>{React.Children.toArray(x)[0].props.children}</motion.p>

<motion.div style={{y:yC}} variants={childVar} className={`font-playfair  text-8xl font-bold  mb-8 text-[#d4af37]  [text-shadow:2px_4px_5px_rgba(0,0,0,0.6),0_0_10px_rgba(255,255,255,0.4)] font-black flex `}>
   <motion.p  variants={grandChildVar} >{x?.[1]?.props?.children}</motion.p></motion.div>

<motion.p variants={childVar} className={`text-6xl font-cinzel  [text-shadow:2px_4px_5px_rgba(0,0,0,0.6)] font-semibold`}>{x?.[2]?.props?.children}</motion.p>
</motion.div> 

<motion.div variants={parentVar}  className={`flex items-center font-playfair  text-6xl font-bold    text-[#d4af37] justify-center w-[100vw]`}>
 <motion.p style={{y:y1}} variants={childVar}>
    Computer <strong className='text-stone-200'>Science</strong> Society
  </motion.p>

</motion.div>


 <motion.p style={{opacity:opacityTrans}} variants={childVar} className={`mt-6 flex font-semibold font-inter font-italic    text-[#d4af37] text-lg items-center justify-center`}>
   “Empowering students through technology, innovation, and community.”
  </motion.p>

 </motion.div>
    );
}

export default Ref_wrapper;

