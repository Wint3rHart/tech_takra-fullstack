import React from 'react';

const Message = ({align,id,msg,time,name}) => {

        

    return (
       <div  className={`text-black text-xl ${align} font-semibold border rounded-xl mt-4`}>
<p className='text-gray-700 text-[15px]'>{name}</p>
        <p className='text-gray-700 text-[10px]'>{id}</p> <p >{msg}</p><p className='text-gray-700 text-[10px]'>{time}</p></div>
    );
}

export default Message;
