"use client"
import React, { useTransition } from 'react';
// import { invalidate } from './server_action';

const Button = ({x,fnx}) => {

    return (
        <button type='button' className='mt-6 text-[#C5B358] w-[100px] h-[60px] font-bold z-90 text-xl hover:text-amber-300 cursor-pointer transition-colors duration-200 border-2 border-amber-300' onClick={(()=>{console.log(x);
        })}>BUTTON</button>
    );
}

export default Button;
