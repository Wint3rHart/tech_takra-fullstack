"use server"
import { cookies } from 'next/headers';
import {register_fnx,serverAction} from '../../server_actions/signUp_fnx'
import CryptoJS from 'crypto-js';

export const signUp_serverAction=async(data,reg)=>{

   try{

      let result;

      if (reg) {

         result=await register_fnx(data);
         console.log(result);
         
return {status:"success",msg:"User Registered"};
      }
else{

  result=await serverAction("signIn","POST",data)}
// console.log(result);
console.log(result);
let cookieStore=await cookies()
 cookieStore.set("access",result.data.access,{httpOnly:true,sameSite:"strict",secure:true,maxAge:60*60*1000,path:"/"});
cookieStore.set("refresh",result.data.refresh,{httpOnly:true,secure:true,sameSite:"strict",maxAge:24*60*60*1000});

let expiry=new Date();

cookieStore.set("User-data",CryptoJS.AES.encrypt(JSON.stringify({...result.user,expiry:expiry.setHours(expiry.getHours()+5)}),'125xyzabc').toString(),{httpOnly:true,secure:true,sameSite:"strict",maxAge:24*60*60*1000})

return {status:"success",msg:"User Signed In"}

}
catch(error){

  console.log("from srvr act",error.message);

throw error;
}



}