import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import usePost from './usePost';
import useSignStore from './useSignStore';
import { useNavigate, useParams } from 'react-router-dom';

const Sign = () => {
let param=useParams();
useEffect(()=>{console.log(param);
},)
let {register,handleSubmit,formState}=useForm({defaultValues:{name:"",email:"",password:"",confirmPassword:"",profilePic:null}});
let signVal=useSignStore(state=>state.data);
useEffect(()=>{console.log(signVal);
},[signVal])
let {errors}=formState;
let [reg,setReg]=useState(true);
let {post}=usePost(reg?"register":"login");
let {data,mutate,isError,isPaused,isPending,isSuccess,error}=post;
let nav=useNavigate();
useEffect(()=>{isError?console.log(error.msg):console.log(data);

},[isError])
useEffect(()=>{console.log(reg);
},[reg])
    return (
        <form onSubmit={handleSubmit((data)=>{console.log(data);reg? mutate(data):mutate({name:data.name,email:data.email,password:data.password})
        })}>
       <div className="border-10 border-red-700">
  <div class="min-h-screen w-full bg-gray-100 py-6 flex flex-col justify-center sm:py-12">
    <div class="relative py-20 sm:max-w-5xl sm:mx-auto overflow-visible">
      <button onClick={()=>{nav("/")}}>Back</button>
      <div
  className={`absolute h-full w-full inset-0 bg-gradient-to-r from-cyan-400 to-sky-500 shadow-lg transform transition duration-500 rounded-full ease-in-out ${
    !reg ? "-rotate-45  " : "rotate-45  "
  } `}
></div>
      <div class="relative px-4 py-10 bg-white shadow-lg sm:rounded-3xl sm:p-20">
        <div class="max-w-md mx-auto">
          <div className="flex justify-evenly">
            <h1 class="text-2xl font-semibold" onClick={()=>{setReg(x=>false)}}>Login</h1>
            <h1 class="text-2xl font-semibold" onClick={()=>{setReg(x=>true)}}>Sign Up</h1>
          </div>
          <div class="divide-y divide-gray-200">
            <div class="py-8 text-base leading-6 space-y-4 text-gray-700 sm:text-lg sm:leading-7">
              <div class="relative">
                <input
                  autoComplete="off"
                  id="name"
                  name="name"
                  type="text"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="User name"
                  {...register("name", {
                    required: "Cant be empty",
                    validate: (value) => {
                      if (value.length < 5) {
                        return "must be greater than 5 alphabets";
                      } else {
                        return true;
                      }
                    },
                  })}
                />
                <p className="text-gray-500">{errors?.name?.message}</p>
                <label
                  htmlFor="name"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  User name
                </label>
              </div>
     <div class="relative">
                <input
                 
                  id="email"
                  name="email"
                  type="email"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="email"
                  {...register("email", {
                    required: "must be present",
                    
                  })}
                />
                <p className="text-gray-500">{errors?.email?.message}</p>
                <label
                  htmlFor="email"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  email
                </label>
              </div>
              <div class="relative">
                <input
                  autoComplete="off"
                  id="password"
                  name="password"
                  type="password"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Password"
                  {...register("password", {
                    required: "must be present",
                    validate: (value) => {
                      if (value.length < 6) {
                        return "must be 7 characters";
                      } else {
                        return true;
                      }
                    },
                  })}
                />
                <p className="text-gray-500">{errors?.password?.message}</p>
                <label
                  htmlFor="password"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  Password
                </label>
              </div>

{reg&& <div class="relative">
                <input
                  autoComplete="off"
                  id="confirmPassword"
                  name="confirmPassword"
                  type="password"
                  class="peer placeholder-transparent h-10 w-full border-b-2 border-gray-300 text-gray-900 focus:outline-none focus:borer-rose-600"
                  placeholder="Password"
                  {...register("confirmPassword", {
                    required: "must be present",
                   
                  })}
                />
                <p className="text-gray-500">{errors?.confirmPassword?.message}</p>
                <label
                  htmlFor="password"
                  class="absolute left-0 -top-3.5 text-gray-600 text-sm peer-placeholder-shown:text-base peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-2 transition-all peer-focus:-top-3.5 peer-focus:text-gray-600 peer-focus:text-sm"
                >
                  confrimPassword
                </label>
              </div>
}







{reg&&<div className={` relative `}>
  <label
    htmlFor="pic"
    className="block text-sm font-medium text-gray-700 mb-1"
  >
    Profile Picture
  </label>

  <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 flex flex-col items-center justify-center text-gray-500 hover:border-cyan-400 transition">
    <input
      id="pic"
      name="pic"
      type="file"
      className="opacity-0 absolute inset-0 w-full h-full cursor-pointer"
      {...register("profilePic", {
        required: "Profile picture is required",
        validate: (value) => {
          if (!value?.[0]) return "File is missing";
          if (value[0].size > 200000) {
            return "Must be less than 200kb";
          } else {
            return true;
          }
        },
      })}
    />
    <p className="pointer-events-none">Click to upload</p>
    <p className="pointer-events-none text-xs text-gray-400">(Max 200kb)</p>
  </div>

  <p className="mt-1 text-sm text-red-500">{errors?.profilePic?.message}</p>
</div>}

              <div class="relative">
                <button class="bg-cyan-500 text-white rounded-md px-2 py-1" type='submit' disabled={isPending?true:false}>
                  Submit
                </button>
                <p>{isSuccess?data.msg:error?.msg||error?.message}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="w-full flex justify-center">
          <button class="flex items-center bg-white border border-gray-300 rounded-lg shadow-md px-6 py-2 text-sm font-medium text-gray-800 hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500">
            <svg
              class="h-6 w-6 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              width="800px"
              height="800px"
              viewBox="-0.5 0 48 48"
            >
              <g id="Icons" fill="none">
                <g id="Color-" transform="translate(-401, -860)">
                  <g id="Google" transform="translate(401, 860)">
                    <path
                      d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24"
                      fill="#FBBC05"
                    ></path>
                    <path
                      d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333"
                      fill="#EB4335"
                    ></path>
                    <path
                      d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667"
                      fill="#34A853"
                    ></path>
                    <path
                      d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24"
                      fill="#4285F4"
                    ></path>
                  </g>
                </g>
              </g>
            </svg>
            <span>Continue with Google</span>
          </button>
        </div>
      </div>
    </div>
  </div>
</div>
</form>
    );
}

export default Sign;
