"use client"

import React, { useContext, useEffect ,useMemo, useRef,use} from 'react';
import {useScroll,useTransform } from 'framer-motion';
import DisplayCards from './displayCards';


const City_Ref_wrapper=({data})=>{
let get=use(data);
console.log(get);

    let ref=useRef(null);
let {scrollYProgress}=useScroll({target:ref,offset:["start center","center start"]});

return (
  <div ref={ref} style={{perspective:"1200px"}} className='w-full md:h-[100vh]'>
    <CitiesAd scroll={scrollYProgress} data={get} />
  </div>
);
};






const CitiesAd = ({scroll,data}) => {
console.log("Cities Ad rendered");




let map_memo=useMemo(()=>data?.data?.map((x, i) =>{

return <div style={{transformStyle:"preserve-3d"}} key={i}> <DisplayCards key={i}  scroll={scroll} ind={i} x={x} nav_url={`/city?city=${x.city_name}`}/></div>

  }),[data])




    return (
     <div className='flex flex-col sm:flex-row sm:justify-start items-center sm:items-center gap-4 sm:gap-6 overflow-y-auto sm:overflow-x-auto overflow-x-hidden h-auto sm:h-full relative hide-scrollbar py-4 px-4' style={{transformStyle:"preserve-3d",perspective:"1000px"}}>
  {map_memo}
</div>

    );
}

export default City_Ref_wrapper;













