import React, { useEffect, useMemo, useState, useTransition,useCallback } from 'react';
import useSocket from './useSocket';
import usePost from './usePost'

import Message from './Message';
import { useNavigate } from 'react-router-dom';
const Chat = () => {
   
   
    let nav=useNavigate()
let {socket_ref,g_emit_fnx,isPending,sign_id,msgs,name}=useSocket("global");

useEffect(()=>{console.log(sign_id,name);
},[msgs]);

let [write,setWrite]=useState("");


let msg_memo=useMemo(()=>{
;return msgs.length>0&&msgs.map((x,i)=>{console.log(x);
;return <div key={x.msg_id}><Message align={x.userId==sign_id?"text-right bg-red-300/40":"text-left bg-gray-300/40" } id={x.userId} msg_id={x.msg_id} msg={x.message} time={x.time} name={x.userName}/> </div>})},[msgs,sign_id]);


    // useEffect(()=>{if(!connected){connect_fnx()}},[connected]);

    if(isPending){return <p className=' text-2xl text-black font-semibold'>Loading Chats</p>}
    return (
        <div className='flex m-auto flex-col justify-center w-1/2 border-2 border-red-600'>
           <button onClick={()=>{nav("/")}}>Home</button>
            
 {             msg_memo}
            <input value={write} onChange={(e)=>{setWrite(x=>e.target.value)}} />
            <button disabled={write.length==0&&true} onClick={()=>{g_emit_fnx(write);setWrite(x=>"")}}>Send</button>
        </div>
    );
}

export default Chat
