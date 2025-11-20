import usePost from "@/client_hooks/usePost";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const Cards = ({ data, i }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { defaultValues },
  } = useForm({
    defaultValues: {
      title: data.title || data.name,
      location: data.location,
      date: data.date,
      description: data.description,
      category: data.category || "",
      featured: data.featured || [],
      images: null,
    },
  });

  const watched = watch();

  // TEXT FIELDS
  const textChanged =
    JSON.stringify({
      title: watched.title,
      location: watched.location,
      date: watched.date,
      description: watched.description,
      category: watched.category,
      featured: watched.featured,
    }) !==
    JSON.stringify({
      title: defaultValues.title,
      location: defaultValues.location,
      date: defaultValues.date,
      description: defaultValues.description,
      category: defaultValues.category,
      featured: defaultValues.featured,
    });

  // FILE INPUT
  const fileChanged = watched.images && watched.images.length > 0;

  const canUpdate = textChanged || fileChanged;

  const { abort_ref, post, msg } = usePost("update_event", "PATCH");
  const del_post = usePost("delete_event", "DELETE");

  const onSubmit = (formData) => {
    let form = new FormData();

    for (let key in formData) {
      const value = formData[key];

      if (value instanceof FileList) {
        Array.from(value).forEach((file) => form.append("images", file));
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
          rounded-2xl flex items-center justify-center text-3xl shadow-lg">
        <h2 className="text-xl font-black text-transparent bg-clip-text 
            bg-gradient-to-r from-white to-amber-300/90">
          {data._id}
        </h2>
      </div>

      {/* TITLE */}
      <label className="text-xs mt-6 text-amber-200/60 mb-1">Title</label>
      <input
        type="text"
        {...register("title")}
        className="text-2xl sm:text-3xl font-bold text-amber-50"
      />

      {/* LOCATION */}
      <label className="text-xs text-amber-200/60 mb-1">Location</label>
      <input
        type="text"
        {...register("location")}
        className="text-base sm:text-lg text-yellow-300"
      />

      {/* DATE */}
      <label className="text-xs text-amber-200/60 mb-1">Date</label>
      <input
        type="text"
        {...register("date")}
        className="text-base sm:text-lg text-yellow-300"
      />

      {/* DESCRIPTION */}
      <label className="text-xs text-amber-200/60 mb-1">Description</label>
      <textarea
        {...register("description")}
        className="text-sm text-gray-200"
      />

      {/* CATEGORY */}
      <label className="text-xs text-amber-200/60 mb-1">Category</label>
      <input
        type="text"
        {...register("category")}
        className="text-base sm:text-lg text-yellow-300"
      />

      {/* FILE INPUT */}
      <label className="text-xs mt-6 text-amber-200/60 mb-1">Images</label>
      <input
        type="file"
        multiple
        accept="image/*"
        {...register("images")}
        className="text-sm text-gray-200"
      />

      {/* FEATURED FIELDS */}
      {Array.isArray(defaultValues.featured) && (
        <div className="space-y-2 mt-4">
          <label className="text-xs text-amber-200/60">Featured</label>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 pl-6">
            {defaultValues.featured.map((item, idx) => (
              <input
                key={idx}
                defaultValue={item}
                {...register(`featured.${idx}`)}
                className="text-xs text-amber-200 bg-transparent outline-none"
              />
            ))}
          </div>
        </div>
      )}

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
        Update Event →
      </button>

      {/* DELETE BUTTON */}
      <button
        type="button"
        onClick={() => del_fnx(data._id)}
        className="w-full cursor-pointer mt-4 px-6 py-3 rounded-xl font-bold text-gray-900
          bg-gradient-to-r from-red-500 to-red-700 hover:scale-102 transition-all duration-500"
      >
        Remove Event →
      </button>

      <div className="mb-4 p-3 rounded-xl border border-amber-600/10">
        <p className="text-lg text-gray-300">{msg}</p>
      </div>
    </form>
  );
};

export default Cards;
