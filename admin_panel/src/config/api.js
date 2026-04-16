// Global API Configuration for Admin Panel
// This file centralizes all API endpoint configurations

// Get the base URL from environment variables or use default
const getApiBaseUrl = () => {
  // Check if we're in development or production
  const isDevelopment = import.meta.env.DEV || window.location.hostname === 'localhost';
  
  if (isDevelopment) {
    // Development environment - use local backend
    return import.meta.env.VITE_API_BASE_URL || 'http://localhost:8000';
  } else {
    // Production environment - use Render backend
    return import.meta.env.VITE_API_BASE_URL || 'https://twoelephantswebsitebackend.onrender.com';
  }
};

// API endpoints configuration
export const API_CONFIG = {
  BASE_URL: getApiBaseUrl(),
  ENDPOINTS: {
    // Admin endpoints (authentication required)
    ADMIN: {
      CONTACTS: '/api/contacts/',
      JOBS: '/api/jobs/',
      APPLICATIONS: '/api/applications/',
      ARTICLES: '/api/articles/',
    },
    // Public endpoints (for reference)
    PUBLIC: {
      CONTACT: '/api/public/contact/',
      ROLES: '/api/public/roles/',
      APPLY: '/api/public/apply/',
      ARTICLES: '/api/public/articles/',
      ARTICLE_BY_SLUG: '/api/public/articles/:slug/',
    }
  }
};

// Helper function to build full URLs
export const buildApiUrl = (endpoint, params = {}) => {
  let url = API_CONFIG.BASE_URL + endpoint;
  
  // Replace URL parameters (e.g., :slug)
  Object.keys(params).forEach(key => {
    url = url.replace(`:${key}`, params[key]);
  });
  
  return url;
};

// Export commonly used URLs for backward compatibility
export const API_BASE = API_CONFIG.BASE_URL;

export default API_CONFIG;
