import React, { useEffect, useState } from 'react';
import { useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom';
import useData from '../useData';

const OrderPanel = () => {
    let {city}=useParams();
    let [search]=useSearchParams();
let [loc_state]=useState(()=>{
if(search.get("type").toUpperCase()==="package".toUpperCase()){return true}
else{return false}
});
let {query,abort_ref}=useData("order_data_dets",city,loc_state?search.get("id"):false)
let {data,isLoading,error}=query;

    console.log(city);
   
    
    useEffect(()=>{console.log(loc.state,loc_state);},[])
    let nav=useNavigate();
    // let {data,isLoading,error}=useData("order_details",search.get("type").toUpperCase()==="Package".toUpperCase());

    return (
        <div className="flex mt-30   bg-transparent relative text-gray-400 items-center  justify-center min-h-screen w-full">
      <span className='text-gray-100 font-black border-2 hover:border-yellow-700 absolute  hover:pointer absolute top-5 hover:border-white hover:text-white hover:scale-99 cursor-pointer transition-all duration-300 border-white inline-block z-1 ml-90 mt-10 rounded-full p-3' onClick={()=>{nav("/select")}}>Back</span>
      <div className={`w-full flex relative transition-all duration-1000 border-white justify-center `}>
        <div className="bg-yellow-900/25 border-3 mt-5  border-white rounded-full p-6 rounded-lg shadow-md w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-white text-center">Booking</h2>
        

<h3 className='text-xl font-bold mb-4 text-white text-center'>{city}</h3>
  <span>Package</span>
          <input className='' disabled value={search.get("type").toUpperCase()==="package".toUpperCase()?loc.state?.title:"Custom"}/>
          {/* <button onClick={()=>{abort_ref.current.abort();abort_ref.current=new AbortController()}}> ABORT</button> */}
          
          <form >


   
 <div className="mb-4 ">
              <label className="block font-semibold mb-1 text-white font-semibold  " >Hotel</label>
               <input type='text'  disabled={true} className='font-semibold text-white'/>
             {loc_state?loc?.state?.hotel_name:""}
            </div>
      
            {/* // */}
            <div className="mb-4 ">
              <label className="block font-semibold w-1/2border-white text-white mb-1">Facilities</label>
             {loc_state?loc?.state?.data.split(",").map((x,i)=>{console.log(parseInt(loc?.state?.duration.split(" ")[0]));
             ;return <p key={i}>{x}</p>}):""}
              
            </div>
            
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-white color-white">Rooms</label>
              <input type="number" defaultValue={1}   className="w-1/2 text-black border color-white border-white rounded-md p-2" placeholder="1" min="1" max="6"
              
              />
              <p className='text-white font-semibold'></p>
            </div>
            
          
            <div className="mb-4">
              <label className="block font-semibold mb-1 text-white">Duration</label>
              <input type="number" defaultValue={loc_state?parseInt(loc?.state?.duration.split(" ")[0]):1} disabled={loc_state?true:false} className="w-1/4 text-black border color-white border-white rounded-md p-2" min="1" max='10' />
            </div>
            
          
            {/* /// */}
            <div className="mb-4 ">
              <label className="block font-semibold w-1/2 border-white text-white mb-1">Delivery</label>
              <select  className='border-1 border-white text-white rounded-full p-1 '>
              
             <option>Pickup </option>
             {/* <option>Standard Delivery </option> */}
            
              </select>
              
            </div>
            
           {/* {ref.current?.[0]?.value=="Standard Delivery"&& <div className="mb-4">
              <label className="block font-semibold mb-1 text-white font-semibold  " >Address</label>
               <input type='text' {...register("address",{required:"Must be mentioned"})} className='text-black font-semibold'/>
             
            </div>} */}
            
          
            <div className="mb-4 ">
              <label className="block font-semibold w-1/2 border-white text-white mb-1">Requests</label>
             <textarea className='border-2 border-white text-white font-bold' ></textarea>
              
            </div>
            


            <button type='submit'   className="group hover:scale-98 sm:w-64 w-40 border-1 border-white transition-color duration-600 relative bg-transparent text-white font-semibold sm:font-bold py-2 px-4 border hover:border-gray-100 cursor-pointer hover:text-yellow-700 rounded-full sm:translate-x-1/4">
            Place Order
            </button>
            <div><span className='text-yellow-700 font-black'>Price : </span><input  disabled className='text-yellow-700 font-black'  /></div>

          <p  className='text-white font-black text-lg'> //Error </p>
          </form>
         
        </div>
      </div>
    </div>
    );
}

export default OrderPanel;
