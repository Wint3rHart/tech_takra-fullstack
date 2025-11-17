import React, { useEffect, useState } from 'react';

const UsErrorHandler = ({fnx}) => {
let [isLoading,setLoading]=useState(false);
let [data,setData]=useState(null);
let [error,setError]=useState(null);
useEffect(()=>{

setLoading(true);
async function fetcher(){

try {
    let get=await fnx();
    if(get.error){throw new Error(get.error||"Error in fetcher fnx")};
    setLoading(false)
return    setData(x=>(x=get))
} catch (error) {
   console.log(error.message);
   setLoading(false);
return   setError(x=>(x=error));

} 
 
};
fetcher();

return ()=>{setData(x=>null);setError(x=>null);}
},[])
    return {data,error,isLoading}
}

export default UsErrorHandler;
