


import { MyErrorFallback } from '@/client_components/general_comps/ErrorBoundary';
import { get_fetch } from '@/server_fetch_fncs/fetch_fnx';
import { cookies, headers } from 'next/headers';
import React, { Suspense } from 'react';
import { ErrorBoundary } from 'react-error-boundary';
import { useForm } from 'react-hook-form';
import { Form } from './form';
import BgEffect from '@/util_comps/bg_effect';

const Page =async ({params,searchParams}) => {
  // let {type,city,package_id}=await searchParams;
  //   let headersStore=await headers();
  //   let user=headersStore.get("userId");
  //   console.log(user,"= userID");
    
console.log("sending req from booking");




    return (
        <div className='text-white font-black text-4xl relative'>

          
            <Suspense fallback={<div className='min-w-[100vw] flex items-center justify-center min-h-[100vh] m-auto '><p className='text-2xl text-white font-bold'>LOADING...</p></div>}>
          <ErrorBoundary FallbackComponent={MyErrorFallback}>
        <Form/>
          </ErrorBoundary>
          </Suspense>
        </div>
    );
}

export default Page;

