import React, { useState, useEffect } from 'react';

const WanderingHartNavbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isSigned, setSigned] = useState({ status: false, data: null });
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = [
    { name: 'Home', href: '/hotels' },
    { name: 'AboutUs', href: '/cities' },
    { name: 'Events', href: '/signUp' }, { name: 'Teams', href: '/signUp' },{name:"Announcements",href:""}
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled ? 'bg-gray-900/95 backdrop-blur-md shadow-2xl shadow-black/50' : 'bg-gray-900/90 backdrop-blur'
      }`}
    >
      {/* Magical shimmer effect */}
      <div className="pointer-events-none absolute inset-0 w-full bg-gradient-to-r from-transparent via-amber-400/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-[3000ms]" />

      {/* Floating particles for navbar */}
      <div className="pointer-events-none absolute top-2 left-20 w-1 h-1 bg-amber-400/60 rounded-full animate-pulse" />
      <div className="pointer-events-none absolute top-4 right-32 w-0.5 h-0.5 bg-white/50 rounded-full animate-ping delay-700" />
      <div className="pointer-events-none absolute bottom-2 left-1/3 w-1 h-1 bg-amber-300/40 rounded-full animate-pulse delay-1000" />
      <div className="pointer-events-none absolute top-1 right-1/4 w-0.5 h-0.5 bg-white/60 rounded-full animate-ping delay-300" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-20 items-center justify-between">
          {/* Logo (RESPONSIVE + PROPER SIZING) */}
          <a
            href="/"
            aria-label="Wandering Hart Home"
            className="group relative flex-shrink-0 cursor-pointer"
          >
            <div className="relative flex items-center">
              {/* Glow behind the logo */}
              <div className="absolute -inset-1 rounded-full bg-amber-400/20 blur-lg transition-all duration-300 group-hover:bg-amber-400/30" />

              {/* 
                Image sizing rules:
                - h-10 on mobile (40px tall), h-12 md:h-14 on larger screens
                - w-auto preserves aspect ratio
                - object-contain ensures no cropping
                - rounded-full if your logo is circular; remove if you need square corners
              */}
              <img
                src="/GCU logo.jpg"
                alt="Wandering Hart"
                className="relative z-10 h-10 w-auto object-contain sm:h-11 md:h-12 lg:h-14 rounded-full"
                draggable="false"
              />

              {/* Optional title badge (hidden text container kept for structure) */}
              <h1 className="sr-only">
                Wandering Hart
              </h1>
            </div>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">
              <div className="relative group px-3 py-2 text-lg font-medium text-white transition-all duration-300 hover:text-amber-400">
               
              </div>

              {navItems.map((item, index) => (
                <a
                  key={index}
                  href={item.href}
                  className="relative group px-3 py-2 text-lg font-medium text-white transition-all duration-300 hover:text-amber-400"
                >
                  <div className="absolute inset-0 rounded-lg bg-amber-400/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
                  <span className="relative z-10 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[2px_2px_4px_rgba(212,175,55,0.4)]">
                    {item.name}
                  </span>
                  <div className="absolute bottom-0 left-0 h-0.5 w-0 bg-gradient-to-r from-amber-400 to-amber-600 shadow-lg shadow-amber-400/50 transition-all duration-300 group-hover:w-full" />
                  <div className="absolute -top-1 right-1 h-1 w-1 rounded-full bg-amber-400/0 transition-all duration-300 group-hover:animate-ping group-hover:bg-amber-400/80" />
                </a>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="group relative p-2 text-white transition-colors duration-300 hover:text-amber-400"
              aria-label="Toggle menu"
              aria-expanded={isMobileMenuOpen}
            >
              <div className="absolute inset-0 rounded-lg bg-amber-400/10 opacity-0 blur-sm transition-opacity duration-300 group-hover:opacity-100" />
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
      <div
        className={`md:hidden overflow-hidden transition-all duration-500 ${
          isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="bg-gray-900/98 backdrop-blur-md border-t border-amber-400/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="group block rounded-lg px-3 py-3 text-lg font-medium text-white transition-all duration-300 hover:bg-amber-400/10 hover:text-amber-400"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[2px_2px_4px_rgba(212,175,55,0.4)]">
                  {item.name}
                </span>
              </a>
            ))}

            {/* Mobile CTA */}
            <div className="pt-4">
              <button className="group relative w-full overflow-hidden rounded-full bg-gradient-to-r from-amber-500 to-amber-600 px-6 py-3 font-semibold text-white transition-all duration-300 hover:from-amber-400 hover:to-amber-500 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-400/40">
                <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="relative z-10 flex items-center justify-center gap-2">
                  Book Your Journey
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default WanderingHartNavbar;
