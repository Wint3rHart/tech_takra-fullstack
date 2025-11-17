

// import UseVariants from './useVariants';
import { get_fetch } from '@/server_fetch_fncs/fetch_fnx';
import React from 'react';
import { Places_cards_parent } from './places_cards';
import { MyErrorFallback } from '../general_comps/ErrorBoundary';
import { ErrorBoundary } from 'react-error-boundary';


const PlacesInCity = async({city}) => {

    let data={places:null,error:undefined};
try {
    let get=await get_fetch("city_places",city);
    if(get.error){throw new Error(get.error)};
    // console.log(get);
    data.places=get.data;
    data.error=undefined
} catch (error) {
    console.log(error.message)
    data.error=error.message;
}
console.log(data);

  
    return (


        <div   className=' h-[100vh]  w-[99vw]  text-white '>
        
    
    <ErrorBoundary FallbackComponent={MyErrorFallback} >
    <Places_cards_parent   x={data.places} />
 </ErrorBoundary>

 
        </div>
   

    );
}

export default React.memo(PlacesInCity);


