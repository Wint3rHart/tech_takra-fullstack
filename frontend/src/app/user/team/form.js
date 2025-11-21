"use client";
import React, { useEffect, useState } from "react";

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
    <div className="flex items-center justify-center py-8 px-4 sm:px-6 lg:px-8 relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-2xl bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 
                   backdrop-blur-sm rounded-3xl shadow-2xl border border-amber-600/20 
                   p-6 sm:p-8 lg:p-10 relative group overflow-hidden"
      >
        {/* Ambient Light Effect */}
        <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent 
                        -translate-x-full group-hover:translate-x-full transition-transform duration-2000 rounded-3xl" />

        {/* Background Particles */}
        <div className="absolute top-8 left-12 w-1 h-1 bg-amber-400/80 rounded-full animate-ping" />
        <div className="absolute bottom-12 right-16 w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse" />

        {/* Form Header */}
        <div className="mb-8 relative z-10">
          <h2 className="text-3xl sm:text-4xl font-bold font-inter text-transparent bg-clip-text 
                         bg-gradient-to-r from-[#d4af37] to-amber-300 mb-2"
              style={{textShadow: '2px 2px 4px rgba(212,175,55,0.3)'}}>
            Add New Team Member
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full"></div>
        </div>

        {/* NAME */}
        <div className="mb-6 relative z-10">
          <label className="text-xs font-semibold text-amber-400/80 mb-2 block uppercase tracking-wider font-inter">
            Member Name *
          </label>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "At least 3 characters" },
              pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters allowed" }
            })}
            className="w-full text-xl sm:text-2xl font-bold text-gray-100 bg-gray-900/50 
                       border-b-2 border-amber-600/30 focus:border-amber-500/60 
                       outline-none transition-all duration-300 pb-2 px-2 font-inter
                       placeholder:text-gray-600"
            placeholder="Enter full name"
          />
          {errors.name && (
            <p className="mt-2 text-red-400 text-xs sm:text-sm font-poppins">{errors.name.message}</p>
          )}
        </div>

        {/* POSITION */}
        <div className="mb-6 relative z-10">
          <label className="text-xs font-semibold text-amber-400/70 mb-2 block uppercase tracking-wider font-inter">
            Position *
          </label>
          <input
            type="text"
            {...register("position", {
              required: "Position is required",
              minLength: { value: 3, message: "At least 3 characters" },
              pattern: { value: /^[A-Za-z\s]+$/, message: "Only letters allowed" }
            })}
            className="w-full text-base sm:text-lg text-gray-300 bg-gray-900/50 
                       border-b border-gray-700 focus:border-amber-500/40 
                       outline-none transition-all duration-300 pb-2 px-2 font-poppins
                       placeholder:text-gray-600"
            placeholder="Enter position (e.g., President, Media Head)"
          />
          {errors.position && (
            <p className="mt-2 text-red-400 text-xs sm:text-sm font-poppins">{errors.position.message}</p>
          )}
        </div>

        {/* ORDER/RANK */}
        <div className="mb-6 relative z-10">
          <label className="text-xs font-semibold text-amber-400/70 mb-2 block uppercase tracking-wider font-inter">
            Display Order <span className="text-amber-400/60 normal-case font-poppins">(Lower = appears first)</span>
          </label>
          <input
            type="number"
            {...register("order", {
              min: { value: 1, message: "Order must be at least 1" },
              pattern: { value: /^\d+$/, message: "Only numbers allowed" }
            })}
            className="w-full text-base sm:text-lg text-gray-300 bg-gray-900/50 
                       border-b border-gray-700 focus:border-amber-500/40 
                       outline-none transition-all duration-300 pb-2 px-2 font-poppins
                       placeholder:text-gray-600"
            placeholder="999"
            defaultValue="999"
          />
          {errors.order && (
            <p className="mt-2 text-red-400 text-xs sm:text-sm font-poppins">{errors.order.message}</p>
          )}
          <p className="mt-2 text-xs text-amber-400/60 font-poppins">
            Tip: Use 1 for President, 2 for Vice President, etc. Higher numbers appear later.
          </p>
        </div>

        {/* IMAGE */}
        <div className="mb-6 relative z-10">
          <label className="text-xs font-semibold text-amber-400/70 mb-2 block uppercase tracking-wider font-inter">
            Profile Image *
          </label>
          <div className="relative">
            <input
              type="file"
              accept="image/*"
              {...register("image", {
                required: "Image is required"
              })}
              className="w-full text-sm text-gray-300 bg-gray-900/50 rounded-lg p-3
                         border border-amber-600/20 focus:border-amber-500/40 
                         outline-none transition-all duration-300
                         file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                         file:text-sm file:font-semibold file:font-inter
                         file:bg-gradient-to-r file:from-[#d4af37] file:to-amber-500
                         file:text-gray-900 file:cursor-pointer
                         hover:file:scale-105 file:transition-all file:duration-300"
            />
          </div>
          {errors.image && (
            <p className="mt-2 text-red-400 text-xs sm:text-sm font-poppins">{errors.image.message}</p>
          )}
        </div>

        {/* Success/Error message */}
        {msg && (
          <div className="mb-6 p-4 rounded-xl border border-amber-600/20 bg-gray-800/50 relative z-10">
            <p className="text-sm sm:text-base text-gray-300 font-poppins">{msg}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={!isDirty}
          className={`w-full font-bold font-inter text-base sm:text-lg py-3 sm:py-4 px-6 rounded-xl transition-all duration-500 shadow-lg relative overflow-hidden group/btn z-10 ${isDirty ? 'bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-400/30 cursor-pointer' : 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'}`}
        >
          <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 rounded-xl" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isDirty ? (
              <>
                Add Team Member <span className="text-xl">+</span>
              </>
            ) : (
              'Fill the form to add member'
            )}
          </span>
        </button>

      
      </form>
    </div>
  );
};