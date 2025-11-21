"use client";
import React, { useEffect, useState } from "react";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import BgEffect from "@/util_comps/bg_effect";
import usePost from "@/client_hooks/usePost";

export const TeamForm = ({access}) => {
  const { register, control, formState: { errors, isDirty }, handleSubmit,reset } = useForm();

  const { abort_ref, post, msg } = usePost("create_team", "POST",access);
  const { isError, isSuccess } = post;

  const onSubmit = (formData) => {
    console.log("New team member:", { formData });
    
    let form = new FormData();

    for (let key in formData) {
      const value = formData[key];

      if (value instanceof FileList) {
        // Handle file input
        Array.from(value).forEach((file) => {
          form.append("image", file);
        });
      } else {
        form.append(key, value);
      }
    }

    post.mutate({ form: form });
     
    reset();
  };

  return (
    <div className="flex items-center justify-center mt-12 h-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gray-900 relative">
      <BgEffect />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-400/20 relative group z-10"
      >
        {/* Back button */}
        <div className="mb-4 sm:mb-6">
          <button
            type="button"
            className="w-full sm:w-auto bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 font-bold text-sm sm:text-base py-2.5 sm:py-3 px-4 sm:px-6 rounded-lg hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-lg shadow-amber-400/30 hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] relative z-10"
          >
            Back
          </button>
        </div>

        {/* NAME */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label className="text-xs mt-6 text-amber-200/60 mb-1">Name</label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "At least 3 characters" },
              pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters allowed" }
            })}
            className="text-2xl sm:text-3xl font-bold text-amber-50 bg-transparent outline-none w-full"
            placeholder="Enter name"
          />
          {errors.name && (
            <p className="mt-1 text-amber-300 text-xs sm:text-sm">{errors.name.message}</p>
          )}
        </div>

        {/* POSITION */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label className="text-xs text-amber-200/60 mb-1">Position</label>
          <input
            type="text"
            {...register("position", {
              required: "Position is required",
              minLength: { value: 3, message: "At least 3 characters" },
              pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters allowed" }
            })}
            className="text-base sm:text-lg text-yellow-300 bg-transparent outline-none w-full"
            placeholder="Enter position (e.g., Media Head)"
          />
          {errors.position && (
            <p className="mt-1 text-amber-300 text-xs sm:text-sm">{errors.position.message}</p>
          )}
        </div>

        {/* IMAGE */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label className="text-xs mt-6 text-amber-200/60 mb-1">Profile Image</label>
          <input
            type="file"
            accept="image/*"
            {...register("image", {
              required: "Image is required"
            })}
            className="text-sm text-gray-200 bg-transparent outline-none w-full"
          />
          {errors.image && (
            <p className="mt-1 text-amber-300 text-xs sm:text-sm">{errors.image.message}</p>
          )}
        </div>

        {/* Success/Error message */}
        <div className="mb-4 p-3 rounded-xl border border-amber-600/10 relative z-10">
          <p className="text-xs text-gray-400 font-semibold mb-1"></p>
          <p className="text-lg text-gray-300">{msg}</p>
        </div>

        {/* Submit button */}
        <button
          type="submit"
          disabled={!isDirty}
          className={`w-full font-bold text-sm sm:text-base py-2.5 sm:py-3 px-4 rounded-lg transition-all duration-300 shadow-lg relative z-10
            ${isDirty 
              ? 'bg-gradient-to-r from-amber-400 to-amber-500 text-gray-900 hover:from-amber-500 hover:to-amber-600 shadow-amber-400/30 hover:shadow-amber-400/50 hover:scale-[1.02] active:scale-[0.98] cursor-pointer' 
              : 'bg-gray-600 text-gray-400 cursor-not-allowed opacity-50'
            }`}
        >
          {isDirty ? 'Add Team Member' : 'No Changes Made'}
        </button>

        {/* DevTool */}
        {typeof window !== "undefined" && <DevTool control={control} />}
      </form>
    </div>
  );
};