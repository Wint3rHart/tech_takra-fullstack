"use client"

import { useRef, useState } from "react";

import { useMutation, useQueryClient } from "@tanstack/react-query"


const usePost=(type,method,access)=>{
    console.log(access);
    
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
    
case "delete_form":{ url=`http://localhost:4600/api/regForm/${data.data_id}`;break;}
case "update_event":{console.log(data)
    url=`http://localhost:4600/api/events/update/${data.id}`;
    
try{
const get=await fetch(url,{method:method,body:data.form,signal,headers:{"authorization":`Bearer ${access}`}});
const conv=await get.json();
if(!get.ok){throw new Error(conv.msg||`Error in ${type} from usePost`)};
return conv}
finally{clearTimeout(timer)};

;}
case "delete_event":{url=`http://localhost:4600/api/events/delete/${data.data_id}`;break;}

case "create_event":{ url=`http://localhost:4600/api/events/create`;
    
try{
const get=await fetch(url,{method:method,body:data.form,signal,headers:{"authorization":`Bearer ${access}`}});
const conv=await get.json();
if(!get.ok){throw new Error(conv.msg||`Error in ${type} from usePost`)};
return conv}
finally{clearTimeout(timer)};}

//

case "create_team":{ url=`http://localhost:4600/api/team/create`;
    
try{
const get=await fetch(url,{method:method,body:data.form,signal,headers:{"authorization":`Bearer ${access}`}});
const conv=await get.json();
if(!get.ok){throw new Error(conv.msg||`Error in ${type} from usePost`)};
return conv}
finally{clearTimeout(timer)};}

case "update_team":{ url=`http://localhost:4600/api/team/update/${data.id}`;
    
try{
const get=await fetch(url,{method:method,body:data.form,signal,headers:{"authorization":`Bearer ${access}`}});
const conv=await get.json();
if(!get.ok){throw new Error(conv.msg||`Error in ${type} from usePost`)};
return conv}
finally{clearTimeout(timer)};}
case "delete_team":{ url=`http://localhost:4600/api/team/delete/${data.data_id}`;
try{
const get=await fetch(url,{method:method,headers:{"authorization":`Bearer ${access}`},signal});
const conv=await get.json();
if(!get.ok){throw new Error(conv.msg||`Error in ${type} from usePost`)};
return conv}
finally{clearTimeout(timer);}
break;
}

case "create_notification":{ 
    url=`http://localhost:4600/api/announcement/create`;
    try{
        // data is the formData directly: {title, description}
        console.log("Creating announcement with data:", data);
        const body = JSON.stringify(data);
        const get=await fetch(url,{
            method:method,
            body:body,
            headers:{
                "content-type":"application/json",
                "authorization":`Bearer ${access}`
            },
            signal
        });
        const conv=await get.json();
        console.log("Create announcement response:", conv, "Status:", get.status);
        if(!get.ok){
            const errorMsg = conv.msg || conv.error || conv.message || `Error in ${type} from usePost`;
            console.error("Create announcement error:", errorMsg);
            throw new Error(errorMsg);
        };
        return conv;
    }
    catch(err){
        console.error("Create announcement exception:", err);
        throw err;
    }
    finally{
        clearTimeout(timer);
    }
    break;
}
case "update_notification":{ 
    url=`http://localhost:4600/api/announcement/update/${data.id}`;
    try{
        // Extract formData from the data object: {formData: {...}, id: "..."}
        const bodyData = data.formData || data;
        // Don't include id in the body, it's in the URL
        const { id, ...updateData } = bodyData;
        console.log("Updating announcement:", { id: data.id, updateData, url });
        const get=await fetch(url,{
            method:method,
            body:JSON.stringify(updateData),
            headers:{
                "content-type":"application/json",
                "authorization":`Bearer ${access}`
            },
            signal
        });
        const conv=await get.json();
        console.log("Update announcement response:", conv, "Status:", get.status);
        if(!get.ok){
            const errorMsg = conv.msg || conv.error || conv.message || `Error in ${type} from usePost`;
            console.error("Update announcement error:", errorMsg);
            throw new Error(errorMsg);
        };
        return conv;
    }
    catch(err){
        console.error("Update announcement exception:", err);
        throw err;
    }
    finally{
        clearTimeout(timer);
    }
    break;
}
case "delete_notification":{ 
    url=`http://localhost:4600/api/announcement/delete/${data.data_id}`;
    try{
        console.log("Deleting announcement:", { data_id: data.data_id, url });
        const get=await fetch(url,{
            method:method,
            headers:{
                "authorization":`Bearer ${access}`
            },
            signal
        });
        const conv=await get.json();
        console.log("Delete announcement response:", conv, "Status:", get.status);
        if(!get.ok){
            const errorMsg = conv.msg || conv.error || conv.message || `Error in ${type} from usePost`;
            console.error("Delete announcement error:", errorMsg);
            throw new Error(errorMsg);
        };
        return conv;
    }
    catch(err){
        console.error("Delete announcement exception:", err);
        throw err;
    }
    finally{
        clearTimeout(timer);
    }
    break;
}

case "create_admin":{ url=`http://localhost:4600/api/auth/admin/create`;
    break;}
case "delete_admin":{ url=`http://localhost:4600/api/auth/admin/delete/${data.data_id}`;
    break;}



    default:{
        break;}
};



try{
const get=await fetch(url,{method:method,body:JSON.stringify(data),headers:{"content-type":"application/json","authorization":`Bearer ${access}`},signal});
const conv=await get.json();
if(!get.ok){throw new Error(conv.msg||`Error in ${type} `)};
return conv}
finally{clearTimeout(timer)};

    },onError:(error)=>{console.log(error.message);
        setMsg(y=>{if(error&&error==="Took too long"){return y=error}else{return y=error.message||"Failed,Try Again Later"} })
          let timer=    setTimeout(() => {
             setMsg(y=>{return y=null });
             clearTimeout(timer);
        }, 4000);
    },onSuccess:(x)=>{ console.log("success from usePost",x);
        setMsg(y=>{return y=x.msg||"Success" });
        if(type==="delete_form"){client.invalidateQueries("get_forms")};
        if(type==="delete_event"||type==="update_event"||type==="create_event"){client.invalidateQueries("events")};
         if(type==="delete_team"||type==="update_team"||type==="create_team"){client.invalidateQueries("team")};
          if(type==="delete_notification"||type==="update_notification"||type==="create_notification"){client.invalidateQueries("notice")};
if(type==="delete_admin"||type==="create_admin"){client.invalidateQueries("admin")};


    let timer=    setTimeout(() => {
             setMsg(y=>{return y=null });
             clearTimeout(timer);
        }, 4000);
    }});

return {post,abort_ref,msg}

}

export default usePost;