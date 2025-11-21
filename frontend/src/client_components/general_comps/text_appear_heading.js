"use client"

import React from 'react';
import { motion } from 'framer-motion';
import UseVariants from '@/client_hooks/useVariants';
import { useRouter } from 'next/navigation';



export const TextAppear = ({children,styling}) => {

// console.log(styling);

    return (
<motion.div initial={{opacity:0,x:-20}}
whileInView={{x:0,opacity:1}} transition={{duration:.4,ease:"easeIn",delay:.2}} viewport={{amount:.5,once:false}}  className={styling}>
    {children}
</motion.div>     
    );
};

export const TextAppear_3=({children})=>{
    // console.log(children);
      const router=useRouter();
    
let Comp=motion[children?.[0]?.type];


    let {parent_One_after_one,child_one_after_one}=UseVariants();
// console.log(children);

return (
<motion.div className=' font-bold text-8xl  flex flex-col justify-center items-center' variants={parent_One_after_one} initial="initial" whileInView="animate" viewport={{amount:.8}}>
{
   React.Children.toArray(children).map((x,i)=>{
    ;return    <Comp key={i} className={x.props.className} variants={child_one_after_one}>{x.props.children}</Comp>})
}
</motion.div>

)


}

export const TextAppear_2=({children})=>{
    // console.log(children);
      const router=useRouter();
    
let Comp=motion[children?.[0]?.type];


    let {parent_One_after_one,child_one_after_one,childVar}=UseVariants();
// console.log(children);

return (
<motion.div className='font-bold text-5xl sm:text-6xl md:text-7xl lg:text-8xl flex flex-col justify-center items-center gap-2' variants={parent_One_after_one} initial="initial" whileInView="animate" viewport={{amount:.8}}>
{
   React.Children.toArray(children).map((x,i)=>{
    return <Comp key={i} className={x.props.className} variants={childVar}>{x.props.children}</Comp>
   })}

  <motion.button
    variants={childVar}
    onClick={() => { router.push('/signUp'); }}
    type="button"
    className="mt-4 z-50 cursor-pointer px-6 py-3 bg-gradient-to-r from-amber-400 via-amber-300 to-[#d4af37] text-black font-semibold rounded-xl transition-transform duration-200 text-base sm:text-lg md:text-2xl shadow-[0_8px_30px_rgba(212,175,55,0.28)] hover:shadow-[0_12px_40px_rgba(212,175,55,0.45)] hover:scale-105 ring-1 ring-amber-300/20"
    style={{
      boxShadow: '0 8px 30px rgba(212,175,55,0.22), inset 0 -2px 8px rgba(0,0,0,0.15)'
    }}
  >
    <span className="relative z-10">Register</span>
  </motion.button>

</motion.div>


)


}


export const TextAppear_para=({children,styling})=>{
    // console.log(children);
      let {opacityVar}=UseVariants();

return(
<motion.div className="text-lg flex justify-center items-evenly flex-wrap w-[60vw]">

    {React.Children.toArray(children).map((x,i)=>{
    ;return(
     <motion.p 
       key={i} 
       variants={opacityVar} 
       className={styling} 
       initial="initial" 
       whileInView="animate" 
       viewport={{amount:.7,once:true}}
     >
       {x.props.children}
     </motion.p>)
 })
}
<motion.span 
  initial={{scaleX:0}} 
  whileInView={{scaleX:1}} 
  viewport={{amount:.6,once:true}} 
  transition={{duration:.6}} 
  className='w-[30vw] h-[10px] border-b mt-12 border-b-[#d4af37]' 
/>
 
</motion.div>
)

}