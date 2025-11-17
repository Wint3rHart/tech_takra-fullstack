// src/components/MyErrorFallback.jsx

"use client"; // This line is crucial!

import { useRouter } from "next/navigation";
import React from "react";

export function MyErrorFallback({ error, resetErrorBoundary }) {
    console.log(error.message);
    const router=useRouter()
  return (
    <div role="alert" className="text-red-500 p-4 bg-red-100 rounded-lg">
      <p>Oops! Something went wrong while loading this section:</p>
      <pre className="text-sm overflow-auto max-h-40">{error.message}</pre>
      <button
        onClick={()=>{router.refresh();resetErrorBoundary()}}
        className="mt-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
      >
        Try again
      </button>
    </div>
  );
}