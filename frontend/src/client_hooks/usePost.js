"use client"

import { useRef, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query"


const usePost=(type,method)=>{
    const client=useQueryClient();
let abort_ref=useRef(null);
let [msg,setMsg]=useState(null);
    const post=useMutation({mutationFn:async(data)=>{
        console.log(data);
        
        const aborter=new AbortController();
let signal=aborter.signal;
abort_ref.current=aborter;
const timer=setTimeout(() => {
    aborter.abort("took too long");
}, 10000);
let url;
switch (type) {
    case "booking":{
        url='http://localhost:4600/api/booking';
        console.log(method);
        
        break;}
case "delete_booking":{ url='http://localhost:4600/api/delete_booking';break;}
case "msg":{url='http://localhost:4600/api/chat';break;}
    default:{
        break;}
};
try{
const get=await fetch(url,{method:method,body:JSON.stringify(data),headers:{"content-type":"application/json"},signal});
const conv=await get.json();
if(!get.ok){throw new Error(conv.msg||`Error in ${type} from usePost`)};
return conv}
finally{clearTimeout(timer)};

    },onError:(error)=>{console.log(error.message);
        setMsg(y=>y=error.message)
          let timer=    setTimeout(() => {
             setMsg(y=>{return y=null });
             clearTimeout(timer);
        }, 4000);
    },onSuccess:(x)=>{ console.log("success from usePost",x);
        setMsg(y=>{return y=x.msg });
        if(type==="delete_booking"){client.invalidateQueries(["user_data"])};
    let timer=    setTimeout(() => {
             setMsg(y=>{return y=null });
             clearTimeout(timer);
        }, 4000);
    }});

return {post,abort_ref,msg}

}

export default usePost;