"use client"

import React, { useEffect, useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';

const DisplayCards = ({scroll,ind,data,nav_url}) => {

  
//   let math_memo=useMemo(()=>{return Math.random()*(100-50)+50},[]);
// console.log("display cards render");

  
// let transX=useTransform(scroll,[0,0.5,1],[`translate3d(${ind*-15}vw,0,0) rotateY(35deg)`,`translate3d(${ind*-0}vw,0px,0px) rotateY(0deg)`,`translate3d(${ind*-0}vw,${math_memo}px,0px) rotateY(0deg)`]);


let reduce_memo=useMemo(()=>{
    
  let vals=Object.keys(data);
    // console.log("reduced array rendered");
    
  
    let arry= vals.reduce((acc,val,i)=>{


if(val.includes("name")||val.includes("title")){ 
  acc.push({priority:1,element:<p  className="text-4xl text-[#C5B358] drop-shadow-lg font-black mt-2 tracking-wide">{data[val]}</p>})}
  else if(val.includes("city")&&!val.includes("img")&&!val.includes("image")||val.includes("city_name")&&!val.includes("img")&&!val.includes("image") ){
     acc.push({priority:2,element:<p className="text-lg font-semibold mt-2">{data[val]}</p>})}
else if(val.includes("tagline")){acc.push({priority:3,element:<p className="text-lg font-semibold mt-2">{data[val]}</p>})}
else if(val.includes("description")) {
;acc.push({priority:4,element:<p className="text-sm font-semibold mt-2">{data[val]}</p>})}
else {return acc};
return acc
      },[]);
    return arry.sort((x,y)=>{
  ;return x.priority-y.priority});
    
    },[data]);

return (
        <motion.div style={{willChange:"transform"}}
        initial={{x:`${ind*-25}vw`,rotateY:"25deg"}} whileInView={{x:`${ind*0}vw`,rotateY:"0deg"}} transition={{duration:.8}} viewport={{once:false,amount:.8}}
      key={ind}
    //   style={{transform:transX,willChange:"transform"}}
      className={` group 
        w-[25vw] 
        ml-6
      flex-shrink-0
      shadow-[-9px_3px_7px_2px_#000000]
       h-[70vh]
        mb-2
        rounded-xl 
        border
       border-amber-400
    
        relative 
        text-white 
        bg-no-repeat
        bg-[100%] 
     bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.7)]
         group
       
      `}
    >
      <div
        style={{
          backgroundImage: `url('https://picsum.photos/600/400?random=${ind * 100 }')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="rounded-xl  brightness-100  hover:brightness-110
       absolute inset-0 w-full h-full transition-brightness duration-300"
      >

     </div><div className="rounded-xl absolute bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.7)]
 inset-0 " />

      <div className="relative  transition-opacity duration-0.4  group-hover:opacity-100 opacity-0 p-4">
      


      {reduce_memo.map((x,i)=>{return <div key={i}>{x.element}</div>})}

<button className="mt-6 text-[#C5B358] font-bold z-90 text-xl hover:text-amber-300 cursor-pointer transition-colors duration-200" onClick={()=>{console.log("aa");
        ;nav(`${nav_url}`)}}>View More</button>
        
      </div>
    </motion.div>
    );
}

export default React.memo(DisplayCards);