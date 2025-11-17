import OrderPanel from '@/client_components/booking_component/order_panel';
import { MyErrorFallback } from '@/client_components/general_comps/ErrorBoundary';
import { get_fetch } from '@/server_fetch_fncs/fetch_fnx';
import { cookies, headers } from 'next/headers';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';

const Page =async ({params,searchParams}) => {
  let {type,city,package_id}=await searchParams;
    let headersStore=await headers();
    let user=headersStore.get("userId");
    console.log(user,"= userID");
    
console.log("sending req from booking");



    let promise= get_fetch("order_dets",city,type.toUpperCase()=="package".toUpperCase()?package_id:false);

    
let promise2=get_fetch("hotel_dets",city);



    return (
        <div className='text-white font-black text-4xl'>
          
            <Suspense fallback={<div className='min-w-[100vw] flex items-center justify-center min-h-[100vh] m-auto '><p className='text-2xl text-white font-bold'>LOADING...</p></div>}>
          <ErrorBoundary FallbackComponent={MyErrorFallback}>
            <OrderPanel promise={promise} promise2={promise2} id={user}/>
          </ErrorBoundary>
          </Suspense>
        </div>
    );
}

export default Page;
