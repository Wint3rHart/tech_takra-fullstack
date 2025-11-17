// import React, { useEffect, useRef } from 'react';
import DisplayCards from '../general_comps/display_cards';
// import { useScroll } from 'framer-motion';

import { ErrorBoundary } from "react-error-boundary";
import { MyErrorFallback } from "../general_comps/ErrorBoundary";
import { get_fetch } from "@/server_fetch_fncs/fetch_fnx";

const HotelsInCity =async ({city}) => {

    // let ref=useRef(null);
    // let {scrollYProgress}=useScroll({target:ref,offset:["start end","end start"]});
 let data={hotels:null,error:undefined};
try {
    let get=await get_fetch("city_hotels",city);
    if(get.error){throw new Error(get.error)};
    // console.log(get);
    data.hotels=get.data;
    data.error=undefined
} catch (error) {
    // console.log(error.message)
    data.error=error.message;
}
console.log(data);


    return (
        <ErrorBoundary FallbackComponent={MyErrorFallback}>
        <div style={{perspective:"1800px"}} className='flex justify-center items-center  h-[100vh] w-[100vw] overflow-x-auto hide-scrollbar relative'>
            {data?.hotels?.map((x,i)=>{return <div key={i} style={{transformStyle:"preserve-3d"}}> <DisplayCards data={x} ind={i}  nav_url={`/`}/> </div>})
           
        }</div>
        </ErrorBoundary>
    );
}

export default HotelsInCity;
