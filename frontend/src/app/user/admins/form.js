"use client";

import React from "react";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import usePost from "@/client_hooks/usePost";

export const Form = ({access}) => {
  const {
    register,
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm();

  const { abort_ref, post, msg } = usePost("create_admin", "POST",access);
  const { isError, isSuccess } = post;

  const onSubmit = (formData) => {
    console.log("Create admin form:", { formData });

    post.mutate( formData );
    let timer= setTimeout(() => {
      abort_ref.current.abort("Took too long");
      clearTimeout(timer);
    }, 10000);

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
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold">Create Admin</p>
            <h3 className="text-2xl font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-200 drop-shadow-[1px_1px_2px_rgba(212,175,55,0.3)]">
              New Admin Account
            </h3>
          </div>
        </div>

        {/* Name Input */}
        <div className="bg-gray-800/60 border border-amber-600/20 rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Admin Name</p>
          <input
            type="text"
            {...register("name", {
              required: "Name is required",
              minLength: { value: 3, message: "At least 3 characters" },
            })}
            className="w-full text-xl font-bold text-gray-100 bg-transparent border-none outline-none font-cinzel"
            placeholder="Enter admin name"
          />
          {errors.name && (
            <p className="mt-2 text-xs text-red-400 font-playfair">{errors.name.message}</p>
          )}
        </div>

        {/* Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/60 border border-amber-600/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Email</p>
            <input
              type="email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Invalid email format",
                },
              })}
              className="w-full text-lg text-gray-200 font-playfair bg-transparent border-none outline-none"
              placeholder="admin@example.com"
            />
            {errors.email && (
              <p className="mt-2 text-xs text-red-400 font-playfair">{errors.email.message}</p>
            )}
          </div>
          <div className="bg-gray-800/60 border border-amber-600/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Password</p>
            <input
              type="password"
              {...register("password", {
                required: "Password is required",
                minLength: { value: 6, message: "At least 6 characters" },
              })}
              className="w-full text-lg text-gray-200 font-playfair bg-transparent border-none outline-none"
              placeholder="Enter password"
            />
            {errors.password && (
              <p className="mt-2 text-xs text-red-400 font-playfair">{errors.password.message}</p>
            )}
          </div>
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
                {isDirty ? "Create Admin →" : "Fill Form First"}
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
