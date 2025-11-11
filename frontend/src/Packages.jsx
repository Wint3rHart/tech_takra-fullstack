import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import useData from './useData';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { motion,useScroll,useTransform } from 'framer-motion';
import { Context } from './City';

const Packages = ({}) => {

    let [search_param,setParams]=useSearchParams();
let {ref}=useContext(Context);
console.log("1 comp rendering");

    let {abort_ref,query}=useData("packages",search_param.get("city"));
    let {data,isLoading,isError,error}=query;
    let [state,setState]=useState(0);
useEffect(()=>{console.log(data);
},[data]);
// let ref=useRef(null);
let {scrollYProgress}=useScroll({target:ref,offset:["start start","end start"]});
if(isLoading){return <div className='h-full  w-full flex flex-col items-center justify-center'><p className='text-4xl text-white font-bold'>Loading</p></div>}
if(isError){return <div className='h-full w-full flex flex-col items-center justify-center'><p className='text-4xl text-white font-bold'>{error.message}</p></div>}

    return (
        <div className='flex h-[100vh] items-center m-6 ' ref={ref}>
            <button onClick={()=>{setState(x=>x=x+1)}}>CLick</button>
            {data?.map((x,i)=>{return <Package_cards key={x.id} x={x} scroll={scrollYProgress} />})}
        </div>
    );
}

export default Packages;

const Package_cards=React.memo(({x,scroll})=>{
let memo=useMemo(()=>{return Math.random()*((100-50)+50)});
    let y=useTransform(scroll,[0,1],[0,memo]);
    console.log("2 comp rendering");
    
   let nav=useNavigate();
return (
<motion.div style={{y}} className='border ml-6 bg-blue-900/25 rounded-lg py-12 h-[60vh] w-[40vw] text-white flex-shrink-0'>

<h1>{x.title}</h1>

<p>{x.city}</p>
<p>{x.description}</p>
<p>{x.duration}</p>
<p>{x.price}</p>
<button onClick={()=>{nav(`/booking/${x.city}?type=package&id=${x.id}`,{state:{...x}})}} className='border bg-white px-4 text-blue-600'>Buy</button>
</motion.div>)


})