"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import usePost from "@/client_hooks/usePost";

const Cards = ({ data, i, access }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, defaultValues },
  } = useForm({
    defaultValues: {
      title: data.title,
      description: data.description,
    },
  });

  const watched = watch();

  const textChanged =
    JSON.stringify({
      title: watched.title,
      description: watched.description,
    }) !==
    JSON.stringify({
      title: defaultValues.title,
      description: defaultValues.description,
    });

  const canUpdate = textChanged;

  const { abort_ref, post, msg } = usePost("update_notification", "PATCH", access);
  const del_post = usePost("delete_notification", "DELETE", access);

  const onSubmit = (formData) => {
    post.mutate({ formData, id: data._id });
  };

  const del_fnx = (id) => {
    if (!id) return;
    if (showDeleteConfirm) {
      del_post.post.mutate({ data_id: id });
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const cancelDelete = () => {
    setShowDeleteConfirm(false);
  };

  const formattedDate = data?.createdAt ? new Date(data.createdAt).toLocaleString("en-GB",{
    day:"2-digit",
    month:"short",
    year:"numeric",
    hour:"2-digit",
    minute:"2-digit"
  }) : "Not available";

  const shortId = data?._id ? `${data._id.slice(0, 12)}...` : "N/A";

  return (
    <article className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl border border-amber-600/20 shadow-2xl shadow-black/40 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-start gap-6 justify-between border-b border-amber-600/20 pb-6">
          <div className="flex items-center gap-4">
            <div className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 rounded-2xl font-inter font-black shadow-lg shadow-amber-400/30 border border-amber-600/40">
              #{String(i).padStart(2,"0")}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold">Announcement</p>
              <h3 className="text-2xl font-inter text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-200 drop-shadow-[1px_1px_2px_rgba(212,175,55,0.3)]">
                {data?.title || "Untitled Announcement"}
              </h3>
            </div>
          </div>
          <div className="text-right">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold">Created</p>
            <p className="text-base text-amber-200 font-semibold">{formattedDate}</p>
          </div>
        </div>

        {/* Title Input */}
        <div className="bg-gray-800/60 border border-amber-600/20 rounded-2xl p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Title</p>
          <input
            type="text"
            {...register("title")}
            className="w-full text-xl font-bold text-gray-100 bg-transparent border-none outline-none font-inter"
            placeholder="Enter announcement title"
          />
        </div>

        {/* Description Input */}
        <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Description</p>
          <textarea
            {...register("description")}
            className="w-full text-base text-gray-300 bg-transparent border-none outline-none font-poppins
                       min-h-[150px] resize-y placeholder:text-gray-600"
            placeholder="Enter announcement description..."
          />
        </div>

        {/* Footer */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between border-t border-amber-600/20 pt-6">
          <p className="text-xs text-gray-500 font-mono">ID: {shortId}</p>
          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            {(msg || del_post.msg) && (
              <div className="px-4 py-2 rounded-xl border border-amber-600/20 bg-gray-800/60 text-sm text-gray-200">
                {del_post.msg || msg}
              </div>
            )}
            <button
              type="submit"
              disabled={!canUpdate}
              className={`
                w-full sm:w-auto px-6 py-3 rounded-xl font-bold font-inter text-gray-900
                bg-gradient-to-r from-[#d4af37] to-amber-500
                hover:from-amber-500 hover:to-[#d4af37]
                shadow-lg hover:shadow-2xl hover:shadow-amber-400/30
                hover:scale-[1.02] transition-all duration-500
                border border-amber-600/30
                relative overflow-hidden group/btn z-10
                ${!canUpdate ? "opacity-40 cursor-not-allowed" : "cursor-pointer"}
              `}
            >
              <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                              -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 rounded-xl'></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                {canUpdate ? "Update Announcement →" : "No Changes"}
              </span>
            </button>
            {!showDeleteConfirm ? (
              <button
                type="button"
                onClick={() => del_fnx(data._id)}
                className="w-full sm:w-auto px-6 py-3 rounded-xl font-bold font-inter text-gray-900
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
                  Delete Announcement
                  <span className="transition-transform group-hover/btn:translate-x-1 duration-300">→</span>
                </span>
              </button>
            ) : (
              <div className="p-4 rounded-xl border-2 border-red-500/50 bg-red-900/20">
                <p className="text-sm font-bold text-red-300 mb-3 font-inter">
                  Delete <span className="text-amber-300">"{data.title}"</span>?
                </p>
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => del_fnx(data._id)}
                    className="flex-1 px-4 py-2 rounded-lg font-bold font-inter text-sm
                               bg-gradient-to-r from-red-600 to-red-700 text-white
                               hover:scale-105 transition-all duration-300"
                  >
                    Yes, Delete
                  </button>
                  <button
                    type="button"
                    onClick={cancelDelete}
                    className="flex-1 px-4 py-2 rounded-lg font-bold font-inter text-sm
                               bg-gray-700 text-gray-300
                               hover:bg-gray-600 hover:scale-105 transition-all duration-300"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </form>
    </article>
  );
};

export default Cards;
