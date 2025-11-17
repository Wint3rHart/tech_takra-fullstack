import Link from "next/link";






export const Vertical_cards =({data,ind,link_info})=>{

// console.log("her is : ",data);

console.log(ind);

return     <div style={{willChange:"transform"}}
      key={ind}
    
      className={` group 
        w-[25vw] 
        ml-6
        mt-12
      flex-shrink-0
      shadow-[-9px_3px_7px_2px_#000000]
       h-[72vh]
        mb-2
        rounded-xl 
        border
       border-amber-400
    cursor-pointer
    hover:scale-101
    transition-scale duration-300
        relative 
        text-white 
        bg-no-repeat
        bg-[100%] 
     bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.7)]
         group
       
      `}
    >
      <div
        style={{
          backgroundImage: `url('https://picsum.photos/600/400?random=${ind * 100 }')`,
          backgroundRepeat: "no-repeat",
          backgroundSize: "cover",
        }}
        className="rounded-xl  brightness-100  hover:brightness-110
       absolute inset-0 w-full h-full transition-brightness duration-300"
      >

     </div><div className="rounded-xl absolute bg-gradient-to-b from-[rgba(0,0,0,0)] to-[rgba(0,0,0,0.7)]
 inset-0 " />

      <div className="relative  p-4">
      


      {data?.map((x,i)=>{return <div key={i}>{x.element}</div>})} 
<div className="mt-6">
<Link href={link_info} className=" py-6 text-[#d4af37] font-bold z-90 text-sm hover:text-amber-300 cursor-pointer transition-colors transition-opacity  duration-200" >View More</Link>
        </div>
     </div>
    </div>




}


