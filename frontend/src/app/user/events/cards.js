import usePost from "@/client_hooks/usePost";
import React, { useEffect } from "react";
import { useForm } from "react-hook-form";

const Cards = ({ data, i, role,access }) => {
  console.log(access,"ppp");
  
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

  const fileChanged = watched.images && watched.images.length > 0;
  const canUpdate = textChanged || fileChanged;

  const { abort_ref, post, msg } = usePost("update_event", "PATCH",access);
  const del_post = usePost("delete_event", "DELETE",access);
useEffect(()=>{console.log(del_post.msg);
},[del_post.msg,msg])
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

   
  };
useEffect(()=>{console.log("msg from postings",msg)
},[msg])
  const del_fnx = (id) => {
    del_post.post.mutate({ data_id: id });
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
              #{String(i + 1).padStart(2,"0")}
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold">Event</p>
              <h3 className="text-2xl font-inter text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-200 drop-shadow-[1px_1px_2px_rgba(212,175,55,0.3)]">
                {data?.title || data?.name || "Untitled Event"}
              </h3>
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
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Location</p>
            <input
              type="text"
              {...register("location")}
              className="w-full text-lg text-gray-200 font-poppins bg-transparent border-none outline-none"
              placeholder="Enter location"
            />
          </div>
          <div className="bg-gray-800/60 border border-amber-600/20 rounded-2xl p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Date</p>
            <input
              type="text"
              {...register("date")}
              className="w-full text-lg text-gray-200 font-poppins bg-transparent border-none outline-none"
              placeholder="Enter date"
            />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Category</p>
            <input
              type="text"
              {...register("category")}
              className="w-full text-base text-gray-200 font-poppins bg-transparent border-none outline-none"
              placeholder="Enter category"
            />
          </div>
          <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Event Images</p>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("images")}
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

        {/* Title Input */}
        <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Event Title</p>
          <input
            type="text"
            {...register("title")}
            className="w-full text-xl font-bold text-gray-100 bg-transparent border-none outline-none font-inter"
            placeholder="Enter event title"
          />
        </div>

        {/* Description Input */}
        <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-2">Description</p>
          <textarea
            {...register("description")}
            className="w-full text-base text-gray-300 bg-transparent border-none outline-none font-poppins
                       min-h-[120px] resize-y placeholder:text-gray-600"
            placeholder="Enter event description..."
          />
        </div>

        {/* Featured Fields */}
        {Array.isArray(defaultValues.featured) && defaultValues.featured.length > 0 && (
          <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
            <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-3">Featured Items</p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {defaultValues.featured.map((item, idx) => (
                <input
                  key={idx}
                  defaultValue={item}
                  {...register(`featured.${idx}`)}
                  className="text-sm text-gray-300 font-poppins
                             bg-gray-800/50 rounded-lg border border-gray-700 
                             focus:border-amber-500/40 outline-none 
                             transition-all duration-300 px-3 py-2"
                />
              ))}
            </div>
          </div>
        )}

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
                {canUpdate ? "Update Event →" : "No Changes"}
              </span>
            </button>
            {role?.toUpperCase().trim() === "SUPERADMIN" && (
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
                  Delete Event
                  <span className="transition-transform group-hover/btn:translate-x-1 duration-300">→</span>
                </span>
              </button>
            )}
          </div>
        </div>
      </form>
    </article>
  );
};

export default Cards;