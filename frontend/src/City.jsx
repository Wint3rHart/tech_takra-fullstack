import React, { createContext, useEffect, useRef, useState } from 'react';
import useData from './useData';
import { useSearchParams } from 'react-router-dom';
import { motion,useTransform,useScroll } from 'framer-motion';
import UseVariants from './useVariants';
import TextStaggerComp from './Text_stagger_comp';
import PlacesInCity from './Places_in_City';
import HotelsInCity from './HotelsInCity';
import UnsplashPics from './Unsplash_pics';
import FAQs from './FAQ';
import Footer from './Footer';
import Packages from './Packages';
import Intersection_wrapper from './Intersection_wrapper';

let Context=createContext(null);
const City = () => {

   console.log("City rendered");
let [searchQuery,setQuery]=useSearchParams()

let {query,abort_ref}=useData("city_data",searchQuery.get("city"));
let {data,isLoading,error,isSuccess,isError}=query;

useEffect(()=>{console.log(data);
},[data])

let ref=useRef(null);
let p_ref=useRef(null);
let [num,setNum]=useState(0);

if(isLoading){return <div className='h-full  w-full flex flex-col items-center justify-center'><p className='text-4xl text-white font-bold'>Loading</p></div>}
if(isError){return <div className='h-full w-full flex flex-col items-center justify-center'><p className='text-4xl text-white font-bold'>{error.message}</p></div>}

    return (
    
  <Context.Provider value={{ref:p_ref}}>
  <div className=' '>
    <button onClick={()=>{setNum(x=>{return x=x+1})}} style={{zIndex:200}} className='border-2 h-[100px] w-[200px] bg-gray-300 absolute top-40 '>NEXT</button>
<div style={{transform:`translateX(-${num*100}vw)`,transition:"all 2s"}} className='border-2 -z-10 border-red-800 h-[100vh] w-[100vw] flex justify-start'>
<header  className='h-[100vh] w-[100vw] pt-6 flex flex-shrink-0 [mask-image:linear-gradient(180deg,black,black,black,rgb(0,0,0,.9),rgb(0,0,0,.5),rgb(0,0,0,.2),rgb(0,0,0,.1),transparent)]' style={{backgroundImage:`url("${data.data[0].city_image}")`,backgroundRepeat:"no-repeat",backgroundSize:"cover"}}>

<TextStaggerComp  refer={ref} text1="VISIT" text2={searchQuery.get("city")}  />

<div ref={ref} className='relative  ml-24 sm:h-[800px] overflow-hidden mt-36 ' style={{transformStyle:"preserve-3d",perspective:"800px"}}></div>
</header>

<section className='h-full flex-shrink-0 w-[99vw]'>
//to make the places in city component
<PlacesInCity places={data?.places} />

</section>
<section className='h-full w-full flex-shrink-0'>
<HotelsInCity data={data?.hotels}/>
</section>
<section>

  <UnsplashPics pics={data?.pics}/>
</section>

<section ref={p_ref} className='h-full w-full border-2 overflow-x-auto scrollbar-hide flex-shrink-0'>
  <Intersection_wrapper >
<Packages/>
</Intersection_wrapper>
</section>

<FAQs/>
<Footer/>
</div>
        </div>
        </Context.Provider>
    );
}

export default  React.memo(City);
export {Context}