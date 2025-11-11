import { useQuery } from '@tanstack/react-query';
import React, { useEffect, useRef } from 'react';

const useData = (type, key,status) => {
console.log("req rex in usedata");

    let abort_ref = useRef(null);
let enable=true;
if(type.toUpperCase()=="Protected".toUpperCase()){
    enable=false
}
    let query = useQuery({
        queryKey: [type, key], queryFn: async ({ queryKey }) => {
console.log(type);

            let abort = new AbortController();
            let signal = abort.signal;
            abort_ref.current = abort;
            let timer = setTimeout(() => {

                abort.abort()

            }, 120000);

            let url = "";
            try {
                switch (type) {
                    case "login":{

                        url = "http://localhost:4600/api/autoLogin";break;}

case "cities_details":{url="http://localhost:4600/api/cities_details";break;};


case "places_parallax":{console.log("reached");
;url="http://localhost:4600/api/places_parallax";break};
case "top_hotels":{ url="http://localhost:4600/api/top_hotels";break; }
case "city_data":{url=`http://localhost:4600/api/city_data/${key}`;break;}
case "packages":{url=`http://localhost:4600/api/packages/${key}`;break}
case "protected":{url=`http://localhost:4600/api/user_check?id=${key}`;break}
    case "order_data_dets":{url=`http://localhost:4600/api/order_dets?city=${key}&type=${status?"package":"custom"}&package=${status?status:"none"}`;break;} 
case "trial":{url="http://localhost:4600/api/trial"}               };


                let get = await fetch(url, { credentials: "include", signal });
                let conv = await get.json();
                if (!get.ok) {
                    throw new Error(conv.msg || `error in ${type}`);
                };
                if(get.status==300){console.log("got from cache");
                    return;
                }
                return conv;
            } finally {
                clearTimeout(timer)
            }

        },retry:false,refetchOnWindowFocus:false,staleTime:0,cacheTime:0,enabled:enable
    });


    return { query, abort_ref }

}

export default useData;
