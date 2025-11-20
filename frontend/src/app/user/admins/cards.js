"use client";

import React from "react";
import { useForm } from "react-hook-form";
import usePost from "@/client_hooks/usePost";

const Cards = ({ data, i }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { defaultValues },
  } = useForm({
    defaultValues: {
      name: data.name || "",
      email: data.email || "",
      role: data.role || "",
    },
  });

  const watched = watch();

  const textChanged =
    JSON.stringify({
      name: watched.name,
      email: watched.email,
      role: watched.role,
    }) !==
    JSON.stringify({
      name: defaultValues.name,
      email: defaultValues.email,
      role: defaultValues.role,
    });

  const canUpdate = textChanged;

  const { abort_ref, post, msg } = usePost("update_admin", "PATCH");
  const del_post = usePost("delete_admin", "DELETE");

  const del_fnx = (id) => {
    del_post.post.mutate({ data_id: id });
        let timer= setTimeout(() => {
      abort_ref.current.abort("Took too long");
      clearTimeout(timer);
    }, 10000);
  };

  return (
    <form
     
      className="relative h-full flex flex-col justify-end border-1 border-amber-500 rounded-xl p-4 sm:p-6 pb-6 sm:pb-8 bg-gray-900/80"
    >
      {/* ID CARD */}
      <div
        className="h-full w-full bg-gradient-to-br from-[#d4af37] via-amber-500 to-amber-600 
          rounded-2xl flex items-center justify-center text-3xl shadow-lg"
      >
        <h2
          className="text-xl font-black text-transparent bg-clip-text 
            bg-gradient-to-r from-white to-amber-300/90"
        >
          {data._id}
        </h2>
      </div>

      {/* NAME */}
      <label className="text-xs mt-6 text-amber-200/60 mb-1">Name</label>
      <input disabled={true}
        type="text"
        {...register("name")}
        className="text-2xl sm:text-3xl font-bold text-amber-50 bg-transparent outline-none"
      />

      {/* EMAIL */}
      <label className="text-xs text-amber-200/60 mb-1">Email</label>
      <input  disabled={true}
        type="email"
        {...register("email")}
        className="text-base sm:text-lg text-yellow-300 bg-transparent outline-none"
      />

      {/* ROLE */}
      <label className="text-xs text-amber-200/60 mb-1">Role</label>
      <input disabled={true}
        type="text"
        {...register("role")}
        className="text-base sm:text-lg text-yellow-300 bg-transparent outline-none"
      />

    
      {/* DELETE BUTTON */}
      <button
        type="button"
        onClick={() => del_fnx(data._id)}
        className="w-full cursor-pointer mt-4 px-6 py-3 rounded-xl font-bold text-gray-900
          bg-gradient-to-r from-red-500 to-red-700 hover:scale-102 transition-all duration-500"
      >
        Remove Admin →
      </button>

      <div className="mb-4 mt-4 p-3 rounded-xl border border-amber-600/10">
        <p className="text-lg text-gray-300">{msg}</p>
      </div>
    </form>
  );
};

export default Cards;
