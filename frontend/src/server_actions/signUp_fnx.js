"use server"
export const register_fnx=async(data)=>{
    let aborter=new AbortController();
    let signal=aborter.signal;

let timer=setTimeout(() => {
    aborter.abort("Took too long");
}, 10000);

let form=new FormData();
        form.append("name",data.name);
        form.append("email",data.email);
        form.append("password",data.password);
        form.append("confirm_password",data.confirm_password);
        form.append("pic",data.pic[0]);
             try {
    let get=await fetch('http://localhost:4600/api/register',{method:"POST",body:form,signal});
let conv=await get.json();
if(!get.ok){throw new Error(conv.type=="joi"?conv.msg.message : conv.msg||"Error in Fetch Post")}
console.log("conv is =",conv);

return conv;

} catch (error) {
    console.log(error.message);
    throw error;
 
}
finally{clearTimeout(timer)}
}


export const serverAction=async(type,method,data)=>{
let abort=new AbortController();
let signal=abort.signal;

const timer=setTimeout(() => {
    abort.abort("Too Long");
}, 10000);


let url="";
let body_data;
switch (type) {
    case "signIn":{
   body_data=JSON.stringify({email:data.email,password:data.password}) ;
   url='http://localhost:4600/api/auth/admin/login';break;}

case "registration":{
      body_data=JSON.stringify(data) ;url='http://localhost:4600/api/regForm';break;
}

  default:{url=''; break;}
};

try {


    let get=await fetch(url,{method:method,body:body_data,signal,headers:{'content-type':"application/json"}});
let conv=await get.json();
if(!get.ok){throw new Error(conv.type=="joi"?conv.msg.message : conv.msg||"Error in Fetch Post")}
console.log("conv is =",conv);

return conv;

}catch (error) {
    console.log(error.message);
    throw new Error(error.message);
 
}finally{

    clearTimeout(timer);
}};

