import React, { useEffect, useRef } from 'react';
import DisplayCards from './DisplayCards';
import { useScroll } from 'framer-motion';

const HotelsInCity = ({data}) => {

    let ref=useRef(null);
    let {scrollYProgress}=useScroll({target:ref,offset:["start end","end start"]});

useEffect(()=>{console.log(data);
},[data])

    return (
        <div ref={ref} className='flex items-center flex-shrink-0 h-[100vh]'>
            {data?.map((x,i)=>{return  <DisplayCards x={x} ind={i} scroll={scrollYProgress} nav_url={`/`}/>})
           
        }</div>
    );
}

export default HotelsInCity;
