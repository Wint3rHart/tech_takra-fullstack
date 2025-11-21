"use client";
import React from "react";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
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
    <article className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl border border-amber-600/20 shadow-2xl shadow-black/40 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative z-10 p-6 sm:p-8 space-y-6"
      >
        {/* Header */}
        <div className="flex flex-wrap items-start gap-6 justify-between border-b border-amber-600/20 pb-6">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold">Create Event</p>
            <h3 className="text-2xl font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-200 drop-shadow-[1px_1px_2px_rgba(212,175,55,0.3)]">
              New Event Form
            </h3>
          </div>
        </div>

        {/* Title Input */}
        <div className="bg-gray-800/60 border border-amber-600/20 rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Event Title</p>
          <input
            type="text"
            {...register("title", {
              required: "Title is required",
              minLength: { value: 3, message: "At least 3 characters" }
            })}
            className="w-full text-xl font-bold text-gray-100 bg-transparent border-none outline-none font-cinzel"
            placeholder="Enter event title"
          />
          {errors.title && (
            <p className="mt-2 text-xs text-red-400 font-playfair">{errors.title.message}</p>
          )}
        </div>

        {/* Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/60 border border-amber-600/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Location</p>
            <input
              type="text"
              {...register("location", {
                required: "Location is required",
                minLength: { value: 3, message: "At least 3 characters" }
              })}
              className="w-full text-lg text-gray-200 font-playfair bg-transparent border-none outline-none"
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="mt-2 text-xs text-red-400 font-playfair">{errors.location.message}</p>
            )}
          </div>
          <div className="bg-gray-800/60 border border-amber-600/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Date</p>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full text-lg text-gray-200 font-playfair bg-transparent border-none outline-none"
            />
            {errors.date && (
              <p className="mt-2 text-xs text-red-400 font-playfair">{errors.date.message}</p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Category</p>
            <input
              type="text"
              {...register("category", {
                required: false
              })}
              className="w-full text-base text-gray-200 font-playfair bg-transparent border-none outline-none"
              placeholder="Enter category (optional)"
            />
            {errors.category && (
              <p className="mt-2 text-xs text-red-400 font-playfair">{errors.category.message}</p>
            )}
          </div>
          <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Event Images</p>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("images")}
              className="w-full text-sm text-gray-300 bg-gray-900/50 rounded-lg p-3
                         border border-amber-600/20 focus:border-amber-500/40 
                         outline-none transition-all duration-300
                         file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                         file:text-sm file:font-semibold file:font-cinzel
                         file:bg-gradient-to-r file:from-[#d4af37] file:to-amber-500
                         file:text-gray-900 file:cursor-pointer
                         hover:file:scale-105 file:transition-all file:duration-300"
            />
          </div>
        </div>

        {/* Description Input */}
        <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Description</p>
          <textarea
            {...register("description", {
              required: "Description is required",
              minLength: { value: 10, message: "At least 10 characters" }
            })}
            className="w-full text-base text-gray-300 bg-transparent border-none outline-none font-playfair
                       min-h-[150px] resize-y placeholder:text-gray-600"
            placeholder="Enter event description..."
          />
          {errors.description && (
            <p className="mt-2 text-xs text-red-400 font-playfair">{errors.description.message}</p>
          )}
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-amber-600/20 pt-6">
          <div></div>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {msg && (
              <div className="px-4 py-2 rounded-xl border border-amber-600/20 bg-gray-800/60 text-sm text-gray-200">
                {msg}
              </div>
            )}
            <button
              type="submit"
              disabled={!isDirty}
              className={`
                w-full sm:w-auto px-6 py-3 rounded-xl font-bold font-cinzel text-gray-900
                bg-gradient-to-r from-[#d4af37] to-amber-500
                hover:from-amber-500 hover:to-[#d4af37]
                shadow-lg hover:shadow-2xl hover:shadow-amber-400/30
                hover:scale-[1.02] transition-all duration-500
                border border-amber-600/30
                relative overflow-hidden group/btn z-10
                ${!isDirty ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                              -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 rounded-xl'></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {isDirty ? "Create Event →" : "Fill Form First"}
              </span>
            </button>
          </div>
        </div>

        {/* DevTool */}
        {typeof window !== "undefined" && <DevTool control={control} />}
      </form>
    </article>
  );
};