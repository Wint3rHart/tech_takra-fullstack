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


<div ref={ref} style={{perspective:"1200px"}} className='h-[100vh] w-full'>
<CitiesAd scroll={scrollYProgress} data={get} />
</div>

)};






const CitiesAd = ({scroll,data}) => {
console.log("Cities Ad rendered");




let map_memo=useMemo(()=>data?.data?.map((x, i) =>{

return <div style={{transformStyle:"preserve-3d"}} key={i}> <DisplayCards key={i}  scroll={scroll} ind={i} x={x} nav_url={`/city?city=${x.city_name}`}/></div>

  }),[data])




    return (
     <div className=' flex justify-start items-center  overflow-x-auto 
  scrollbar-hide overflow-y-hidden h-full relative hide-scrollbar' style={{transformStyle:"preserve-3d",perspective:"1000px"}}>
  {map_memo}
</div>

    );
}

export default City_Ref_wrapper;













