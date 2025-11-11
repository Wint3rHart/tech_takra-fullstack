import React, { useEffect, useMemo } from 'react';
import { motion, useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';


const DisplayCards = ({scroll,ind,x,nav_url}) => {

  let nav=useNavigate();
  let math_memo=useMemo(()=>{return Math.random()*(100-50)+50},[]);
console.log("display cards render");

  
let transX=useTransform(scroll,[0,0.5,1],[`${ind*-15}vw`,`${ind*0}vw`,`${ind*0}vw`])
let rotation=useTransform(scroll,[0,0.5,1],["35deg","0deg","0deg"]);
let y=useTransform(scroll,[0,0.5,0.6,1],[0,0,0,math_memo]);
let vals=Object.keys(x);
console.log(vals);

//can use priority:1,2,3 in reduced array by makiing it obj and use filter or flat etc..as well later
let reduce_memo=useMemo(()=>{
    console.log("reduced array rendered");
    
   let arry= vals.reduce((acc,val,i)=>{


if(val.includes("name")||val.includes("title")){ 
  acc.push({priority:1,element:<p className="text-lg font-semibold mt-2">{x[val]}</p>})}
  else if(val.includes("city")&&!val.includes("img")&&!val.includes("image")||val.includes("city_name")&&!val.includes("img")&&!val.includes("image") ){
    
    
    acc.push({priority:2,element:<p className="text-lg font-semibold mt-2">{x[val]}</p>})
  
  
  }



else if(val.includes("tagline")){acc.push({priority:3,element:<p className="text-lg font-semibold mt-2">{x[val]}</p>})}
else if(val.includes("description")) {
;acc.push({priority:4,element:<p className="text-sm font-semibold mt-2">{x[val]}</p>})}
else {return acc};



return acc
      },[]);
    return arry.sort((x,y)=>{
  ;return x.priority-y.priority});
    
    },[x]);;




    return (
        <motion.div
      key={ind}
      style={{x:transX,rotateY:rotation,y,willChange:"transform"}}
      className={` group 
        w-[30vw] 
        ml-6
      flex-shrink-0
      shadow-[-9px_3px_7px_2px_#000000]
       h-[70vh]
        mb-2
        rounded-xl 
        border
        border-gray-200
        relative 
        text-white 
        bg-no-repeat
        bg-[100%] 
       
         group
       
      `}
    >
      <div
        style={{
          backgroundImage: `url(${x?.city_image})`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="rounded-xl  brightness-100  hover:brightness-100
       absolute inset-0 w-full h-full"
      >

     </div><div className=' bg-black/25 z-90 h-full w-full absolute top-0'/>
      <div className="relative z-20 transition-opacity duration-0.4  group-hover:opacity-100 opacity-0 p-4">
      


      {reduce_memo.map((x,i)=>{return x.element})}


        <button className="mt-6" onClick={()=>{console.log("aa");
        ;nav(`${nav_url}`)}}>View More</button>
      </div>
    </motion.div>
    );
}

export default React.memo(DisplayCards);
  // <p className="text-lg font-semibold">{x?.city_name}</p>
  //       <p className="text-md font-bold">{x?.country}</p>
  //       <p className="text-sm font-semibold">{x?.tagline}</p>
  //       <p className="text-sm">{x?.description}</p>