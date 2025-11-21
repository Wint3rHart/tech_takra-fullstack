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
}, 900000);
try{
    let url="";
    switch (type) {
    
        case "get_forms":{ if (key=="All"){url="https://computersciencesocietyonrender.com/api/regForm";}else{url=` https://computersciencesocietyonrender.com/api/regForm/${key}`;console.log(url);
        };break;};
        case "events":{url="https://computersciencesocietyonrender.com/api/events";break}
        case "team":{url="https://computersciencesocietyonrender.com/api/team";break}
case "notice":{url="https://computersciencesocietyonrender.com/api/announcement";break}
case "admin":{url="https://computersciencesocietyonrender.com/api/auth/admin/all";break}
    
      
        case "user_data":{
        ;url=`https://computersciencesocietyonrender.com/api/user_data?id=${key}`;break;}

  default:{url=`https://computersciencesocietyonrender.com/api/${type}`;break;}  };

        const authHeader = key ? { "authorization": `Bearer ${key}` } : {};
        console.log(`Fetching ${type} from ${url}`, { hasAuth: !!key });
        let get=await fetch(url,{signal,headers:{"content-type":"application/json",...authHeader}});
        let conv=await get.json();
        console.log(`Response for ${type}:`, { status: get.status, ok: get.ok, data: conv });
if(!get.ok){ throw new Error(conv.msg || conv.message || `Error in useData-${type}`) };
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
