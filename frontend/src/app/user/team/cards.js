import usePost from "@/client_hooks/usePost";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const TeamCards = ({ data, i }) => {
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
  const textChanged = JSON.stringify({
    name: watched.name,
    position: watched.position,
  }) !== JSON.stringify({
    name: defaultValues.name,
    position: defaultValues.position,
  });

  const fileChanged = watched.image && watched.image.length > 0;

  const canUpdate = textChanged || fileChanged;

  const { abort_ref, post, msg } = usePost("update_team", "PATCH");
  const del_post = usePost("delete_team", "DELETE");

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
        let timer= setTimeout(() => {
      abort_ref.current.abort("Took too long");
      clearTimeout(timer);
    }, 10000);
  };

  const del_fnx = (id) => {
    del_post.post.mutate({ data_id: id });  
      let timer= setTimeout(() => {
      abort_ref.current.abort("Took too long");
      clearTimeout(timer);
    }, 10000);
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="relative h-full flex flex-col justify-end border-1 border-amber-500 rounded-xl p-4 sm:p-6 pb-6 sm:pb-8"
    >
      {/* ID */}
      <div className="h-full w-full bg-gradient-to-br from-[#d4af37] via-amber-500 to-amber-600 
          rounded-2xl flex items-center justify-center text-3xl shadow-lg
          border border-amber-600/30 relative overflow-hidden group/icon">
        <h2 className="text-xl font-black text-transparent bg-clip-text 
            bg-gradient-to-r from-white to-amber-300/90">
          {data._id}
        </h2>
      </div>

      {/* CURRENT IMAGE */}
      {data.image?.url && (
        <div className="mt-4 mb-2">
          <label className="text-xs text-amber-200/60 mb-1 block">Current Image</label>
          <img
            src={data.image.url}
            alt={data.name}
            className="w-32 h-32 object-cover rounded-lg border-2 border-amber-400/30"
          />
        </div>
      )}

      {/* NAME */}
      <label className="text-xs mt-6 text-amber-200/60 mb-1">Name</label>
      <input
        type="text"
        {...register("name")}
        className="text-2xl sm:text-3xl font-bold text-amber-50 bg-transparent outline-none"
      />

      {/* POSITION */}
      <label className="text-xs text-amber-200/60 mb-1 mt-3">Position</label>
      <input
        type="text"
        {...register("position")}
        className="text-base sm:text-lg text-yellow-300 bg-transparent outline-none"
      />

      {/* NEW IMAGE */}
      <label className="text-xs mt-6 text-amber-200/60 mb-1">Update Image (optional)</label>
      <input
        type="file"
        accept="image/*"
        {...register("image")}
        className="text-sm text-gray-200 bg-transparent outline-none"
      />

      {/* UPDATE BUTTON */}
      <button
        type="submit"
        disabled={!canUpdate}
        className={`
          w-full mt-6 px-6 py-3 rounded-xl font-bold transition-all duration-500
          bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 
          ${!canUpdate ? "opacity-40 cursor-not-allowed" : "hover:scale-102 cursor-pointer"}
        `}
      >
        Update Member →
      </button>

      {/* DELETE BUTTON */}
      <button
        type="button"
        onClick={() => del_fnx(data._id)}
        className="w-full cursor-pointer mt-4 px-6 py-3 rounded-xl font-bold text-gray-900
          bg-gradient-to-r from-red-500 to-red-700 hover:scale-102 transition-all duration-500"
      >
        Remove Member →
      </button>

      <div className="mb-4 p-3 mt-4 rounded-xl border border-amber-600/10">
        <p className="text-lg text-gray-300">{msg}</p>
      </div>
    </form>
  );
};

export default TeamCards;
