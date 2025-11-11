import { useMutation } from "@tanstack/react-query"
import useSignStore from "./useSignStore";
import { useRef } from "react";




const usePost=(type)=>{
let post_abort_ref=useRef(null);
let sign_fnx=useSignStore(state=>state.fnx.setSign);


let post=useMutation({mutationFn:async(data)=>{
post_abort_ref.current=new AbortController();
let signal=post_abort_ref.current.signal;

let timer=setTimeout(() => {
    post_abort_ref.current.abort();
}, 900000);

    let url;
    let method;
    try{
if(type=="register"){
    
    url="http://localhost:4600/api/register";method="POST";

    let form=new FormData();
   
for (let x in data){form.append(x,x!="profilePic"?data[x]:data[x][0])};
console.log(form);

let get=await fetch(url,{method,body:form,signal});
let conv=await get.json();
if(!get.ok){throw new Error(conv.msg||"Error in registration")};
return conv;

}
else if(type==="login"){console.log("in login");
url="http://localhost:4600/api/signIn";method="POST"}
else if(type==="refresh"){url="http://localhost:4600/api/refresh";method="POST"};

let get=await fetch(url,{method,headers:{"content-type":"application/json"},body:JSON.stringify(data),credentials:"include",signal});
let conv=await get.json();
if(!get.ok){throw new Error(conv.msg||`Error in ${type}`)}
return conv}
finally{
    clearTimeout(timer)

};
},onSuccess:(x)=>{ if(type=="login"){
    console.log(x);
    
    let {data}=x;
sign_fnx(data)
}


}});

return {post,post_abort_ref}






}

export default usePost;