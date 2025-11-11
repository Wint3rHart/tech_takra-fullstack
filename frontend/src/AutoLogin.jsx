import React, { useEffect } from 'react';
import useData from './useData';
import useSignStore from './useSignStore';
import usePost from './usePost';

const AutoLogin = () => {

    let sign_fnx=useSignStore(x=>{return x.fnx.setSign});

let {abort_ref,query}=useData("login");
let {post_abort_ref,post}=usePost("refresh");
console.log(post);

useEffect(()=>{
    let select=useSignStore.subscribe((state)=>{return state.data},(x)=>{console.log(x);
    })
},[])

useEffect(()=>{
    
if(query.data){
   
    sign_fnx(query.data.data)
}
else if(query.isLoading){
    console.log("Fetching for autoLogin");
    
}

else if (query.isError){console.log(query.error.message);

    if(query.error.message==="Access Cookie not present"){
post.mutate({});
        //to add usePost for refresh token stuff and make its backend
    }

}


},[query.isLoading,query.data,query.isError,query.isSuccess])

useEffect(()=>{

if(post.isSuccess){console.log(post.data);
;query.refetch()}
else if(post.isPending){console.log("refetch in progress Pending")
}else if(post.isError){console.log(post.error.message);
}

},[post.isSuccess,post.isPending,post.isError]);

    
}

export default AutoLogin;
