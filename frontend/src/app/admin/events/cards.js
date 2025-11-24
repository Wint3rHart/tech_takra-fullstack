import usePost from "@/client_hooks/usePost";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";

const Cards = ({ data, i, role, access }) => {
  console.log(access, "ppp");
  
  const {
    register,
    handleSubmit,
    watch,
    control,
    setValue,
    formState: { defaultValues },
  } = useForm({
    defaultValues: {
      title: data.title || data.name,
      location: data.location,
      date: data.date,
      description: data.description,
      category: data.category || "",
      featured: data.featured || [],
      imgs: [{ img: null }],
    },
  });

  const { fields, append, remove } = useFieldArray({ control, name: "imgs" });
  const watched = watch();
  const images = watch("imgs");

  // State to hold local preview URLs
  const [previewUrls, setPreviewUrls] = useState({});

  // Clean up object URLs when component unmounts
  useEffect(() => {
    return () => {
      Object.values(previewUrls).forEach(url => URL.revokeObjectURL(url));
    };
  }, [previewUrls]);

  // Handle file change and create preview URL
  const handleFileChange = (e, index) => {
    const file = e.target.files?.[0];
    
    if (file) {
      setValue(`imgs.${index}.img`, file, { shouldDirty: true });
      
      const url = URL.createObjectURL(file);
      
      if (previewUrls[index]) {
        URL.revokeObjectURL(previewUrls[index]);
      }
      
      setPreviewUrls(prev => ({ ...prev, [index]: url }));
    } else {
      setValue(`imgs.${index}.img`, null, { shouldDirty: true });
      if (previewUrls[index]) {
        URL.revokeObjectURL(previewUrls[index]);
        setPreviewUrls(prev => {
          const newPrev = { ...prev };
          delete newPrev[index];
          return newPrev;
        });
      }
    }
  };

  // Handle removal to clean up preview URL
  const handleRemove = (index) => {
    if (previewUrls[index]) {
      URL.revokeObjectURL(previewUrls[index]);
      setPreviewUrls(prev => {
        const newPrev = { ...prev };
        delete newPrev[index];
        return newPrev;
      });
    }
    remove(index);
  };

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

  // Check if any images have been added
  const fileChanged = images.some(item => item.img instanceof File);
  const canUpdate = textChanged || fileChanged;

  const { abort_ref, post, msg } = usePost("update_event", "PATCH", access);
  const del_post = usePost("delete_event", "DELETE", access);
  
  useEffect(() => {
    console.log(del_post.msg);
  }, [del_post.msg, msg]);

  const onSubmit = (formData) => {
    let form = new FormData();

    for (let key in formData) {
      const value = formData[key];

      if (key === "imgs") {
        // Only append images that are actually files (not null)
        value.forEach((x) => {
          if (x.img instanceof File) {
            form.append("images", x.img);
          }
        });
      } else if (Array.isArray(value)) {
        value.forEach((item, idx) => {
          form.append(`${key}[${idx}]`, item);
        });
      } else {
        form.append(key, value);
      }
    }

    post.mutate({ form, id: data._id });
  };
  
  useEffect(() => {
    console.log("msg from postings", msg);
  }, [msg]);

  const del_fnx = (id) => {
    del_post.post.mutate({ data_id: id });
  };

  const formattedDate = data?.createdAt ? new Date(data.createdAt).toLocaleString("en-GB", {
    day: "2-digit",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  }) : "Not available";

  const shortId = data?._id ? `${data._id.slice(0, 12)}...` : "N/A";

  return (
    <article className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 rounded-3xl border border-amber-600/20 shadow-2xl shadow-black/40 overflow-hidden relative group">
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent opacity-0 group-hover:opacity-60 transition-opacity duration-700"></div>

      <form onSubmit={handleSubmit(onSubmit)} className="relative z-10 p-6 sm:p-8 space-y-6">
        {/* Header */}
        <div className="flex flex-wrap items-start gap-6 justify-between border-b border-amber-600/20 pb-6">
          <div className="flex items-center gap-4">
          <Link
             
             href='/admin'
              className="p-2 bg-gray-800/60 hover:bg-gray-700/60 border border-amber-600/20 rounded-xl transition-all duration-300 hover:scale-105"
              title="Back to Admin"
            >
              <svg className="w-5 h-5 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
            </Link>  <div className="px-4 py-2 bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 rounded-2xl font-inter font-black shadow-lg shadow-amber-400/30 border border-amber-600/40">
              #{String(i + 1).padStart(2, "0")}
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

        {/* Image Fields Section */}
        <div className="bg-gray-800/40 rounded-2xl border border-amber-600/20 p-4">
          <p className="text-xs text-amber-400/90 font-poppins mb-2">Only JPG, JPEG, PNG images are allowed (Max 5MB, Max 5 images)</p>
          <p className="text-xs uppercase tracking-[0.3em] text-amber-400/70 font-semibold mb-4">Event Images</p>
          
          {fields.map((x, idx) => {
            return (
              <div key={x.id} className="relative space-y-3 mb-6 p-4 bg-gray-900/30 rounded-xl border border-amber-600/10">
                <input
                  type="file"
                  accept="image/jpeg,image/jpg,image/png"
                  onChange={(e) => handleFileChange(e, idx)}
                  className="w-full text-sm text-gray-300 bg-gray-900/50 rounded-lg p-3
                    border border-amber-600/20 focus:border-amber-500/40 
                    outline-none transition-all duration-300
                    file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0
                    file:text-sm file:font-semibold file:font-inter
                    file:bg-gradient-to-r file:from-[#d4af37] file:to-amber-500
                    file:text-gray-900 file:cursor-pointer
                    hover:file:scale-105 file:transition-all file:duration-300"
                />

                {/* Preview and Error */}
                <div className="flex items-start gap-3">
                  {previewUrls[idx] && (
                    <div className="flex-shrink-0">
                      <img
                        src={previewUrls[idx]}
                        alt="Preview"
                        className="h-24 w-24 rounded-lg object-cover border-2 border-amber-500/50 shadow-lg"
                      />
                    </div>
                  )}
                  <div className="flex-1">
                    {images[idx]?.img instanceof File ? (
                      <p className="text-xs text-gray-300 font-poppins mb-1">
                        📎 {images[idx].img.name}
                        <span className="text-gray-500 ml-2">
                          ({(images[idx].img.size / 1024).toFixed(1)} KB)
                        </span>
                      </p>
                    ) : (
                      <p className="text-xs text-gray-400 font-poppins italic">
                        No file chosen
                      </p>
                    )}
                  </div>
                </div>

                {/* Remove button */}
                {fields.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemove(idx)}
                    className="absolute top-2 right-2 p-1.5 w-7 h-7 bg-red-600/90 hover:bg-red-700 text-white rounded-full text-sm font-bold transition-all duration-300 hover:scale-110 shadow-lg"
                  >
                    ×
                  </button>
                )}
              </div>
            );
          })}

          {fields.length < 5 && (
            <button
              type="button"
              onClick={() => append({ img: null })}
              className="w-full text-sm text-gray-900 bg-gradient-to-r from-amber-400 to-amber-500 rounded-lg p-3 font-semibold mt-4 
                        hover:from-amber-500 hover:to-amber-600 transition-all duration-300 shadow-md hover:shadow-lg hover:scale-[1.02]"
            >
              ➕ Add Another Image ({fields.length}/5)
            </button>
          )}
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