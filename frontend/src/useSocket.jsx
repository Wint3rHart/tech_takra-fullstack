import { useCallback, useEffect, useRef, useState, useTransition } from "react";
import { io } from "socket.io-client";
import useSignStore from './useSignStore';

const useSocket=()=>{

     let sign_id=useSignStore(x=>{return x.data.userId});
        let name=useSignStore(x=>{return x.data.userName});
       
    
     let [msgs,setMsgs]=useState([]);
let [connected,setConnected]=useState(false);
let socket_ref=useRef(null);
 let id_ref=useRef(null);
 let [isPending,startTransition]=useTransition();

useEffect(()=>{
let socket=io("http://localhost:4600");
if(socket_ref.current==socket){return ;}
else{console.log("connection phase running");



socket.on("connect",()=>{console.log("user connected");
        setConnected(x=>true) });
socket.emit("user-id",{userId:sign_id})
    socket.on("connect-id",(data)=>{id_ref.current=data.id;
        });
       socket.on("global-message",(msg)=>{
       ;startTransition(()=>setMsgs(x=>[...x,msg]))   });
       socket.on("prev-message",(msg)=>{
      startTransition(()=>setMsgs(x=>x=[...msg]))  ;
       });
       socket.on("disconnect",()=>{console.log("going off");
       });

socket_ref.current=socket; 
};

return ()=>{socket.disconnect()}

},[])




const g_emit_fnx=(x)=>{
console.log("emmiting");

    socket_ref.current.emit("G-message",{text:x,userId:sign_id,name},(x)=>{console.log(x);
    });
}

return {g_emit_fnx,connected,socket_ref,isPending,sign_id,msgs,name};


}
export default useSocket;