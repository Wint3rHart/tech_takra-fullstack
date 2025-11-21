"use client"
import useData from '@/client_hooks/useData';
// import { Get_status, get_status } from '@/util_comps/sign_status';
import Link from 'next/link';
import React, { useState, useEffect, useMemo } from 'react';

const WanderingHartNavbar = ({data}) => {
  // const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
const [isSigned,setSigned]=useState({status:false,data:null});

  const [isCoursesDropdownOpen, setIsCoursesDropdownOpen] = useState(false);
  // useEffect(() => {
  //   const handleScroll = () => {
  //     setIsScrolled(window.scrollY > 50);
  //   };
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, []);
const sign_display=useMemo(()=>{
 return <div className=" md:block  relative h-full mt-10 group">
            <button className="relative   bg-gradient-to-r from-amber-300/50 to-amber-400/50 hover:from-amber-400/70 hover:to-amber-500/70 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-400/40 hover:scale-105">
{data?.status&&            <Link  href='/user' className='absolute hidden w-[10vw] font-poppins text-sm group-hover:block z-90 border rounded-xl mt-2 border-amber-400 p-4 left-10  sm:top-12 sm:-translate-x-8 md:top-11 md:-translate-x-12 text-amber-300 text-lg'>
Open Admin Panel
            </Link>}
             
              
              <Link href='/signUp' className="relative z-10 font-inter flex items-center text-white gap-2">
          {data?.status?"Signed In":"Sign In for Admins"}
              </Link>
              
              {/* Glowing border */}
              <div className="absolute inset-0 rounded-full border border-amber-300/30 group-hover:border-amber-200/50 transition-colors duration-300"></div>
            </button>
          </div>},[data]);

  const navItems = [
  
    
    { name: 'Team', href: '/team' },
    { name: 'Updates', href: '/updates' },{name:"Join Now",href:"/register"}
  ];

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 
      'bg-gray-900/95 backdrop-blur-md shadow-2xl shadow-black/50' 
        
    `}>
      
      {/* Magical shimmer effect */}
      <div className='absolute w-full inset-0 bg-gradient-to-r from-transparent via-amber-400/5 to-transparent -translate-x-full hover:translate-x-full transition-transform duration-3000'></div>
      
      {/* Floating particles for navbar */}
      <div className="absolute top-2 left-20 w-1 h-1 bg-amber-400/60 rounded-full animate-pulse"></div>
      <div className="absolute top-4 right-32 w-0.5 h-0.5 bg-white/50 rounded-full animate-ping delay-700"></div>
      <div className="absolute bottom-2 left-1/3 w-1 h-1 bg-amber-300/40 rounded-full animate-pulse delay-1000"></div>
      <div className="absolute top-1 right-1/4 w-0.5 h-0.5 bg-white/60 rounded-full animate-ping delay-300"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <div className="flex-shrink-0 group cursor-pointer">
            <div className="relative">
              {/* Logo background glow */}
              <div className="absolute  inset-0 bg-amber-400/20 rounded-full blur-lg group-hover:bg-amber-400/30 transition-all duration-300"></div>
              
              <h1 className="relative border p-2 border-amber-200 rounded-full text-2xl md:text-xl flex font-bold text-white group-hover:text-amber-300 transition-colors duration-300">
                <span className="text-white drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]">T</span>
                <br />
                <span className=" text-amber-200 drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]  tracking-wide">W</span>
                <br />
                <span className="text-white drop-shadow-[2px_2px_4px_rgba(212,175,55,0.3)]">H</span>
              </h1>
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-baseline space-x-8">

<div className='relative group px-3 py-2 text-white hover:text-amber-400 transition-all duration-300 text-lg font-medium'> 
              <Link href={`/`} >
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-amber-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  
                  {/* Text with glow effect */}
                  <span className="relative z-10 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[2px_2px_4px_rgba(212,175,55,0.4)]">
                   Home
                  </span>
                  
                  {/* Underline animation */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-300 shadow-lg shadow-amber-400/50"></div>
                  
                  {/* Floating sparkle effect */}
                  <div className="absolute -top-1 right-1 w-1 h-1 bg-amber-400/0 rounded-full group-hover:bg-amber-400/80 group-hover:animate-ping transition-all duration-300"></div>
              </Link>  </div>


 <div className="relative" onMouseEnter={() => setIsCoursesDropdownOpen(true)} onMouseLeave={() => setIsCoursesDropdownOpen(false)}>
  
              <button className="flex items-center space-x-1 py-6 cursor-pointer text-stone-100 hover:text-amber-300 font-medium transition-colors duration-200 relative group">
                <span>Events</span> 
                <div className="absolute inset-0 bg-amber-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                {/* <ChevronDown size={16} className={`transition-transform duration-200 ${isCoursesDropdownOpen ? 'rotate-180' : ''}`} /> */}
                {/* <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-amber-400/100 group-hover:w-full transition-all duration-300"></span> */}
              </button>
               <div className="absolute -top-1 right-1 w-1 h-1 bg-amber-400/0 rounded-full group-hover:bg-amber-400/80 group-hover:animate-ping transition-all duration-300"></div>
              {/* Dropdown Menu */}
              <div className={`absolute top-15 flex flex-col items-center justify-center text-center -left-10 mt-2 w-40 bg-gray-800 rounded-2xl shadow-xl border border-amber-300 overflow-hidden transition-all duration-300 ${
                isCoursesDropdownOpen ? 'opacity-100 translate-y-0 visible' : 'opacity-0 -translate-y-2 invisible'
              }`}>
                <div className="p-6 flex flex-col">
                  <Link  href='/events?type=upcoming' className="text-sm font-semibold cursor-pointer hover:text-amber-400/80 text-stone-100 uppercase tracking-wide mb-4">Upcoming Events</Link>
                  <Link href='/events?type=past' className="text-sm font-semibold cursor-pointer hover:text-amber-400/80 text-stone-100 uppercase tracking-wide mb-4">Past Events</Link>
                  <div className="space-y-3">
                    {/* {courses.map((course, index) => (
                      <div key={index} onClick={()=>{router.push(`/courses/details/${course.id}`)}} className="flex items-center space-x-3 p-3 rounded-xl hover:bg-blue-50 transition-colors duration-200 group">
                        <div className="text-2xl">{course.icon}</div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">{course.name}</div>
                          
                        </div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
                      </div>
                    ))} */}
                  </div>
                 
                </div>
              </div>
            </div>
              {navItems.map((item, index) => (
              <div key={index} className='relative group px-3 py-2 text-white hover:text-amber-400 transition-all duration-300 text-lg font-medium'> 
              <Link href={`${item.href}`} >
                  {/* Hover effect background */}
                  <div className="absolute inset-0 bg-amber-400/10 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"></div>
                  
                  {/* Text with glow effect */}
                  <span className="relative z-10 drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[2px_2px_4px_rgba(212,175,55,0.4)]">
                    {item.name}
                  </span>
                  
                  {/* Underline animation */}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-600 group-hover:w-full transition-all duration-300 shadow-lg shadow-amber-400/50"></div>
                  
                  {/* Floating sparkle effect */}
                  <div className="absolute -top-1 right-1 w-1 h-1 bg-amber-400/0 rounded-full group-hover:bg-amber-400/80 group-hover:animate-ping transition-all duration-300"></div>
              </Link>  </div>
              ))}
            </div>
          </div>
          
{sign_display}



          {/* Book Now Button */}
          
          {/* <div className="hidden md:block"> */}
            {/* <button className="relative group overflow-hidden bg-gradient-to-r from-amber-300/50 to-amber-400/50 hover:from-amber-400/70 hover:to-amber-500/70 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-400/40 hover:scale-105"> */}
              {/* Button shimmer effect */}
              {/* <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
              
              <span className="relative z-10 flex items-center gap-2">
                
                Book Now
              </span> */}
              
              {/* Glowing border */}
              {/* <div className="absolute inset-0 rounded-full border border-amber-300/30 group-hover:border-amber-200/50 transition-colors duration-300"></div> */}
            {/* </button> */}
          {/* </div> */}

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
        isMobileMenuOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
      }`}>
        <div className="bg-gray-900/98 backdrop-blur-md border-t border-amber-400/20">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {navItems.map((item, index) => (
              <a 
                key={item.name}
                href={item.href}
                className="group block px-3 py-3 text-white hover:text-amber-400 text-lg font-medium transition-all duration-300 rounded-lg hover:bg-amber-400/10"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                <span className="drop-shadow-[1px_1px_2px_rgba(0,0,0,0.8)] group-hover:drop-shadow-[2px_2px_4px_rgba(212,175,55,0.4)]">
                  {item.name}
                </span>
              </a>
            ))}
            
            {/* Mobile Book Now Button */}
            <div className="pt-4">
              <button className="w-full group overflow-hidden bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-400 hover:to-amber-500 text-white px-6 py-3 rounded-full font-semibold transition-all duration-300 shadow-lg shadow-amber-500/30 hover:shadow-xl hover:shadow-amber-400/40">
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
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