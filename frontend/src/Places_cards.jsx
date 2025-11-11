import React from 'react';
import { motion, useTransform } from 'framer-motion';

const PlacesCards = ({x,scroll,i}) => {

let y=useTransform(scroll,[0,1],[0,window.innerHeight *(Math.random() * (2 - 1) + 1)
])

console.log(x);

    return (
        <motion.div style={{y:y}} className='h-full '>
        {x.map((y)=>{return <div style={{backgroundImage:`url("")`}} className={`  text-white h-[50vh] bg-no-repeat bg-[100%]  border w-full `}>
    <div className='absolute z-0 inset-0   w-full '> </div>
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

export default PlacesCards;
