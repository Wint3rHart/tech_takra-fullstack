"use server"
import { cookies } from 'next/headers';
import {register_fnx,serverAction} from '../../server_actions/signUp_fnx'
import CryptoJS from 'crypto-js';

export const signUp_serverAction=async(data,reg)=>{

   try{

      let result=await serverAction("signIn","POST",data);
// console.log(result);
console.log(result);
let cookieStore=await cookies()
 cookieStore.set("access",result.accessToken,{httpOnly:true,sameSite:"strict",secure:true,maxAge:60*60*1000,path:"/"});
cookieStore.set("refresh",result.refreshToken,{httpOnly:true,secure:true,sameSite:"strict",maxAge:24*60*60*1000});

let expiry=new Date();

cookieStore.set("User-data",CryptoJS.AES.encrypt(JSON.stringify({...result.admin,expiry:expiry.setHours(expiry.getHours()+5),accessToken:result.accessToken}),'125xyzabc').toString(),{httpOnly:true,secure:true,sameSite:"strict",maxAge:24*60*60*1000})

return {status:"success",msg:"Admin Signed In"}

}
catch(error){

  console.log("from srvr act",error.message);

throw error;
}



}