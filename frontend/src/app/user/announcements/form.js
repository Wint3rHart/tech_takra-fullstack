"use client";

import React from "react";
import { useForm } from "react-hook-form";
import { DevTool } from "@hookform/devtools";
import BgEffect from "@/util_comps/bg_effect";
import usePost from "@/client_hooks/usePost";

export const Form = ({access}) => {
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isDirty },
    reset,
  } = useForm();

  const { abort_ref, post, msg } = usePost("create_notification", "POST", access);

  const onSubmit = (formData) => {
    console.log("Create notification form:", formData);
    post.mutate(formData, {
      onSuccess: () => {
        reset();
      },
      onError: (error) => {
        console.error("Error creating announcement:", error);
      }
    });
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
          <h2 className="text-3xl sm:text-4xl font-bold font-cinzel text-transparent bg-clip-text 
                         bg-gradient-to-r from-[#d4af37] to-amber-300 mb-2"
              style={{textShadow: '2px 2px 4px rgba(212,175,55,0.3)'}}>
            Create New Announcement
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full"></div>
        </div>

        {/* TITLE */}
        <div className="mb-6 relative z-10">
          <label className="text-xs font-semibold text-amber-400/80 mb-2 block uppercase tracking-wider font-cinzel">
            Announcement Title *
          </label>
          <input
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
            className="w-full text-xl sm:text-2xl font-bold text-gray-100 bg-gray-900/50 
                       border-b-2 border-amber-600/30 focus:border-amber-500/60 
                       outline-none transition-all duration-300 pb-2 px-2 font-cinzel
                       placeholder:text-gray-600"
            placeholder="Enter announcement title"
          />
          {errors.title && (
            <p className="mt-2 text-red-400 text-xs sm:text-sm font-playfair">{errors.title.message}</p>
          )}
        </div>

        {/* DESCRIPTION */}
        <div className="mb-6 relative z-10">
          <label className="text-xs font-semibold text-amber-400/70 mb-2 block uppercase tracking-wider font-cinzel">
            Description *
          </label>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: { value: 5, message: "At least 5 characters" },
            })}
            className="w-full text-base sm:text-lg text-gray-300 bg-gray-900/50 
                       border border-gray-700 focus:border-amber-500/40 
                       outline-none transition-all duration-300 p-3 rounded-lg font-playfair
                       min-h-[120px] resize-y placeholder:text-gray-600"
            placeholder="Enter announcement description..."
          />
          {errors.description && (
            <p className="mt-2 text-red-400 text-xs sm:text-sm font-playfair">{errors.description.message}</p>
          )}
        </div>

        {/* Success/Error message */}
        {msg && (
          <div className="mb-6 p-4 rounded-xl border border-amber-600/20 bg-gray-800/50 relative z-10">
            <p className="text-sm sm:text-base text-gray-300 font-playfair">{msg}</p>
          </div>
        )}

        {/* Submit button */}
        <button
          type="submit"
          disabled={!isDirty}
          className={`w-full font-bold font-cinzel text-base sm:text-lg py-3 sm:py-4 px-6 rounded-xl transition-all duration-500 shadow-lg relative overflow-hidden group/btn z-10 ${isDirty ? 'bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-400/30 cursor-pointer' : 'bg-gray-700 text-gray-500 cursor-not-allowed opacity-50'}`}
        >
          <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 rounded-xl" />
          <span className="relative z-10 flex items-center justify-center gap-2">
            {isDirty ? (
              <>
                Create Announcement <span className="text-xl">+</span>
              </>
            ) : (
              'Fill the form to create announcement'
            )}
          </span>
        </button>

        {/* DevTool */}
        {typeof window !== "undefined" && <DevTool control={control} />}
      </form>
    </div>
  );
};
