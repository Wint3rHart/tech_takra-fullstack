"use client";
import React, { useEffect, useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";
import usePost from "@/client_hooks/usePost";
import Link from "next/link";

export const Form = ({access}) => {
  const { register, control, formState: { errors, isDirty }, handleSubmit, reset, setValue, watch } = useForm({
    defaultValues: { imgs: [{ img: null }] }
  });

  let { fields, append, remove } = useFieldArray({ control, name: "imgs" });
  let images = watch("imgs");


  const { abort_ref, post, msg } = usePost("create_event", "POST", access);
  const { isError, isSuccess } = post;
  
  // State to hold local preview URLs
  const [previewUrls, setPreviewUrls] = useState({});

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  // Handle file change and create preview URL
  const handleFileChange = (e, index) => {
    const file = e.target.files?.[0];
    
    if (file) {
      // Set the actual File object as the form value
      setValue(`imgs.${index}.img`, file, { shouldDirty: true });
      
      // Create a local preview URL
      const url = URL.createObjectURL(file);
      
      // Clean up old URL if it exists
      if (previewUrls[index]) {
        URL.revokeObjectURL(previewUrls[index]);
      }
      
      // Update the state with the new URL
      setPreviewUrls(prev => ({ ...prev, [index]: url }));
    } else {
      // Handle file removal
      setValue(`imgs.${index}.img`, null, { shouldDirty: true });
      if (previewUrls[index]) {
        URL.revokeObjectURL(previewUrls[index]);
        setPreviewUrls(prev => {
          const newPrev = { ...prev };
          delete newPrev[index];
          return newPrev;
        });
      }
    }
  };
  
  // Custom validation logic (removed - not needed with manual onChange)
  
  // Handle removal to clean up preview URL
  const handleRemove = (index) => {
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
      setPreviewUrls(prev => {
        const newPrev = { ...prev };
        delete newPrev[index];
        return newPrev;
      });
    }
    remove(index);
  };

  const onSubmit = (formData) => {
    console.log("Updated form:", { formData });
    
    let form = new FormData();

    for (let key in formData) {
      const value = formData[key];

      if (key === "imgs") {
        console.log("in imgs", key, value);
        // Only append images that are actually files (not null)
        value.forEach((x) => {
          if (x.img instanceof File) {
            form.append("images", x.img);
          }
        });
      } else {
        form.append(key, value);
      }
    }

    // Debug: Log FormData contents
    console.log("FormData contents:");
    for (let pair of form.entries()) {
      console.log(pair[0], pair[1]);
    }

    post.mutate({ form: form });
    // reset();
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
          <div className="flex items-center gap-4">
            <Link
              type="button"
             href='/admin'
              className="p-2 bg-gray-800/60 hover:bg-gray-700/60 border border-amber-600/20 rounded-xl transition-all duration-300 hover:scale-105"
              title="Back to Admin"
            >
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold">Create Event</p>
              <h3 className="text-2xl font-inter text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-200 drop-shadow-[1px_1px_2px_rgba(212,175,55,0.3)]">
                New Event Form
              </h3>
            </div>
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
            className="w-full text-xl font-bold text-gray-100 bg-transparent border-none outline-none font-inter"
            placeholder="Enter event title"
          />
          {errors.title && (
            <p className="mt-2 text-xs text-red-400 font-poppins">{errors.title.message}</p>
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
              className="w-full text-lg text-gray-200 font-poppins bg-transparent border-none outline-none"
              placeholder="Enter location"
            />
            {errors.location && (
              <p className="mt-2 text-xs text-red-400 font-poppins">{errors.location.message}</p>
            )}
          </div>
          <div className="bg-gray-800/60 border border-amber-600/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Date</p>
            <input
              type="date"
              {...register("date", { required: "Date is required" })}
              className="w-full text-lg text-gray-200 font-poppins bg-transparent border-none outline-none"
            />
            {errors.date && (
              <p className="mt-2 text-xs text-red-400 font-poppins">{errors.date.message}</p>
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
              className="w-full text-base text-gray-200 font-poppins bg-transparent border-none outline-none"
              placeholder="Enter category (optional)"
            />
            {errors.category && (
              <p className="mt-2 text-xs text-red-400 font-poppins">{errors.category.message}</p>
            )}
          </div>
        </div>

        <div>
          {/* Image Fields Section */}
          <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
            <p className="text-xs text-amber-400/90 font-poppins mb-2">Only JPG, JPEG, PNG images are allowed (Max 5MB, Max 5 images)</p>
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-4">Event Images</p>
            
            {fields.map((x, i) => {
              return (
                <div key={x.id} className="relative space-y-3 mb-6 p-4 bg-gray-900/30 rounded-xl border border-amber-600/10">
                  <input
                    type="file"
                    accept="image/jpeg,image/jpg,image/png"
                    onChange={(e) => handleFileChange(e, i)}
                    className="w-full text-sm text-gray-300 bg-gray-900/50 rounded-lg p-3
                      border border-amber-600/20 focus:border-amber-500/40 
                      outline-none transition-all duration-300
                      file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                      file:text-sm file:font-semibold file:font-inter
                      file:bg-gradient-to-r file:from-[#d4af37] file:to-amber-500
                      file:text-gray-900 file:cursor-pointer
                      hover:file:scale-105 file:transition-all file:duration-300"
                  />

                  {/* Preview and Error */}
                  <div className="flex items-start gap-3">
                    {previewUrls[i] && (
                      <div className="flex-shrink-0">
                        <img
                          src={previewUrls[i]}
                          alt="Preview"
                          className="h-24 w-24 rounded-lg object-cover border-2 border-amber-500/50 shadow-lg"
                        />
                      </div>
                    )}
                    <div className="flex-1">
                      {images[i]?.img instanceof File ? (
                        <p className="text-xs text-gray-300 font-poppins mb-1">
                          📎 {images[i].img.name}
                          <span className="text-gray-500 ml-2">
                            ({(images[i].img.size / 1024).toFixed(1)} KB)
                          </span>
                        </p>
                      ) : (
                        <p className="text-xs text-gray-400 font-poppins italic">
                          No file chosen
                        </p>
                      )}
                      {errors.imgs?.[i]?.img && (
                        <p className="text-red-400 text-xs font-poppins mt-1">
                          ⚠️ {errors.imgs[i].img.message}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Remove button */}
                  {fields.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleRemove(i)}
                      className="absolute top-2 right-2 p-1.5 w-7 h-7 bg-red-600/90 hover:bg-red-700 text-white rounded-full text-sm font-bold transition-all duration-300 hover:scale-110 shadow-lg"
                    >
                      ×
                    </button>
                  )}
                </div>
              );
            })}

            {fields.length < 5 && (
              <button
                type="button"
                onClick={() => append({ img: null })}
                className="w-full text-sm text-gray-900 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg p-3 font-semibold mt-4 
                          hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
              >
                ➕ Add Another Image ({fields.length}/5)
              </button>
            )}
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
            className="w-full text-base text-gray-300 bg-transparent border-none outline-none font-poppins
                       min-h-[150px] resize-y placeholder:text-gray-600"
            placeholder="Enter event description..."
          />
          {errors.description && (
            <p className="mt-2 text-xs text-red-400 font-poppins">{errors?.description?.message}</p>
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
                w-full sm:w-auto px-6 py-3 rounded-xl font-bold font-inter text-gray-900
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
      </form>
    </article>
  );
};