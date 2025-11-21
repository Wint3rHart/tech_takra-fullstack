// API Configuration - automatically detects environment
// Use NEXT_PUBLIC_API_URL environment variable if set, otherwise auto-detect

const getApiBaseUrl = () => {
  // Priority 1: If environment variable is explicitly set, use it
  if (process.env.NEXT_PUBLIC_API_URL) {
    console.log('[API Config] Using NEXT_PUBLIC_API_URL:', process.env.NEXT_PUBLIC_API_URL);
    return process.env.NEXT_PUBLIC_API_URL;
  }
  
  // Priority 2: Client-side detection (most reliable - checks actual browser location)
  if (typeof window !== 'undefined' && window.location) {
    const hostname = window.location.hostname;
    console.log('[API Config] Client-side detection, hostname:', hostname);
    // Only use localhost if we're actually on localhost
    if (hostname === 'localhost' || hostname === '127.0.0.1') {
      return 'http://localhost:4600';
    }
    // For any other hostname (vercel.app, custom domain, etc.), use production
    return 'https://computersciencesocietyonrender.com';
  }
  
  // Priority 3: Server-side detection
  // In Next.js, during build/SSR, we need to check environment variables
  // Vercel sets VERCEL_ENV: 'production', 'preview', or 'development'
  // NODE_ENV is 'production' in production builds, 'development' in dev mode
  
  const isDevelopment = 
    process.env.NODE_ENV === 'development' || 
    process.env.VERCEL_ENV === 'development';
  
  console.log('[API Config] Server-side detection:', {
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV,
    isDevelopment
  });
  
  if (isDevelopment) {
    return 'http://localhost:4600';
  }
  
  // Default: Always use production URL for production builds
  // This covers: Vercel production, Vercel preview, and any other production deployment
  return 'https://computersciencesocietyonrender.com';
};

// Export function for runtime evaluation (not build-time constant)
// This is critical for Vercel deployments where env vars may change
export { getApiBaseUrl };

// Helper function to build API URLs
export const getApiUrl = (endpoint) => {
  // Remove leading slash if present
  const cleanEndpoint = endpoint.startsWith('/') ? endpoint.slice(1) : endpoint;
  return `${getApiBaseUrl()}/api/${cleanEndpoint}`;
};

// Deprecated: kept for backward compatibility, but use getApiBaseUrl() instead
export const API_BASE_URL = getApiBaseUrl();

