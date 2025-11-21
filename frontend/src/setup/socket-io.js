"use client"
import {io} from 'socket.io-client'

const getSocketUrl = () => {
  // Client-side: check actual browser location
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:4600';
    }
    // Production: use backend URL
    return 'https://computersciencesocietyonrender.com';
  }
  // Server-side fallback
  return 'https://computersciencesocietyonrender.com';
};

export const socket=io(getSocketUrl(),{autoConnect:false});




