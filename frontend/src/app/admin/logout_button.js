"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import usePost from '@/client_hooks/usePost';
import { logoutAction } from './logout_action';

export const LogoutButton = ({ access }) => {
  const router = useRouter();
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const { post } = usePost("logout_admin", "POST", access);

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      // Call logout endpoint if access token exists
      if (access) {
        try {
          await post.mutateAsync({});
        } catch (error) {
          console.error("Logout API error:", error);
          // Continue with logout even if API call fails
        }
      }
    } catch (error) {
      console.error("Logout error:", error);
    } finally {
      // Call server action to delete cookies and redirect
      await logoutAction();
    }
  };

  return (
    <button
      onClick={handleLogout}
      disabled={isLoggingOut}
      className="px-5 py-2.5 rounded-full text-white font-bold text-sm sm:text-base
                 bg-gradient-to-r from-red-500 to-red-700
                 hover:from-red-600 hover:to-red-800
                 transition-all duration-500 shadow-lg
                 hover:scale-105 hover:shadow-2xl hover:shadow-red-400/30
                 flex items-center gap-2 border border-red-600/40
                 group relative overflow-hidden
                 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      <div className="absolute w-full inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000" />
      <svg
        className="w-5 h-5 relative z-10"
        fill="none"
        stroke="currentColor"
        viewBox="0 0 24 24"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
        />
      </svg>
      <span className="relative z-10">{isLoggingOut ? "Logging out..." : "Logout"}</span>
    </button>
  );
};

