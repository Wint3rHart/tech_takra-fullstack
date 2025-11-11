import React, { useEffect, useMemo } from 'react';
import useData from './useData';
import { useTransform,motion } from 'framer-motion';

const TopHotels = ({scroll}) => {

let big_scale=useTransform(scroll,[0,.5,1],[1,4,4]);


let {abort_ref,query}=useData("top_hotels");
let {data,isLoading,isError,error}=query;

useEffect(()=>{

    error&&console.log(error.message);
    data&&console.log(data);
    
},[data,error])
let arry_memo=useMemo(()=>{return [
        { t: 67, l: -140 },
        { t: 0, l: 13 },{t:28,l:140},{t:160,l:128},{t:178,l:-125}
    ]},[]);

    return (
        <motion.div style={{transformOrigin:"center"}} className=' relative flex justify-center overflow-hidden items-center h-[100vh] w-[100vw] z-20  '>
           
            {data?.data?.map((x,i)=>{  



    return (
    
    <Top_hotel_cards key={i} l={arry_memo[i].l } t={arry_memo[i].t} x={x} scroll={scroll} i={i}/>
    

     
     )})}
 
 <motion.div  style={{scale:big_scale,transformOrigin:"center"}} className='z-90 text-white w-[25%] border  h-[35%] bg-[url("paris.jpg")] z-20 bg-no-repeat bg-cover '></motion.div>
           

        </motion.div>
    );
}

export default React.memo(TopHotels);

const Top_hotel_cards=({scroll,x,l,t,i})=>{
    let math_memo=useMemo(()=>Math.random()*((5-3)+4))
let scale=useTransform(scroll,[0,1],[1,math_memo]);
return (
    <motion.div className='h-100 w-100 absolute top-0  ' style={{willChange:"transform",scale:scale,transformOrigin:"center"}}> 
    
    
    <motion.div
            key={i}
            className="text-white font-raleway border border-2 overflow-hidden w-[25vw] h-[35vh]"
            style={{
                y: `${t}%`,
                x: `${l}%`,
               
             
            }}
        >
            
<img src={x.image} className='h-full w-full'/>
   
</motion.div>
    </motion.div>

)

}