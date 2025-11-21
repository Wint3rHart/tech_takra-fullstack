"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import usePost from "@/client_hooks/usePost";

const Cards = ({ data, i, access, currentUserId }) => {
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { defaultValues },
    reset: resetPasswordForm
  } = useForm({
    defaultValues: {
      name: data.name || "",
      email: data.email || "",
      role: data.role || "",
      oldPassword: "",
      newPassword: "",
      confirmPassword: ""
    },
  });

  const watched = watch();

  const textChanged =
    JSON.stringify({
      name: watched.name,
      email: watched.email,
      role: watched.role,
    }) !==
    JSON.stringify({
      name: defaultValues.name,
      email: defaultValues.email,
      role: defaultValues.role,
    });

  const canUpdate = textChanged;

  const { abort_ref, post, msg } = usePost("update_admin", "PATCH", access);
  const del_post = usePost("delete_admin", "DELETE", access);
  const password_post = usePost("change_password", "POST", access);

  useEffect(() => {
    console.log("msg==", del_post.msg || msg || password_post.msg);
  }, [msg, del_post.msg, password_post.msg]);

  const del_fnx = (id) => {
    del_post.post.mutate({ data_id: id });
  };

  const onPasswordSubmit = (formData) => {
    if (formData.newPassword !== formData.confirmPassword) {
      password_post.post.mutate({ 
        oldPassword: formData.oldPassword,
        newPassword: formData.newPassword,
        error: "Passwords do not match"
      });
      return;
    }
    password_post.post.mutate({ 
      oldPassword: formData.oldPassword,
      newPassword: formData.newPassword
    });
    setShowPasswordChange(false);
    resetPasswordForm({ ...defaultValues, oldPassword: "", newPassword: "", confirmPassword: "" });
  };

  const formattedDate = data?.createdAt ? new Date(data.createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }) : "Not available";

  const shortId = data?._id ? `${data._id.slice(0, 12)}...` : "N/A";
  const isCurrentUser = currentUserId === data._id;

  return (
    <article className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl border border-amber-600/20 shadow-2xl shadow-black/40 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>

      <form onSubmit={handleSubmit(() => {})} className="relative z-10 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-start gap-6 justify-between border-b border-amber-600/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 rounded-2xl font-cinzel font-black shadow-lg shadow-amber-400/30 border border-amber-600/40">
              #{String(i + 1).padStart(2, "0")}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold">Admin</p>
              <h3 className="text-2xl font-cinzel text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-200 drop-shadow-[1px_1px_2px_rgba(212,175,55,0.3)]">
                {data?.name || "Unnamed Admin"}
              </h3>
              <p className="text-sm text-gray-400 font-playfair">{data?.role || "No role"}</p>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold">Created</p>
            <p className="text-base text-amber-200 font-semibold">{formattedDate}</p>
          </div>
        </div>

        {/* Detail Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/60 border border-amber-600/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Email</p>
            <input
              type="email"
              {...register("email")}
              disabled={true}
              className="w-full text-lg text-gray-200 font-playfair bg-transparent border-none outline-none"
            />
          </div>
          <div className="bg-gray-800/60 border border-amber-600/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Role</p>
            <input
              type="text"
              {...register("role")}
              disabled={true}
              className="w-full text-lg text-gray-200 font-playfair bg-transparent border-none outline-none"
            />
          </div>
        </div>

        {/* Name Input */}
        <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Name</p>
          <input
            type="text"
            {...register("name")}
            disabled={true}
            className="w-full text-xl font-bold text-gray-100 bg-transparent border-none outline-none font-cinzel"
          />
        </div>

        {/* Password Change Section - Only for current user */}
        {isCurrentUser && (
          <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold">Change Password</p>
              <button
                type="button"
                onClick={() => {
                  setShowPasswordChange(!showPasswordChange);
                  resetPasswordForm({ ...defaultValues, oldPassword: "", newPassword: "", confirmPassword: "" });
                }}
                className="px-4 py-2 rounded-lg font-bold font-cinzel text-sm
                           bg-gray-700 text-gray-300
                           hover:bg-gray-600 hover:scale-105 transition-all duration-300"
              >
                {showPasswordChange ? "Cancel" : "Change Password"}
              </button>
            </div>
            {showPasswordChange && (
              <form onSubmit={handleSubmit(onPasswordSubmit)} className="space-y-4">
                <div>
                  <label className="text-xs text-amber-400/70 mb-1 block">Old Password</label>
                  <input
                    type="password"
                    {...register("oldPassword", { required: true })}
                    className="w-full text-sm text-gray-300 bg-gray-900/50 rounded-lg p-3
                               border border-amber-600/20 focus:border-amber-500/40 
                               outline-none transition-all duration-300"
                    placeholder="Enter old password"
                  />
                </div>
                <div>
                  <label className="text-xs text-amber-400/70 mb-1 block">New Password</label>
                  <input
                    type="password"
                    {...register("newPassword", { required: true })}
                    className="w-full text-sm text-gray-300 bg-gray-900/50 rounded-lg p-3
                               border border-amber-600/20 focus:border-amber-500/40 
                               outline-none transition-all duration-300"
                    placeholder="Enter new password"
                  />
                </div>
                <div>
                  <label className="text-xs text-amber-400/70 mb-1 block">Confirm New Password</label>
                  <input
                    type="password"
                    {...register("confirmPassword", { required: true })}
                    className="w-full text-sm text-gray-300 bg-gray-900/50 rounded-lg p-3
                               border border-amber-600/20 focus:border-amber-500/40 
                               outline-none transition-all duration-300"
                    placeholder="Confirm new password"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full px-4 py-2 rounded-lg font-bold font-cinzel text-sm
                             bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900
                             hover:scale-105 transition-all duration-300"
                >
                  Update Password →
                </button>
              </form>
            )}
          </div>
        )}

        {/* Footer */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-amber-600/20 pt-6">
          <p className="text-xs text-gray-500 font-mono">ID: {shortId}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {(msg || del_post.msg || password_post.msg) && (
              <div className="px-4 py-2 rounded-xl border border-amber-600/20 bg-gray-800/60 text-sm text-gray-200">
                {del_post.msg || password_post.msg || msg}
              </div>
            )}
            <button
              type="button"
              onClick={() => del_fnx(data._id)}
              className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold font-cinzel text-gray-900
                         bg-gradient-to-r from-red-500 to-red-700
                         hover:from-red-600 hover:to-red-800
                         shadow-lg hover:shadow-2xl hover:shadow-red-400/30
                         hover:scale-[1.02] transition-all duration-500
                         border border-red-600/30
                         relative overflow-hidden group/btn z-10 cursor-pointer"
            >
              <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                              -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 rounded-xl'></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                Delete Admin
                <span className="transition-transform group-hover/btn:translate-x-1 duration-300">→</span>
              </span>
            </button>
          </div>
        </div>
      </form>
    </article>
  );
};

export default Cards;
