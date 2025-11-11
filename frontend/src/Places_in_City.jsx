import React, { createContext, useContext, useEffect, useMemo, useRef } from 'react';
import useData from './useData';
import { motion, useScroll, useTransform } from 'framer-motion';
import UseVariants from './useVariants';

let Var_context=createContext("");
const PlacesInCity = ({places}) => {
let {grandChildVar,parentVar,childVar}=UseVariants();
 
let variants_memo=useMemo(()=>{
    
  grandChildVar={...grandChildVar,initial:{opacity:0},animate:{opacity:1}};

  
  return {grandChildVar,parentVar,childVar}
  
  
  },[]) ; 
  
    return (

<Var_context.Provider value={variants_memo}>
        <div className='flex flex-col  items-center justify-center text-white'>
            {places?.map((x,i)=>{

return  (
    
<div key={x?.id} className='h-full w-full'> 

 <Places_cards_parent   x={x} i={i}/>
 
  </div>)

            })}
        </div>
        </Var_context.Provider>

    );
}

export default React.memo(PlacesInCity);


const Places_cards_parent=({x,i})=>{

 
let refer=useRef(null);
let {scrollYProgress}=useScroll({target:refer,offset:["start center","end start"]});



return (
<div ref={refer} className='border-2 py-24'>
<Places_cards  scroll={scrollYProgress}  i={i} data={x} />
</div>
)};


const Places_cards=  ({i,data,scroll})=>{

    
let y1=useTransform(scroll,[0,1],[0,-290]);
let y2=useTransform(scroll,[0,1],[0,-150]);
let {childVar,grandChildVar}=useContext(Var_context);

return (<motion.div  variants={childVar} initial="initial" whileInView="animate" viewport={{once:true,amount:.1}} className='mt-24 h-[80vh] border-2 border-black w-full flex justify-evenly'>
   
      <motion.div variants={grandChildVar} className=' text-center max-w-[20vw] flex flex-col items-center justify-center'  
      style={{y:y1,willChange:"transform"}}> 
      <p className='font-bold text-4xl'>{data.name}</p> 
      <p className='font-semibold text-sm mt-12'>{data.description}</p>
       </motion.div>
      
       <motion.div className='' variants={grandChildVar} style={{y:y2,willChange:"transform"}}>
        <img src={data.places_image}  className=' h-full w-[50vw]'/>
        </motion.div> 
      
      
      </motion.div>)
      
    };