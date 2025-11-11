import React, { useEffect, useState } from 'react';
import useSignStore from './useSignStore';
import useData from './useData';

const Protected = ({children}) => {
console.log("protected running");


let [ok,setOk]=useState(false);
    let zustand=useSignStore((state)=>{return state.data});
let {abort_ref,query}=useData("protected",zustand.userId);
let {data,isLoading,error,refetch}=query;

useEffect(()=>{
    console.log("Data:", data);
    console.log("IsLoading:", isLoading);
    console.log("Error:", error);


},[data,isLoading,error,zustand]);

useEffect(()=>{
    if(!zustand.status){console.log("here",zustand);setOk(x=>false)}
else{setOk(x=>true);refetch()}},[zustand]);


if(!ok){return <p className='text-white font-black'>Please Login First</p>};

if(isLoading){return <p className='text-white font-black'>Loading</p>}
if(error){return <p className='text-white font-black'>{error.message}</p>}
else if(data?.status.toUpperCase()==="OK"){

return children

}
else {return <p className='text-white font-black'>USER NOT LOGGED IN OR AUTHENTICATED</p>}
}

export default Protected;
