"use client"
import React from 'react';

const Error = ({error,reset}) => {
    return (
        <div className='text-white font-black'>
            {error.message+"from error.js"}
        </div>
    );
}

export default Error;
