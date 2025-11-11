import React, { useEffect ,useMemo, useState} from 'react';
import useData from './useData';
import { motion,useTransform } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import DisplayCards from './DisplayCards';


const CitiesAd = ({scroll}) => {
console.log("Cities Ad rendered");

let {abort_ref,query}=useData("cities_details")
let {data,isLoading,isError,isSuccess,error}=query;
let [ind,setInd]=useState(0);


let map_memo=useMemo(()=>data?.data?.map((x, i) =>{
console.log("inner render");

return <DisplayCards key={i} scroll={scroll} ind={i} x={x} nav_url={`/city?city=${x.city_name}`}/>

  }),[data])

if(isLoading){return <div className='h-full w-full flex flex-col items-center justify-center'><p className='text-4xl text-white font-bold'>Loading</p></div>}
if(isError){return <div className='h-full w-full flex flex-col items-center justify-center'><p className='text-4xl text-white font-bold'>{error.message}</p></div>}
    return (
     <div className=' flex justify-start items-center  overflow-x-auto scrollbar-hide overflow-y-hidden h-full relative' style={{transformStyle:"preserve-3d",perspective:"1700px"}}>
<button className='text-white' onClick={()=>{setInd(x=>x=x+1)}}>CLICK</button>
  {map_memo}
</div>

    );
}

export default React.memo(CitiesAd);


// const CitiesCards = ({scroll,ind,x}) => {
//   let math_memo=useMemo(()=>{return Math.random()*(100-30)+30},[]);
//   let vw_memo=useMemo(()=>{return [`${ind*-15}vw`,`${ind*-4}vw`,`${ind*-4}vw`]  },[]);
// let nav=useNavigate();
// let size=useTransform(scroll,[0,0.5,1],vw_memo);
// let op=useTransform(scroll,[0,0.5,1],["35deg","-5deg","-5deg"]);
// let y=useTransform(scroll,[0,0.5,0.6,1],[0,0,0,math_memo]);

//     return (
//         <motion.div
//       key={ind}
//       style={{x:size,rotateY:op,y,willChange:"transform"}}
//       className={` group 
//         w-[20vw] 
//         ml-6
//       flex-shrink-0
//       shadow-[-9px_3px_7px_2px_#000000]
//        h-[50vh]
//         mb-2
//         rounded-xl 
//         border
//         border-gray-200
//         relative 
//         text-white 
//         bg-no-repeat
//         bg-[100%] 
       
//          group
       
//       `}
//     >
//       <div
//         style={{
//           backgroundImage: `url(${x.image})`,
//           backgroundRepeat: "no-repeat",
//           backgroundSize: "cover",
//         }}
//         className="rounded-xl  brightness-100  hover:brightness-100
//        absolute inset-0 w-full h-full"
//       >

//      </div> <div className="relative z-20 transition-opacity duration-.4  group-hover:opacity-100 opacity-0 p-4">
//         <p className="text-lg font-semibold">{x.city_name}</p>
//         <p className="text-md font-bold">{x.country}</p>
//         <p className="text-sm font-semibold">{x.tagline}</p>
//         <p className="text-sm">{x.description}</p>
//         <button className="mt-2" onClick={()=>{nav(`/city?city=${x.city_name}`)}}>View More</button>
//       </div>
//     </motion.div>
//     );
// }

