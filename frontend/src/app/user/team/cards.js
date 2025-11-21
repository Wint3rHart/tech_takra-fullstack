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

  return (
    <div className="relative">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col bg-gradient-to-br from-gray-800/90 via-gray-900/90 to-gray-800/90 
                   rounded-3xl shadow-2xl border border-amber-600/20 
                   hover:shadow-3xl hover:shadow-amber-400/10 transition-all duration-500
                   p-6 sm:p-8 lg:p-10 group overflow-hidden"
      >
        {/* Ambient Light Effect */}
        <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent 
                        -translate-x-full group-hover:translate-x-full transition-transform duration-2000 rounded-3xl" />

        {/* Background Particles */}
        <div className="absolute top-8 left-12 w-1 h-1 bg-amber-400/80 rounded-full animate-ping" />
        <div className="absolute bottom-12 right-16 w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse" />

        {/* Form Header */}
        <div className="mb-6 relative z-10 flex items-center justify-between">
          <div>
            <h3 className="text-2xl sm:text-3xl font-bold font-cinzel text-transparent bg-clip-text 
                           bg-gradient-to-r from-[#d4af37] to-amber-300 mb-1"
                style={{textShadow: '2px 2px 4px rgba(212,175,55,0.3)'}}>
              Edit Team Member
            </h3>
            <div className="w-16 h-1 bg-gradient-to-r from-[#d4af37] to-transparent rounded-full"></div>
          </div>
          <div className="text-xs text-amber-400/60 font-cinzel bg-gray-800/50 px-3 py-1 rounded-lg border border-amber-600/20">
            Order: {data.order || 999}
          </div>
        </div>

        {/* CURRENT IMAGE */}
        {data.image?.url && (
          <div className="mb-6 relative z-10">
            <label className="text-xs font-semibold text-amber-400/70 mb-3 block uppercase tracking-wider font-cinzel">
              Current Photo
            </label>
            <div className="relative w-32 h-32 sm:w-40 sm:h-40 rounded-2xl overflow-hidden border-2 border-amber-600/30 
                            shadow-lg shadow-amber-400/20 group/img">
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                              -translate-x-full group-hover/img:translate-x-full transition-transform duration-1000" />
              <img
                src={data.image.url}
                alt={data.name}
                className="w-full h-full object-cover relative z-10"
              />
            </div>
          </div>
        )}

        {/* NAME */}
        <div className="mb-6 relative z-10">
          <label className="text-xs font-semibold text-amber-400/80 mb-2 block uppercase tracking-wider font-cinzel">
            Member Name
          </label>
          <input
            type="text"
            {...register("name")}
            className="w-full text-xl sm:text-2xl font-bold text-gray-100 bg-gray-900/50 
                       border-b-2 border-amber-600/30 focus:border-amber-500/60 
                       outline-none transition-all duration-300 pb-2 px-2 font-cinzel
                       placeholder:text-gray-600"
            placeholder="Enter name"
          />
        </div>

        {/* POSITION */}
        <div className="mb-6 relative z-10">
          <label className="text-xs font-semibold text-amber-400/70 mb-2 block uppercase tracking-wider font-cinzel">
            Position
          </label>
          <input
            type="text"
            {...register("position")}
            className="w-full text-base sm:text-lg text-gray-300 bg-gray-900/50 font-playfair
                       border-b border-gray-700 focus:border-amber-500/40 
                       outline-none transition-all duration-300 pb-2 px-2
                       placeholder:text-gray-600"
            placeholder="Enter position"
          />
        </div>

        {/* ORDER/RANK */}
        <div className="mb-6 relative z-10">
          <label className="text-xs font-semibold text-amber-400/70 mb-2 block uppercase tracking-wider font-cinzel">
            Display Order <span className="text-amber-400/60 normal-case font-playfair">(Lower = appears first)</span>
          </label>
          <input
            type="number"
            {...register("order", {
              min: { value: 1, message: "Order must be at least 1" },
              pattern: { value: /^\d+$/, message: "Only numbers allowed" }
            })}
            className="w-full text-base sm:text-lg text-gray-300 bg-gray-900/50 font-playfair
                       border-b border-gray-700 focus:border-amber-500/40 
                       outline-none transition-all duration-300 pb-2 px-2
                       placeholder:text-gray-600"
            placeholder="999"
          />
          <p className="mt-2 text-xs text-amber-400/60 font-playfair normal-case">
            Tip: Use 1 for President, 2 for Vice President, etc. Lower numbers appear first.
          </p>
          {errors.order && (
            <p className="mt-2 text-xs text-red-400 font-playfair">{errors.order.message}</p>
          )}
        </div>

        {/* NEW IMAGE */}
        <div className="mb-6 relative z-10">
          <label className="text-xs font-semibold text-amber-400/70 mb-2 block uppercase tracking-wider font-cinzel">
            Update Photo (Optional)
          </label>
          <input
            type="file"
            accept="image/*"
            {...register("image")}
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

        {/* MESSAGE DISPLAY */}
        {(msg || del_post.msg) && (
          <div className="mb-6 p-4 rounded-xl border border-amber-600/20 bg-gray-800/50 relative z-10">
            <p className="text-sm sm:text-base text-gray-300 font-playfair">{del_post.msg || msg}</p>
          </div>
        )}

        {/* BUTTON GROUP */}
        <div className="space-y-3 mt-auto pt-4 relative z-10">
          {/* UPDATE BUTTON */}
          <button
            type="submit"
            disabled={!canUpdate}
            className={`
              w-full px-6 py-3 rounded-xl font-bold font-cinzel text-base sm:text-lg
              bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 
              shadow-lg border border-amber-600/30
              transition-all duration-500 relative overflow-hidden group/btn
              ${
                !canUpdate
                  ? "opacity-40 cursor-not-allowed"
                  : "hover:scale-[1.02] hover:shadow-2xl hover:shadow-amber-400/30 cursor-pointer"
              }
            `}
          >
            <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                            -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 rounded-xl" />
            <span className="relative z-10 flex items-center justify-center gap-2">
              {canUpdate ? "Update Member →" : "No Changes to Save"}
            </span>
          </button>

          {/* DELETE BUTTON */}
          {role?.toUpperCase().trim() === "SUPERADMIN" && (
            <>
              {!showDeleteConfirm ? (
                <button
                  type="button"
                  onClick={() => del_fnx(data._id)}
                  className="w-full cursor-pointer px-6 py-3 rounded-xl font-bold font-cinzel text-base sm:text-lg
                             bg-gradient-to-r from-red-500 to-red-700 text-gray-100
                             hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-400/30
                             transition-all duration-500 shadow-lg
                             relative overflow-hidden group/del"
                >
                  <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                                  -translate-x-full group-hover/del:translate-x-full transition-transform duration-1000 rounded-xl" />
                  <span className="relative z-10">Delete Member →</span>
                </button>
              ) : (
                <div className="p-4 rounded-xl border-2 border-red-500/50 bg-red-900/20 relative z-10">
                  <p className="text-sm font-bold text-red-300 mb-3 font-cinzel">
                    Are you sure you want to delete <span className="text-amber-300">{data.name}</span>?
                  </p>
                  <div className="flex gap-3">
                    <button
                      type="button"
                      onClick={() => del_fnx(data._id)}
                      className="flex-1 px-4 py-2 rounded-lg font-bold font-cinzel text-sm
                                 bg-gradient-to-r from-red-600 to-red-700 text-white
                                 hover:scale-105 transition-all duration-300"
                    >
                      Yes, Delete
                    </button>
                    <button
                      type="button"
                      onClick={cancelDelete}
                      className="flex-1 px-4 py-2 rounded-lg font-bold font-cinzel text-sm
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
      </form>
    </div>
  );
};

export default TeamCards;