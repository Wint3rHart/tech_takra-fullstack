
import { get_fetch } from '@/server_fetch_fncs/fetch_fnx';
import React, { Suspense } from 'react';
import City from './city';
import CityHeader from '@/client_components/city_components/city_header';
import FAQs from '@/client_components/general_comps/faq';
import Places_in_city from '@/client_components/city_components/places_in_city';
import { ErrorBoundary } from 'react-error-boundary';
import HotelsInCity from '@/client_components/city_components/hotels_in_city';
import UnsplashPics from '@/client_components/general_comps/unsplash_pics';
import { MyErrorFallback } from '@/client_components/general_comps/ErrorBoundary';
import Gallery from '@/client_components/city_components/gallery';
import Packages from '@/client_components/city_components/packages';

const Page = async({params}) => {
        let {name}=await params;
        console.log(name);
        


  


    return (
      <div style={{perspective:"800px"}}  className='overflow-hidden'>
       {/* <ErrorBoundary */}
<City>

  <section className='w-[100vw] h-[100vh] flex justify-center items-center '>
 <Suspense fallback={<div className='min-w-[100vw] flex items-center justify-center min-h-[100vh] m-auto '><p className='text-2xl text-white font-bold'>LOADING...</p></div>}>
 
<CityHeader city={name}/>

</Suspense >
</section>

<section className='w-[100vw] h-[100vh] flex justify-center items-center '>
<Suspense fallback={<div className='min-w-[100vw] flex items-center justify-center min-h-[100vh] m-auto '><p className='text-2xl text-white font-bold'>LOADING...</p></div>}>

<Places_in_city city={name} />

</Suspense>
</section>

<section style={{transformStyle:"preserve-3d"}} className='w-[100vw] h-[100vh] flex justify-center items-center relative '>

<Suspense fallback={<div className='min-w-[100vw] flex items-center justify-center min-h-[100vh] m-auto '><p className='text-2xl text-white font-bold'>LOADING...</p></div>}>

<HotelsInCity city={name}/>

</Suspense>

</section>

<section  className='w-[100vw] h-[100vh]  '>

<Suspense fallback={<div className='min-w-[100vw] flex items-center justify-center min-h-[100vh] m-auto '><p className='text-2xl text-white font-bold'>LOADING...</p></div>}>
<ErrorBoundary FallbackComponent={MyErrorFallback}>
<Gallery city={name}/>
</ErrorBoundary>
</Suspense>

</section>

<section  className='w-[100vw] h-[100vh]  '>

<Suspense fallback={<div className='min-w-[100vw] flex items-center justify-center min-h-[100vh] m-auto '><p className='text-2xl text-white font-bold'>LOADING...</p></div>}>
<ErrorBoundary FallbackComponent={MyErrorFallback}>
<Packages city={name}/>
</ErrorBoundary>
</Suspense>

</section>


</City>


      </div>
    );
}

export default Page;
