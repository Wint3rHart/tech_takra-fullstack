"use client"
import { useSearchParams } from 'next/navigation';
import React, { createContext, Suspense, use, useCallback, useEffect, useMemo, useReducer, useRef, useState, useTransition } from 'react';
import RoomsFetch from './rooms_fetch';
import { useFieldArray, useForm } from 'react-hook-form';
import { DevTool } from '@hookform/devtools';
import { ErrorBoundary } from 'react-error-boundary';
import { MyErrorFallback } from '../general_comps/ErrorBoundary';
import { serverAction } from '@/server_actions/signUp_fnx';
import usePost from '@/client_hooks/usePost';
export const Context=createContext();


const red_fnx=(state,action)=>{
if(action.type=="hotel_name"){return {...state,hotel_name:action.payload.name,hotel_ind:action.payload.ind}}
else if(action.type==="duration"){return {...state,duration:action.payload}}

}


const OrderPanel = ({promise,promise2,id}) => {

  const [isPending,startTransition]=useTransition();
let {post,abort_ref,msg}=usePost("booking","POST");
const {mutate,error,isError,data}=post;

console.log("order_panel rendered");

useEffect(()=>{console.log("error status",isError,error?.message,data);
},[isError,data])

let query=useSearchParams();
let [isPackage]=useState(()=>{
    if(query.get("type").toUpperCase()==="package".toUpperCase()){return true}else{return false}
  });
   let get=use(promise);   
// console.log("first promise =",get);

let [gen_reducer,setReducer]=useReducer(red_fnx,{hotel_name:get?.data?.[0]?.hotel,hotel_ind:0,duration:1});

let [price,setPrice]=useState(1);
let price_ref=useRef(null);
let cb=useCallback((e)=>{setPrice(()=>{return e})},[]);

const submit_fnx=(data)=>{
// const book_info;
mutate({...data,packageId:isPackage?query.get("package_id"):null,price:price_ref.current.value,userId:id});

};

let {register,formState,handleSubmit,control,setValue}=useForm(
  {defaultValues:{city:query.get("city"),book_type:isPackage?get.data?.[0]?.title:"Custom",duration:isPackage?get.data[0].duration.split(" ")[0]:1,requirements:null,rooms:[{}]}}
);
// hotel_name:isPackage?get?.data?.[0]?.hotel:"To Be Determined",
let {errors}=formState;


let formMemo=useMemo(()=>{
  console.log("form memo rendered");
  
  ;return (<div> 
  
  
  
  <form  className="space-y-8" onSubmit={handleSubmit(submit_fnx)}>
  
  <div className="group">
      {/* Header Section */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold mb-2 text-white bg-gradient-to-r from-yellow-400 to-yellow-200 bg-clip-text text-transparent">Booking Details</h2>
            <div className="w-16 h-1 bg-gradient-to-r from-yellow-400 to-yellow-200 mx-auto rounded-full"></div>
          </div>

          {/* City Display */}
          <div className="text-center mb-8">
            <h3 className='text-4xl font-bold text-white drop-shadow-lg'>{query.get("city")}</h3>
            <div className="text-yellow-400 text-sm font-medium mt-2">Destination</div>
          </div>
              <label className='text-amber-400 font-black text-sm uppercase tracking-[0.15em] mb-3 block'>PACKAGE TYPE</label>
              <input {...register("book_type",{required:"must be present"})}
                className='bg-slate-900/80 border border-gray-600/50 rounded-xl px-5 py-4 text-white text-lg w-full focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all duration-500 font-medium tracking-wide shadow-inner backdrop-blur-sm placeholder-gray-500' 
                disabled 
               
              />
            </div>
          
            {/* Hotel Selection */}
            <div className="group">
              <label className="text-amber-400 font-black text-sm uppercase tracking-[0.15em] mb-3 block">HOTEL ACCOMMODATION</label>
              <select {...register("hotel_name",{required:"must be present",onChange:(e)=>{console.log(e.target.options,e.target.selectedIndex);
              
              ;setReducer({type:"hotel_name",payload:{name:e.target.value,ind:e.target.selectedIndex}})}})}
         
              // name='hotel'
                type='text' 
                disabled={false} 
                 className='bg-slate-900/80 border border-gray-600/50 rounded-xl px-5 py-4 text-white text-lg w-full focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all duration-500 font-medium tracking-wide shadow-inner backdrop-blur-sm'
              >
                {isPackage?<option>{get?.data?.[0]?.hotel}</option>:get?.data?.map((a,i)=>{
                ;return(
                   <option  key={i}>{a.hotel}</option>)})}
              </select>
            </div>
      <Context.Provider value={{promise:promise2,hotel:gen_reducer.hotel_name,price_fnx:cb,register:register,setValue:setValue}}>
<div className="group">
              <label className="text-amber-400 font-black text-sm uppercase tracking-[0.15em] mb-3 block">ACCOMMODATION</label>

<ErrorBoundary FallbackComponent={MyErrorFallback}>
              <Suspense fallback={<div className='w-full flex items-center justify-center h-full m-auto '><p className='text-2xl text-white font-bold'>Loading...</p></div>}>
            <RoomsFetch />
            </Suspense>
</ErrorBoundary>

            </div>
 </Context.Provider>           
            {/* Rooms Input */}
          
           
            {/* Duration Input */}
            <div className="group">
              <label className="text-amber-400 font-black text-sm uppercase tracking-[0.15em] mb-3 block">DURATION</label>
              <div className="flex items-center space-x-6">
                <input {...register("duration",{required:"must be present",onChange:(e)=>{setReducer({type:"duration",payload:e.target.value})}})}
                name='duration'
                  type="number" 
                  disabled={isPackage?true:false} 
                  className="w-28 bg-slate-900/80 border border-gray-600/50 rounded-xl px-4 py-4 text-white font-bold text-center text-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all duration-500 disabled:opacity-60 shadow-inner" 
                  min="1" 
                  max='10' 
                />
                <div className="flex flex-col">
                  <span className="text-white font-medium tracking-wide">DAYS</span>
                  <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">MAX: 10 DAYS</span>
                </div>
              </div>
            </div>
          {isPackage&&  <div className="group">
              <label className="text-amber-400 font-black text-sm uppercase tracking-[0.15em] mb-3 block">SPECIAL PACKAGE INCLUSIONS</label>
              <textarea 
                className='bg-slate-900/80 text-lg border border-gray-600/50 rounded-xl px-5 py-4 text-white w-full h-32 resize-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all duration-500 font-medium tracking-wide shadow-inner placeholder-gray-500' disabled  value={get.data[0].facilities}
                
              />
            </div>}
            
            {/* Special Requests */}
            <div className="group">
              <label className="text-amber-400 font-black text-sm uppercase tracking-[0.15em] mb-3 block">SPECIAL REQUIREMENTS</label>
              <textarea name='special_requests'{...register("requirements",{required:false})}
                className='bg-slate-900/80 text-lg border border-gray-600/50 rounded-xl px-5 py-4 text-white w-full h-32 resize-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all duration-500 font-medium tracking-wide shadow-inner placeholder-gray-500' 
                placeholder="SPECIFY ANY SPECIAL REQUESTS OR REQUIREMENTS..."
              ></textarea>
            </div> {/* Submit Button */}
            <div className="pt-6">
              <button 
                type='submit'   
                // disabled={get.data[0].availability?false:true} to fix,add avialability to custom ones
                className="group hover:scale-98 w-full bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600 hover:from-amber-500 hover:via-amber-400 hover:to-amber-500 text-black font-black py-5 px-8 rounded-xl shadow-2xl hover:shadow-amber-500/40 transition-all duration-300 transform hover:-translate-y-1 tracking-wider text-lg uppercase border border-amber-400/50"
              >
                <span className="flex items-center justify-center space-x-3">
                  <span>{get.data[0].availability?"CONFIRM BOOKING":"NOT AVAILABLE"}</span>
                  <span className="group-hover:translate-x-2 transition-transform duration-300 text-xl">→</span>
                </span>
              </button>
            </div> 
            </form>
            
            </div>)},[register,query,get,promise2,setValue,gen_reducer.hotel_name,gen_reducer.duration,price]);




    
    return (
         <div className="flex mt-30 bg-gradient-to-br from-slate-900 via-gray-900 to-black relative text-gray-300 items-center justify-center min-h-screen w-full px-4">
      <span className='text-gray-100 font-bold border-2 hover:border-yellow-500 absolute hover:pointer absolute top-8 right-8 hover:border-white hover:text-white hover:scale-105 cursor-pointer transition-all duration-300 border-white inline-block z-10 rounded-full px-6 py-3 backdrop-blur-sm bg-white/10 shadow-lg' >← Back</span>
      
      <div className={`w-full flex relative transition-all duration-1000 justify-center `}>
        <div className="bg-gradient-to-b from-yellow-900/30 to-yellow-800/20 backdrop-blur-lg border-2 mt-5 border-yellow-500/50 rounded-2xl p-8 shadow-2xl w-full max-w-lg mx-4">
          
        

       
            {formMemo}
           
            
            {/* Price Display */}
             <div className="bg-gradient-to-r from-slate-800/60 via-gray-800/40 to-slate-800/60 border border-amber-500/30 rounded-xl p-2 shadow-inner">
              <div className="flex items-center justify-evenly">
                <span className='text-amber-400 font-black text-xl uppercase tracking-wider'>TOTAL COST:</span>
                <input ref={price_ref} disabled className='bg-transparent w-[200px] text-amber-400 font-black text-xl border-none outline-none text-right tracking-wider ' placeholder="$0.00"  value={isPackage? (parseFloat(price)+parseFloat(get?.data?.[0]?.price)):parseFloat(price)*parseFloat(gen_reducer.duration)} /><span>$</span>
              </div>
              <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-amber-500/50 to-transparent mt-3 rounded-full"></div>
            </div> 

           <div><p className='text-white font-bold text-xl'>{msg}</p></div>

         
          
          <DevTool control={control}/>
         
        </div>
      </div>
    </div>
    );
}

export default OrderPanel;