



export const get_fetch=async(route,options,x,y,z,cache_option)=>{
// console.log(route,options);

let aborter=new AbortController();
let signal=aborter.signal;
let timer=setTimeout(() => {
    aborter.abort("timed out");
}, 10000);

try {
    let url;
  switch (route) {
    
    case "events":{url=`http://localhost:4600/api/events/${options}`;break;};
    
    case "team":{url=`http://localhost:4600/api/team`;break;};
    case "announcement":{url=`http://localhost:4600/api/announcement`;break;};
    case "notice":{url=`http://localhost:4600/api/announcement`;break;};
    
    
    case "places_parallax":{
    url=`http://localhost:4600/api/places_parallax`;break;}; 
 case "cities_cards":{url=`http://localhost:4600/api/cities_details`;break;};
 case "top_hotels":{url=`http://localhost:4600/api/top_hotels`;break;}
case "city_data":{console.log(options);



url=`http://localhost:4600/api/city_data/${options}`;break;}
case "order_dets":{console.log("in order dets");
;url=`http://localhost:4600/api/order_dets?city=${options}&type=${x?"package":"custom"}&package_id=${x?x:"none"}`;break;}
case "hotel_dets":{console.log("in hotel dets");
;url=`http://localhost:4600/api/hotel_rooms?city=${options}`;break;}
case "all_hotels":{url=`http://localhost:4600/api/hotels`;break;}
 default :{
 ;url=`http://localhost:4600/api/${route}/${options}`;break}} 
    
// console.log(url);

let get=await fetch(url,{method:"GET",signal,headers:{"X-Cache-Status":cache_option||false},});
// console.log(get.headers);

let conv=await get.json();

if(!get.ok){throw new Error(conv.msg||"Error in server get fetch fnx")};
console.log(conv);

return conv;
} catch (error) {
    
    console.log("from fetch_fnx",error.message);
  throw  error;
   
    
}finally{clearTimeout(timer)};





}