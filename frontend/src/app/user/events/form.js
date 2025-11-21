"use client";
import React, { useEffect, useState } from "react";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import BgEffect from "@/util_comps/bg_effect";
import { serverAction } from "@/server_actions/signUp_fnx";
import usePost from "@/client_hooks/usePost";

export const Form = ({access}) => {
  const { register, control, formState: { errors, isDirty }, handleSubmit,reset } = useForm();

  const { abort_ref, post, msg } = usePost("create_event", "POST",access);
  const { isError, isSuccess } = post;

  const onSubmit = (formData) => {
    console.log("Updated form:", {formData});
    
    let form = new FormData();

    for (let key in formData) {
      const value = formData[key];

      if (value instanceof FileList) {
        Array.from(value).forEach((file) => {
          form.append("images", file);
        });
      } else {
        form.append(key, value);
      }
    }

    post.mutate({form:form});
        
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

        {/* TITLE */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label className="text-xs mt-6 text-amber-200/60 mb-1">Title</label>
          <input
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "At least 3 characters" },
              pattern: { value: /^[A-Za-z0-9\s]+$/, message: "Only letters and numbers allowed" }
            })}
            className="text-2xl sm:text-3xl font-bold text-amber-50 bg-transparent outline-none w-full"
            placeholder="Enter title"
          />
          {errors.title && (
            <p className="mt-1 text-amber-300 text-xs sm:text-sm">{errors.title.message}</p>
          )}
        </div>

        {/* LOCATION */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label className="text-xs text-amber-200/60 mb-1">Location</label>
          <input
            type="text"
            {...register("location", {
              required: "Location is required",
              minLength: { value: 3, message: "At least 3 characters" },
              pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters allowed" }
            })}
            className="text-base sm:text-lg text-yellow-300 bg-transparent outline-none w-full"
            placeholder="Enter location"
          />
          {errors.location && (
            <p className="mt-1 text-amber-300 text-xs sm:text-sm">{errors.location.message}</p>
          )}
        </div>

        {/* DATE */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label className="text-xs text-amber-200/60 mb-1">Date</label>
          <input
            type="date"
            {...register("date", { required: "Date is required" })}
            className="text-base sm:text-lg text-yellow-300 bg-transparent outline-none w-full"
          />
          {errors.date && (
            <p className="mt-1 text-amber-300 text-xs sm:text-sm">{errors.date.message}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label className="text-xs text-amber-200/60 mb-1">Description</label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: { value: 10, message: "At least 10 characters" }
            })}
            className="text-sm text-gray-200 bg-transparent outline-none w-full h-24"
            placeholder="Enter description"
          />
          {errors.description && (
            <p className="mt-1 text-amber-300 text-xs sm:text-sm">{errors.description.message}</p>
          )}
        </div>

        {/* CATEGORY */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label className="text-xs text-amber-200/60 mb-1">Category</label>
          <input
            type="text"
            {...register("category", {
              required: false,
              pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters allowed" }
            })}
            className="text-base sm:text-lg text-yellow-300 bg-transparent outline-none w-full"
            placeholder="Enter category"
          />
          {errors.category && (
            <p className="mt-1 text-amber-300 text-xs sm:text-sm">{errors.category.message}</p>
          )}
        </div>

        {/* IMAGES */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label className="text-xs mt-6 text-amber-200/60 mb-1">Images</label>
          <input
            type="file"
            multiple
            accept="image/*"
            {...register("images")}
            className="text-sm text-gray-200 bg-transparent outline-none w-full"
          />
        </div>

        {/* Success message */}
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
          {isDirty ? 'Submit Event' : 'No Changes Made'}
        </button>

        {/* DevTool */}
        {typeof window !== "undefined" && <DevTool control={control} />}
      </form>
    </div>
  );
};