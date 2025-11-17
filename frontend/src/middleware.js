import React from 'react';
import CryptoJS from 'crypto-js';
import { NextResponse } from 'next/server';


export const config={matcher:["/","/booking/:path*"]};




const loginFnx=async(request,signal)=>{
try {
  let user_check=request.cookies.get("User-data")?.value;
if(user_check){

  let decrypted=null;
  let decrypt_parse=null;
try {
  decrypted=CryptoJS.AES.decrypt(user_check, "125xyzabc").toString(CryptoJS.enc.Utf8);
   
 if(decrypted){
    decrypt_parse= JSON.parse(
    decrypted
    );
}else{ throw new Error("decrypting failed")};
} catch (error) {
  console.log(error.message);
  decrypted=null;
  throw error;
  
}
//  console.log(decrypt_parse,new Date(decrypt_parse.expiry),new Date());
   
if(new Date(decrypt_parse.expiry) > new Date()){console.log("User data frresh");
  ;let res= NextResponse.next();
  
  if(request.nextUrl.pathname.includes("/booking")){ 
;res.headers.set("userId",decrypt_parse.id)}
return res;
}
  
};


const access_check=request.cookies.get("access")?.value;
console.log("ayien",access_check);
if(access_check){
console.log("sending");

let get=await fetch(`http://localhost:4600/api/next_autoLogin`,{method:"POST",headers:{'content-type':'application/json',"authorization":`${access_check}`},signal});
let conv=await get.json();
// console.log(conv);

if(!get.ok){throw new Error(conv.msg)};
let res=NextResponse.next();
const expiry=new Date();
res.cookies.set("User-data",CryptoJS.AES.encrypt(JSON.stringify({...conv.user,expiry:expiry.setHours(expiry.getHours()+5)}),"125xyzabc").toString(),{httpOnly:true,sameSite:"strict",secure:true,maxAge:60 * 60 * 10});
if(request.nextUrl.pathname.includes("/booking")){ console.log("yahann hu");
;res.headers.set("userId",conv.user.id)}
return res;
}else{
 return await refresh_fnx(request,signal)
}
} 
catch (error) {
  console.log(error.message);
  if(error.message.toUpperCase()==="TokenExpiredError".toUpperCase()||error.message.toUpperCase()=="Access Not Found".toUpperCase()){
 return   await refresh_fnx(request,signal)
  }else{
    throw error;
    
  }
}


};

const refresh_fnx=async(request,signal)=>{
console.log("in refresh");

  try {
    const refresh=request.cookies.get("refresh")?.value;
console.log("refresh",refresh);
if(refresh){
  let get=await fetch(`http://localhost:4600/api/next_refresh`,{method:"POST",headers:{"content-type":"application/json","authorization":`${refresh}`},signal});
  let conv=await get.json();
  if(!get.ok){throw new Error(conv.msg)};
  console.log(conv);
  
  let res=NextResponse.next();
  res.cookies.set("access",conv.tokens.access,{httpOnly:true,sameSite:"strict",secure:true,maxAge:60*60*24});
  res.cookies.set("refresh",conv.tokens.refresh,{httpOnly:true,sameSite:"strict",secure:true,maxAge:60 * 60 * 24*3});
  const expiry=new Date();
  res.cookies.set("User-data",CryptoJS.AES.encrypt(JSON.stringify({...conv.user,expiry:expiry.setHours(expiry.getHours()+5)}),"125xyzabc").toString(),{httpOnly:true,sameSite:"strict",secure:true,maxAge:60 * 60 * 10});
  return res;
}else{
  throw new Error("Refresh not found");
  }

  } catch (error) {

    console.log(error.message);
throw error;


  }


}

const Middleware =async (request) => {

console.log(request.nextUrl);


console.log("MW running");
//to add timeout
const aborter=new AbortController();
const signal=aborter.signal;
const timer=setTimeout(() => {
  aborter.abort("took too long");
}, 10000);
    try {
  
let logger=await loginFnx(request,signal);
return logger
    } catch (error) {
        console.log("in mw catch",error.message);
        let res= NextResponse.next();    
        res.headers.set("sign_error",error.message);
res.cookies.delete("refresh");
res.cookies.delete("access");
res.cookies.delete("User-data")
if(request.nextUrl.pathname.includes("/booking")){console.log("is booking url");
return  NextResponse.redirect(new URL("/signUp",request.url))
}else{
return res;}
    }finally{clearTimeout(timer)};
  };

export default Middleware;
