"use client";

import React from "react";
import { useForm } from "react-hook-form";
import usePost from "@/client_hooks/usePost";

const Cards = ({ data, i,access }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { defaultValues },
  } = useForm({
    defaultValues: {
      title: data.title,
      description: data.description,
    },
  });

  const watched = watch();

  const textChanged =
    JSON.stringify({
      title: watched.title,
      description: watched.description,
    }) !==
    JSON.stringify({
      title: defaultValues.title,
      description: defaultValues.description,
    });

  const canUpdate = textChanged;

  const { abort_ref, post, msg } = usePost("update_notification", "PATCH",access);
  const del_post = usePost("delete_notification", "DELETE",access);

  const onSubmit = (formData) => {
    
    post.mutate({ formData, id: data._id });
   let timer= setTimeout(() => {
      abort_ref.current.abort("Took too long");
      clearTimeout(timer);
    }, 10000);
  };

  const del_fnx = (id) => {
    if (!id) return;
    del_post.post.mutate({ data_id: id });
       let timer= setTimeout(() => {
      abort_ref.current.abort("Took too long");
      clearTimeout(timer);
    }, 10000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative h-full flex flex-col justify-end border border-amber-500/50 rounded-2xl p-4 sm:p-6 pb-6 sm:pb-8 bg-gray-900/80"
    >
      {/* ID / Header */}
      <div className="mb-4 h-20 w-full bg-gradient-to-br from-[#d4af37] via-amber-500 to-amber-600 
          rounded-2xl flex items-center justify-center text-3xl shadow-lg">
        <h2
          className="text-base sm:text-lg font-black text-transparent bg-clip-text 
            bg-gradient-to-r from-white to-amber-300/90 break-all px-2 text-center"
        >
          {data._id || "Notification"}
        </h2>
      </div>

      {/* TITLE */}
      <label className="text-xs mt-2 text-amber-200/60 mb-1">Title</label>
      <input
        type="text"
        {...register("title")}
        className="text-xl sm:text-2xl font-bold text-amber-50 bg-transparent outline-none"
      />

      {/* DESCRIPTION */}
      <label className="text-xs mt-4 text-amber-200/60 mb-1">Description</label>
      <textarea
        {...register("description")}
        className="text-sm text-gray-200 bg-transparent outline-none min-h-[80px]"
      />

      {/* UPDATE BUTTON */}
      <button
        type="submit"
        disabled={!canUpdate}
        className={`w-full mt-6 px-6 py-3 rounded-xl font-bold transition-all duration-500
          bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 
          ${
            !canUpdate
              ? "opacity-40 cursor-not-allowed"
              : "hover:scale-102 cursor-pointer"
          }`}
      >
        Update Notification →
      </button>

      {/* DELETE BUTTON */}
      <button
        type="button"
        onClick={() => del_fnx(data._id)}
        className="w-full cursor-pointer mt-4 px-6 py-3 rounded-xl font-bold text-gray-900
          bg-gradient-to-r from-red-500 to-red-700 hover:scale-102 transition-all duration-500"
      >
        Remove Notification →
      </button>

      {/* Server message */}
      <div className="mt-4 p-3 rounded-xl border border-amber-600/10">
        <p className="text-lg text-gray-300">{msg}</p>
      </div>
    </form>
  );
};

export default Cards;
