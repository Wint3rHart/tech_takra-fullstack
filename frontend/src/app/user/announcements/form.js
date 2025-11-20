"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import BgEffect from "@/util_comps/bg_effect";
import usePost from "@/client_hooks/usePost";

export const Form = () => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  const { abort_ref, post, msg } = usePost("create_notification", "POST");

  const onSubmit = (formData) => {
    console.log("Create notification form:", formData);

    post.mutate( formData );
   let timer= setTimeout(() => {
      abort_ref.current.abort("Took too long");
      clearTimeout(timer);
    }, 10000);
    // optional: clear form after submit
    reset();
  };

  return (
    <div className="flex items-center justify-center mt-12 h-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gray-900 relative">
      <BgEffect />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-400/20 relative group z-10"
      >
        {/* TITLE */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label className="text-xs mt-6 text-amber-200/60 mb-1">Title</label>
          <input
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
            className="text-2xl sm:text-3xl font-bold text-amber-50 bg-transparent outline-none w-full"
            placeholder="Notification title"
          />
          {errors.title && (
            <p className="mt-1 text-amber-300 text-xs sm:text-sm">
              {errors.title.message}
            </p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label className="text-xs text-amber-200/60 mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: { value: 5, message: "At least 5 characters" },
            })}
            className="text-sm text-gray-200 bg-transparent outline-none w-full h-24"
            placeholder="Notification description"
          />
          {errors.description && (
            <p className="mt-1 text-amber-300 text-xs sm:text-sm">
              {errors.description.message}
            </p>
          )}
        </div>

        {/* Server message */}
        <div className="mb-4 p-3 rounded-xl border border-amber-600/10 relative z-10">
          <p className="text-lg text-gray-300">{msg}</p>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!isDirty}
          className={`w-full font-bold text-sm sm:text-base py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 shadow-lg relative z-10
            ${
              isDirty
                ? "bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 hover:from-amber-500 hover:to-amber-600 shadow-amber-400/30 hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                : "bg-gray-600 text-gray-400 cursor-not-allowed opacity-50"
            }`}
        >
          {isDirty ? "Submit Notification" : "No Changes Made"}
        </button>

        {typeof window !== "undefined" && <DevTool control={control} />}
      </form>
    </div>
  );
};
