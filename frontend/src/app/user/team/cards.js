import usePost from "@/client_hooks/usePost";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";

const TeamCards = ({ data, i, role, access }) => {
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, defaultValues },
  } = useForm({
    defaultValues: {
      name: data.name,
      position: data.position,
      order: data.order || 999,
      image: null,
    },
  });

  const watched = watch();
  const textChanged =
    JSON.stringify({
      name: watched.name,
      position: watched.position,
      order: watched.order ? parseInt(watched.order, 10) : 999,
    }) !==
    JSON.stringify({
      name: defaultValues.name,
      position: defaultValues.position,
      order: defaultValues.order || 999,
    });

  const fileChanged = watched.image && watched.image.length > 0;
  const canUpdate = textChanged || fileChanged;

  const { abort_ref, post, msg } = usePost("update_team", "PATCH", access);
  const del_post = usePost("delete_team", "DELETE", access);

  const onSubmit = (formData) => {
    let form = new FormData();

    for (let key in formData) {
      const value = formData[key];

      if (value instanceof FileList) {
        Array.from(value).forEach((file) => form.append("image", file));
      } else {
        form.append(key, value);
      }
    }

    post.mutate({ form, id: data._id });
  };

  const del_fnx = (id) => {
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
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold">Team Member</p>
              <h3 className="text-2xl font-inter text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-200 drop-shadow-[1px_1px_2px_rgba(212,175,55,0.3)]">
                {data?.name || "Unnamed Member"}
              </h3>
              <p className="text-sm text-gray-400 font-poppins">{data?.position || "No position"}</p>
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
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Position</p>
            <input
              type="text"
              {...register("position")}
              className="w-full text-lg text-gray-200 font-poppins bg-transparent border-none outline-none"
              placeholder="Enter position"
            />
          </div>
          <div className="bg-gray-800/60 border border-amber-600/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Display Order</p>
            <input
              type="number"
              {...register("order", {
                min: { value: 1, message: "Order must be at least 1" },
                pattern: { value: /^\d+$/, message: "Only numbers allowed" }
              })}
              className="w-full text-lg text-gray-200 font-mono bg-transparent border-none outline-none"
              placeholder="999"
            />
            {errors.order && (
              <p className="mt-2 text-xs text-red-400 font-poppins">{errors.order.message}</p>
            )}
          </div>
        </div>

        {/* Image Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.image?.url && (
            <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Current Photo</p>
              <div className="relative w-full h-48 rounded-xl overflow-hidden border-2 border-amber-600/30 shadow-lg shadow-amber-400/20">
                <img
                  src={data.image.url}
                  alt={data.name}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>
          )}
          <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Update Photo</p>
            <input
              type="file"
              accept="image/*"
              {...register("image")}
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
        </div>

        {/* Name Input */}
        <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Member Name</p>
          <input
            type="text"
            {...register("name")}
            className="w-full text-xl font-bold text-gray-100 bg-transparent border-none outline-none font-inter"
            placeholder="Enter name"
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
                {canUpdate ? "Update Member →" : "No Changes"}
              </span>
            </button>
            {role?.toUpperCase().trim() === "SUPERADMIN" && (
              <>
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
                      Delete Member
                      <span className="transition-transform group-hover/btn:translate-x-1 duration-300">→</span>
                    </span>
                  </button>
                ) : (
                  <div className="p-4 rounded-xl border-2 border-red-500/50 bg-red-900/20">
                    <p className="text-sm font-bold text-red-300 mb-3 font-inter">
                      Delete <span className="text-amber-300">{data.name}</span>?
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
              </>
            )}
          </div>
        </div>
      </form>
    </article>
  );
};

export default TeamCards;