import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";



const useSignStore=create(subscribeWithSelector((set,get)=>{return {  data:{status:false,userName:null,userId:null,email:null},fnx:{setSign:(data)=>{return set((value)=>{return {data:{...value.data,status:true,userName:data.name,userId:data.userId,email:data.email}}})}}  }  }));

export default useSignStore