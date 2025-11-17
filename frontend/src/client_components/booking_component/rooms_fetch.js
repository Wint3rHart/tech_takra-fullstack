"use client"

import React, { act, use, useCallback, useContext, useEffect, useId, useMemo, useReducer, useRef, useState } from 'react';
import { Context } from './order_panel';



const RoomsFetch =React.memo(() => {
    let {promise}=useContext(Context);
// let [booked_rooms,setBookedRooms]=useState(1);
    console.log("rooms_fetch rendered");
    let get=use(promise);
    // console.log(get);
    
return <Rendered_data data={get?.data}  />
//  return<div>{Array.from({length:booked_rooms},()=>{return })   }</div>
        
})

export default RoomsFetch;




const Rendered_data=React.memo(({data})=>{

  let ref=useRef(1);

    let {hotel,register,price_fnx,setValue}=useContext(Context);
    // console.log(data[hotel]);
    
const red_fnx=useCallback((state,action)=>{

if(action.type==="change"){
let val=data?.[hotel].findIndex((y)=> y.room_name==action.payload.target);
   return state.map((y,ind)=>{
//  console.log(action.payload);
 
            if(ind===action.payload.ind){console.log(data[hotel][val].price);
            
            ;return {...y,ind:val,cost:data[hotel][val].price*parseInt(y.quantity)}};
        return y
        })};
if(action.type==="append"){return [...state,{ind:0,quantity:1,cost:data[hotel][0].price}];};
if(action.type==="price_q"){ 
return state.map((x,i)=>{ if(i===action.payload.ind){ return {...x,cost:action.payload.price,quantity:action.payload.quantity} } else{return x} })};

if(action.type==="reset"){return [{ind:0,quantity:1,cost:data[hotel][0].price}]}

},[hotel,data]);

// console.log("i got rendered");


let [reducer,dispatch]=useReducer(red_fnx,[{ind:0,quantity:1,cost:data?.[hotel]?.[0]?.price}]);

useEffect(()=>{

let x=reducer.reduce((acc,val,i)=>{return acc+=val.cost },0);
price_fnx(x);

},[reducer]);


useEffect(()=>{
  if(ref.current==1){console.log("ill skip",ref.current);
  ;ref.current+=1;return;}
  else {console.log("ill run too");
  ;dispatch({type:"reset"});setValue("rooms",[{room_type:data?.[hotel]?.[0]?.room_name,quantity:1}])};

},[hotel])

useEffect(()=>{console.log("reducer = ",reducer);
  // price_fnx(reducer.reduce((acc,val,i)=>{ acc+=val.cost;return acc},0));
},[reducer,hotel])

    // let features_memo=useMemo(()=>{console.log("features rendered");
    // ;return  <textarea 
    //             className='bg-slate-900/80 text-lg border border-gray-600/50 rounded-xl px-5 py-4 text-white w-full h-32 resize-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all duration-500 font-medium tracking-wide shadow-inner placeholder-gray-500' 
    //             placeholder="FEATURES" disabled value={data[hotel][room_type].features}>{}</textarea>},[room_type]);

    // let rooms_names_memo=useMemo(()=>{console.log("names rendered");
    // ;return (  <select name='room_name' {...register("rooms.room_type",{onChange:(e)=>{cb(e)}})} className='bg-slate-900/80 mt-4 border border-gray-600/50 rounded-xl px-5 py-4 text-white text-lg w-full focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all duration-500 font-medium tracking-wide shadow-inner backdrop-blur-sm'> {data?.[hotel]?.map((x)=>{return <option>{x.room_name}</option>})} </select> )},[data]) ;
    
    



return (

<div className='border  border-amber-400 p-6 rounded-xl bg-gray-900/70 shadow-[inset_3px_3px_10px_2px_rgba(0,0,0,1),inset_-3px_-3px_10px_2px_rgba(0,0,0,1)]'>
{reducer?.map((x,i)=>{ 
  // console.log(data[hotel][reducer?.[i]?.ind]?.features);

;return (

 <div key={i} >   <label className="text-amber-400 font-black text-sm uppercase  block">
                ROOM TYPE</label>

          {/* {rooms_names_memo} */}
          
<select name='room_name' {...register(`rooms.${i}.room_type`,{onChange:(e)=>{dispatch({type:"change",payload:{ind:i,target:e.target.value}});}})} className='bg-slate-900/80 mt-4 border border-gray-600/50 rounded-xl px-5 py-4 text-white text-lg w-full focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all duration-500 font-medium tracking-wide shadow-inner backdrop-blur-sm'> {data?.[hotel]?.map((x,i)=>{return <option key={i}>{x.room_name}</option>})} </select>

<label className="text-amber-400 font-black text-sm uppercase tracking-[0.15em] mt-4 block">

                ROOM FEATURES</label>

{/* {features_memo} */}
 <textarea 
                className='bg-slate-900/80 text-lg border border-gray-600/50 rounded-xl px-5 py-4 text-white w-full h-32 resize-none focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all duration-500 font-medium tracking-wide shadow-inner placeholder-gray-500' 
                placeholder="FEATURES" disabled 
                value={data[hotel][reducer?.[i]?.ind]?data[hotel][reducer?.[i]?.ind]?.features:
                  data[hotel][data[hotel].length-1].features}
                ></textarea> 

 <div className="group">
              <label className="text-amber-400 font-black text-sm uppercase tracking-[0.15em] mb-3 block">ROOM ALLOCATION</label>
              {/* {rooms_no_memo} */}

  <input 
                name='rooms_quantity'
                  type="number"
                  disabled={data?.[hotel]?.[reducer[i].ind]?.availablity?false:true}
                  defaultValue={1}  
{...register(`rooms.${i}.quantity`,{onChange:(e)=>{

  dispatch({type:"price_q",payload:{price:data[hotel][reducer[i].ind].price*parseInt(e.target.value),ind:i,quantity:parseInt(e.target.value)}});
 }})}
               
                  className="w-28 bg-slate-900/80 border border-gray-600/50 rounded-xl px-4 py-4 text-white font-bold text-center text-xl focus:border-amber-500 focus:ring-2 focus:ring-amber-500/30 transition-all duration-500 shadow-inner" 
                  placeholder="1" 
                  min="1" 
                  max="6"
                />
                <div className="flex flex-col">
                  <span className="text-white font-medium text-lg tracking-wide">ROOMS</span>
                  <span className="text-gray-500 text-xs font-medium uppercase tracking-wider">MAX: 6 UNITS</span>
                </div>


              <p className='text-white font-semibold'></p>
            </div>


 </div>)
          })}
          <button type='button' className='text-white font-semibold text-xl border rounded-2xl cursor-pointer p-3 mt-2' onClick={()=>{ dispatch({type:"append"});}}>Add More Room</button>

 </div>
    );



})