import React, { Children, Suspense, useEffect, useRef, useState } from 'react';
import useData from './useData';




const Intersection_wrapper = ({children}) => {

let ref=useRef(null)
let [isInter,setInter]=useState(false);

useEffect(()=>{

const observer=new IntersectionObserver((entry)=>{

    if(entry[0].isIntersecting){console.log("intersecting");
        setInter(true)
    }

})
observer.observe(ref.current);
return()=>{observer.disconnect();setInter(false)}
},[])


    return (
       <div ref={ref}>
        {isInter? <Suspense fallback="LOADING">{children}</Suspense>:null}
        </div>
    );
}

export default Intersection_wrapper;
