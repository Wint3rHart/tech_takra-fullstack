export const dynamic='force-dynamic'
import WanderingHartNavbar from "@/app/navBar";
import CryptoJS from "crypto-js";


const { cookies } = require("next/headers")

export const Get_status=async()=>{

try {
    const cookie_store=await cookies();
const get=cookie_store.get("User-data")?.value;
console.log("user data",get);

if(get){
    let decrypt_parse=null;
    try {
 let decrypt=CryptoJS.AES.decrypt(get,"125xyzabc").toString(CryptoJS.enc.Utf8);
if(decrypt){decrypt_parse=JSON.parse(decrypt)}
else{throw new Error("Decryption failed")}
} catch (error) {
    throw error;
}
   
    
    
    
let check=new Date(decrypt_parse.expiry)>new Date();
if(check){return  <WanderingHartNavbar data={{status:true,data:{...decrypt_parse}}}/> }
    else { return {status:false,msg:false} };
}
else return <WanderingHartNavbar data={{status:false,msg:"Session Expired"}}/>;

} catch (error) {
    console.log("error in nav",error.message);
return <WanderingHartNavbar data={{status:false,msg:error.message}}/> ;    
}};


