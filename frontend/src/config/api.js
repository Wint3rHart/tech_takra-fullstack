// API Configuration - automatically detects environment
// Use NEXT_PUBLIC_API_URL environment variable if set, otherwise auto-detect

const getApiBaseUrl = () => {
  // If environment variable is set, use it (works for both client and server)
  if (process.env.NEXT_PUBLIC_API_URL) {
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // For client-side: check if running on localhost
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:4600';
    }
  }
  
  // For server-side: check NODE_ENV
  if (typeof window === 'undefined') {
    if (process.env.NODE_ENV === 'development') {
      return 'http://localhost:4600';
    }
  }
  
  // Default to production URL
  return 'https://computersciencesocietyonrender.com';
};

export const API_BASE_URL = getApiBaseUrl();

// Helper function to build API URLs
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${API_BASE_URL}/api/${cleanEndpoint}`;
};

