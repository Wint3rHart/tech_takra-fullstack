import React from "react";
import { cookies } from "next/headers";
import { Suspense } from "react";
import CryptoJS from "crypto-js";
import Link from "next/link";
import BgEffect from "@/util_comps/bg_effect";
// If you actually want to use the Ref_wrapper hero text component, uncomment & fix the path:
// import Ref_wrapper from "@/util_comps/Ref_wrapper";

const Page = async () => {
  try {
    const cookieStore = await cookies();

    const user = cookieStore.get("User-data")?.value;

    if (user) {
      const decrypt = CryptoJS.AES.decrypt(user, "125xyzabc").toString(
        CryptoJS.enc.Utf8
      );
      const parsed = JSON.parse(decrypt);
console.log(parsed,"decrypted user data");

      if (parsed) {
        if (new Date(parsed.expiry) > new Date()) {
          return (
            <div className="min-h-screen relative bg-gray-950 overflow-hidden">
              {/* Hero Background with GCU theme */}
              <div className="overflow-hidden group relative w-full min-h-screen text-white bg-gray-900 bg-[url('/gcu.jpg.jpg')] bg-blend-overlay bg-no-repeat bg-cover bg-bottom [mask-image:linear-gradient(180deg,black,black,rgb(0,0,0,0.7),black,black,rgb(0,0,0,0.8),rgb(0,0,0,0.6),transparent)]">
                <BgEffect />

                {/* Subtle vignette */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/70" />

                {/* Content */}
                <div className="relative z-10 py-8 px-4 sm:px-8 lg:px-16">
                  <User_header decrypt={parsed} />
                </div>
              </div>
            </div>
          );
        } else {
          throw new Error("User data not available. Please login again.");
        }
      } else {
        throw new Error("User Not Authorized. Please login again.");
      }
    } else {
      console.log("NO XXXX");
      throw new Error("User Not Authorized. Please login again.");
    }
  } catch (error) {
    console.log(error.message);

    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-950 relative overflow-hidden">
        {/* Background with same hero vibe */}
        <div className="absolute inset-0 bg-[url('/gcu.jpg.jpg')] bg-cover bg-bottom bg-no-repeat bg-blend-overlay opacity-60 [mask-image:linear-gradient(180deg,black,black,rgba(0,0,0,0.7),rgba(0,0,0,0.4),transparent)]" />
        <BgEffect />

        {/* Back Button - Top Left */}
        <div className="max-w-[150px] absolute top-8 left-4 sm:left-8 z-50">
          <Link
            href={"/"}
            className="w-28 h-[44px] text-base font-bold hover:scale-105 cursor-pointer transition-all duration-500 
                   text-stone-900 bg-gradient-to-r from-[#d4af37] to-amber-500
                   hover:from-amber-500 hover:to-[#d4af37]
                   rounded-full flex items-center justify-center gap-2
                   shadow-lg hover:shadow-2xl hover:shadow-amber-400/30
                   border border-amber-600/30
                   group relative overflow-hidden"
          >
            <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000 rounded-full" />
            <span className="relative z-10 transition-transform group-hover:-translate-x-1 duration-300">
              ←
            </span>
            <span className="relative z-10">Back</span>
          </Link>
        </div>

        {/* Error Card - Center, slightly more compact */}
        <div className="relative z-20 text-center px-6">
          <div
            className="p-10 sm:p-12 bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-black/90 
                    rounded-3xl shadow-2xl border border-amber-600/30 
                    max-w-2xl mx-auto group
                    hover:shadow-amber-400/20 transition-all duration-500 backdrop-blur-md"
          >
            {/* Shimmer on Card */}
            <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000 rounded-3xl" />

            {/* Icon with Glow */}
            <div className="relative inline-block mb-4 sm:mb-6">
              <div className="absolute inset-0 bg-amber-400/25 blur-xl rounded-full animate-pulse" />
              <div className="text-6xl sm:text-7xl relative z-10 filter drop-shadow-[0_0_20px_rgba(212,175,55,0.7)]">
                ⚠️
              </div>
            </div>

            {/* Error Title */}
            <h1
              className={`font-cinzel text-3xl sm:text-4xl md:text-5xl font-black mb-4
                      text-transparent bg-clip-text bg-gradient-to-r from-[#d4af37] to-amber-300
                      drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]`}
            >
              Session Expired
            </h1>

            {/* Error Message */}
            <div
              className={`font-playfair text-base sm:text-lg text-gray-200 mb-6 sm:mb-8 font-semibold
                       bg-gray-900/60 p-4 sm:p-6 rounded-2xl border border-amber-600/20`}
            >
              <p className="leading-relaxed">{error.message}</p>
            </div>

            {/* Decorative Line */}
            <div className="flex items-center justify-center gap-3 mb-4 sm:mb-6">
              <div className="h-[1px] w-16 bg-gradient-to-r from-transparent to-amber-400/60" />
              <div className="w-2 h-2 bg-amber-400 rounded-full animate-pulse" />
              <div className="h-[1px] w-16 bg-gradient-to-l from-transparent to-amber-400/60" />
            </div>

            {/* Helpful Message / CTA */}
            <p className={`font-playfair text-gray-300 text-xs sm:text-sm mb-4`}>
              Don&apos;t worry, you can continue your journey in a moment.
            </p>

            <Link
              href="/login"
              className="inline-flex items-center justify-center mt-2 px-6 py-3 rounded-full 
                         bg-gradient-to-r from-[#d4af37] to-amber-500 text-gray-900 font-semibold
                         shadow-lg shadow-amber-400/40 hover:shadow-amber-400/60
                         hover:scale-105 transition-all duration-300 border border-amber-600/40
                         group relative overflow-hidden"
            >
              <div className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/25 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
              <span className="relative z-10">Login Again →</span>
            </Link>
          </div>
        </div>

        {/* Small ambient dots (theme) */}
        <div className="absolute top-8 right-10 w-2 h-2 bg-amber-400/80 rounded-full animate-pulse shadow-lg shadow-amber-400/60" />
        <div className="absolute bottom-10 left-10 w-2 h-2 bg-amber-400/80 rounded-full animate-pulse delay-300 shadow-lg shadow-amber-400/60" />
      </div>
    );
  }
};

export default Page;

const User_header = ({ decrypt }) => {
  console.log(decrypt);

  return (
    <div className="max-w-7xl mx-auto relative">
      {/* Back Button */}
      <div className="absolute top-2 left-0 md:top-4 md:left-2 z-40">
        <Link
          href="/"
          className="mt-6 px-5 py-2.5 rounded-full text-stone-900 font-bold text-sm sm:text-base
                   bg-gradient-to-r from-[#d4af37] to-amber-500
                   hover:from-amber-500 hover:to-[#d4af37]
                   transition-all duration-500 shadow-lg
                   hover:scale-105 hover:shadow-2xl hover:shadow-amber-400/30
                   flex items-center gap-2 border border-amber-600/40
                   group relative overflow-hidden"
        >
          <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
          <span className="relative z-10 transition-transform group-hover:-translate-x-1 duration-300">
            ←
          </span>
          <span className="relative z-10">Back</span>
        </Link>
      </div>

      {/* Top: hero title & user info */}
      <div className="pt-24 md:pt-32 lg:pt-36 pb-10">
        {/* Main heading in hero style */}
        <div className="text-center mb-10">
          <p className="font-cinzel text-sm sm:text-base tracking-[0.35em] text-amber-200/70 uppercase mb-2">
            GCU Computer Science Society
          </p>
          <h1
            className="font-cinzel text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-black 
                       text-[#d4af37]
                       "
          >
            Member Dashboard
          </h1>
          <p className="mt-4 text-sm sm:text-base text-amber-100/80 font-playfair">
            “Empowering students through technology, innovation, and community.”
          </p>
        </div>

        {/* User card */}
        <div
          className="bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-black/90 
                     rounded-3xl shadow-2xl overflow-hidden 
                     border border-amber-600/30 
                     hover:shadow-amber-400/30 transition-all duration-500
                     relative group backdrop-blur-md"
        >
          {/* Subtle sweep */}
          <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-2000" />

          <div className="px-6 sm:px-10 py-8 sm:py-10 flex flex-col md:flex-row gap-6 md:gap-10 items-start md:items-center">
            {/* Avatar */}
            <div
              className="w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32 rounded-3xl 
                         bg-gradient-to-br from-[#d4af37] via-amber-500 to-amber-600
                         shadow-2xl shadow-amber-400/30 border-4 border-gray-900 
                         flex items-center justify-center relative overflow-hidden group/avatar"
            >
              <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/avatar:translate-x-full transition-transform duration-1000" />
              <span className="font-cinzel text-4xl sm:text-5xl md:text-5xl font-black text-gray-900 relative z-10 drop-shadow-lg">
                {decrypt?.name?.charAt(0)?.toUpperCase() || "U"}
              </span>
            </div>

            {/* Name / email / role */}
            <div className="space-y-2 sm:space-y-3">
              <h2
                className="font-cinzel text-3xl sm:text-4xl md:text-5xl font-black text-transparent bg-clip-text 
                              bg-gradient-to-r from-[#d4af37] to-amber-200
                              drop-shadow-[2px_2px_4px_rgba(212,175,55,0.4)]"
              >
                {decrypt?.name}
              </h2>

              <div className="flex flex-wrap items-center gap-3 text-sm sm:text-base text-gray-200 font-playfair">
                <span className="inline-flex items-center gap-2">
                  <svg
                    className="w-5 h-5 text-amber-400"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span className="font-semibold break-all">
                    {decrypt?.email}
                  </span>
                </span>

                {decrypt?.role && (
                  <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/15 border border-amber-400/40 text-amber-100 text-xs sm:text-sm font-semibold">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    {decrypt.role === "super_admin"
                      ? "Super Admin"
                      : decrypt.role}
                  </span>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation cards aligned with hero theme */}
      <div className="mt-10 md:mt-14 pb-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
        {[
          { label: "Registrations", href: "/user/registrations" },
          { label: "Events", href: "/user/events" },
          { label: "Team", href: "/user/team" },
          { label: "Announcements", href: "/user/announcements" },
          ...(decrypt?.role === "SuperAdmin"
            ? [{ label: "Admins", href: "/user/admins" }]
            : []),
        ].map((item, i) => (
          <Link
            key={i}
            href={item.href}
            className="group relative overflow-hidden rounded-3xl border border-amber-500/35
                       bg-gradient-to-br from-gray-900/95 via-gray-900/90 to-black
                       p-8 sm:p-9 shadow-xl hover:shadow-amber-400/25 hover:scale-[1.03]
                       transition-all duration-500 cursor-pointer backdrop-blur-md"
          >
            {/* Glow sweep */}
            <div className="absolute inset-0 w-full -translate-x-full
                            group-hover:translate-x-full transition-transform duration-[1800ms]
                            bg-gradient-to-r from-transparent via-amber-300/18 to-transparent" />

            {/* Tiny lights */}
            <div className="absolute top-5 left-7 w-1 h-1 rounded-full bg-amber-400/80 animate-ping" />
            <div className="absolute bottom-7 right-9 w-2 h-2 rounded-full bg-amber-500/70 animate-pulse" />

            <h2
              className="text-2xl sm:text-3xl font-cinzel font-bold 
                          bg-gradient-to-r from-[#d4af37] to-amber-300 text-transparent bg-clip-text
                          drop-shadow-[2px_2px_3px_rgba(212,175,55,0.35)]"
            >
              {item.label}
            </h2>

            <p className="text-gray-300/90 mt-3 font-playfair text-sm sm:text-base">
              Go to {item.label.toLowerCase()} section →
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
};
