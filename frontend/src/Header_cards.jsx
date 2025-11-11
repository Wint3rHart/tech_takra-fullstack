import React from 'react';
import { motion, useTransform } from 'framer-motion';
const HeaderCards = ({top,left,x,scroll,ind}) => {

let y=useTransform(scroll,[0,1],[0,Math.random() * 350 - 200]);
// let a=useTransform(scroll,[0,1],[0,-left*ind]);
// let rot=useTransform(scroll,[0,1],["-20deg","-8deg"])
// let opacity=useTransform(scroll,[0,.2,1],[1,1,0])

    return (
    
       
    <motion.img  src={x.url} className='h-[400px] w-[450px] sm:absolute  shadow-[8px_0px_15px_#000000]' style={{rotateY:-20,left:`${left}%`,top:`${top}%`,y,}}/>
  
     
    );
}

export default HeaderCards;
    
    // <motion.img  src={x.url} className='h-[450px] w-[500px] sm:absolute  shadow-[8px_0px_15px_#000000]' style={{rotateY:-20,left:`${left}%`,top:`${top}%`}}/>
  