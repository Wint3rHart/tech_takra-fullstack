"use client";

import React from "react";
import { DevTool } from "@hookform/devtools";
import { useForm } from "react-hook-form";
import BgEffect from "@/util_comps/bg_effect";
import usePost from "@/client_hooks/usePost";

export const Form = () => {
  const {
    register,
    control,
    formState: { errors, isDirty },
    handleSubmit,
    reset,
  } = useForm();

  const { abort_ref, post, msg } = usePost("create_admin", "POST");
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
    <div className="flex items-center justify-center mt-12 h-full px-4 sm:px-6 lg:px-8 py-8 sm:py-12 bg-gray-900 relative">
      <BgEffect />

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="w-full max-w-sm sm:max-w-md lg:max-w-lg px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 bg-gray-800/90 backdrop-blur-sm rounded-2xl shadow-2xl border border-amber-400/20 relative group z-10"
      >
        {/* Back button (you can wire it to routing or state if needed) */}
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
            })}
            className="text-2xl sm:text-3xl font-bold text-amber-50 bg-transparent outline-none w-full"
            placeholder="Admin Name"
          />
          {errors.name && (
            <p className="mt-1 text-amber-300 text-xs sm:text-sm">
              {errors.name.message}
            </p>
          )}
        </div>

        {/* EMAIL */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label className="text-xs text-amber-200/60 mb-1">Email</label>
          <input
            type="email"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                message: "Invalid email format",
              },
            })}
            className="text-base sm:text-lg text-yellow-300 bg-transparent outline-none w-full"
            placeholder="admin@example.com"
          />
          {errors.email && (
            <p className="mt-1 text-amber-300 text-xs sm:text-sm">
              {errors.email.message}
            </p>
          )}
        </div>

        {/* ROLE */}
        <div className="mb-4 sm:mb-5 relative z-10">
          <label className="text-xs text-amber-200/60 mb-1">Password</label>
          <input
            type="password"
            {...register("password", {
              required: "Password is required",
              minLength: { value: 2, message: "At least 2 characters" },
            })}
            className="text-base sm:text-lg text-yellow-300 bg-transparent outline-none w-full"
            placeholder="e.g. super-admin, manager"
          />
          {errors.password && (
            <p className="mt-1 text-amber-300 text-xs sm:text-sm">
              {errors.password.message}
            </p>
          )}
        </div>

        {/* Message */}
        <div className="mb-4 p-3 rounded-xl border border-amber-600/10 relative z-10">
          <p className="text-xs text-gray-400 font-semibold mb-1"></p>
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
          {isDirty ? "Create Admin" : "No Changes Made"}
        </button>

        {typeof window !== "undefined" && <DevTool control={control} />}
      </form>
    </div>
  );
};
