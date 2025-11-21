"use client"
import Link from 'next/link';
import React, { useState, useMemo } from 'react';

const WanderingHartNavbar = ({data}) => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSigned, setSigned] = useState({status: false, data: null});
  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  const [isMobileEventsOpen, setIsMobileEventsOpen] = useState(false);

  const sign_display = useMemo(() => {
    return (
      <div className="hidden md:block relative h-full mt-10 group">
        <button className="relative bg-gradient-to-r from-amber-300/50 to-amber-400/50 hover:from-amber-400/70 hover:to-amber-500/70 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-400/40 hover:scale-105">
          {data?.status && (
            <Link href='/user' className='absolute hidden w-[10vw] font-poppins text-sm group-hover:block z-90 border rounded-xl mt-2 border-amber-400 p-4 left-10 sm:top-12 sm:-translate-x-8 md:top-11 md:-translate-x-12 text-amber-300 text-lg'>
              Open Admin Panel
            </Link>
          )}
          <Link href='/signUp' className="relative z-10 font-inter flex items-center text-white gap-2">
            {data?.status ? "Signed In" : "Sign In for Admins"}
          </Link>
          <div className="absolute inset-0 rounded-full border border-amber-300/30 group-hover:border-amber-200/50 transition-colors duration-300"></div>
        </button>
      </div>
    );
  }, [data]);

  const navItems = [
    { name: 'Team', href: '/team' },
    { name: 'Updates', href: '/updates' },
    { name: "Join Now", href: "/register" }
  ];

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 transition-all duration-500 bg-gray-900/95 backdrop-blur-md shadow-2xl shadow-black/50">
      <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-3000'></div>
      <div className="absolute top-2 left-20 w-1 h-1 bg-amber-400/60 rounded-full animate-pulse"></div>
      <div className="absolute top-4 right-32 w-0.5 h-0.5 bg-white/50 rounded-full animate-ping delay-700"></div>
      <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-amber-300/40 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1 right-1/4 w-0.5 h-0.5 bg-white/60 rounded-full animate-ping delay-300"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Logo */}
          <div className="flex-shrink-0 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-amber-400/20 rounded-full blur-lg group-hover:bg-amber-400/30 transition-all duration-300"></div>
              <img
                src="/ddddd.jpg"
                alt="CSS Logo"
                className="relative w-12 h-12 sm:w-14 sm:h-14 md:w-16 md:h-16 rounded-full object-cover border border-amber-200 group-hover:border-amber-300 transition-all duration-300"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <div className='relative group px-3 py-2 text-white hover:text-amber-400 transition-all duration-300 text-lg font-medium'>
                <Link href="/">
                  <div className="absolute inset-0 bg-amber-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  <span className="relative z-10 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[2px_2px_4px_rgba(212,175,55,0.4)]">
                    Home
                  </span>
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-300 shadow-lg shadow-amber-400/50"></div>
                  <div className="absolute -top-1 right-1 w-1 h-1 bg-amber-400/0 rounded-full group-hover:bg-amber-400/80 group-hover:animate-ping transition-all duration-300"></div>
                </Link>
              </div>

              {/* Desktop Events Dropdown - Hover */}
              <div className="relative" onMouseEnter={() => setIsCoursesDropdownOpen(true)} onMouseLeave={() => setIsCoursesDropdownOpen(false)}>
                <button className="flex items-center space-x-1 py-6 cursor-pointer text-stone-100 hover:text-amber-300 font-medium transition-colors duration-200 relative group">
                  <span>Events</span>
                  <svg className={`w-4 h-4 ml-1 transition-transform duration-200 ${isCoursesDropdownOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                  <div className="absolute inset-0 bg-amber-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                </button>
                <div className="absolute -top-1 right-1 w-1 h-1 bg-amber-400/0 rounded-full group-hover:bg-amber-400/80 group-hover:animate-ping transition-all duration-300"></div>
                <div className={`absolute top-15 flex flex-col items-center justify-center text-center -left-10 mt-2 w-40 bg-gray-800 rounded-2xl shadow-xl border border-amber-300 overflow-hidden transition-all duration-300 ${
                  isCoursesDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
                }`}>
                  <div className="p-6 flex flex-col">
                    <Link href='/events?type=upcoming' className="text-sm font-semibold cursor-pointer hover:text-amber-400/80 text-stone-100 uppercase tracking-wide mb-4">Upcoming Events</Link>
                    <Link href='/events?type=past' className="text-sm font-semibold cursor-pointer hover:text-amber-400/80 text-stone-100 uppercase tracking-wide mb-4">Past Events</Link>
                  </div>
                </div>
              </div>

              {navItems.map((item, index) => (
                <div key={index} className='relative group px-3 py-2 text-white hover:text-amber-400 transition-all duration-300 text-lg font-medium'>
                  <Link href={item.href}>
                    <div className="absolute inset-0 bg-amber-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                    <span className="relative z-10 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[2px_2px_4px_rgba(212,175,55,0.4)]">
                      {item.name}
                    </span>
                    <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-300 shadow-lg shadow-amber-400/50"></div>
                    <div className="absolute -top-1 right-1 w-1 h-1 bg-amber-400/0 rounded-full group-hover:bg-amber-400/80 group-hover:animate-ping transition-all duration-300"></div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {sign_display}

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="relative group p-2 text-white hover:text-amber-400 transition-colors duration-300"
            >
              <div className="absolute inset-0 bg-amber-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
              {isMobileMenuOpen ? (
                <span className="relative z-10 text-2xl">✕</span>
              ) : (
                <span className="relative z-10 text-2xl">☰</span>
              )}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <div className={`md:hidden overflow-hidden transition-all duration-500 ${
        isMobileMenuOpen ? 'max-h-[500px] opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-gray-900/98 backdrop-blur-md border-t border-amber-400/20">
          <div className="px-4 pt-2 pb-4 space-y-1">
            {/* Home Link */}
            <Link
              href="/"
              className="group block px-3 py-3 text-white hover:text-amber-400 text-base font-medium transition-all duration-300 rounded-lg hover:bg-amber-400/10"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <span className="drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[2px_2px_4px_rgba(212,175,55,0.4)]">
                Home
              </span>
            </Link>

            {/* Mobile Events Dropdown - Click to toggle */}
            <div className="relative">
              <button
                onClick={() => setIsMobileEventsOpen(!isMobileEventsOpen)}
                className="w-full flex items-center justify-between px-3 py-3 text-white hover:text-amber-400 text-base font-medium transition-all duration-300 rounded-lg hover:bg-amber-400/10"
              >
                <span className="drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)]">Events</span>
                <svg className={`w-4 h-4 transition-transform duration-300 ${isMobileEventsOpen ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              
              {/* Mobile Events Submenu */}
              <div className={`overflow-hidden transition-all duration-300 ${
                isMobileEventsOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="pl-6 py-2 space-y-2 bg-gray-800/50 rounded-lg mx-2 mt-1">
                  <Link
                    href='/events?type=upcoming'
                    className="block px-3 py-2 text-sm text-stone-200 hover:text-amber-400 transition-colors duration-200"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsMobileEventsOpen(false);
                    }}
                  >
                    Upcoming Events
                  </Link>
                  <Link
                    href='/events?type=past'
                    className="block px-3 py-2 text-sm text-stone-200 hover:text-amber-400 transition-colors duration-200"
                    onClick={() => {
                      setIsMobileMenuOpen(false);
                      setIsMobileEventsOpen(false);
                    }}
                  >
                    Past Events
                  </Link>
                </div>
              </div>
            </div>

            {/* Other Nav Items */}
            {navItems.map((item, index) => (
              <Link
                key={item.name}
                href={item.href}
                className="group block px-3 py-3 text-white hover:text-amber-400 text-base font-medium transition-all duration-300 rounded-lg hover:bg-amber-400/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[2px_2px_4px_rgba(212,175,55,0.4)]">
                  {item.name}
                </span>
              </Link>
            ))}

            {/* Mobile Sign In Button */}
            <div className="pt-4 px-2">
              <Link
                href='/signUp'
                className="block w-full text-center bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-amber-500/30"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {data?.status ? "Signed In" : "Sign In for Admins"}
              </Link>
              {data?.status && (
                <Link
                  href='/user'
                  className="block w-full text-center mt-2 border border-amber-400 text-amber-300 px-6 py-3 rounded-full font-semibold transition-all duration-300 hover:bg-amber-400/10"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Open Admin Panel
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default WanderingHartNavbar;