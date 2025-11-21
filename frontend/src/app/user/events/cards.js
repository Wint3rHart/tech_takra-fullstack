import usePost from "@/client_hooks/usePost";
import Link from "next/link";
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

  return (
    <div className="space-y-8">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 
                   rounded-3xl shadow-2xl p-6 sm:p-8 border border-amber-600/20
                   hover:shadow-3xl hover:shadow-amber-400/10 transition-all duration-500
                   relative group overflow-hidden"
      >
        {/* Ambient Light Effect */}
        <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent 
                        -translate-x-full group-hover:translate-x-full transition-transform duration-2000 rounded-3xl" />

        {/* Floating Particles */}
        <div className="absolute top-8 right-12 w-1 h-1 bg-amber-400/80 rounded-full animate-ping shadow-lg shadow-amber-400/60"></div>
        <div className="absolute top-20 left-20 w-1.5 h-1.5 bg-amber-300/60 rounded-full animate-pulse shadow-md shadow-amber-300/50"></div>
        <div className="absolute bottom-16 right-24 w-0.5 h-0.5 bg-white/60 rounded-full animate-ping delay-700 shadow-sm shadow-white/40"></div>

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

        {/* Header with Index Badge */}
        <div className="flex items-center gap-4 mb-8 pb-6 border-b-2 border-amber-600/20 relative z-10">
          <div className="px-6 py-3 bg-gradient-to-br from-[#d4af37] via-amber-500 to-amber-600 
                          rounded-2xl flex items-center justify-center shadow-lg shadow-amber-400/30
                          border border-amber-600/30 relative overflow-hidden group/icon">
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent 
                            -translate-x-full group-hover/icon:translate-x-full transition-transform duration-1000" />
            <h2 className="text-xl font-black text-gray-900 relative z-10 font-cinzel">
              #{i}
            </h2>
          </div>
          <div>
            <p className="text-xs text-amber-400/60 uppercase tracking-wider font-cinzel">Event</p>
            <h3 className="text-2xl font-bold text-transparent bg-clip-text 
                           bg-gradient-to-r from-[#d4af37] to-amber-300 font-cinzel"
                style={{ textShadow: '2px 2px 4px rgba(212,175,55,0.3)' }}>
              Event Details
            </h3>
          </div>
        </div>

        {/* Main Content Card */}
        <div className="group/card bg-gradient-to-br from-gray-800 via-gray-900 to-black
                        rounded-2xl p-6 border border-amber-600/20
                        hover:border-amber-500/40 hover:shadow-xl hover:shadow-amber-400/10
                        transition-all duration-500 relative overflow-hidden">

          {/* Card Shimmer */}
          <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent 
                          -translate-x-full group-hover/card:translate-x-full transition-transform duration-2000 rounded-2xl" />

          {/* Event ID Badge */}
          <div className="mb-6 relative z-10">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-[#d4af37] to-amber-500 
                              flex items-center justify-center shadow-lg shadow-amber-400/20">
                <span className="text-2xl">📅</span>
              </div>
              <div>
                <p className="text-xs text-amber-400/60 uppercase tracking-wider font-cinzel">Event ID</p>
                <p className="text-sm font-bold text-gray-300 font-mono">{data._id}</p>
              </div>
            </div>
          </div>

          {/* Decorative Divider */}
          <div className="flex justify-center items-center gap-3 my-5 relative z-10">
            <div className="h-[2px] w-16 bg-gradient-to-r from-transparent to-amber-400/50"></div>
            <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse"></div>
            <div className="h-[2px] w-16 bg-gradient-to-l from-transparent to-amber-400/50"></div>
          </div>

          {/* TITLE */}
          <div className="mb-5 relative z-10">
            <label className="text-xs font-semibold text-amber-400/70 mb-2 block uppercase tracking-wider font-cinzel">
              Event Title
            </label>
            <input
              type="text"
              {...register("title")}
              className="w-full text-2xl font-black text-transparent bg-clip-text 
                         bg-gradient-to-r from-[#d4af37] to-amber-300 font-cinzel
                         bg-transparent border-b-2 border-amber-600/30 focus:border-amber-500/60 
                         outline-none transition-all duration-300 pb-2"
              style={{ textShadow: '1px 1px 2px rgba(212,175,55,0.3)' }}
            />
          </div>

          {/* Location & Date Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-5 relative z-10">
            {/* Location */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-amber-600/20
                            hover:border-amber-500/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider font-cinzel">Location</span>
              </div>
              <input
                type="text"
                {...register("location")}
                className="w-full text-lg font-bold text-amber-300 font-playfair
                           bg-transparent outline-none"
              />
            </div>

            {/* Date */}
            <div className="bg-gray-800/50 rounded-xl p-4 border border-amber-600/20
                            hover:border-amber-500/40 transition-all duration-300">
              <div className="flex items-center gap-2 mb-2">
                <svg className="w-4 h-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2}
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span className="text-xs text-gray-400 font-semibold uppercase tracking-wider font-cinzel">Date</span>
              </div>
              <input
                type="text"
                {...register("date")}
                className="w-full text-lg font-bold text-amber-300 font-playfair
                           bg-transparent outline-none"
              />
            </div>
          </div>

          {/* Category */}
          <div className="mb-5 relative z-10">
            <label className="text-xs font-semibold text-amber-400/70 mb-2 block uppercase tracking-wider font-cinzel">
              Category
            </label>
            <input
              type="text"
              {...register("category")}
              className="w-full text-base text-gray-300 font-playfair
                         bg-transparent border-b border-gray-700 focus:border-amber-500/40 
                         outline-none transition-all duration-300 pb-2"
            />
          </div>

          {/* Description */}
          <div className="mb-5 p-4 bg-gray-800/30 rounded-xl border border-amber-600/10 relative z-10">
            <label className="text-xs text-amber-400/70 font-semibold mb-2 block uppercase tracking-wider font-cinzel">
              Description
            </label>
            <textarea
              {...register("description")}
              rows={4}
              className="w-full text-sm text-gray-300 font-playfair leading-relaxed
                         bg-transparent outline-none resize-none"
            />
          </div>

          {/* File Input */}
          <div className="mb-5 relative z-10">
            <label className="text-xs font-semibold text-amber-400/70 mb-2 block uppercase tracking-wider font-cinzel">
              Event Images
            </label>
            <input
              type="file"
              multiple
              accept="image/*"
              {...register("images")}
              className="w-full text-sm text-gray-400 font-playfair
                         file:mr-4 file:py-2 file:px-4
                         file:rounded-lg file:border-0
                         file:text-sm file:font-semibold file:font-cinzel
                         file:bg-gradient-to-r file:from-[#d4af37] file:to-amber-500
                         file:text-gray-900 file:cursor-pointer
                         hover:file:scale-105 file:transition-all file:duration-300"
            />
          </div>

          {/* Featured Fields */}
          {Array.isArray(defaultValues.featured) && defaultValues.featured.length > 0 && (
            <div className="mb-5 p-4 bg-gray-800/30 rounded-xl border border-amber-600/10 relative z-10">
              <label className="text-xs font-semibold text-amber-400/70 mb-3 block uppercase tracking-wider font-cinzel">
                Featured Items
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {defaultValues.featured.map((item, idx) => (
                  <input
                    key={idx}
                    defaultValue={item}
                    {...register(`featured.${idx}`)}
                    className="text-sm text-gray-300 font-playfair
                               bg-gray-800/50 rounded-lg border border-gray-700 
                               focus:border-amber-500/40 outline-none 
                               transition-all duration-300 px-3 py-2"
                  />
                ))}
              </div>
            </div>
          )}

          {/* Update Button */}
          <button
            type="submit"
            disabled={!canUpdate}
            className={`w-full px-6 py-3 rounded-xl font-bold font-cinzel text-gray-900
                       bg-gradient-to-r from-[#d4af37] to-amber-500
                       shadow-lg border border-amber-600/30
                       transition-all duration-500 relative overflow-hidden group/btn z-10
                       ${!canUpdate 
                         ? "opacity-40 cursor-not-allowed" 
                         : "hover:from-amber-500 hover:to-[#d4af37] hover:shadow-2xl hover:shadow-amber-400/30 hover:scale-[1.02] cursor-pointer"}`}
          >
            <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                            -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000 rounded-xl'></div>
            <span className="relative z-10 flex items-center justify-center gap-2">
              Update Event
              <span className="transition-transform group-hover/btn:translate-x-1 duration-300">→</span>
            </span>
          </button>

          {/* Delete Button */}
          {role?.toUpperCase().trim() === "SUPERADMIN" && (
            <button
              type="button"
              onClick={() => del_fnx(data._id)}
              className="w-full mt-4 px-6 py-3 rounded-xl font-bold font-cinzel text-gray-900
                         bg-gradient-to-r from-red-500 to-red-700
                         hover:from-red-600 hover:to-red-800
                         shadow-lg hover:shadow-2xl hover:shadow-red-400/30
                         hover:scale-[1.02] transition-all duration-500
                         border border-red-600/30
                         relative overflow-hidden group/del z-10 cursor-pointer"
            >
              <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent 
                              -translate-x-full group-hover/del:translate-x-full transition-transform duration-1000 rounded-xl'></div>
              <span className="relative z-10 flex items-center justify-center gap-2">
                Remove Event
                <span className="transition-transform group-hover/del:translate-x-1 duration-300">→</span>
              </span>
            </button>
          )}

          {/* Message Display */}
          {del_post.msg||msg&& (
            <div className="mt-4 p-4 rounded-xl border text-white border-amber-600/20 bg-gray-500/50 relative z-10">
              <p className="text-sm text-white font-playfair">{del_post.msg||msg}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default Cards;