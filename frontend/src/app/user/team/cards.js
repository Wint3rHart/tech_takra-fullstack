import usePost from "@/client_hooks/usePost";
import React from "react";
import { useForm } from "react-hook-form";
import Link from "next/link";
const TeamCards = ({ data, i, role,access }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, defaultValues },
  } = useForm({
    defaultValues: {
      name: data.name,
      position: data.position,
      image: null,
    },
  });

  const watched = watch();
  const textChanged =
    JSON.stringify({
      name: watched.name,
      position: watched.position,
    }) !==
    JSON.stringify({
      name: defaultValues.name,
      position: defaultValues.position,
    });

  const fileChanged = watched.image && watched.image.length > 0;

  const canUpdate = textChanged || fileChanged;

  const { abort_ref, post, msg } = usePost("update_team", "PATCH",access);
  const del_post = usePost("delete_team", "DELETE",access);

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
    del_post.post.mutate({ data_id: id });
   
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative h-full flex flex-col bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                 rounded-3xl shadow-2xl border border-amber-600/20 
                 hover:shadow-3xl hover:shadow-amber-400/10 transition-all duration-500
                 p-6 sm:p-8 group overflow-hidden"
    >
      {/* Ambient Light Effect */}
      <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent 
                      -translate-x-full group-hover:translate-x-full transition-transform duration-2000 rounded-3xl" />

      {/* Background Particles */}
      <div className="absolute top-8 left-12 w-1 h-1 bg-amber-400/80 rounded-full animate-ping" />
      <div className="absolute bottom-12 right-16 w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse" />

      {/* Back Button */}
      <div className="mb-6 relative z-10">
        <Link
          href="/user"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-stone-900 font-bold text-sm
                     bg-gradient-to-r from-[#d4af37] to-amber-500
                     hover:from-amber-500 hover:to-[#d4af37]
                     transition-all duration-500 shadow-lg
                     hover:scale-105 hover:shadow-xl hover:shadow-amber-400/30
                     border border-amber-600/30
                     group/back relative overflow-hidden font-cinzel"
        >
          <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                          -translate-x-full group-hover/back:translate-x-full transition-transform duration-1000 rounded-xl'></div>
          <span className="relative z-10 transition-transform group-hover/back:-translate-x-1 duration-300">←</span>
          <span className="relative z-10">Back</span>
        </Link>
      </div>

      {/* ID Badge */}
      <div className="relative mb-6 p-4 bg-gradient-to-br from-gray-800 via-gray-900 to-black 
                      rounded-2xl border border-amber-600/20 shadow-lg">
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent 
                        opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-2xl" />
        <p className="text-xs text-amber-400/60 mb-1 relative z-10 font-cinzel">Member ID</p>
        <h2 className="text-lg font-bold text-transparent bg-clip-text 
                       bg-gradient-to-r from-[#d4af37] to-amber-300 relative z-10 font-cinzel"
            style={{textShadow: '2px 2px 4px rgba(212,175,55,0.3)'}}>
          {data._id}
        </h2>
      </div>

      {/* CURRENT IMAGE */}
      {data.image?.url && (
        <div className="mb-6 relative z-10">
          <label className="text-xs font-semibold text-amber-400/70 mb-3 block uppercase tracking-wider font-cinzel">
            Current Photo
          </label>
          <div className="relative w-32 h-32 rounded-2xl overflow-hidden border-2 border-amber-600/30 
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
      <div className="mb-4 relative z-10">
        <label className="text-xs font-semibold text-amber-400/80 mb-2 block uppercase tracking-wider font-cinzel">
          Member Name
        </label>
        <input
          type="text"
          {...register("name")}
          className="w-full text-2xl sm:text-3xl font-bold text-transparent bg-clip-text 
                     bg-gradient-to-r from-[#d4af37] to-amber-300 
                     bg-transparent border-b-2 border-amber-600/30 focus:border-amber-500/60 
                     outline-none transition-all duration-300 pb-2 font-cinzel"
          style={{textShadow: '1px 1px 3px rgba(212,175,55,0.2)'}}
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
          className="w-full text-base sm:text-lg text-gray-300 font-playfair
                     bg-transparent border-b border-gray-700 focus:border-amber-500/40 
                     outline-none transition-all duration-300 pb-2"
        />
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
          className="w-full text-sm text-gray-400 font-playfair
                     file:mr-4 file:py-2 file:px-4
                     file:rounded-lg file:border-0
                     file:text-sm file:font-semibold file:font-cinzel
                     file:bg-gradient-to-r file:from-[#d4af37] file:to-amber-500
                     file:text-gray-900 file:cursor-pointer
                     hover:file:scale-105 file:transition-all file:duration-300"
        />
      </div>

      {/* MESSAGE DISPLAY */}
      {msg && (
        <div className="mb-4 p-4 rounded-xl border border-amber-600/20 bg-gray-800/50 relative z-10">
          <p className="text-sm text-gray-300 font-playfair">{msg}</p>
        </div>
      )}

      {/* BUTTON GROUP */}
      <div className="space-y-3 mt-auto pt-4 relative z-10">
        {/* UPDATE BUTTON */}
        <button
          type="submit"
          disabled={!canUpdate}
          className={`
            w-full px-6 py-3 rounded-xl font-bold font-cinzel
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
          <span className="relative z-10">Update Member →</span>
        </button>

        {/* DELETE BUTTON */}
        {role?.toUpperCase().trim() === "SUPERADMIN" && (
          <button
            type="button"
            onClick={() => del_fnx(data._id)}
            className="w-full cursor-pointer px-6 py-3 rounded-xl font-bold font-cinzel text-gray-900
                       bg-gradient-to-r from-red-500 to-red-700 
                       hover:scale-[1.02] hover:shadow-2xl hover:shadow-red-400/30
                       transition-all duration-500 shadow-lg
                       relative overflow-hidden group/del"
          >
            <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                            -translate-x-full group-hover/del:translate-x-full transition-transform duration-1000 rounded-xl" />
            <span className="relative z-10">Remove Member →</span>
          </button>
          
        )}
      </div>
       {/* Message */}
        <div className="mb-4 p-3 rounded-xl border border-amber-600/10 relative z-10">
          <p className="text-xs text-gray-400 font-semibold mb-1"></p>
          <p className="text-lg text-gray-300">{del_post.msg||msg}</p>
        </div>
    </form>
  );
};

export default TeamCards;