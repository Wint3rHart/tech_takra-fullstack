"use client"

import CityHeader from '@/client_components/city_components/city_header';
import React, { useState } from 'react';

const City = ({children}) => {

let [num,setNum]=useState(0);


    return (<>
     <button style={{zIndex:200}} className='fixed top-5  cursor-pointer left-10  p-6 bg-gray-300' onClick={()=>{setNum(x=>{return x=(x+1)%(children.length)})}}>NEXT</button>
        <div style={{transform:`translateX(-${num*100}vw)`,transition:"all .5s"}} className='  min-h-[120vh] relative w-[100vw] flex justify-start items-center'>
           
    {

children
    }

 </div></>
    );
}

export default City;
