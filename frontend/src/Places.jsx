import React, { useEffect, useMemo } from 'react';
import useData from './useData';
import { motion,useTransform } from 'framer-motion';
const Places = ({scroll}) => {

let {query,abort_ref}=useData("places_parallax");
let {data,isLoading,isError,error}=query;
useEffect(()=>{console.log(data);
},[data,error])
if(isLoading){return <div className='h-full  w-full flex flex-col items-center justify-center'><p className='text-4xl text-white font-bold'>Loading</p></div>}
if(isError){return <div className='h-full w-full flex flex-col items-center justify-center'><p className='text-4xl text-white font-bold'>{error.message}</p></div>}

    return (
      <div className='h-[175vh] relative'>
       <div className="flex h-full bg-blue-700 relative pt-6  scrollbar-hide overflow-y-hidden scroll-smooth">
      
  {data.data.map((x,i)=>(
    <motion.div 
      key={i}
      className="flex-shrink-0 " 
      style={{width:"20vw", transform:"translateY(-25%)"}}
    >
      <PlacesCards x={x} scroll={scroll} />
    </motion.div>
  ))}
</div>
</div>

    );
}

export default Places;
const PlacesCards = ({x,scroll,i}) => {
let math_memo=useMemo(()=>(Math.random() * (2 - 1) + 1));

let y=useTransform(scroll,[0,1],[0,window.innerHeight *math_memo
])

console.log(x);

    return (
        <motion.div style={{y:y}} className='h-full '>
        {x.map((y)=>{return <div style={{backgroundImage:`url('https://picsum.photos/600/400?random=${new Date().getTime()}')`}} className={`  text-white h-[50vh] bg-no-repeat bg-[100%]  border w-full `}>
    <div className='absolute z-0 inset-0   w-full '><div className='h-full w-full s bg-black/20'></div> </div>
    <div className='relative z-20'>
<p className='text-lg font-semibold'>{y.name}</p>
<p className='text-md font-bold'>{y.city_name}</p>
<p className='text-sm '>{y.description}</p>
<button>View More</button>
    </div>
    
 </div>})   }
        </motion.div>
    );
}
