"use client"
import { useQuery } from '@tanstack/react-query';
import React, { useRef } from 'react';



const useData = (type,key) => {
console.log("in useData");
let abort_ref=useRef();
    let query=useQuery({queryKey:[type],queryFn:async()=>{

let controller=new AbortController();
let signal=controller.signal;
abort_ref.current=controller;
let timer=setTimeout(() => {
    controller.abort("Took to long,Request Aborted");
}, 10000);
try{
    let url="";
    switch (type) {
        case "gallery":{url=`http://localhost:4600/api/gallery?city=${key}`;break}
        case "hotel_rooms":{
        url=`http://localhost:4600/api/hotel_rooms?city=${key}`;break};
        case "sign_status":{url="http://localhost:4600/sign_status"};
        case "rooms":{url=`http://localhost:4600/api/rooms?hotel_id=${key}`;break}
        case "user_data":{
        ;url=`http://localhost:4600/api/user_data?id=${key}`;break;}
  default:{url=`http://localhost:4600/api/${type}`;break;}  };

        let get=await fetch(url,{signal});
        let conv=await get.json();
if(!get.ok){ throw new Error(conv.msg||`Error in useData-${type}`) };
if(get.status===304){
    console.log("got from cache");
return;
}
console.log(get.headers);

return conv;}
finally{clearTimeout(timer)};

    },retry:1,refetchOnWindowFocus:false,enabled:type==="hotel_rooms"?false:true});


    return {query,abort_ref};
    
}

export default useData;
